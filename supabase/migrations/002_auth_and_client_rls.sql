CREATE EXTENSION IF NOT EXISTS pgcrypto;

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS location_city TEXT,
  ADD COLUMN IF NOT EXISTS property_type TEXT,
  ADD COLUMN IF NOT EXISTS onboarding_completed BOOLEAN NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS trigger
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;
CREATE TRIGGER profiles_set_updated_at
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS projects_set_updated_at ON public.projects;
CREATE TRIGGER projects_set_updated_at
BEFORE UPDATE ON public.projects
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    email,
    full_name,
    avatar_url,
    role
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.email, ''),
    COALESCE(
      NEW.raw_user_meta_data ->> 'full_name',
      NEW.raw_user_meta_data ->> 'name',
      split_part(COALESCE(NEW.email, 'renno-user'), '@', 1)
    ),
    NEW.raw_user_meta_data ->> 'avatar_url',
    COALESCE((NEW.raw_user_meta_data ->> 'role')::text, 'client')
  )
  ON CONFLICT (id) DO NOTHING;

  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION public.handle_new_user();

DROP POLICY IF EXISTS "profiles_select_own" ON profiles;
CREATE POLICY "profiles_select_own"
ON profiles
FOR SELECT
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_insert_own" ON profiles;
CREATE POLICY "profiles_insert_own"
ON profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_update_own" ON profiles;
CREATE POLICY "profiles_update_own"
ON profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "profiles_delete_own" ON profiles;
CREATE POLICY "profiles_delete_own"
ON profiles
FOR DELETE
TO authenticated
USING (auth.uid() = id);

DROP POLICY IF EXISTS "projects_select_own" ON projects;
CREATE POLICY "projects_select_own"
ON projects
FOR SELECT
TO authenticated
USING (auth.uid() = client_id);

DROP POLICY IF EXISTS "projects_insert_own" ON projects;
CREATE POLICY "projects_insert_own"
ON projects
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = client_id);

DROP POLICY IF EXISTS "projects_update_own" ON projects;
CREATE POLICY "projects_update_own"
ON projects
FOR UPDATE
TO authenticated
USING (auth.uid() = client_id)
WITH CHECK (auth.uid() = client_id);

DROP POLICY IF EXISTS "projects_delete_own" ON projects;
CREATE POLICY "projects_delete_own"
ON projects
FOR DELETE
TO authenticated
USING (auth.uid() = client_id);

DROP POLICY IF EXISTS "pro_profiles_select_all" ON pro_profiles;
CREATE POLICY "pro_profiles_select_all"
ON pro_profiles
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "pro_profiles_update_own" ON pro_profiles;
CREATE POLICY "pro_profiles_update_own"
ON pro_profiles
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "quotes_select_client_project" ON quotes;
CREATE POLICY "quotes_select_client_project"
ON quotes
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = quotes.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "milestones_select_client_project" ON milestones;
CREATE POLICY "milestones_select_client_project"
ON milestones
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = milestones.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "messages_select_project_participant" ON messages;
CREATE POLICY "messages_select_project_participant"
ON messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = messages.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "messages_insert_project_participant" ON messages;
CREATE POLICY "messages_insert_project_participant"
ON messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = messages.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "reviews_select_all" ON reviews;
CREATE POLICY "reviews_select_all"
ON reviews
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "notifications_select_own" ON notifications;
CREATE POLICY "notifications_select_own"
ON notifications
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "notifications_update_own" ON notifications;
CREATE POLICY "notifications_update_own"
ON notifications
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

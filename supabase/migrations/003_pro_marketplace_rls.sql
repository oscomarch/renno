DROP POLICY IF EXISTS "pro_profiles_insert_own" ON pro_profiles;
CREATE POLICY "pro_profiles_insert_own"
ON pro_profiles
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = id);

DROP POLICY IF EXISTS "projects_select_for_pros" ON projects;
CREATE POLICY "projects_select_for_pros"
ON projects
FOR SELECT
TO authenticated
USING (
  status IN ('open', 'matching')
  OR EXISTS (
    SELECT 1
    FROM quotes
    WHERE quotes.project_id = projects.id
      AND quotes.pro_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "quotes_insert_own" ON quotes;
CREATE POLICY "quotes_insert_own"
ON quotes
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = pro_id);

DROP POLICY IF EXISTS "quotes_select_own" ON quotes;
CREATE POLICY "quotes_select_own"
ON quotes
FOR SELECT
TO authenticated
USING (auth.uid() = pro_id);

DROP POLICY IF EXISTS "quotes_update_own_or_client_project" ON quotes;
CREATE POLICY "quotes_update_own_or_client_project"
ON quotes
FOR UPDATE
TO authenticated
USING (
  auth.uid() = pro_id
  OR EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = quotes.project_id
      AND projects.client_id = auth.uid()
  )
)
WITH CHECK (
  auth.uid() = pro_id
  OR EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = quotes.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "milestones_insert_client_project" ON milestones;
CREATE POLICY "milestones_insert_client_project"
ON milestones
FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1
    FROM projects
    WHERE projects.id = milestones.project_id
      AND projects.client_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "milestones_select_pro_project" ON milestones;
CREATE POLICY "milestones_select_pro_project"
ON milestones
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM quotes
    WHERE quotes.id = milestones.quote_id
      AND quotes.pro_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "messages_select_pro_participant" ON messages;
CREATE POLICY "messages_select_pro_participant"
ON messages
FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1
    FROM quotes
    WHERE quotes.project_id = messages.project_id
      AND quotes.pro_id = auth.uid()
  )
);

DROP POLICY IF EXISTS "messages_insert_pro_participant" ON messages;
CREATE POLICY "messages_insert_pro_participant"
ON messages
FOR INSERT
TO authenticated
WITH CHECK (
  auth.uid() = sender_id
  AND EXISTS (
    SELECT 1
    FROM quotes
    WHERE quotes.project_id = messages.project_id
      AND quotes.pro_id = auth.uid()
  )
);

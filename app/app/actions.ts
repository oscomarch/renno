"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function signOutAction() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function saveClientProfileAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const locationCity = String(formData.get("location_city") ?? "").trim();
  const propertyType = String(formData.get("property_type") ?? "").trim();

  if (!fullName || !locationCity) {
    redirect("/app/onboarding/client?error=Please+complete+all+required+fields");
  }

  const { error } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      full_name: fullName,
      phone: phone || null,
      location_city: locationCity,
      property_type: propertyType || null,
      role: "client",
      onboarding_completed: true
    },
    { onConflict: "id" }
  );

  if (error) {
    redirect(`/app/onboarding/client?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/app/dashboard");
}

export async function updateSettingsAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const payload = {
    full_name: String(formData.get("full_name") ?? "").trim(),
    email: user.email ?? "",
    phone: String(formData.get("phone") ?? "").trim() || null,
    location_city: String(formData.get("location_city") ?? "").trim() || null,
    property_type: String(formData.get("property_type") ?? "").trim() || null
  };

  const { error } = await supabase.from("profiles").update(payload).eq("id", user.id);

  if (error) {
    redirect(`/app/settings?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath("/app/settings");
  redirect("/app/settings?success=Settings+updated");
}

export async function createProjectAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const payload = {
    client_id: user.id,
    category: String(formData.get("category") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    location_city: String(formData.get("location_city") ?? "").trim() || null,
    budget_min: Number(formData.get("budget_min") ?? 0),
    budget_max: Number(formData.get("budget_max") ?? 0),
    desired_start_date: String(formData.get("desired_start_date") ?? "").trim() || null,
    desired_end_date: String(formData.get("desired_end_date") ?? "").trim() || null,
    urgency: String(formData.get("urgency") ?? "normal").trim(),
    status: "open"
  };

  if (!payload.category || !payload.title || !payload.description) {
    redirect("/app/projects/new?error=Please+fill+in+the+required+project+fields");
  }

  const { data, error } = await supabase.from("projects").insert(payload).select("id").single();

  if (error || !data) {
    redirect(`/app/projects/new?error=${encodeURIComponent(error?.message ?? "Unable+to+create+project")}`);
  }

  revalidatePath("/app/dashboard");
  redirect(`/app/projects/${data.id}`);
}

export async function createMessageAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const projectId = String(formData.get("project_id") ?? "");
  const content = String(formData.get("content") ?? "").trim();

  if (!projectId || !content) {
    redirect(`/app/projects/${projectId}`);
  }

  const { error } = await supabase.from("messages").insert({
    project_id: projectId,
    sender_id: user.id,
    content
  });

  if (error) {
    redirect(`/app/projects/${projectId}?error=${encodeURIComponent(error.message)}`);
  }

  revalidatePath(`/app/projects/${projectId}`);
  redirect(`/app/projects/${projectId}`);
}

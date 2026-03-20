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

export async function saveProProfileAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const fullName = String(formData.get("full_name") ?? "").trim();
  const locationCity = String(formData.get("location_city") ?? "").trim();
  const businessName = String(formData.get("business_name") ?? "").trim();
  const bio = String(formData.get("bio") ?? "").trim();
  const hourlyRate = Number(formData.get("hourly_rate") ?? 0);
  const yearsExperience = Number(formData.get("years_experience") ?? 0);
  const serviceRadius = Number(formData.get("service_radius_km") ?? 25);
  const trades = formData
    .getAll("trades")
    .map((trade) => String(trade).trim())
    .filter(Boolean);

  if (!fullName || !locationCity || !businessName || !trades.length) {
    redirect("/app/onboarding/pro?error=Please+complete+the+required+business+details");
  }

  const { error: profileError } = await supabase.from("profiles").upsert(
    {
      id: user.id,
      email: user.email ?? "",
      full_name: fullName,
      location_city: locationCity,
      role: "pro",
      onboarding_completed: true
    },
    { onConflict: "id" }
  );

  if (profileError) {
    redirect(`/app/onboarding/pro?error=${encodeURIComponent(profileError.message)}`);
  }

  const { error: proError } = await supabase.from("pro_profiles").upsert(
    {
      id: user.id,
      business_name: businessName,
      bio: bio || null,
      trades,
      years_experience: yearsExperience || null,
      service_radius_km: serviceRadius,
      location_city: locationCity,
      hourly_rate: hourlyRate || null,
      portfolio_images: []
    },
    { onConflict: "id" }
  );

  if (proError) {
    redirect(`/app/onboarding/pro?error=${encodeURIComponent(proError.message)}`);
  }

  redirect("/app/pro/dashboard");
}

export async function updateProProfileAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const businessName = String(formData.get("business_name") ?? "").trim();
  const locationCity = String(formData.get("location_city") ?? "").trim();
  const hourlyRate = Number(formData.get("hourly_rate") ?? 0);
  const yearsExperience = Number(formData.get("years_experience") ?? 0);
  const bio = String(formData.get("bio") ?? "").trim();
  const rawTrades = formData.getAll("trades");
  const trades = rawTrades
    .flatMap((trade) => String(trade).split(","))
    .map((trade) => trade.trim())
    .filter(Boolean);

  const { error } = await supabase
    .from("pro_profiles")
    .update({
      business_name: businessName,
      location_city: locationCity,
      hourly_rate: hourlyRate || null,
      years_experience: yearsExperience || null,
      bio: bio || null,
      trades
    })
    .eq("id", user.id);

  if (error) {
    redirect(`/app/pro/profile/edit?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/app/pro/profile/edit?success=Profile+updated");
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

export async function createQuoteAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const projectId = String(formData.get("project_id") ?? "");
  const totalAmount = Number(formData.get("total_amount") ?? 0);
  const estimatedDurationDays = Number(formData.get("estimated_duration_days") ?? 0);
  const message = String(formData.get("message") ?? "").trim();

  const breakdown = [1, 2, 3]
    .map((index) => ({
      label: String(formData.get(`breakdown_label_${index}`) ?? "").trim(),
      amount: Number(formData.get(`breakdown_amount_${index}`) ?? 0)
    }))
    .filter((item) => item.label && item.amount > 0);

  if (!projectId || !totalAmount || !breakdown.length) {
    redirect(`/app/pro/leads/${projectId}?error=Please+add+at+least+one+priced+milestone`);
  }

  const { error } = await supabase.from("quotes").insert({
    project_id: projectId,
    pro_id: user.id,
    status: "pending",
    total_amount: totalAmount,
    breakdown,
    message: message || null,
    estimated_duration_days: estimatedDurationDays || null
  });

  if (error) {
    redirect(`/app/pro/leads/${projectId}?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/app/pro/quotes?success=Quote+submitted");
}

export async function acceptQuoteAction(formData: FormData) {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/app/login");
  }

  const projectId = String(formData.get("project_id") ?? "");
  const quoteId = String(formData.get("quote_id") ?? "");

  const { data: quote, error: quoteError } = await supabase
    .from("quotes")
    .select("id, project_id, breakdown")
    .eq("id", quoteId)
    .eq("project_id", projectId)
    .single();

  if (quoteError || !quote) {
    redirect(`/app/projects/${projectId}/quotes?error=Unable+to+load+quote`);
  }

  const { error: rejectError } = await supabase
    .from("quotes")
    .update({ status: "rejected" })
    .eq("project_id", projectId)
    .neq("id", quoteId);

  if (rejectError) {
    redirect(`/app/projects/${projectId}/quotes?error=${encodeURIComponent(rejectError.message)}`);
  }

  const { error: acceptError } = await supabase.from("quotes").update({ status: "accepted" }).eq("id", quoteId);

  if (acceptError) {
    redirect(`/app/projects/${projectId}/quotes?error=${encodeURIComponent(acceptError.message)}`);
  }

  await supabase.from("projects").update({ status: "in_progress" }).eq("id", projectId).eq("client_id", user.id);

  const milestoneRows = (Array.isArray(quote.breakdown) ? quote.breakdown : []).map((item, index) => ({
    project_id: projectId,
    quote_id: quoteId,
    title: item.label,
    amount: Number(item.amount),
    order_index: index + 1,
    status: index === 0 ? "funded" : "pending"
  }));

  if (milestoneRows.length) {
    await supabase.from("milestones").delete().eq("project_id", projectId);
    await supabase.from("milestones").insert(milestoneRows);
  }

  revalidatePath(`/app/projects/${projectId}`);
  redirect(`/app/projects/${projectId}`);
}

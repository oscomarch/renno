import { cache } from "react";
import { redirect } from "next/navigation";
import { formatDistanceToNowStrict } from "date-fns";

import { createClient } from "@/lib/supabase/server";
import type { Message, Milestone, ProProfile, Profile, Project, Quote } from "@/types";

type ProfileRow = {
  id: string;
  email: string;
  full_name: string;
  avatar_url: string | null;
  phone: string | null;
  role: "client" | "pro" | "admin";
  location_city?: string | null;
  property_type?: string | null;
  onboarding_completed?: boolean | null;
};

type ProjectRow = {
  id: string;
  client_id: string;
  title: string;
  description: string;
  category: string;
  status: Project["status"];
  budget_min: number | string | null;
  budget_max: number | string | null;
  location_city: string | null;
  urgency: Project["urgency"];
  desired_start_date: string | null;
  desired_end_date: string | null;
  created_at: string;
  updated_at: string;
};

type MilestoneRow = {
  id: string;
  project_id: string;
  title: string;
  amount: number | string;
  status: Milestone["status"];
  due_date: string | null;
};

type QuoteRow = {
  id: string;
  project_id: string;
  pro_id: string;
  status: Quote["status"];
  total_amount: number | string;
  estimated_duration_days: number | null;
  message: string | null;
  breakdown: Quote["breakdown"] | null;
  pro_name?: string | null;
};

type ProProfileRow = {
  id: string;
  business_name: string;
  bio: string | null;
  trades: string[] | null;
  years_experience: number | null;
  location_city: string | null;
  hourly_rate: number | string | null;
  rating_avg: number | string | null;
  rating_count: number | null;
  portfolio_images: string[] | null;
  license_verified: boolean | null;
  insurance_verified: boolean | null;
  background_check_passed: boolean | null;
  is_featured: boolean | null;
  subscription_tier: "basic" | "premium" | null;
};

type MessageRow = {
  id: string;
  project_id: string;
  sender_id: string;
  content: string;
  created_at: string;
};

export const getCurrentAccount = cache(async () => {
  const supabase = createClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, email, full_name, avatar_url, phone, role, location_city, property_type, onboarding_completed")
    .eq("id", user.id)
    .maybeSingle<ProfileRow>();

  return { user, profile };
});

export async function requireAccount() {
  const account = await getCurrentAccount();

  if (!account.user) {
    redirect("/app/login");
  }

  return account;
}

export async function requireClientAccount() {
  const { user, profile } = await requireAccount();

  if (!profile) {
    redirect("/app/onboarding/client");
  }

  if (profile.role !== "client") {
    redirect("/app/pro/dashboard");
  }

  if (!profile.onboarding_completed) {
    redirect("/app/onboarding/client");
  }

  return { user, profile };
}

export async function requireProAccount() {
  const { user, profile } = await requireAccount();

  if (!profile) {
    redirect("/app/onboarding/pro");
  }

  if (profile.role !== "pro") {
    redirect("/app/dashboard");
  }

  if (!profile.onboarding_completed) {
    redirect("/app/onboarding/pro");
  }

  const supabase = createClient();
  const { data: proProfile } = await supabase
    .from("pro_profiles")
    .select(
      "id, business_name, bio, trades, years_experience, location_city, hourly_rate, rating_avg, rating_count, portfolio_images, license_verified, insurance_verified, background_check_passed, is_featured, subscription_tier"
    )
    .eq("id", user.id)
    .maybeSingle<ProProfileRow>();

  if (!proProfile) {
    redirect("/app/onboarding/pro");
  }

  return { user, profile, proProfile };
}

export function getAuthenticatedHome(
  profile: Pick<ProfileRow, "role" | "onboarding_completed"> | null
) {
  if (!profile) return "/app/onboarding/client";
  if (profile.role === "pro") return profile.onboarding_completed ? "/app/pro/dashboard" : "/app/onboarding/pro";
  if (!profile.onboarding_completed) return "/app/onboarding/client";
  return "/app/dashboard";
}

export function mapProfileRow(profile: ProfileRow): Profile & {
  locationCity?: string | null;
  propertyType?: string | null;
  onboardingCompleted?: boolean | null;
} {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    avatarUrl: profile.avatar_url ?? undefined,
    phone: profile.phone ?? undefined,
    role: profile.role,
    locationCity: profile.location_city ?? null,
    propertyType: profile.property_type ?? null,
    onboardingCompleted: profile.onboarding_completed ?? false
  };
}

export function mapProjectRow(project: ProjectRow): Project {
  return {
    id: project.id,
    clientId: project.client_id,
    title: project.title,
    description: project.description,
    category: project.category,
    status: project.status,
    budgetMin: Number(project.budget_min ?? 0),
    budgetMax: Number(project.budget_max ?? 0),
    locationCity: project.location_city ?? "TBD",
    urgency: project.urgency,
    desiredStartDate: project.desired_start_date ?? "TBD",
    desiredEndDate: project.desired_end_date ?? "TBD",
    updatedAt: formatDistanceToNowStrict(new Date(project.updated_at), { addSuffix: true })
  };
}

export function mapMilestoneRow(milestone: MilestoneRow): Milestone {
  return {
    id: milestone.id,
    projectId: milestone.project_id,
    title: milestone.title,
    amount: Number(milestone.amount),
    status: milestone.status,
    dueDate: milestone.due_date ?? "TBD"
  };
}

export function mapQuoteRow(quote: QuoteRow): Quote {
  return {
    id: quote.id,
    projectId: quote.project_id,
    proId: quote.pro_id,
    proName: quote.pro_name ?? undefined,
    status: quote.status,
    totalAmount: Number(quote.total_amount),
    estimatedDurationDays: quote.estimated_duration_days ?? 0,
    message: quote.message ?? "",
    breakdown: Array.isArray(quote.breakdown) ? quote.breakdown : []
  };
}

export function mapProProfileRow(pro: ProProfileRow): ProProfile {
  return {
    id: pro.id,
    businessName: pro.business_name,
    trades: pro.trades ?? [],
    bio: pro.bio ?? "Independent professional on Renno.",
    ratingAvg: Number(pro.rating_avg ?? 0),
    ratingCount: pro.rating_count ?? 0,
    hourlyRate: Number(pro.hourly_rate ?? 0),
    locationCity: pro.location_city ?? "Unknown",
    yearsExperience: pro.years_experience ?? 0,
    verified: Boolean(pro.license_verified || pro.insurance_verified || pro.background_check_passed),
    portfolioImages:
      pro.portfolio_images && pro.portfolio_images.length
        ? pro.portfolio_images
        : ["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=900&q=80"],
    featured: Boolean(pro.is_featured),
    subscriptionTier: pro.subscription_tier ?? "basic"
  };
}

export function mapMessageRow(message: MessageRow, currentUserId: string): Message {
  return {
    id: message.id,
    projectId: message.project_id,
    senderName: message.sender_id === currentUserId ? "You" : "Participant",
    content: message.content,
    createdAt: new Date(message.created_at).toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit"
    })
  };
}

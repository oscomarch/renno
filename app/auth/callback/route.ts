import { NextResponse } from "next/server";

import { getAuthenticatedHome } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

function deriveName(user: {
  email?: string;
  user_metadata?: Record<string, unknown>;
}) {
  const fromMetadata =
    typeof user.user_metadata?.full_name === "string"
      ? user.user_metadata.full_name
      : typeof user.user_metadata?.name === "string"
        ? user.user_metadata.name
        : null;

  if (fromMetadata) return fromMetadata;
  if (user.email) return user.email.split("@")[0];
  return "Renno user";
}

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const role = searchParams.get("role") === "pro" ? "pro" : "client";
  let next = searchParams.get("next") ?? "/";

  if (!next.startsWith("/")) {
    next = "/";
  }

  if (!code) {
    return NextResponse.redirect(`${origin}/app/login?error=Missing+auth+code`);
  }

  const supabase = createClient();
  const { error } = await supabase.auth.exchangeCodeForSession(code);

  if (error) {
    return NextResponse.redirect(`${origin}/app/login?error=${encodeURIComponent(error.message)}`);
  }

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (user) {
    const { data: existingProfile } = await supabase
      .from("profiles")
      .select("id, role, onboarding_completed")
      .eq("id", user.id)
      .maybeSingle();

    await supabase.from("profiles").upsert(
      {
        id: user.id,
        email: user.email ?? "",
        full_name: deriveName(user),
        avatar_url:
          typeof user.user_metadata.avatar_url === "string" ? user.user_metadata.avatar_url : null,
        role: existingProfile?.role ?? role
      },
      { onConflict: "id" }
    );

    if (!existingProfile?.onboarding_completed) {
      next = role === "pro" ? "/app/onboarding/pro" : "/app/onboarding/client";
    } else {
      next = getAuthenticatedHome(
        existingProfile
          ? {
              role: existingProfile.role ?? role,
              onboarding_completed: existingProfile.onboarding_completed ?? false
            }
          : null
      );
    }
  }

  return NextResponse.redirect(`${origin}${next}`);
}

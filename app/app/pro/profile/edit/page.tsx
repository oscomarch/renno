import { updateProProfileAction } from "@/app/app/actions";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { requireProAccount } from "@/lib/auth";

export default async function EditProProfilePage({
  searchParams
}: {
  searchParams?: { success?: string; error?: string };
}) {
  const { profile, proProfile } = await requireProAccount();

  return (
    <div className="space-y-8">
      <TopBar title="Edit profile" subtitle="Business details, service area, portfolio, and verification state." />
      <Card className="rounded-[28px]">
        <form action={updateProProfileAction} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={profile.full_name} disabled />
            <Input defaultValue={proProfile.business_name} name="business_name" placeholder="Business name" />
            <Input defaultValue={proProfile.location_city ?? ""} name="location_city" placeholder="City" />
            <Input defaultValue={String(proProfile.hourly_rate ?? "")} name="hourly_rate" placeholder="Hourly rate" />
            <Input
              defaultValue={String(proProfile.years_experience ?? "")}
              name="years_experience"
              placeholder="Years of experience"
            />
            <Input
              defaultValue={(proProfile.trades ?? []).join(", ")}
              name="trades"
              placeholder="Trades (comma separated)"
            />
          </div>
          <Textarea defaultValue={proProfile.bio ?? ""} name="bio" placeholder="Bio" />
          {searchParams?.success ? <p className="text-sm text-sage-700">{searchParams.success}</p> : null}
          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <SubmitButton pendingLabel="Saving profile...">Save changes</SubmitButton>
        </form>
      </Card>
    </div>
  );
}

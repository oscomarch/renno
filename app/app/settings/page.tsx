import { updateSettingsAction } from "@/app/app/actions";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { requireClientAccount } from "@/lib/auth";

export default async function SettingsPage({
  searchParams
}: {
  searchParams?: { success?: string; error?: string };
}) {
  const { profile } = await requireClientAccount();

  return (
    <div className="space-y-8">
      <TopBar title="Settings" subtitle="Account details, notifications, and payment preferences." />
      <Card className="rounded-[28px]">
        <form action={updateSettingsAction} className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <Input defaultValue={profile.full_name} name="full_name" />
            <Input defaultValue={profile.email} disabled />
            <Input defaultValue={profile.phone ?? ""} name="phone" />
            <Input defaultValue={profile.location_city ?? ""} name="location_city" />
            <Input className="md:col-span-2" defaultValue={profile.property_type ?? ""} name="property_type" />
          </div>
          {searchParams?.success ? <p className="text-sm text-sage-700">{searchParams.success}</p> : null}
          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <SubmitButton pendingLabel="Saving settings...">Save changes</SubmitButton>
        </form>
      </Card>
    </div>
  );
}

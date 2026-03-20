import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Settings" subtitle="Account details, notifications, and payment preferences." />
      <Card className="rounded-[28px]">
        <div className="grid gap-4 md:grid-cols-2">
          <Input defaultValue="Olivia Harper" />
          <Input defaultValue="olivia@renno.app" />
          <Input defaultValue="+1 646 555 0132" />
          <Input defaultValue="Brooklyn, NY" />
        </div>
      </Card>
    </div>
  );
}

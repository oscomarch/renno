import { TopBar } from "@/components/app/TopBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function EditProProfilePage() {
  return (
    <div className="space-y-8">
      <TopBar title="Edit profile" subtitle="Business details, service area, portfolio, and verification state." />
      <Card className="rounded-[28px]">
        <div className="grid gap-4 md:grid-cols-2">
          <Input defaultValue="Atelier Mason" placeholder="Business name" />
          <Input defaultValue="Brooklyn, NY" placeholder="City" />
          <Input defaultValue="$118" placeholder="Hourly rate" />
          <Input defaultValue="Renovation, Kitchen, Bathroom" placeholder="Trades" />
        </div>
        <div className="mt-6">
          <Button>Save changes</Button>
        </div>
      </Card>
    </div>
  );
}

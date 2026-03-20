import { TopBar } from "@/components/app/TopBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export default function LeadDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <TopBar title={`Lead ${params.id}`} subtitle="Submit a quote with milestones, cover note, and timeline." />
      <Card className="rounded-[28px]">
        <h2 className="font-serif text-4xl text-brown-800">Quote builder</h2>
        <p className="mt-3 max-w-2xl text-brown-400">
          The production version connects React Hook Form, Zod, and Stripe-backed milestones. This scaffold keeps the
          route and UI shape in place.
        </p>
        <div className="mt-8">
          <Button>Draft quote</Button>
        </div>
      </Card>
    </div>
  );
}

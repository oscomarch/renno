import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";

export default function ProCalendarPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Calendar" subtitle="A scheduling surface for site visits, installs, and handovers." />
      <Card className="rounded-[28px]">
        <div className="grid gap-4 md:grid-cols-7">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <div key={day} className="rounded-[22px] border border-cream-300 bg-cream-50 p-4 text-center">
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{day}</p>
              <p className="mt-3 text-brown-500">Site visit</p>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

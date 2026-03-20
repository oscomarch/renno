import { ProjectCard } from "@/components/app/ProjectCard";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapProjectRow, requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProLeadsPage() {
  const { proProfile } = await requireProAccount();
  const supabase = createClient();

  const { data: projectRows } = await supabase
    .from("projects")
    .select(
      "id, client_id, title, description, category, status, budget_min, budget_max, location_city, urgency, desired_start_date, desired_end_date, created_at, updated_at"
    )
    .in("status", ["open", "matching"])
    .order("updated_at", { ascending: false });

  const projects = (projectRows ?? []).filter((project) => (proProfile.trades ?? []).includes(project.category)).map(mapProjectRow);

  return (
    <div className="space-y-8">
      <TopBar title="Incoming leads" subtitle="Projects that match your trade and service focus." />
      <div className="space-y-5">
        {projects.length ? (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <Card className="rounded-[28px]">
            <h2 className="font-serif text-4xl text-brown-800">No matching leads yet</h2>
            <p className="mt-3 text-brown-400">New homeowner projects in your trades will appear here automatically.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

import { ProjectCard } from "@/components/app/ProjectCard";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapProjectRow, requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProJobsPage() {
  const { user } = await requireProAccount();
  const supabase = createClient();

  const { data: acceptedQuotes } = await supabase.from("quotes").select("project_id").eq("pro_id", user.id).eq("status", "accepted");
  const projectIds = (acceptedQuotes ?? []).map((quote) => quote.project_id);

  const { data: projectRows } = projectIds.length
    ? await supabase
        .from("projects")
        .select(
          "id, client_id, title, description, category, status, budget_min, budget_max, location_city, urgency, desired_start_date, desired_end_date, created_at, updated_at"
        )
        .in("id", projectIds)
    : { data: [] };

  const projects = (projectRows ?? []).map(mapProjectRow);

  return (
    <div className="space-y-8">
      <TopBar title="Active jobs" subtitle="Milestones, client updates, and funding status across every project." />
      <div className="space-y-5">
        {projects.length ? (
          projects.map((project) => <ProjectCard key={project.id} project={project} />)
        ) : (
          <Card className="rounded-[28px]">
            <h2 className="font-serif text-4xl text-brown-800">No active jobs yet</h2>
            <p className="mt-3 text-brown-400">Accepted quotes will turn into live jobs here.</p>
          </Card>
        )}
      </div>
    </div>
  );
}

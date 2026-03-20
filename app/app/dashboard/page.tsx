import Link from "next/link";

import { ProjectCard } from "@/components/app/ProjectCard";
import { TopBar } from "@/components/app/TopBar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { mapProjectRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const { user, profile } = await requireClientAccount();
  const supabase = createClient();

  const { data: projectRows } = await supabase
    .from("projects")
    .select(
      "id, client_id, title, description, category, status, budget_min, budget_max, location_city, urgency, desired_start_date, desired_end_date, created_at, updated_at"
    )
    .eq("client_id", user.id)
    .order("updated_at", { ascending: false });

  const projects = (projectRows ?? []).map(mapProjectRow);
  const activeProjects = projects.filter((project) =>
    ["open", "matching", "in_progress"].includes(project.status)
  );
  const totalBudget = projects.reduce((sum, project) => sum + project.budgetMax, 0);

  return (
    <div className="space-y-8">
      <TopBar
        title={`Welcome back, ${profile.full_name.split(" ")[0]}`}
        subtitle="Keep every quote, milestone, and message in one place."
      />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Active projects", String(activeProjects.length).padStart(2, "0")],
          ["Total projects", String(projects.length).padStart(2, "0")],
          ["Planned budget", `$${totalBudget.toLocaleString()}`]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px]">
            <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{label}</p>
            <p className="mt-4 font-serif text-5xl text-brown-800">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {projects.length ? (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <Card className="rounded-[28px]">
              <h2 className="font-serif text-4xl text-brown-800">No projects yet</h2>
              <p className="mt-3 max-w-lg text-brown-400">
                Start with your first brief and Renno will turn it into a live project workspace with quotes and
                milestone tracking.
              </p>
              <Button className="mt-6" href="/app/projects/new">
                Create your first project
              </Button>
            </Card>
          )}
        </div>

        <Card className="rounded-[28px]">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Account snapshot</p>
          <div className="mt-6 space-y-5">
            <div className="border-b border-cream-300 pb-4 text-brown-500">
              Signed in as <span className="font-medium text-brown-700">{profile.email}</span>
            </div>
            <div className="border-b border-cream-300 pb-4 text-brown-500">
              City: <span className="font-medium text-brown-700">{profile.location_city ?? "Not set yet"}</span>
            </div>
            <div className="text-brown-500">
              <Link className="font-medium text-terracotta-600" href="/app/settings">
                Update your settings
              </Link>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

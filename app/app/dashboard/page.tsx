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
      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Card className="rounded-[28px] bg-brown-800 p-6 text-cream-100 shadow-sm shadow-brown-900/10">
          <p className="text-xs uppercase tracking-[0.18em] text-cream-300">Overview</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight text-white">Everything for your next project, in one calm workspace.</h2>
          <p className="mt-4 max-w-2xl text-sm leading-6 text-cream-200">
            Create briefs, compare quotes, and track progress without bouncing between messages, notes, and invoices.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button href="/app/projects/new">Start a new project</Button>
            <Button
              href="/app/find-pros"
              variant="secondary"
              className="border-brown-600 bg-brown-700 text-cream-100 hover:bg-brown-600"
            >
              Browse pros
            </Button>
          </div>
        </Card>

        <Card className="rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Account snapshot</p>
          <div className="mt-5 space-y-4 text-sm text-brown-500">
            <div className="rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              Signed in as <span className="font-medium text-brown-700">{profile.email}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <span>City</span>
              <span className="font-medium text-brown-700">{profile.location_city ?? "Not set yet"}</span>
            </div>
            <div className="flex items-center justify-between gap-4 rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <span>Property type</span>
              <span className="font-medium text-brown-700">{profile.property_type ?? "Not set yet"}</span>
            </div>
            <Link className="inline-flex font-medium text-terracotta-600" href="/app/settings">
              Update your settings
            </Link>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          ["Active projects", String(activeProjects.length).padStart(2, "0")],
          ["Total projects", String(projects.length).padStart(2, "0")],
          ["Planned budget", `$${totalBudget.toLocaleString()}`]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px] p-6">
            <p className="text-xs uppercase tracking-[0.18em] text-brown-400">{label}</p>
            <p className="mt-3 font-serif text-4xl text-brown-800">{value}</p>
          </Card>
        ))}
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          <div className="flex items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Projects</p>
              <h2 className="mt-2 font-serif text-3xl text-brown-800">Your workspace</h2>
            </div>
            {projects.length ? (
              <Button href="/app/projects/new" variant="secondary">
                New project
              </Button>
            ) : null}
          </div>
          {projects.length ? (
            projects.map((project) => <ProjectCard key={project.id} project={project} />)
          ) : (
            <Card className="rounded-[28px] p-7">
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

        <Card className="rounded-[28px] p-6">
          <p className="text-xs uppercase tracking-[0.18em] text-brown-400">What to do next</p>
          <div className="mt-5 space-y-3">
            <div className="rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <p className="font-medium text-brown-800">Need fresh quotes?</p>
              <p className="mt-1 text-sm text-brown-500">Post a brief with clear scope and budget guardrails.</p>
            </div>
            <div className="rounded-2xl border border-cream-300 bg-cream-50/60 p-4">
              <p className="font-medium text-brown-800">Want to browse first?</p>
              <p className="mt-1 text-sm text-brown-500">Explore verified pros by trade before starting a project.</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Button href="/app/projects/new">Create a brief</Button>
            <Button href="/app/find-pros" variant="secondary">
              Find pros
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

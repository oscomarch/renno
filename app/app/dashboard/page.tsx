import { TopBar } from "@/components/app/TopBar";
import { ProjectCard } from "@/components/app/ProjectCard";
import { Card } from "@/components/ui/Card";
import { demoProjects } from "@/lib/data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Dashboard" subtitle="Keep every quote, milestone, and message in one place." />
      <div className="grid gap-5 lg:grid-cols-3">
        {[
          ["Active projects", "03"],
          ["Messages this week", "18"],
          ["Funds protected", "$24.8K"]
        ].map(([label, value]) => (
          <Card key={label} className="rounded-[28px]">
            <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{label}</p>
            <p className="mt-4 font-serif text-5xl text-brown-800">{value}</p>
          </Card>
        ))}
      </div>
      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-5">
          {demoProjects.slice(0, 3).map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <Card className="rounded-[28px]">
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Recent activity</p>
          <div className="mt-6 space-y-5">
            {[
              "Bathroom remodel received a second quote",
              "Milestone 2 was funded for Kitchen renovation",
              "Volt Works completed panel upgrade"
            ].map((item) => (
              <div key={item} className="border-b border-cream-300 pb-4 text-brown-500 last:border-b-0 last:pb-0">
                {item}
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

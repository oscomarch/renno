import { ProjectCard } from "@/components/app/ProjectCard";
import { TopBar } from "@/components/app/TopBar";
import { demoProjects } from "@/lib/data";

export default function ProJobsPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Active jobs" subtitle="Milestones, client updates, and funding status across every project." />
      <div className="space-y-5">
        {demoProjects.filter((project) => project.status === "in_progress").map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

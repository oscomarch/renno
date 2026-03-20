import { ProjectCard } from "@/components/app/ProjectCard";
import { TopBar } from "@/components/app/TopBar";
import { demoProjects } from "@/lib/data";

export default function ProLeadsPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Incoming leads" subtitle="Projects that match your trade, service radius, and verification." />
      <div className="space-y-5">
        {demoProjects.filter((project) => project.status === "open" || project.status === "matching").map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

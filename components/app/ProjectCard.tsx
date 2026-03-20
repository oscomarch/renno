import Link from "next/link";

import { StatusBadge } from "@/components/app/StatusBadge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { Project } from "@/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="rounded-[28px] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{project.category}</p>
          <h3 className="mt-3 font-serif text-3xl text-brown-800">{project.title}</h3>
        </div>
        <StatusBadge status={project.status} />
      </div>
      <p className="mt-4 text-brown-400">{project.description}</p>
      <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-brown-500">
        <span>{project.locationCity}</span>
        <span>
          {formatCurrency(project.budgetMin)} - {formatCurrency(project.budgetMax)}
        </span>
        <span>Updated {project.updatedAt}</span>
      </div>
      <Link className="mt-6 inline-flex text-sm font-medium text-terracotta-600" href={`/app/projects/${project.id}`}>
        Open project
      </Link>
    </Card>
  );
}

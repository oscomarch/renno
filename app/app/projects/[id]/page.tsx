import { notFound } from "next/navigation";

import { ChatInterface } from "@/components/app/ChatInterface";
import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { StatusBadge } from "@/components/app/StatusBadge";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { demoMessages, demoMilestones, demoProjects } from "@/lib/data";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = demoProjects.find((entry) => entry.id === params.id);
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <TopBar title={project.title} subtitle={project.description} />
      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card className="rounded-[28px]">
          <div className="flex items-center justify-between gap-4">
            <p className="font-serif text-4xl text-brown-800">Overview</p>
            <StatusBadge status={project.status} />
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Budget</p>
              <p className="mt-2 text-lg text-brown-700">
                ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Location</p>
              <p className="mt-2 text-lg text-brown-700">{project.locationCity}</p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Timeline</p>
              <p className="mt-2 text-lg text-brown-700">
                {project.desiredStartDate} to {project.desiredEndDate}
              </p>
            </div>
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Urgency</p>
              <p className="mt-2 text-lg capitalize text-brown-700">{project.urgency}</p>
            </div>
          </div>
        </Card>
        <ChatInterface messages={demoMessages.filter((message) => message.projectId === project.id)} />
      </div>
      <MilestoneTracker milestones={demoMilestones.filter((milestone) => milestone.projectId === project.id)} />
    </div>
  );
}

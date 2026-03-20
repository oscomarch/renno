import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { TopBar } from "@/components/app/TopBar";
import { demoMilestones } from "@/lib/data";

export default function ProjectMilestonesPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <TopBar title="Milestones" subtitle="Escrow-backed payment releases and completion tracking." />
      <MilestoneTracker milestones={demoMilestones.filter((milestone) => milestone.projectId === params.id)} />
    </div>
  );
}

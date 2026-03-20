import { ChatInterface } from "@/components/app/ChatInterface";
import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { TopBar } from "@/components/app/TopBar";
import { demoMessages, demoMilestones } from "@/lib/data";

export default function ProJobDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <TopBar title="Job detail" subtitle="Shared project hub for updates, escrow, and completion proof." />
      <MilestoneTracker milestones={demoMilestones.filter((milestone) => milestone.projectId === params.id)} />
      <ChatInterface messages={demoMessages.filter((message) => message.projectId === params.id)} />
    </div>
  );
}

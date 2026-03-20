import { ChatInterface } from "@/components/app/ChatInterface";
import { TopBar } from "@/components/app/TopBar";
import { demoMessages } from "@/lib/data";

export default function ProjectMessagesPage({ params }: { params: { id: string } }) {
  return (
    <div className="space-y-8">
      <TopBar title="Messages" subtitle="Realtime chat, uploads, and system notifications per project." />
      <ChatInterface messages={demoMessages.filter((message) => message.projectId === params.id)} />
    </div>
  );
}

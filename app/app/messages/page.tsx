import { ChatInterface } from "@/components/app/ChatInterface";
import { TopBar } from "@/components/app/TopBar";
import { demoMessages } from "@/lib/data";

export default function MessagesIndexPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Messages" subtitle="All project conversations, system updates, and unread states." />
      <ChatInterface messages={demoMessages} />
    </div>
  );
}

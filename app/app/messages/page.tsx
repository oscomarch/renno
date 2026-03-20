import { ChatInterface } from "@/components/app/ChatInterface";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapMessageRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function MessagesIndexPage() {
  const { user } = await requireClientAccount();
  const supabase = createClient();

  const { data: projects } = await supabase.from("projects").select("id").eq("client_id", user.id);
  const projectIds = (projects ?? []).map((project) => project.id);

  let messageRows:
    | Array<{ id: string; project_id: string; sender_id: string; content: string; created_at: string }>
    | null = [];

  if (projectIds.length) {
    const { data } = await supabase
      .from("messages")
      .select("id, project_id, sender_id, content, created_at")
      .in("project_id", projectIds)
      .order("created_at", { ascending: true });

    messageRows = data;
  }

  const messages = (messageRows ?? []).map((message) => mapMessageRow(message, user.id));

  return (
    <div className="space-y-8">
      <TopBar title="Messages" subtitle="All project conversations, system updates, and unread states." />
      {messages.length ? (
        <ChatInterface messages={messages} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No messages yet</h2>
          <p className="mt-3 text-brown-400">Once a project is underway, your conversation history will appear here.</p>
        </Card>
      )}
    </div>
  );
}

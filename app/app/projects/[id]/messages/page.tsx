import { ChatInterface } from "@/components/app/ChatInterface";
import { TopBar } from "@/components/app/TopBar";
import { mapMessageRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectMessagesPage({ params }: { params: { id: string } }) {
  const { user } = await requireClientAccount();
  const supabase = createClient();

  const { data: messageRows } = await supabase
    .from("messages")
    .select("id, project_id, sender_id, content, created_at")
    .eq("project_id", params.id)
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-8">
      <TopBar title="Messages" subtitle="Realtime chat, uploads, and system notifications per project." />
      <ChatInterface messages={(messageRows ?? []).map((message) => mapMessageRow(message, user.id))} />
    </div>
  );
}

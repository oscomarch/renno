import { ChatInterface } from "@/components/app/ChatInterface";
import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapMessageRow, mapMilestoneRow, requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProJobDetailPage({ params }: { params: { id: string } }) {
  const { user } = await requireProAccount();
  const supabase = createClient();

  const { data: milestoneRows } = await supabase
    .from("milestones")
    .select("id, project_id, title, amount, status, due_date, order_index")
    .eq("project_id", params.id)
    .order("order_index", { ascending: true });

  const { data: messageRows } = await supabase
    .from("messages")
    .select("id, project_id, sender_id, content, created_at")
    .eq("project_id", params.id)
    .order("created_at", { ascending: true });

  return (
    <div className="space-y-8">
      <TopBar title="Job detail" subtitle="Shared project hub for updates, escrow, and completion proof." />
      {(milestoneRows ?? []).length ? (
        <MilestoneTracker milestones={(milestoneRows ?? []).map(mapMilestoneRow)} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No milestones yet</h2>
        </Card>
      )}
      <ChatInterface messages={(messageRows ?? []).map((message) => mapMessageRow(message, user.id))} />
    </div>
  );
}

import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { mapMilestoneRow, requireClientAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProjectMilestonesPage({ params }: { params: { id: string } }) {
  await requireClientAccount();
  const supabase = createClient();

  const { data: milestoneRows } = await supabase
    .from("milestones")
    .select("id, project_id, title, amount, status, due_date, order_index")
    .eq("project_id", params.id)
    .order("order_index", { ascending: true });

  const milestones = (milestoneRows ?? []).map(mapMilestoneRow);

  return (
    <div className="space-y-8">
      <TopBar title="Milestones" subtitle="Escrow-backed payment releases and completion tracking." />
      {milestones.length ? (
        <MilestoneTracker milestones={milestones} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No milestones yet</h2>
          <p className="mt-3 text-brown-400">Milestones appear after a quote is accepted and the build plan is locked in.</p>
        </Card>
      )}
    </div>
  );
}

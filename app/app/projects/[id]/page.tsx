import { notFound } from "next/navigation";

import { createMessageAction } from "@/app/app/actions";
import { ChatInterface } from "@/components/app/ChatInterface";
import { MilestoneTracker } from "@/components/app/MilestoneTracker";
import { StatusBadge } from "@/components/app/StatusBadge";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { createClient } from "@/lib/supabase/server";
import { mapMessageRow, mapMilestoneRow, mapProjectRow, requireClientAccount } from "@/lib/auth";

export default async function ProjectDetailPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { error?: string };
}) {
  const { user } = await requireClientAccount();
  const supabase = createClient();

  const { data: projectRow } = await supabase
    .from("projects")
    .select(
      "id, client_id, title, description, category, status, budget_min, budget_max, location_city, urgency, desired_start_date, desired_end_date, created_at, updated_at"
    )
    .eq("id", params.id)
    .eq("client_id", user.id)
    .maybeSingle();

  if (!projectRow) notFound();

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

  const project = mapProjectRow(projectRow);
  const milestones = (milestoneRows ?? []).map(mapMilestoneRow);
  const messages = (messageRows ?? []).map((message) => mapMessageRow(message, user.id));

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

        <div className="space-y-4">
          <ChatInterface messages={messages} />
          <Card className="rounded-[28px]">
            <form action={createMessageAction} className="space-y-4">
              <input name="project_id" type="hidden" value={project.id} />
              <Input name="content" placeholder="Send an update or question..." />
              {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
              <SubmitButton pendingLabel="Sending...">Send message</SubmitButton>
            </form>
          </Card>
        </div>
      </div>

      {milestones.length ? (
        <MilestoneTracker milestones={milestones} />
      ) : (
        <Card className="rounded-[28px]">
          <h2 className="font-serif text-4xl text-brown-800">No milestones yet</h2>
          <p className="mt-3 text-brown-400">Milestones will appear here after you accept a pro&apos;s quote.</p>
        </Card>
      )}
    </div>
  );
}

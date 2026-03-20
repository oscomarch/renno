import { notFound } from "next/navigation";

import { createQuoteAction } from "@/app/app/actions";
import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { mapProjectRow, requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function LeadDetailPage({
  params,
  searchParams
}: {
  params: { id: string };
  searchParams?: { error?: string };
}) {
  await requireProAccount();
  const supabase = createClient();

  const { data: projectRow } = await supabase
    .from("projects")
    .select(
      "id, client_id, title, description, category, status, budget_min, budget_max, location_city, urgency, desired_start_date, desired_end_date, created_at, updated_at"
    )
    .eq("id", params.id)
    .maybeSingle();

  if (!projectRow) notFound();
  const project = mapProjectRow(projectRow);

  return (
    <div className="space-y-8">
      <TopBar title={project.title} subtitle="Submit a quote with staged pricing and a clear timeline." />
      <Card className="rounded-[28px]">
        <p className="text-sm uppercase tracking-[0.16em] text-brown-400">{project.category}</p>
        <p className="mt-4 text-brown-500">{project.description}</p>
        <p className="mt-4 text-sm text-brown-400">
          Budget range: ${project.budgetMin.toLocaleString()} - ${project.budgetMax.toLocaleString()}
        </p>
      </Card>
      <Card className="rounded-[28px]">
        <h2 className="font-serif text-4xl text-brown-800">Quote builder</h2>
        <form action={createQuoteAction} className="mt-8 space-y-6">
          <input name="project_id" type="hidden" value={project.id} />
          <div className="grid gap-4 md:grid-cols-2">
            <Input min="0" name="total_amount" placeholder="Total quote amount" required type="number" />
            <Input min="1" name="estimated_duration_days" placeholder="Estimated duration (days)" type="number" />
          </div>
          <Textarea name="message" placeholder="Explain your approach, team, and timing." />
          <div className="grid gap-4 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <div key={index} className="rounded-2xl border border-cream-300 bg-cream-50 p-4">
                <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Milestone {index}</p>
                <Input className="mt-3" name={`breakdown_label_${index}`} placeholder="Title" />
                <Input className="mt-3" min="0" name={`breakdown_amount_${index}`} placeholder="Amount" type="number" />
              </div>
            ))}
          </div>
          {searchParams?.error ? <p className="text-sm text-red-600">{searchParams.error}</p> : null}
          <SubmitButton pendingLabel="Submitting quote...">Submit quote</SubmitButton>
        </form>
      </Card>
    </div>
  );
}

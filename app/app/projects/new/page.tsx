import { createProjectAction } from "@/app/app/actions";
import { ProjectCategoryPicker } from "@/components/app/ProjectCategoryPicker";
import { TopBar } from "@/components/app/TopBar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { Textarea } from "@/components/ui/Textarea";
import { requireClientAccount } from "@/lib/auth";
import { TRADE_CATEGORIES } from "@/lib/constants";

const steps = ["Category", "Details", "Photos", "Location", "Timeline & budget", "Review"];

export default async function NewProjectPage({
  searchParams
}: {
  searchParams?: { error?: string };
}) {
  await requireClientAccount();

  return (
    <div className="space-y-8">
      <TopBar title="Create a project" subtitle="A practical intake form for scope, budget, location, and urgency." />
      <form action={createProjectAction}>
        <Card className="rounded-[28px] p-5 sm:p-7">
          <div className="flex flex-wrap items-center gap-3">
            {steps.map((step, index) => (
              <Badge
                key={step}
                className={index === 0 ? "border-terracotta-200 bg-terracotta-50 text-terracotta-700" : undefined}
              >
                {index + 1}. {step}
              </Badge>
            ))}
            <p className="text-sm text-brown-400 sm:ml-auto">One clear brief now saves hours later.</p>
          </div>

          <div className="mt-8">
            <ProjectCategoryPicker categories={TRADE_CATEGORIES} />
          </div>

          <div className="mt-10 grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-4">
              <div className="rounded-[24px] border border-cream-300 bg-cream-50/60 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Project details</p>
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  <div className="md:col-span-2">
                    <Input name="title" placeholder="Project title" required />
                  </div>
                  <Input name="location_city" placeholder="City" required />
                  <div>
                    <label className="mb-2 block text-sm uppercase tracking-[0.16em] text-brown-400">Urgency</label>
                    <select
                      className="w-full rounded-xl border border-cream-300 bg-white px-4 py-3 text-sm text-brown-800 outline-none focus:border-transparent focus:ring-2 focus:ring-terracotta-500"
                      defaultValue="normal"
                      name="urgency"
                    >
                      <option value="flexible">Flexible</option>
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                      <option value="emergency">Emergency</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <Textarea
                      name="description"
                      placeholder="Describe the project scope, materials, constraints, and goals."
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="rounded-[24px] border border-cream-300 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Photos</p>
                <p className="mt-3 text-sm leading-6 text-brown-500">
                  Photo uploads are next on the product roadmap. For now, mention materials, room size, and any
                  important constraints in the description so pros can quote accurately.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[24px] border border-cream-300 bg-white p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Budget and timing</p>
                <div className="mt-4 grid gap-4">
                  <Input min="0" name="budget_min" placeholder="Minimum budget" required type="number" />
                  <Input min="0" name="budget_max" placeholder="Maximum budget" required type="number" />
                  <Input name="desired_start_date" type="date" />
                  <Input name="desired_end_date" type="date" />
                </div>
              </div>

              <div className="rounded-[24px] border border-brown-700 bg-brown-800 p-5 text-cream-100">
                <p className="text-xs uppercase tracking-[0.18em] text-cream-300">Before you submit</p>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-cream-200">
                  <li>Be specific about the room, size, and finish level you want.</li>
                  <li>Add budget guardrails so quotes stay realistic.</li>
                  <li>Use timing to signal whether this is urgent or flexible.</li>
                </ul>
              </div>
            </div>
          </div>

          {searchParams?.error ? <p className="mt-6 text-sm text-red-600">{searchParams.error}</p> : null}

          <div className="mt-8 flex justify-end">
            <SubmitButton pendingLabel="Creating project...">Create project</SubmitButton>
          </div>
        </Card>
      </form>
    </div>
  );
}

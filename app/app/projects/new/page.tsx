import { createProjectAction } from "@/app/app/actions";
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
        <Card className="rounded-[28px]">
          <div className="flex flex-wrap gap-3">
            {steps.map((step, index) => (
              <Badge key={step} className={index === 0 ? "bg-terracotta-50 text-terracotta-700" : undefined}>
                {index + 1}. {step}
              </Badge>
            ))}
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {TRADE_CATEGORIES.map((category) => (
              <label
                key={category.id}
                className="rounded-[24px] border border-cream-300 bg-cream-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-terracotta-300 hover:bg-white"
              >
                <input
                  className="sr-only"
                  defaultChecked={category.id === "renovation"}
                  name="category"
                  type="radio"
                  value={category.label}
                />
                <p className="font-mono text-xs uppercase tracking-[0.16em] text-brown-400">{category.tag}</p>
                <h3 className="mt-4 font-serif text-3xl text-brown-800">{category.label}</h3>
                <p className="mt-3 text-sm text-brown-400">Choose this to tailor the rest of the project brief.</p>
              </label>
            ))}
          </div>

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            <Input name="title" placeholder="Project title" required />
            <Input name="location_city" placeholder="City" required />
            <Input min="0" name="budget_min" placeholder="Minimum budget" required type="number" />
            <Input min="0" name="budget_max" placeholder="Maximum budget" required type="number" />
            <Input name="desired_start_date" type="date" />
            <Input name="desired_end_date" type="date" />
            <div className="md:col-span-2">
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

          {searchParams?.error ? <p className="mt-6 text-sm text-red-600">{searchParams.error}</p> : null}

          <div className="mt-8 flex justify-end">
            <SubmitButton pendingLabel="Creating project...">Create project</SubmitButton>
          </div>
        </Card>
      </form>
    </div>
  );
}

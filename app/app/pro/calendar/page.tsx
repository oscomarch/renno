import { TopBar } from "@/components/app/TopBar";
import { Card } from "@/components/ui/Card";
import { requireProAccount } from "@/lib/auth";
import { createClient } from "@/lib/supabase/server";

export default async function ProCalendarPage() {
  const { user } = await requireProAccount();
  const supabase = createClient();

  const { data: quotes } = await supabase.from("quotes").select("project_id").eq("pro_id", user.id).eq("status", "accepted");
  const projectIds = (quotes ?? []).map((quote) => quote.project_id);
  const { data: projects } = projectIds.length
    ? await supabase.from("projects").select("title, desired_start_date, desired_end_date").in("id", projectIds)
    : { data: [] };

  return (
    <div className="space-y-8">
      <TopBar title="Calendar" subtitle="Upcoming project windows across your accepted jobs." />
      <Card className="rounded-[28px]">
        {(projects ?? []).length ? (
          <div className="space-y-4">
            {(projects ?? []).map((project) => (
              <div key={project.title} className="rounded-[22px] border border-cream-300 bg-cream-50 p-4">
                <p className="font-serif text-2xl text-brown-800">{project.title}</p>
                <p className="mt-2 text-brown-500">
                  {project.desired_start_date ?? "TBD"} to {project.desired_end_date ?? "TBD"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-brown-400">Accepted jobs will appear here with their target dates.</p>
        )}
      </Card>
    </div>
  );
}

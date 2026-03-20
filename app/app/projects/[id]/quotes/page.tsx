import { notFound } from "next/navigation";

import { QuoteComparison } from "@/components/app/QuoteComparison";
import { TopBar } from "@/components/app/TopBar";
import { demoProjects, demoQuotes } from "@/lib/data";

export default function ProjectQuotesPage({ params }: { params: { id: string } }) {
  const project = demoProjects.find((entry) => entry.id === params.id);
  if (!project) notFound();

  return (
    <div className="space-y-8">
      <TopBar title="Compare quotes" subtitle={`Transparent pricing for ${project.title}.`} />
      <QuoteComparison quotes={demoQuotes.filter((quote) => quote.projectId === project.id)} />
    </div>
  );
}

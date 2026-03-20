import { StatusBadge } from "@/components/app/StatusBadge";
import { Card } from "@/components/ui/Card";
import { formatCurrency } from "@/lib/utils";
import type { Milestone } from "@/types";

export function MilestoneTracker({ milestones }: { milestones: Milestone[] }) {
  return (
    <div className="space-y-4">
      {milestones.map((milestone, index) => (
        <Card key={milestone.id} className="rounded-[28px]">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.16em] text-brown-400">Milestone {index + 1}</p>
              <h3 className="mt-2 font-serif text-3xl text-brown-800">{milestone.title}</h3>
              <p className="mt-2 text-sm text-brown-400">Due {milestone.dueDate}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-brown-400">Amount</p>
                <p className="font-medium text-brown-700">{formatCurrency(milestone.amount)}</p>
              </div>
              <StatusBadge status={milestone.status} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}

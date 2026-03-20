import { MILESTONE_STATUSES, PROJECT_STATUSES } from "@/lib/constants";
import { cn } from "@/lib/utils";

const palette: Record<string, string> = {
  brown: "bg-brown-50 text-brown-600",
  terracotta: "bg-terracotta-50 text-terracotta-700",
  sage: "bg-sage-50 text-sage-700",
  red: "bg-red-50 text-red-700"
};

export function StatusBadge({ status }: { status: string }) {
  const config =
    PROJECT_STATUSES[status as keyof typeof PROJECT_STATUSES] ||
    MILESTONE_STATUSES[status as keyof typeof MILESTONE_STATUSES];

  return (
    <span className={cn("rounded-full px-3 py-1 text-xs font-medium", palette[config?.color ?? "brown"])}>
      {config?.label ?? status}
    </span>
  );
}

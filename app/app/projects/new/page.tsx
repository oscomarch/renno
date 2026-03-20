import { ArrowRight } from "lucide-react";

import { TopBar } from "@/components/app/TopBar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { TRADE_CATEGORIES } from "@/lib/constants";

const steps = ["Category", "Details", "Photos", "Location", "Timeline & budget", "Review"];

export default function NewProjectPage() {
  return (
    <div className="space-y-8">
      <TopBar title="Create a project" subtitle="A six-step wizard for scoping, budget, photos, and launch." />
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
            <button
              key={category.id}
              className="rounded-[24px] border border-cream-300 bg-cream-50 p-5 text-left transition-all hover:-translate-y-0.5 hover:border-terracotta-300 hover:bg-white"
            >
              <p className="font-mono text-xs uppercase tracking-[0.16em] text-brown-400">{category.tag}</p>
              <h3 className="mt-4 font-serif text-3xl text-brown-800">{category.label}</h3>
              <p className="mt-3 text-sm text-brown-400">Choose this to tailor structured intake questions.</p>
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <Button className="gap-2">
            Continue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

"use client";

import {
  Building2,
  Check,
  DoorOpen,
  Grid3x3,
  Hammer,
  Home,
  Layers,
  Paintbrush,
  Thermometer,
  TreePine,
  Wrench,
  Zap
} from "lucide-react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type Category = {
  id: string;
  label: string;
  icon: string;
  tag: string;
};

const icons = {
  Wrench,
  Zap,
  Paintbrush,
  Hammer,
  Home,
  Grid3x3,
  Building2,
  Brick: Building2,
  Thermometer,
  TreePine,
  Layers,
  DoorOpen
} as const;

export function ProjectCategoryPicker({
  categories,
  defaultCategoryId = "renovation"
}: {
  categories: readonly Category[];
  defaultCategoryId?: string;
}) {
  const initialCategory = useMemo(
    () => categories.find((category) => category.id === defaultCategoryId) ?? categories[0],
    [categories, defaultCategoryId]
  );
  const [selectedId, setSelectedId] = useState(initialCategory?.id ?? "");
  const selectedCategory = categories.find((category) => category.id === selectedId) ?? initialCategory;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 rounded-[24px] border border-cream-300 bg-cream-50/70 p-5 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-brown-400">Selected trade</p>
          <div className="mt-2 flex items-center gap-3">
            {selectedCategory ? (
              <>
                {(() => {
                  const Icon = icons[selectedCategory.icon as keyof typeof icons] ?? Building2;
                  return <Icon className="h-5 w-5 text-terracotta-500" />;
                })()}
                <p className="font-serif text-3xl text-brown-800">{selectedCategory.label}</p>
              </>
            ) : null}
          </div>
        </div>
        <p className="max-w-sm text-sm text-brown-500">
          Pick the trade that best fits the main scope. We'll use it to keep the rest of the brief relevant and easier
          to review.
        </p>
      </div>

      <input name="category" type="hidden" value={selectedCategory?.label ?? ""} />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const selected = category.id === selectedId;
          const Icon = icons[category.icon as keyof typeof icons] ?? Building2;

          return (
            <button
              key={category.id}
              aria-pressed={selected}
              className={cn(
                "group relative rounded-[24px] border bg-white p-5 text-left transition-all duration-200",
                selected
                  ? "border-terracotta-400 bg-terracotta-50/40 shadow-sm shadow-terracotta-500/10"
                  : "border-cream-300 hover:-translate-y-0.5 hover:border-terracotta-200 hover:shadow-sm"
              )}
              onClick={() => setSelectedId(category.id)}
              type="button"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl border border-cream-300 bg-cream-50 p-3 text-brown-600 transition-colors group-hover:border-terracotta-200 group-hover:text-terracotta-600">
                  <Icon className="h-5 w-5" />
                </div>
                <span
                  className={cn(
                    "inline-flex h-7 w-7 items-center justify-center rounded-full border text-brown-400 transition-all",
                    selected ? "border-terracotta-400 bg-terracotta-500 text-white" : "border-cream-300 bg-white"
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>
              </div>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.18em] text-brown-400">{category.tag}</p>
              <h3 className="mt-3 font-serif text-3xl leading-tight text-brown-800">{category.label}</h3>
              <p className="mt-3 text-sm leading-6 text-brown-500">
                Choose this to tailor the rest of the brief and keep the matching focused.
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { ArrowRight, BriefcaseBusiness, GraduationCap, HeartPulse, Laptop, Palette, Shirt, Users } from "lucide-react";
import type { CareerPath } from "@/types/content";
import { cn } from "@/lib/utils";

const icons = { Laptop, HeartPulse, Shirt, GraduationCap, BriefcaseBusiness, Palette, Users };

export function CareerExplorer({ paths }: { paths: CareerPath[] }) {
  const [activeId, setActiveId] = useState(paths[0]?.id);
  const active = paths.find((path) => path.id === activeId) ?? paths[0];
  return <div className="mt-10">
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {paths.map((path) => {
        const Icon = icons[path.icon];
        const selected = path.id === activeId;
        return <button key={path.id} onClick={() => setActiveId(path.id)} className={cn("group rounded-3xl border p-5 text-left transition duration-300", selected ? "border-brand-600 bg-brand-600 text-white shadow-soft" : "border-slate-100 bg-white hover:-translate-y-1 hover:border-brand-200 hover:shadow-card")}>
          <span className={cn("grid size-11 place-items-center rounded-2xl", selected ? "bg-white/15" : "bg-brand-50 text-brand-600")}><Icon className="size-5" /></span>
          <h3 className="mt-5 font-display text-lg font-bold">{path.title}</h3>
          <p className={cn("mt-2 text-sm leading-6", selected ? "text-brand-100" : "text-slate-500")}>{path.description}</p>
        </button>;
      })}
    </div>
    {active && <div className="mt-5 flex flex-col gap-4 rounded-3xl bg-ink p-6 text-white sm:flex-row sm:items-center sm:justify-between sm:p-8">
      <div><p className="text-xs font-bold uppercase tracking-[0.15em] text-warmth">A good place to start</p><h3 className="mt-2 font-display text-2xl font-bold">Explore {active.title}</h3><p className="mt-2 text-sm text-slate-300">Suggested paths: {active.courses.join(" · ")}</p></div>
      <a href={`/#courses?category=${encodeURIComponent(active.title)}`} className="inline-flex shrink-0 items-center gap-2 text-sm font-bold text-white hover:text-brand-100">View suggested courses <ArrowRight className="size-4" /></a>
    </div>}
  </div>;
}

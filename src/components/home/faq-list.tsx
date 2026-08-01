"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { FAQ } from "@/types/content";

export function FAQList({ faqs }: { faqs: FAQ[] }) {
  return <Accordion.Root type="single" collapsible className="mx-auto mt-10 max-w-3xl rounded-3xl border border-slate-100 bg-white px-6 shadow-card">
    {faqs.map((faq, index) => <Accordion.Item key={faq.question} value={`faq-${index}`} className="border-b border-slate-100 last:border-0">
      <Accordion.Header><Accordion.Trigger className="group flex w-full items-center justify-between gap-6 py-6 text-left font-display text-base font-bold text-ink"><span>{faq.question}</span><ChevronDown className="size-5 shrink-0 text-brand-600 transition group-data-[state=open]:rotate-180" /></Accordion.Trigger></Accordion.Header>
      <Accordion.Content className="overflow-hidden pb-6 text-sm leading-7 text-slate-600 data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">{faq.answer}</Accordion.Content>
    </Accordion.Item>)}
  </Accordion.Root>;
}

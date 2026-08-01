"use client";

import Link from "next/link";
import Image from "next/image";
import { Menu, MessageCircle, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { siteService } from "@/services/site.service";

const links = [
  { href: "/#about", label: "About" },
  { href: "/courses", label: "Courses" },
  { href: "/#life-at-zahara", label: "Life at Zahara" },
  { href: "/admissions", label: "Admissions" },
  { href: "/#contact", label: "Contact" }
];

export function Header() {
  const [open, setOpen] = useState(false);
  const whatsAppUrl = siteService.getWhatsAppUrl();
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-lg">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Zahara College home">
          <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-white"><Image src="/images/zahara-logo.png" alt="Zahara Education and Charitable Trust" width={40} height={40} /></span>
          <span className="leading-tight">
            <span className="block font-display text-lg font-bold tracking-tight text-ink">Zahara</span>
            <span className="block text-[10px] font-bold uppercase tracking-[0.13em] text-brand-600">College of Skills</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary navigation">
          {links.map((link) => <Link key={link.href} href={link.href} className="text-sm font-medium text-slate-600 transition hover:text-brand-700">{link.label}</Link>)}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button variant="ghost" size="sm" asChild><a href={whatsAppUrl} target="_blank" rel="noreferrer"><MessageCircle className="size-4" /> WhatsApp</a></Button>
          <Button size="sm" asChild><a href="/admissions">Start Your Journey</a></Button>
        </div>
        <button onClick={() => setOpen(!open)} className="grid size-10 place-items-center rounded-xl text-ink hover:bg-brand-50 lg:hidden" aria-label="Toggle navigation" aria-expanded={open}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && <nav className="border-t border-slate-100 bg-white px-5 py-4 lg:hidden" aria-label="Mobile navigation">
        <div className="mx-auto grid max-w-7xl gap-1">
          {links.map((link) => <Link onClick={() => setOpen(false)} key={link.href} href={link.href} className="rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-brand-50">{link.label}</Link>)}
          <Button className="mt-3" asChild><a onClick={() => setOpen(false)} href="/admissions">Start Your Journey</a></Button>
        </div>
      </nav>}
    </header>
  );
}

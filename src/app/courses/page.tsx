import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeService } from "@/services/home.service";

export const metadata: Metadata = {
  title: "Explore Courses | Zahara College of Skills",
  description: "Explore career-focused vocational programmes at Zahara College of Skills."
};

export default function CoursesPage() {
  const courses = homeService.getCourses();
  return <main>
    <section className="bg-brand-50 px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto max-w-7xl"><p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-700">Zahara College of Skills</p><h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Explore skills that can shape your future.</h1><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Browse our career-focused programmes and find a path that matches your interests.</p></div></section>
    <section className="px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto max-w-7xl"><SectionHeading align="left" eyebrow="Programmes" title="Choose a direction that feels right for you." /><div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{courses.map((course) => <article key={course.slug} className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition hover:-translate-y-1"><div className="relative aspect-[16/10] overflow-hidden"><Image src={course.image} alt="" fill className="object-cover transition duration-500 group-hover:scale-105" sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" /></div><div className="p-6"><p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">{course.category} · {course.duration}</p><h2 className="mt-3 font-display text-2xl font-bold text-ink">{course.title}</h2><p className="mt-3 text-sm leading-6 text-slate-600">{course.description}</p><Link href={`/courses/${course.slug}`} className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900">Explore this course <ArrowRight className="size-4" /></Link></div></article>)}</div></div></section>
  </main>;
}

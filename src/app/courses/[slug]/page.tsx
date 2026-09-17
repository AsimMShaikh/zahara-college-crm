import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, CheckCircle2, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeService } from "@/services/home.service";
import { siteService } from "@/services/site.service";

type CoursePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return homeService.getCourses().map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: CoursePageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = homeService.getCourseBySlug(slug);
  if (!course) return {};
  return { title: `${course.title} | Zahara College of Skills`, description: course.description };
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = homeService.getCourseBySlug(slug);
  if (!course) notFound();
  const whatsAppUrl = siteService.getWhatsAppUrl();
  const highlights = [
    "A practical, career-oriented learning experience",
    "Guidance in a supportive women-focused environment",
    "A clear foundation for your next step"
  ];
  return <main>
    <section className="bg-brand-50 px-5 py-10 lg:px-8"><div className="mx-auto max-w-7xl"><Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900"><ArrowLeft className="size-4" /> All courses</Link></div></section>
    <section className="px-5 pb-16 pt-8 sm:pb-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_.9fr] lg:items-center"><div><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-600">{course.category}</p><h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">{course.title}</h1>{course.tagline && <p className="mt-3 text-lg font-semibold text-brand-700">{course.tagline}</p>}<p className="mt-5 max-w-xl text-lg leading-8 text-slate-600">{course.description}</p><div className="mt-7 inline-flex items-center gap-3 rounded-2xl bg-mist px-4 py-3 text-sm font-semibold text-ink"><Clock className="size-5 text-brand-600" /> Estimated duration: {course.duration}</div><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Button size="lg" asChild><a href={`/admissions?course=${encodeURIComponent(course.title)}`}>Enquire about this course <ArrowRight className="size-4" /></a></Button><Button size="lg" variant="outline" asChild><a href={whatsAppUrl} target="_blank" rel="noreferrer"><MessageCircle className="size-4" /> Chat on WhatsApp</a></Button></div></div><div className="relative aspect-[4/3] overflow-hidden rounded-4xl shadow-soft"><Image src={course.image} alt={`${course.title} course`} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 45vw" /></div></div></section>
    {course.learningOutcomes && course.learningOutcomes.length > 0 ? (
      <section className="bg-mist px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading align="left" eyebrow="Curriculum" title="What You Will Learn" description={course.curriculumDescription || "This course will equip you with practical skills for your career path."} /><div className="rounded-3xl bg-white p-7 shadow-card"><h2 className="font-display text-xl font-bold text-ink">Learning Outcomes</h2><ul className="mt-6 space-y-4">{course.learningOutcomes.map((outcome) => <li key={outcome} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />{outcome}</li>)}</ul></div></div></section>
    ) : (
      <section className="bg-mist px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><SectionHeading align="left" eyebrow="About this programme" title="Build skills with purpose." description="We will add the full course curriculum, eligibility and career outcomes here once those details are confirmed." /><div className="rounded-3xl bg-white p-7 shadow-card"><h2 className="font-display text-xl font-bold text-ink">What this course can help you build</h2><ul className="mt-6 space-y-4">{highlights.map((highlight) => <li key={highlight} className="flex gap-3 text-sm leading-6 text-slate-600"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-brand-600" />{highlight}</li>)}</ul></div></div></section>
    )}
    <section className="px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto max-w-3xl text-center"><SectionHeading eyebrow="Interested?" title={`Could ${course.title} be your next step?`} description="Speak with the Zahara team to understand the course, admissions process and what to do next." /><Button className="mt-8" size="lg" asChild><a href={`/admissions?course=${encodeURIComponent(course.title)}`}>Start an enquiry <ArrowRight className="size-4" /></a></Button></div></section>
  </main>;
}

import type { Metadata } from "next";
import { Suspense } from "react";
import { MessageCircle, ShieldCheck } from "lucide-react";
import { AdmissionForm } from "@/components/admissions/admission-form";
import { Button } from "@/components/ui/button";
import { siteService } from "@/services/site.service";

export const metadata: Metadata = { title: "Admissions | Zahara College of Skills", description: "Start your Zahara College of Skills admission enquiry." };

export default function AdmissionsPage() {
  return <main><section className="bg-brand-50 px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-[0.14em] text-brand-700">Admissions</p><h1 className="mt-4 font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">Start your journey with Zahara.</h1><p className="mt-5 text-lg leading-8 text-slate-600">Tell us what you would like to learn. Our admissions team will help you find the right next step.</p></div></section><section className="px-5 py-16 sm:py-20 lg:px-8"><div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-start"><aside><h2 className="font-display text-3xl font-bold text-ink">Your enquiry matters.</h2><p className="mt-4 leading-7 text-slate-600">Submitting the form is the best way to begin. It helps our team understand your interests before they contact you.</p><div className="mt-7 flex gap-3 rounded-2xl bg-mist p-4 text-sm leading-6 text-slate-600"><ShieldCheck className="size-5 shrink-0 text-brand-600" />Your details are used only to respond to your admission enquiry and follow up with your permission.</div><p className="mt-7 text-sm font-semibold text-ink">Prefer to ask a quick question?</p><Button variant="outline" className="mt-3" asChild><a href={siteService.getWhatsAppUrl()} target="_blank" rel="noreferrer"><MessageCircle className="size-4" /> Chat on WhatsApp</a></Button></aside><Suspense fallback={<div className="rounded-4xl border border-slate-100 bg-white p-6 shadow-card sm:p-8 h-96" />}><AdmissionForm /></Suspense></div></section></main>;
}

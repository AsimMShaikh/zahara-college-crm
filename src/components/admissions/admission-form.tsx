"use client";

import { type FormEvent, useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const courses = ["Basic Computer", "Fashion Designing", "Nursing", "Tally", "Not sure yet"];

export function AdmissionForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);
    const payload = Object.fromEntries(form.entries());
    const response = await fetch("/api/admissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    if (response.ok) {
      const formElement = event.currentTarget;
      if (formElement) {
        formElement.reset();
      }
      setStatus("success");
      setMessage("Thank you. Our admissions team will contact you soon.");
    } else {
      setStatus("error");
      setMessage("We could not submit your enquiry right now. Please try again or use WhatsApp.");
    }
  }

  return <form onSubmit={submit} className="rounded-4xl border border-slate-100 bg-white p-6 shadow-card sm:p-8">
    <div className="grid gap-5 sm:grid-cols-2">
      <Field label="Full name" name="name" required />
      <Field label="Mobile number" name="phone" type="tel" required />
      <Field label="Email address" name="email" type="email" />
      <label className="grid gap-2 text-sm font-semibold text-ink">Course interested in<select name="course" required defaultValue="" className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-normal text-slate-700 focus:border-brand-500 focus:outline-none"><option value="" disabled>Select a course</option>{courses.map((course) => <option key={course}>{course}</option>)}</select></label>
      <Field label="City" name="city" />
      <Field label="Highest qualification" name="qualification" />
    </div>
    <label className="mt-5 grid gap-2 text-sm font-semibold text-ink">Tell us a little about your goal<textarea name="message" rows={4} className="rounded-xl border border-slate-200 p-3 text-sm font-normal text-slate-700 focus:border-brand-500 focus:outline-none" placeholder="For example: I would like help choosing a course." /></label>
    <input className="hidden" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
    <label className="mt-5 flex gap-3 text-xs leading-5 text-slate-600"><input name="consent" type="checkbox" required className="mt-0.5 size-4 accent-brand-600" />I agree that Zahara College of Skills may contact me about my enquiry by phone, WhatsApp or email.</label>
    <Button className="mt-6 w-full sm:w-auto" size="lg" disabled={status === "sending"}>{status === "sending" ? <><LoaderCircle className="size-4 animate-spin" /> Sending enquiry</> : <><Send className="size-4" /> Submit admission enquiry</>}</Button>
    {message && <p role="status" className={`mt-4 text-sm font-medium ${status === "success" ? "text-emerald-700" : "text-red-600"}`}>{message}</p>}
  </form>;
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <label className="grid gap-2 text-sm font-semibold text-ink">{label}<input name={name} type={type} required={required} className="h-11 rounded-xl border border-slate-200 px-3 text-sm font-normal text-slate-700 focus:border-brand-500 focus:outline-none" /></label>;
}

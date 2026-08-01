import type { Metadata } from "next";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteService } from "@/services/site.service";

export const metadata: Metadata = {
  title: "Contact Us | Zahara College of Skills",
  description: "Get in touch with Zahara College of Skills. Visit our campus, call us, or send a message.",
};

export default function ContactPage() {
  const address = siteService.getAddress();
  const phone = siteService.getPhone();
  const email = siteService.getEmail();
  const whatsAppUrl = siteService.getWhatsAppUrl();
  const mapsUrl = siteService.getGoogleMapsUrl();
  const mapsEmbedUrl = siteService.getGoogleMapsEmbedUrl();

  return (
    <main>
      <section className="bg-brand-50 px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-sm font-bold uppercase tracking-[0.15em] text-brand-700">Contact Us</p>
          <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
            We're here to help you start your journey.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Have questions about our programmes or the admission process? Reach out to us and we'll guide you.
          </p>
        </div>
      </section>

      <section className="px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Information */}
            <div>
              <h2 className="font-display text-3xl font-bold text-ink">Get in touch</h2>
              <p className="mt-4 text-slate-600">
                We're available to answer your questions and help you find the right programme for your goals.
              </p>

              <div className="mt-8 space-y-6">
                {/* Address */}
                <div className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
                    <MapPin className="size-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Visit Our Campus</h3>
                    <a
                      href={mapsUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 block text-sm leading-6 text-slate-600 transition hover:text-brand-700"
                    >
                      {address.line1}<br />
                      {address.line2}<br />
                      {address.city}, {address.state} {address.pincode}
                    </a>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
                    <Phone className="size-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Call Us</h3>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="mt-2 block text-sm text-slate-600 transition hover:text-brand-700"
                    >
                      {phone}
                    </a>
                    <p className="mt-1 text-xs text-slate-500">Monday - Saturday, 9:00 AM - 6:00 PM</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
                    <Mail className="size-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Email Us</h3>
                    <a
                      href={`mailto:${email}`}
                      className="mt-2 block text-sm text-slate-600 transition hover:text-brand-700"
                    >
                      {email}
                    </a>
                    <p className="mt-1 text-xs text-slate-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex gap-4">
                  <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50">
                    <MessageCircle className="size-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-ink">Chat on WhatsApp</h3>
                    <p className="mt-2 text-sm text-slate-600">
                      Quick questions? Message us directly.
                    </p>
                    <Button size="sm" variant="outline" className="mt-3" asChild>
                      <a href={whatsAppUrl} target="_blank" rel="noreferrer">
                        <MessageCircle className="size-4" /> Open WhatsApp
                      </a>
                    </Button>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <Button size="lg" asChild>
                  <a href="/admissions">Start Your Admission Enquiry</a>
                </Button>
              </div>
            </div>

            {/* Map */}
            <div>
              <div className="overflow-hidden rounded-3xl border border-slate-200 bg-slate-100">
                <iframe
                  src={mapsEmbedUrl}
                  width="100%"
                  height="600"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Zahara College of Skills Location"
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

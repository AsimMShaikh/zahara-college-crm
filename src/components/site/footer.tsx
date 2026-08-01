import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Instagram, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { siteService } from "@/services/site.service";

const footerLinks = [
  { label: "About Zahara", href: "/#about" },
  { label: "Explore Courses", href: "/courses" },
  { label: "Admissions", href: "/admissions" },
  { label: "Life at Zahara", href: "/#life-at-zahara" },
  { label: "Contact", href: "/#contact" }
];

export function Footer() {
  const whatsAppUrl = siteService.getWhatsAppUrl();
  const instagramUrl = siteService.getInstagramUrl();
  const phone = siteService.getPhone();
  const email = siteService.getEmail();
  const address = siteService.getAddress();
  const mapsUrl = siteService.getGoogleMapsUrl();

  return (
    <footer id="contact" className="bg-ink text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-[1.2fr_.8fr_.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center overflow-hidden rounded-full bg-white"><Image src="/images/zahara-logo.png" alt="Zahara Education and Charitable Trust" width={40} height={40} /></span>
            <div><p className="font-display text-lg font-bold">Zahara</p><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-brand-100">College of Skills</p></div>
          </div>
          <p className="mt-6 max-w-sm text-base leading-7 text-slate-300">Empowering Women, Building Futures. Practical, affordable vocational education for a confident tomorrow.</p>
          <div className="mt-6 flex gap-3">
            <a className="grid size-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20" href={whatsAppUrl} target="_blank" rel="noreferrer" aria-label="WhatsApp"><MessageCircle className="size-5" /></a>
            <a className="grid size-10 place-items-center rounded-xl bg-white/10 transition hover:bg-white/20" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="size-5" /></a>
          </div>
        </div>
        <div><h3 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-100">Explore</h3><ul className="mt-5 space-y-3">{footerLinks.map((link) => <li key={link.href}><Link className="text-sm text-slate-300 transition hover:text-white" href={link.href}>{link.label}</Link></li>)}</ul></div>
        <div>
          <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-brand-100">Visit & Connect</h3>
          <div className="mt-5 space-y-4">
            <a href={mapsUrl} target="_blank" rel="noreferrer" className="flex gap-3 text-sm leading-6 text-slate-300 transition hover:text-white">
              <MapPin className="mt-0.5 size-4 shrink-0 text-warmth" />
              <span>{address.line1}<br />{address.line2}<br />{address.city}, {address.state} {address.pincode}</span>
            </a>
            <a href={`tel:${phone.replace(/\s/g, '')}`} className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white">
              <Phone className="size-4 shrink-0 text-warmth" />
              <span>{phone}</span>
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white">
              <Mail className="size-4 shrink-0 text-warmth" />
              <span>{email}</span>
            </a>
          </div>
          <Link href="/admissions" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-white hover:text-brand-100">Start an enquiry <ArrowUpRight className="size-4" /></Link>
        </div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8"><p>© {new Date().getFullYear()} Zahara College of Skills.</p><Link href="#" className="hover:text-white">Privacy Policy</Link></div></div>
    </footer>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar, GraduationCap, Heart, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoPlayer } from "@/components/life/video-player";
import { lifeService } from "@/services/life.service";

export const metadata: Metadata = {
  title: "Life at Zahara | Zahara College of Skills",
  description: "Experience campus life at Zahara College of Skills through student testimonials, events, and activities.",
};

export default function LifeAtZaharaPage() {
  const testimonials = lifeService.getTestimonials();
  const events = lifeService.getEvents();

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-brand-50 px-5 py-16 sm:py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-[0.12em] text-brand-700">
            <Sparkles className="size-3.5" /> Life at Zahara
          </p>
          <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-ink sm:text-6xl">
            More than just learning—<br />
            <span className="text-brand-600">a community that feels like home.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
            At Zahara, you'll find a supportive environment where every woman is valued, encouraged, and given the space to grow with confidence.
          </p>
          <div className="mt-10 flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600">
                <Users className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-ink">500+</p>
                <p className="text-sm text-slate-600">Students</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600">
                <GraduationCap className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-ink">10+</p>
                <p className="text-sm text-slate-600">Courses</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="grid size-12 place-items-center rounded-2xl bg-white text-brand-600">
                <Heart className="size-6" />
              </span>
              <div>
                <p className="text-2xl font-bold text-ink">100%</p>
                <p className="text-sm text-slate-600">Women-Focused</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Student Testimonials Section */}
      {testimonials.length > 0 && (
        <section className="bg-white px-5 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Student Voices"
              title="Hear from our students"
              description="Real stories from women who found their confidence and career path at Zahara."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="overflow-hidden rounded-3xl bg-mist shadow-card">
                  <VideoPlayer
                    videoType={testimonial.videoType}
                    videoUrl={testimonial.videoUrl}
                    thumbnail={testimonial.thumbnail}
                    title={`${testimonial.name} - ${testimonial.course}`}
                    youtubeId={testimonial.youtubeId}
                  />
                  <div className="p-6">
                    <p className="text-sm italic leading-6 text-slate-600">"{testimonial.quote}"</p>
                    <div className="mt-4 flex items-center gap-3 border-t border-slate-200 pt-4">
                      <div>
                        <p className="font-semibold text-ink">{testimonial.name}</p>
                        <p className="text-xs text-slate-500">{testimonial.course}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Events & Activities Section */}
      {events.length > 0 && (
        <section className="bg-mist px-5 py-20 sm:py-24 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <SectionHeading
              eyebrow="Events & Activities"
              title="Campus moments that matter"
              description="From workshops to celebrations, experience the vibrant life at Zahara."
            />
            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {events.map((event) => (
                <div key={event.id} className="group overflow-hidden rounded-3xl bg-white shadow-card transition-shadow hover:shadow-soft">
                  {event.mediaType === "video" ? (
                    <VideoPlayer
                      videoType={event.youtubeId ? "youtube" : "local"}
                      videoUrl={event.mediaUrl}
                      thumbnail={event.mediaUrl}
                      title={event.title}
                      youtubeId={event.youtubeId}
                    />
                  ) : (
                    <div className="relative aspect-video overflow-hidden">
                      <Image
                        src={event.mediaUrl}
                        alt={event.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center gap-2 text-xs text-slate-500">
                      <Calendar className="size-4" />
                      {new Date(event.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                    <h3 className="mt-3 font-display text-xl font-bold text-ink">{event.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="px-5 py-20 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="font-display text-4xl font-bold text-ink sm:text-5xl">
            Ready to be part of the Zahara family?
          </h2>
          <p className="mt-5 text-lg leading-8 text-slate-600">
            Join a community where your growth, confidence, and future matter.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" asChild>
              <Link href="/admissions">
                Start your journey <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/courses">Explore courses</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

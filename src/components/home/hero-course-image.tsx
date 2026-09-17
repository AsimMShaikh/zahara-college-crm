"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Award, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import type { Course } from "@/types/content";
import { cn } from "@/lib/utils";

export function HeroCourseImage({ heroCourses }: { heroCourses: Course[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const showCarousel = heroCourses.length > 1;

  useEffect(() => {
    if (!showCarousel) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroCourses.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [showCarousel, heroCourses.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + heroCourses.length) % heroCourses.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % heroCourses.length);
  };

  // No hero courses - show original generic image
  if (heroCourses.length === 0) {
    return (
      <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
        <div className="absolute -right-5 -top-5 size-28 rounded-full bg-warmth/30 blur-2xl" />
        <div className="relative aspect-[4/4.5] overflow-hidden rounded-4xl shadow-soft">
          <Image priority src="/images/hero-career.jpg" alt="A young woman building skills for her future" fill className="object-cover object-center" sizes="(max-width: 1024px) 100vw, 50vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
          <p className="absolute bottom-7 left-7 max-w-[14rem] font-display text-2xl font-bold leading-tight text-white">
            A place to learn, belong and move forward.
          </p>
        </div>
        <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-card sm:-left-8">
          <div className="flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
              <Award className="size-5" />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">Built around you</span>
              <span className="block text-xs text-slate-500">Skills. Support. Confidence.</span>
            </span>
          </div>
        </div>
      </div>
    );
  }

  // Has hero course(s) - show featured course
  const currentCourse = heroCourses[currentIndex];

  return (
    <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
      <div className="absolute -right-5 -top-5 size-28 rounded-full bg-warmth/30 blur-2xl" />
      <div className="relative aspect-[4/4.5] overflow-hidden rounded-4xl shadow-soft">
        <Link href={`/courses/${currentCourse.slug}`} className="group block">
          <Image
            priority
            src={currentCourse.image}
            alt={currentCourse.title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-ink/20 to-transparent" />

          {/* Featured Badge */}
          <div className="absolute left-7 top-7">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white shadow-lg">
              <Sparkles className="size-3.5" />
              Featured Course
            </span>
          </div>

          {/* Course Info */}
          <div className="absolute bottom-7 left-7 right-7">
            <span className="inline-block rounded-full bg-white/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-sm">
              {currentCourse.category}
            </span>
            <h3 className="mt-3 max-w-[18rem] font-display text-2xl font-bold leading-tight text-white">
              {currentCourse.title}
            </h3>
            {currentCourse.tagline && (
              <p className="mt-2 text-sm font-medium text-brand-100">{currentCourse.tagline}</p>
            )}
            <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-white">
              <span className="opacity-60">Duration:</span>
              <span>{currentCourse.duration}</span>
            </div>
          </div>

        </Link>

        {/* Carousel Controls - only if multiple courses */}
        {showCarousel && (
          <>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToPrevious();
              }}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
              aria-label="Previous course"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                goToNext();
              }}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 grid size-9 place-items-center rounded-full bg-white/90 text-ink shadow-lg transition hover:bg-white"
              aria-label="Next course"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      {/* Carousel Dots - only if multiple courses */}
      {showCarousel && (
        <div className="absolute -bottom-5 left-1/2 flex -translate-x-1/2 gap-2">
          {heroCourses.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                "h-2 rounded-full transition-all",
                index === currentIndex ? "w-8 bg-brand-600" : "w-2 bg-slate-300 hover:bg-slate-400"
              )}
              aria-label={`Go to course ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Info Card */}
      <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white p-4 shadow-card sm:-left-8">
        <div className="flex items-center gap-3">
          <span className="grid size-10 place-items-center rounded-xl bg-brand-50 text-brand-600">
            <Award className="size-5" />
          </span>
          <span>
            <span className="block text-sm font-bold text-ink">Featured Programme</span>
            <span className="block text-xs text-slate-500">Professional Diploma</span>
          </span>
        </div>
      </div>
    </div>
  );
}

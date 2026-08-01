"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, X } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import type { Course } from "@/types/content";

export function CoursesSection({ allCourses }: { allCourses: Course[] }) {
  const [filteredCourses, setFilteredCourses] = useState(allCourses);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    // Read category from URL hash parameters
    const hash = window.location.hash;
    const params = new URLSearchParams(hash.split('?')[1] || '');
    const category = params.get('category');

    if (category) {
      setActiveCategory(category);
      const filtered = allCourses.filter(course => course.category === category);
      setFilteredCourses(filtered);

      // Scroll to courses section when filter is applied
      setTimeout(() => {
        const coursesSection = document.getElementById('courses');
        if (coursesSection) {
          coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } else {
      setActiveCategory(null);
      setFilteredCourses(allCourses);
    }

    // Listen for hash changes
    const handleHashChange = () => {
      const newHash = window.location.hash;
      const newParams = new URLSearchParams(newHash.split('?')[1] || '');
      const newCategory = newParams.get('category');

      if (newCategory) {
        setActiveCategory(newCategory);
        const filtered = allCourses.filter(course => course.category === newCategory);
        setFilteredCourses(filtered);

        // Scroll to courses section when filter changes
        setTimeout(() => {
          const coursesSection = document.getElementById('courses');
          if (coursesSection) {
            coursesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 100);
      } else {
        setActiveCategory(null);
        setFilteredCourses(allCourses);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [allCourses]);

  const clearFilter = () => {
    setActiveCategory(null);
    setFilteredCourses(allCourses);
    window.history.pushState(null, '', '/#courses');
  };

  return (
    <section id="courses" className="px-5 py-20 sm:py-24 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading
            align="left"
            eyebrow={activeCategory ? `${activeCategory} Courses` : "Explore skills"}
            title={activeCategory ? `${activeCategory} programmes` : "Learn a skill that opens new possibilities."}
            description={activeCategory ? `Courses in ${activeCategory} to help you build practical skills.` : "Every programme has a dedicated page to help you decide if it is right for you."}
          />
          <Link href="/courses" className="inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900">
            View all courses <ArrowRight className="size-4" />
          </Link>
        </div>

        {activeCategory && (
          <div className="mt-6">
            <button
              onClick={clearFilter}
              className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-4 py-2 text-sm font-semibold text-brand-700 transition hover:bg-brand-200"
            >
              <X className="size-4" />
              Clear filter · Show all courses
            </button>
          </div>
        )}

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <article
                key={course.slug}
                className="group overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card transition duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={course.image}
                    alt=""
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <div className="p-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-brand-600">
                    {course.duration}
                  </p>
                  <h3 className="mt-2 font-display text-xl font-bold text-ink">{course.title}</h3>
                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-slate-600">
                    {course.description}
                  </p>
                  <Link
                    href={`/courses/${course.slug}`}
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-ink hover:text-brand-700"
                  >
                    Learn more <ArrowRight className="size-4" />
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="col-span-full rounded-3xl bg-mist p-12 text-center">
              <p className="text-slate-600">No courses found in this category.</p>
              <button
                onClick={clearFilter}
                className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-700 hover:text-brand-900"
              >
                View all courses <ArrowRight className="size-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

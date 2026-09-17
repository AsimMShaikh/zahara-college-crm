import testimonials from "@/data/testimonials.json";
import events from "@/data/events.json";
import type { Testimonial, Event } from "@/types/content";

export const lifeService = {
  getTestimonials: (): Testimonial[] => testimonials as Testimonial[],
  getEvents: (): Event[] => events as Event[],
};

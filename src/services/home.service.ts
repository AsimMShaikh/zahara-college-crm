import careerPaths from "@/data/career-paths.json";
import courses from "@/data/courses.json";
import faqs from "@/data/faqs.json";
import stories from "@/data/stories.json";
import type { CareerPath, Course, FAQ, Story } from "@/types/content";

// This is the single content boundary for the public site. Replace its local
// JSON imports with CMS/API calls later without changing page components.
export const homeService = {
  getCareerPaths: (): CareerPath[] => careerPaths as CareerPath[],
  getCourses: (): Course[] => courses,
  getFeaturedCourses: (): Course[] => courses.filter((course) => course.featured),
  getCourseBySlug: (slug: string): Course | undefined => courses.find((course) => course.slug === slug),
  getFAQs: (): FAQ[] => faqs,
  getStories: (): Story[] => stories,
};

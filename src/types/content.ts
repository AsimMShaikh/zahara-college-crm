export type CareerPath = {
  id: string;
  title: string;
  description: string;
  icon: "Laptop" | "HeartPulse" | "Shirt" | "GraduationCap" | "BriefcaseBusiness" | "Palette" | "Users";
  courses: string[];
};

export type Course = {
  slug: string;
  title: string;
  category: string;
  duration: string;
  description: string;
  image: string;
  featured: boolean;
  hero?: boolean;
  tagline?: string;
  learningOutcomes?: string[];
  curriculumDescription?: string;
};

export type FAQ = { question: string; answer: string };

export type Story = { title: string; description: string; image: string; label: string };

export type Testimonial = {
  id: string;
  name: string;
  course: string;
  videoType: "local" | "youtube";
  videoUrl: string;
  thumbnail: string;
  quote: string;
  youtubeId?: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  mediaType: "image" | "video";
  mediaUrl: string;
  description: string;
  youtubeId?: string;
};

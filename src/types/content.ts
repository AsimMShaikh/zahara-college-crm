export type CareerPath = {
  id: string;
  title: string;
  description: string;
  icon: "Laptop" | "HeartPulse" | "Shirt" | "GraduationCap" | "BriefcaseBusiness" | "Palette";
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
};

export type FAQ = { question: string; answer: string };

export type Story = { title: string; description: string; image: string; label: string };

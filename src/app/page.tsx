import { HomePage } from "@/components/home/home-page";
import { homeService } from "@/services/home.service";

export default function Page() {
  return <HomePage careerPaths={homeService.getCareerPaths()} courses={homeService.getCourses()} heroCourses={homeService.getHeroCourses()} faqs={homeService.getFAQs()} stories={homeService.getStories()} />;
}

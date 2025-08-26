import Courses from "@/components/Courses";
import FAQSection from "@/components/Faqs";
import Feedbacks from "@/components/Feedbacks";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import LatestBlogs from "@/components/LatestBlogs";

export default function Home() {
  return (
    <div>
      <Hero />
      <Courses />
      <HowItWorks />
      <LatestBlogs />
      <Feedbacks />
      <FAQSection />
    </div>
  );
}

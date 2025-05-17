import HeroSection from "@/components/home/HeroSection"
import ServicesOverview from "@/components/home/ServicesOverview"
import ProjectsCarousel from "@/components/home/ProjectsCarousel"
import Testimonials from "@/components/home/Testimonials"
import BlogPreview from "@/components/home/BlogPreview"
import ContactCTA from "@/components/home/ContactCTA"

export default function Home() {
  return (
    <div className="space-y-20 pb-20">
      <HeroSection />
      <ServicesOverview />
      <ProjectsCarousel />
      <Testimonials />
      <BlogPreview />
      <ContactCTA />
    </div>
  )
}

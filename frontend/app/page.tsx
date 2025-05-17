import HeroSection from "@/components/home/hero-section"
import ServicesOverview from "@/components/home/services-overview"
import FeaturedProjects from "@/components/home/featured-projects"
import Testimonials from "@/components/home/testimonials"
import BlogPreview from "@/components/home/blog-preview"
import ContactCTA from "@/components/home/contact-cta"
import DigitalPostureWidget from "@/components/home/digital-posture-widget"

export default function Home() {
  return (
    <div className="flex flex-col gap-16 py-8">
      <HeroSection />
      <ServicesOverview />
      <FeaturedProjects />
      <Testimonials />
      <BlogPreview />
      <DigitalPostureWidget />
      <ContactCTA />
    </div>
  )
}

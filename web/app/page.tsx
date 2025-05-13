import { HeroSection } from "@/components/home/hero-section"
import { ServicesOverview } from "@/components/home/services-overview"
import { CaseStudies } from "@/components/home/case-studies"
import { Testimonials } from "@/components/home/testimonials"
import { BlogPosts } from "@/components/home/blog-posts"
import { ContactCTA } from "@/components/home/contact-cta"
import { MainNav } from "@/components/main-nav"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1">
        <HeroSection />
        <ServicesOverview />
        <CaseStudies />
        <Testimonials />
        <BlogPosts />
        <ContactCTA />
      </main>
      <Footer />
    </div>
  )
}

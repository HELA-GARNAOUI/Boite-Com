import { Metadata } from "next"
import { ArrowRight, Code, Target, Users, Globe, Zap, Shield, Sparkles, Rocket, Lightbulb, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export const metadata: Metadata = {
  title: "DigiFlow Agency - Digital Innovation & Growth",
  description: "Transform your business with DigiFlow Agency. We create innovative digital solutions that drive growth and success.",
}

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background" />
      </div>

      {/* Hero Section */}
      <div className="relative pt-32 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Innovating Digital Solutions</span>
            </div>
            <h1 className="text-6xl font-bold mb-6 leading-tight">
              Transform Your Digital
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent"> Presence</span>
                <span className="absolute bottom-2 left-0 right-0 h-3 bg-primary/20 -z-10" />
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              We help businesses grow through innovative digital solutions, strategic thinking, and cutting-edge technology.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
              >
                Start Your Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-background/50 px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm transition-all hover:bg-primary/5"
              >
                Explore Services
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-sm text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <Code className="h-4 w-4" />
              <span>Our Services</span>
            </div>
            <h2 className="text-4xl font-bold mb-6">Comprehensive Digital Solutions</h2>
            <p className="text-lg text-muted-foreground">
              We offer end-to-end digital services to help your business thrive in the digital age
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 rounded-2xl bg-card border">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <Globe className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Web Development</h3>
                <p className="text-muted-foreground mb-6">
                  Custom websites and web applications built with modern technologies, focusing on performance and user experience.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Responsive Design
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Secure Architecture
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 rounded-2xl bg-card border">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">SEO</h3>
                <p className="text-muted-foreground mb-6">
                  Search engine optimization strategies to improve your online visibility and drive organic traffic.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Keyword Research
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Technical SEO
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-primary/60 rounded-2xl blur opacity-30 group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />
              <div className="relative p-8 rounded-2xl bg-card border">
                <div className="mb-6 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Social Media</h3>
                <p className="text-muted-foreground mb-6">
                  Strategic social media management to engage your audience and build brand presence.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Zap className="h-4 w-4 text-primary" />
                    Content Strategy
                  </li>
                  <li className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4 text-primary" />
                    Community Management
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/5 rounded-3xl blur-2xl" />
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-primary/5" />
                <Image
                  src="/images/nous.jpg"
                  alt="Notre équipe au travail"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
                  <Rocket className="h-4 w-4" />
                  <span>Why Choose Us</span>
                </div>
                <h2 className="text-4xl font-bold mb-6">Your Digital Growth Partner</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  We combine technical expertise with strategic thinking to deliver solutions that drive real business results.
                </p>
              </div>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Expert Team</h3>
                    <p className="text-muted-foreground">Skilled professionals with years of industry experience</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Innovative Solutions</h3>
                    <p className="text-muted-foreground">Cutting-edge technology and creative approaches</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold mb-1">Results-Driven</h3>
                    <p className="text-muted-foreground">Focus on measurable outcomes and business growth</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl bg-primary/5">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-primary/5" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:24px_24px]" />
            <div className="relative px-8 py-16 md:px-16 md:py-24">
              <div className="max-w-3xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Digital Presence?</h2>
                <p className="text-xl text-muted-foreground mb-8">
                  Let's work together to create something extraordinary for your business.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-8 py-4 text-base font-medium text-primary-foreground shadow-lg shadow-primary/25 transition-all hover:shadow-primary/40 hover:scale-105"
                >
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

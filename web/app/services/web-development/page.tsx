import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, ArrowRight } from "lucide-react"

export default function WebDevelopmentPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="heading-1 text-gray-900 dark:text-white">Web Development Services</h1>
              <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
                We create custom websites and web applications that are fast, responsive, and designed to convert
                visitors into customers.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link href="/contact">
                  <Button size="lg">
                    Get a Quote
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects">
                  <Button variant="outline" size="lg">
                    View Our Work
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative h-[300px] md:h-[400px] rounded-xl overflow-hidden">
              <Image src="/placeholder.svg?height=400&width=600" alt="Web Development" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white">Our Technology Stack</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We use the latest technologies to build fast, scalable, and secure web applications.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-8">
          {[
            { name: "React", image: "/placeholder.svg?height=80&width=80" },
            { name: "Next.js", image: "/placeholder.svg?height=80&width=80" },
            { name: "Node.js", image: "/placeholder.svg?height=80&width=80" },
            { name: "TypeScript", image: "/placeholder.svg?height=80&width=80" },
            { name: "Tailwind CSS", image: "/placeholder.svg?height=80&width=80" },
            { name: "MongoDB", image: "/placeholder.svg?height=80&width=80" },
            { name: "PostgreSQL", image: "/placeholder.svg?height=80&width=80" },
            { name: "GraphQL", image: "/placeholder.svg?height=80&width=80" },
            { name: "AWS", image: "/placeholder.svg?height=80&width=80" },
            { name: "Vercel", image: "/placeholder.svg?height=80&width=80" },
            { name: "Supabase", image: "/placeholder.svg?height=80&width=80" },
            { name: "Prisma", image: "/placeholder.svg?height=80&width=80" },
          ].map((tech, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="relative h-16 w-16 mb-2">
                <Image src={tech.image || "/placeholder.svg"} alt={tech.name} fill className="object-contain" />
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{tech.name}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white">Our Development Process</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a structured approach to ensure the success of every web development project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Discovery & Planning",
                description:
                  "We start by understanding your business goals, target audience, and project requirements.",
              },
              {
                number: "02",
                title: "Design & Prototyping",
                description: "We create wireframes and design mockups to visualize the user interface and experience.",
              },
              {
                number: "03",
                title: "Development",
                description:
                  "Our developers build your website or application using the latest technologies and best practices.",
              },
              {
                number: "04",
                title: "Testing & Launch",
                description:
                  "We thoroughly test your website or application before launching it to ensure everything works perfectly.",
              },
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-indigo-600/20 dark:text-indigo-400/20 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{step.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{step.description}</p>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-1/2 h-0.5 bg-indigo-600/20 dark:bg-indigo-400/20"></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white">Pricing Plans</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose the plan that best fits your business needs and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Basic",
              price: "$2,999",
              description: "Perfect for small businesses looking to establish an online presence.",
              features: [
                "Responsive Website Design",
                "Up to 5 Pages",
                "Contact Form",
                "Basic SEO Setup",
                "Mobile Optimization",
                "1 Month of Support",
              ],
              cta: "Get Started",
              popular: false,
            },
            {
              title: "Professional",
              price: "$5,999",
              description: "Ideal for growing businesses that need more features and functionality.",
              features: [
                "Everything in Basic",
                "Up to 10 Pages",
                "Content Management System",
                "Blog Setup",
                "Advanced SEO",
                "Social Media Integration",
                "3 Months of Support",
              ],
              cta: "Get Started",
              popular: true,
            },
            {
              title: "Enterprise",
              price: "Custom",
              description: "For businesses that need a fully custom solution with advanced features.",
              features: [
                "Everything in Professional",
                "Unlimited Pages",
                "E-commerce Functionality",
                "Custom Integrations",
                "Performance Optimization",
                "Advanced Analytics",
                "12 Months of Support",
              ],
              cta: "Contact Us",
              popular: false,
            },
          ].map((plan, index) => (
            <Card
              key={index}
              className={`overflow-hidden ${
                plan.popular ? "border-indigo-600 dark:border-indigo-400 shadow-lg relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-medium px-3 py-1">
                  Most Popular
                </div>
              )}
              <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  {plan.price !== "Custom" && <span className="text-gray-500 dark:text-gray-400"> / project</span>}
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0" />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/contact" className="w-full">
                  <Button className={`w-full ${plan.popular ? "bg-indigo-600 hover:bg-indigo-700" : ""}`}>
                    {plan.cta}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Portfolio Examples */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white">Our Web Development Portfolio</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Take a look at some of our recent web development projects.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-commerce Platform",
                category: "E-commerce",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/ecommerce-platform",
              },
              {
                title: "Corporate Website",
                category: "Business",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/corporate-website",
              },
              {
                title: "Healthcare Portal",
                category: "Healthcare",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/healthcare-portal",
              },
              {
                title: "Real Estate Website",
                category: "Real Estate",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/real-estate-website",
              },
              {
                title: "Educational Platform",
                category: "Education",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/educational-platform",
              },
              {
                title: "Restaurant Website",
                category: "Food & Beverage",
                image: "/placeholder.svg?height=300&width=400",
                link: "/projects/restaurant-website",
              },
            ].map((project, index) => (
              <Link key={index} href={project.link} className="group">
                <div className="relative overflow-hidden rounded-lg">
                  <div className="relative h-64 w-full">
                    <Image
                      src={project.image || "/placeholder.svg"}
                      alt={project.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Button variant="outline" className="border-white text-white hover:bg-white/20">
                        View Project
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="text-sm font-medium text-indigo-600 dark:text-indigo-400">{project.category}</span>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mt-1">{project.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/projects">
              <Button size="lg">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="container-custom">
        <div className="text-center mb-16">
          <h2 className="heading-2 text-gray-900 dark:text-white">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our web development services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {[
            {
              question: "How long does it take to build a website?",
              answer:
                "The timeline for a website project depends on its complexity. A simple website can take 4-6 weeks, while more complex projects can take 3-6 months. We'll provide a detailed timeline during the discovery phase.",
            },
            {
              question: "Do you provide website maintenance services?",
              answer:
                "Yes, we offer website maintenance packages to ensure your website remains secure, up-to-date, and performing optimally. Our maintenance services include regular updates, security monitoring, and technical support.",
            },
            {
              question: "Can you redesign my existing website?",
              answer:
                "We specialize in website redesigns that improve both aesthetics and functionality. We'll analyze your current website, identify areas for improvement, and create a modern, effective design.",
            },
            {
              question: "Do you build e-commerce websites?",
              answer:
                "Yes, we build custom e-commerce websites using platforms like Shopify, WooCommerce, and custom solutions. We can integrate payment gateways, inventory management, and other e-commerce features.",
            },
            {
              question: "Will my website be mobile-friendly?",
              answer:
                "All websites we build are fully responsive and optimized for all devices, including smartphones, tablets, and desktop computers.",
            },
            {
              question: "Do you provide hosting services?",
              answer:
                "Yes, we offer reliable hosting solutions for websites of all sizes. Our hosting packages include regular backups, security monitoring, and technical support.",
            },
          ].map((faq, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">{faq.question}</h3>
              <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container-custom">
        <div className="bg-indigo-600 rounded-2xl text-white p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-2">Ready to Start Your Web Development Project?</h2>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Contact us today to discuss your project requirements and get a free quote.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Get a Quote
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  Schedule a Consultation
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

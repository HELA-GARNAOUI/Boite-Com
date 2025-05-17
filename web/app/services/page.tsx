import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, BarChart, Share2, PenTool, Code, Megaphone } from "lucide-react"

const services = [
  {
    title: "Web Development",
    description:
      "Custom websites and web applications built with the latest technologies to deliver exceptional user experiences.",
    icon: Globe,
    href: "/services/web-development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "SEO Services",
    description:
      "Improve your search engine rankings and drive more organic traffic to your website with our proven SEO strategies.",
    icon: BarChart,
    href: "/services/seo",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Social Media Management",
    description:
      "Engage your audience and build your brand with strategic social media management and content creation.",
    icon: Share2,
    href: "/services/social-media",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "UI/UX Design",
    description:
      "Create intuitive and visually appealing user interfaces that enhance user experience and drive engagement.",
    icon: PenTool,
    href: "/services/design",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "App Development",
    description: "Native and cross-platform mobile applications that provide seamless experiences across all devices.",
    icon: Code,
    href: "/services/app-development",
    image: "/placeholder.svg?height=200&width=400",
  },
  {
    title: "Content Marketing",
    description: "Strategic content creation and distribution to attract and retain your target audience.",
    icon: Megaphone,
    href: "/services/content",
    image: "/placeholder.svg?height=200&width=400",
  },
]

export default function ServicesPage() {
  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="heading-1 text-gray-900 dark:text-white">Our Services</h1>
            <p className="mt-6 text-lg text-gray-600 dark:text-gray-300">
              We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
              From web development to digital marketing, we've got you covered.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image src={service.image || "/placeholder.svg"} alt={service.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <service.icon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  <CardTitle>{service.title}</CardTitle>
                </div>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardFooter>
                <Link href={service.href} className="w-full">
                  <Button variant="outline" className="w-full group">
                    Learn More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="heading-2 text-gray-900 dark:text-white">Our Process</h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We follow a structured approach to ensure the success of every project.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Discovery",
                description: "We start by understanding your business, goals, and target audience.",
              },
              {
                number: "02",
                title: "Strategy",
                description: "We develop a tailored strategy to meet your specific needs and objectives.",
              },
              {
                number: "03",
                title: "Implementation",
                description: "Our team executes the strategy with precision and attention to detail.",
              },
              {
                number: "04",
                title: "Optimization",
                description: "We continuously monitor and optimize to ensure the best results.",
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

      {/* CTA Section */}
      <section className="container-custom">
        <div className="bg-indigo-600 rounded-2xl text-white p-8 md:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-2">Ready to Get Started?</h2>
            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Contact us today to discuss your project and how we can help your business grow.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact">
                <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                  Contact Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/projects">
                <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                  View Our Work
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

import Link from "next/link"
import Image from "next/image"
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Globe, BarChart, Share2 } from "lucide-react"

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
]

export default function ServicesOverview() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="heading-2 text-gray-900 dark:text-white">Our Services</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We offer a comprehensive range of digital services to help your business thrive in the digital landscape.
        </p>
      </div>

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

      <div className="mt-16 text-center">
        <Link href="/services">
          <Button size="lg">
            View All Services
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

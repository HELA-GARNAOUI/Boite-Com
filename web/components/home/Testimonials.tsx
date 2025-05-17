import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    content:
      "Working with Digital Agency transformed our online presence. Their team delivered a website that exceeded our expectations and has significantly increased our conversion rates.",
    author: "Sarah Johnson",
    position: "CEO, TechStart Inc.",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "The SEO services provided by Digital Agency helped us achieve first-page rankings for our key search terms. Our organic traffic has increased by 200% in just six months.",
    author: "Michael Chen",
    position: "Marketing Director, GrowthBrand",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    content:
      "Their social media management has been a game-changer for our brand. We've seen a significant increase in engagement and followers across all platforms.",
    author: "Emma Rodriguez",
    position: "Social Media Manager, FashionHub",
    image: "/placeholder.svg?height=100&width=100",
  },
]

export default function Testimonials() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="heading-2 text-gray-900 dark:text-white">What Our Clients Say</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Don't just take our word for it. Here's what our clients have to say about working with us.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="bg-white dark:bg-gray-800 shadow-md">
            <CardContent className="pt-6">
              <Quote className="h-8 w-8 text-indigo-600 dark:text-indigo-400 mb-4" />
              <p className="text-gray-700 dark:text-gray-300 mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="relative h-12 w-12 rounded-full overflow-hidden mr-4">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.author}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.position}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

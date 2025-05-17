import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

const blogPosts = [
  {
    title: "10 SEO Strategies to Boost Your Website's Ranking",
    excerpt:
      "Learn the latest SEO strategies that can help improve your website's visibility and drive more organic traffic.",
    date: "May 10, 2023",
    category: "SEO",
    image: "/placeholder.svg?height=200&width=400",
    slug: "/blog/seo-strategies",
  },
  {
    title: "The Future of Web Development: Trends to Watch",
    excerpt:
      "Explore the emerging trends in web development that are shaping the future of the internet and digital experiences.",
    date: "April 25, 2023",
    category: "Web Development",
    image: "/placeholder.svg?height=200&width=400",
    slug: "/blog/web-development-trends",
  },
  {
    title: "How to Create a Successful Social Media Strategy",
    excerpt:
      "Discover the key elements of a successful social media strategy that can help your business grow its online presence.",
    date: "April 12, 2023",
    category: "Social Media",
    image: "/placeholder.svg?height=200&width=400",
    slug: "/blog/social-media-strategy",
  },
]

export default function BlogPreview() {
  return (
    <section className="container-custom py-16 md:py-24">
      <div className="text-center mb-16">
        <h2 className="heading-2 text-gray-900 dark:text-white">Latest Insights</h2>
        <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          Stay updated with our latest articles, tips, and industry insights.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden transition-all hover:shadow-lg">
            <div className="relative h-48 w-full">
              <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
              <div className="absolute top-4 left-4 bg-indigo-600 text-white text-xs font-medium px-2.5 py-1 rounded">
                {post.category}
              </div>
            </div>
            <CardHeader>
              <CardTitle className="line-clamp-2">{post.title}</CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400">{post.date}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter>
              <Link href={post.slug} className="w-full">
                <Button variant="outline" className="w-full group">
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="mt-16 text-center">
        <Link href="/blog">
          <Button size="lg">
            View All Articles
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </section>
  )
}

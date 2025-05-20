import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock } from "lucide-react"

export default function BlogPreview() {
  const posts = [
    {
      title: "Les tendances SEO à suivre en 2025",
      excerpt:
        "Découvrez les prévisions des experts sur l'évolution du référencement naturel et les nouvelles stratégies à adopter pour rester compétitif.",
      date: "15/03/2024",
      readTime: "8 min",
      image: "/images/seo-trends-2025.jpg",
    },
    {
      title: "Comment créer une stratégie de contenu efficace",
      excerpt:
        "Apprenez à élaborer une stratégie de contenu qui engage votre audience et convertit les visiteurs en clients.",
      date: "02/05/2023",
      readTime: "7 min",
      image: "/images/post2.jpg",
    },
    {
      title: "L'importance du design UX dans le développement web",
      excerpt:
        "Comprendre pourquoi l'expérience utilisateur est cruciale pour le succès de votre site web et comment l'améliorer.",
      date: "28/04/2023",
      readTime: "6 min",
      image: "/images/post3.jpg",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Derniers Articles</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Restez informé des dernières tendances et conseils en matière de marketing digital
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {posts.map((post, index) => (
          <Card key={index} className="overflow-hidden flex flex-col h-full">
            <div className="relative h-48">
              <img src={post.image || "/placeholder.svg"} alt={post.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-2">
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              <CardTitle className="line-clamp-2">
                <Link href={`/blog/${index + 1}`} className="hover:underline">
                  {post.title}
                </Link>
              </CardTitle>
              <CardDescription className="line-clamp-3">{post.excerpt}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow"></CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" asChild>
                <Link href={`/blog/${index + 1}`}>Lire l'article</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="/blog">Voir tous les articles</Link>
        </Button>
      </div>
    </section>
  )
}

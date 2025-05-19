import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, User, Share2, BookmarkPlus } from "lucide-react"
import { NewsletterForm } from '@/components/newsletter/newsletter-form'

// Mock article data - In a real app, this would come from a CMS or database
const getArticle = (slug: string) => ({
  id: 1,
  slug,
  title: "Comment améliorer votre présence en ligne en 2024",
  content: `
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
    <h2>1. Optimisez votre site web</h2>
    <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
    <h2>2. Créez du contenu de qualité</h2>
    <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
    <h2>3. Utilisez les réseaux sociaux</h2>
    <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  `,
  date: "15/03/2024",
  author: "Jean Dupont",
  readTime: "5 min",
  category: "Marketing Digital",
  image: "/images/blog/post1.jpg",
  tags: ["Marketing Digital", "SEO", "Réseaux Sociaux"],
  relatedPosts: [
    {
      id: 2,
      title: "Les tendances SEO en 2024",
      excerpt: "Découvrez les dernières tendances en matière de référencement...",
      date: "10/03/2024",
      image: "/images/blog/post2.jpg",
    },
    {
      id: 3,
      title: "Comment optimiser votre contenu pour les réseaux sociaux",
      excerpt: "Apprenez à créer du contenu engageant pour vos réseaux sociaux...",
      date: "05/03/2024",
      image: "/images/blog/post3.jpg",
    },
  ],
})

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const article = getArticle(params.slug)

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Article Header */}
      <section className="max-w-4xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge variant="secondary">{article.category}</Badge>
            <div className="text-sm text-muted-foreground flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold">{article.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" />
              {article.author}
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>
          </div>
        </div>
        <div className="relative h-[400px] rounded-lg overflow-hidden">
          <Image
            src={article.image}
            alt={article.title}
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Article Content */}
      <section className="max-w-4xl mx-auto">
        <div className="prose prose-lg dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: article.content }} />
        
        {/* Tags */}
        <div className="mt-8 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <Badge key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Share and Save */}
        <div className="mt-8 flex items-center gap-4">
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Partager
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <BookmarkPlus className="h-4 w-4" />
            Sauvegarder
          </Button>
        </div>
      </section>

      {/* Related Posts */}
      <section className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold mb-6">Articles Similaires</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {article.relatedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.id}`}>Lire l'article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Restez informé</CardTitle>
            <CardDescription>
              Recevez nos derniers articles et actualités directement dans votre boîte mail.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewsletterForm />
          </CardContent>
        </Card>
      </section>
    </div>
  )
} 
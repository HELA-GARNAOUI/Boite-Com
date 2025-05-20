import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, Share2, User } from "lucide-react"
import { notFound } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import { initialBlogPosts, BlogPost } from '../page'

interface BlogPostPageProps {
  params: { id: string }
}

// Generate metadata dynamically
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const postId = parseInt(params.id);
  const post = initialBlogPosts.find((post: BlogPost) => post.id === postId);

  if (!post) {
    return { title: "Article non trouvé" };
  }

  return {
    title: `${post.title} | Boite Com`,
    description: post.excerpt,
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const postId = parseInt(params.id);
  const post = initialBlogPosts.find((post: BlogPost) => post.id === postId);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8">
        <Link href="/blog" className="text-primary hover:underline mb-4 inline-block text-sm font-medium">
          ← Retour aux articles
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-muted-foreground mb-8 text-sm">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} de lecture</span>
          </div>
          <div className="flex items-center gap-1">
            <User className="h-4 w-4" />
            <span>{post.author}</span>
          </div>
          <Button variant="ghost" size="sm" className="ml-auto">
            <Share2 className="h-4 w-4 mr-2" />
            Partager
          </Button>
        </div>
      </div>

      <div className="relative w-full aspect-[16/9] mb-12 rounded-lg overflow-hidden">
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
          className="object-cover"
          priority
        />
      </div>

      <div className="prose prose-lg max-w-none text-gray-800">
        <p className="text-xl text-muted-foreground mb-8">{post.excerpt}</p>
        <div className="whitespace-pre-wrap leading-relaxed">{post.content}</div>
      </div>

      <Separator className="my-12" />

      <div className="flex flex-wrap gap-2 mb-8">
        {post.tags.map((tag, index) => (
          <Link
            key={index}
            href={`/blog?tag=${tag}`}
            className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
          >
            {tag}
          </Link>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <Button variant="outline" asChild>
          <Link href="/blog">← Retour aux articles</Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="h-4 w-4 mr-2" />
          Partager l'article
        </Button>
      </div>
    </article>
  )
} 
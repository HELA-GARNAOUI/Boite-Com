'use client'

import { useState, useEffect } from "react"
// import { Metadata } from "next" // Removed metadata import
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Search, User } from "lucide-react"
import { NewsletterForm } from '@/components/newsletter/newsletter-form'

// Define a type for your blog posts
export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
  image: string;
  tags: string[];
}

// Initial blog posts data
export const initialBlogPosts: BlogPost[] = [
  {
    id: 1,
    title: "Les tendances SEO en 2025",
    excerpt: "Découvrez les dernières tendances en matière de référencement naturel et comment les mettre en œuvre pour votre site web.",
    content: "Contenu détaillé de l'article sur les tendances SEO...",
    date: "15/03/2024",
    author: "Jean Dupont",
    readTime: "5 min",
    category: "SEO",
    image: "/images/seo-trends-2025.jpg",
    tags: ["SEO", "Marketing Digital", "Tendances"]
  },
  {
    id: 2,
    title: "L'importance de la présence en ligne",
    excerpt: "Pourquoi une présence en ligne forte est essentielle pour les entreprises modernes.",
    content: "Contenu détaillé sur l'importance de la présence en ligne...",
    date: "10/03/2024",
    author: "Marie Martin",
    readTime: "4 min",
    category: "Marketing Digital",
    image: "/images/presence-en-line.jpeg", // Corrected extension
    tags: ["Présence en ligne", "Marketing Digital"]
  },
  {
    id: 3,
    title: "Optimiser votre site pour les mobiles",
    excerpt: "Les meilleures pratiques pour rendre votre site web parfaitement adapté aux appareils mobiles.",
    content: "Contenu détaillé sur l'optimisation mobile...",
    date: "05/03/2024",
    author: "Pierre Durand",
    readTime: "6 min",
    category: "Développement Web",
    image: "/images/mobile-optimization.jpg",
    tags: ["Mobile", "Développement Web", "UX"]
  }
];

// export const metadata: Metadata = { // Moved metadata export
//   title: "Blog | Boite Com",
//   description: "Découvrez nos derniers articles sur le marketing digital, le développement web et le SEO.",
// }

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  // Filter posts based on search query and active tab
  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesTab = activeTab === "all" || 
      post.category.toLowerCase().includes(activeTab)

    return matchesSearch && matchesTab
  })

  // Mock popular posts
  const popularPosts = blogPosts.slice(0, 4)

  // Don't render anything until we're on the client
  if (!isClient) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Blog</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Rechercher un article..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <Tabs defaultValue="all" className="w-full md:w-auto">
              <TabsList className="grid w-full md:w-auto grid-cols-3 md:grid-cols-5">
                <TabsTrigger value="all">Tous</TabsTrigger>
                <TabsTrigger value="seo">SEO</TabsTrigger>
                <TabsTrigger value="marketing">Marketing</TabsTrigger>
                <TabsTrigger value="web">Web</TabsTrigger>
                <TabsTrigger value="social">Social</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden flex flex-col">
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <div className="text-xs text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {post.readTime}
                  </div>
                </div>
                <CardTitle className="line-clamp-2">
                  <Link href={`/blog/${post.id}`} className="hover:underline">
                    {post.title}
                  </Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Calendar className="h-3 w-3" />
                  {post.date}
                  <span className="mx-1">•</span>
                  <User className="h-3 w-3" />
                  {post.author}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/blog/${post.id}`}>Lire l'article</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

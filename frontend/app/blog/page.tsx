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
import Fuse, { FuseResult, FuseResultMatch } from 'fuse.js'

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
    content: "Contenu détaillé sur l'importance de la présence en ligne... ",
    date: "10/03/2024",
    author: "Marie Martin",
    readTime: "4 min",
    category: "Marketing Digital",
    image: "/images/presence-en-line.jpg", // Corrected extension
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
    image: "/images/ux.png",
    tags: ["Mobile", "Développement Web", "UX"]
  }
];

// export const metadata: Metadata = { // Moved metadata export
//   title: "Blog | Boite Com",
//   description: "Découvrez nos derniers articles sur le marketing digital, le développement web et le SEO.",
// }

// Add string similarity function
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1,
          matrix[i][j - 1] + 1,
          matrix[i - 1][j] + 1
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

const calculateSimilarity = (str1: string, str2: string): number => {
  const maxLength = Math.max(str1.length, str2.length);
  if (maxLength === 0) return 1.0;
  return 1 - levenshteinDistance(str1, str2) / maxLength;
}

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [blogPosts, setBlogPosts] = useState(initialBlogPosts)
  const [isClient, setIsClient] = useState(false)
  const [fuse, setFuse] = useState<Fuse<BlogPost> | null>(null)
  const [searchResults, setSearchResults] = useState<FuseResult<BlogPost>[]>([])

  useEffect(() => {
    setIsClient(true)
    // Initialize Fuse.js with our blog posts
    const fuseOptions = {
      keys: [
        { name: 'title', weight: 2 },
        { name: 'excerpt', weight: 1 },
        { name: 'category', weight: 1.5 },
        { name: 'tags', weight: 1.5 }
      ],
      threshold: 0.4,
      includeScore: true,
      includeMatches: true,
      minMatchCharLength: 2,
      shouldSort: true,
      findAllMatches: true,
      location: 0,
      distance: 100,
      useExtendedSearch: true
    }
    setFuse(new Fuse(blogPosts, fuseOptions))
  }, [blogPosts])

  useEffect(() => {
    if (!fuse) return

    if (searchQuery.trim() === '') {
      setSearchResults([])
      return
    }

    const results = fuse.search(searchQuery)
    setSearchResults(results)
  }, [searchQuery, fuse])

  // Filter posts based on search query and active tab
  const filteredPosts = (() => {
    if (searchQuery.trim() === '') {
      return blogPosts.filter(post => 
        activeTab === "all" || post.category.toLowerCase().includes(activeTab.toLowerCase())
      )
    }

    const results = searchResults.map(result => result.item)
    return results.filter(post => 
      activeTab === "all" || post.category.toLowerCase().includes(activeTab.toLowerCase())
    )
  })()

  // Highlight matching text
  const highlightText = (text: string, matches?: readonly FuseResultMatch[]) => {
    if (!matches) return text

    const match = matches.find(m => m.key === 'title' || m.key === 'excerpt')
    if (!match) return text

    let result = text
    // Create a mutable copy of the indices array
    const indices = [...match.indices].reverse()
    indices.forEach(([start, end]: [number, number]) => {
      const before = result.substring(0, start)
      const match = result.substring(start, end + 1)
      const after = result.substring(end + 1)
      result = `${before}<mark class="bg-yellow-200">${match}</mark>${after}`
    })
    return result
  }

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
          <div className="flex flex-col gap-4 mb-8">
            <div className="w-full flex flex-col">
              <label htmlFor="blog-search" className="text-sm font-medium text-gray-700 mb-1">Rechercher</label>
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  id="blog-search"
                  placeholder="Entrez des mots-clés..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              {searchQuery && (
                <p className="text-sm text-muted-foreground mt-2">
                  {filteredPosts.length} résultat{filteredPosts.length !== 1 ? 's' : ''} trouvé{filteredPosts.length !== 1 ? 's' : ''}
                </p>
              )}
            </div>
            <Tabs defaultValue="all" className="w-full" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-3 md:grid-cols-5">
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
          {filteredPosts.map((post) => {
            const searchResult = searchResults.find(result => result.item.id === post.id)
            return (
              <Card key={post.id} className="overflow-hidden flex flex-col h-full">
                <div className="relative h-48 w-full">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <CardHeader className="flex-grow">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary">{post.category}</Badge>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  <CardTitle className="line-clamp-2 text-lg">
                    <Link href={`/blog/${post.id}`} className="hover:underline">
                      <span dangerouslySetInnerHTML={{ 
                        __html: highlightText(post.title, searchResult?.matches) 
                      }} />
                    </Link>
                  </CardTitle>
                  <CardDescription className="flex items-center gap-2 text-sm">
                    <Calendar className="h-3 w-3" />
                    <span>{post.date}</span>
                    <span className="mx-1">•</span>
                    <User className="h-3 w-3" />
                    <span>{post.author}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p 
                    className="text-muted-foreground line-clamp-3 text-sm"
                    dangerouslySetInnerHTML={{ 
                      __html: highlightText(post.excerpt, searchResult?.matches) 
                    }}
                  />
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/blog/${post.id}`}>Lire l'article</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

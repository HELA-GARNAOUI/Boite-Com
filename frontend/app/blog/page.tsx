import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"
import { Calendar, Clock, Search, User } from "lucide-react"

export default function BlogPage() {
  // Mock blog posts data
  const blogPosts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    title: `Comment améliorer votre ${i % 3 === 0 ? "présence en ligne" : i % 3 === 1 ? "stratégie SEO" : "expérience utilisateur"}`,
    excerpt:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    date: `${Math.floor(Math.random() * 28) + 1}/0${Math.floor(Math.random() * 4) + 1}/2023`,
    author: "Jean Dupont",
    readTime: `${Math.floor(Math.random() * 10) + 3} min`,
    category: i % 3 === 0 ? "Marketing Digital" : i % 3 === 1 ? "SEO" : "Web Design",
    image: `/placeholder.svg?height=300&width=500&text=Article+${i + 1}`,
  }))

  // Mock popular posts
  const popularPosts = blogPosts.slice(0, 4)

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Blog & Actualités</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Découvrez nos derniers articles, conseils et actualités sur le marketing digital, le SEO et le développement
          web.
        </p>

        {/* Search Bar */}
        <div className="max-w-md mx-auto flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Rechercher un article..." className="pl-10" />
          </div>
          <Button>Rechercher</Button>
        </div>
      </section>

      {/* Categories */}
      <section>
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid grid-cols-4 md:grid-cols-6 mb-8">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="marketing">Marketing</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
            <TabsTrigger value="webdesign">Web Design</TabsTrigger>
            <TabsTrigger value="social">Social Media</TabsTrigger>
            <TabsTrigger value="tech">Technologie</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogPosts.map((post) => (
                <Card key={post.id} className="overflow-hidden flex flex-col">
                  <div className="relative h-48">
                    <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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

            <div className="flex justify-center mt-8">
              <Button variant="outline">Charger plus d'articles</Button>
            </div>
          </TabsContent>

          {/* Other tabs would have similar content structure */}
          {["marketing", "seo", "webdesign", "social", "tech"].map((tab) => (
            <TabsContent key={tab} value={tab} className="mt-0">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogPosts
                  .filter((post) => post.category.toLowerCase().includes(tab))
                  .map((post) => (
                    <Card key={post.id} className="overflow-hidden flex flex-col">
                      <div className="relative h-48">
                        <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" />
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
            </TabsContent>
          ))}
        </Tabs>
      </section>

      {/* Sidebar and Popular Posts */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Dernières Actualités</h2>
            <div className="space-y-4">
              {blogPosts.slice(0, 3).map((post) => (
                <div key={post.id} className="flex gap-4 items-start border-b pb-4">
                  <div className="relative h-20 w-20 flex-shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">
                      <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {post.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold mb-4">Événements à Venir</h2>
            <div className="space-y-4">
              {[
                {
                  title: "Webinaire: Les tendances SEO en 2023",
                  date: "15/06/2023",
                  time: "14:00 - 15:30",
                  location: "En ligne",
                },
                {
                  title: "Workshop: Optimiser votre présence sur les réseaux sociaux",
                  date: "22/06/2023",
                  time: "10:00 - 12:00",
                  location: "Paris",
                },
                {
                  title: "Conférence: L'avenir du e-commerce",
                  date: "05/07/2023",
                  time: "09:00 - 17:00",
                  location: "Lyon",
                },
              ].map((event, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="text-base">{event.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm space-y-1">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-primary" />
                        {event.date}, {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary"
                        >
                          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {event.location}
                      </p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button size="sm" variant="outline">
                      S'inscrire
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Articles Populaires</h2>
            <div className="space-y-4">
              {popularPosts.map((post) => (
                <div key={post.id} className="flex gap-4 items-start border-b pb-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    <Image
                      src={post.image || "/placeholder.svg"}
                      alt={post.title}
                      fill
                      className="object-cover rounded-md"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-sm">
                      <Link href={`/blog/${post.id}`} className="hover:underline">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-xs text-muted-foreground mt-1">{post.readTime}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/5 p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Abonnez-vous à notre newsletter</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Recevez nos derniers articles et actualités directement dans votre boîte mail.
            </p>
            <div className="space-y-4">
              <Input placeholder="Votre adresse email" />
              <Button className="w-full">S'abonner</Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              En vous inscrivant, vous acceptez notre politique de confidentialité.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Catégories</h2>
            <div className="flex flex-wrap gap-2">
              {[
                "Marketing Digital",
                "SEO",
                "Web Design",
                "Social Media",
                "E-commerce",
                "Technologie",
                "Actualités",
              ].map((category, index) => (
                <Badge key={index} variant="outline" className="cursor-pointer">
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 rounded-lg p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold">Besoin d'aide pour votre stratégie digitale ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Nos experts sont là pour vous accompagner dans tous vos projets digitaux.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contactez-nous</Link>
        </Button>
      </section>
    </div>
  )
}

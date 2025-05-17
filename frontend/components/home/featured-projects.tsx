import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

export default function FeaturedProjects() {
  const projects = [
    {
      title: "E-commerce de Mode",
      category: "E-commerce",
      image: "/placeholder.svg?height=400&width=600&text=Projet+1",
      description:
        "Développement d'une boutique en ligne avec plus de 10 000 produits et intégration de paiement sécurisé.",
    },
    {
      title: "Site Vitrine pour Restaurant",
      category: "Site Vitrine",
      image: "/placeholder.svg?height=400&width=600&text=Projet+2",
      description: "Création d'un site élégant avec réservation en ligne et menu interactif.",
    },
    {
      title: "Application Web pour Cabinet Médical",
      category: "Application Web",
      image: "/placeholder.svg?height=400&width=600&text=Projet+3",
      description: "Développement d'une application de gestion de rendez-vous et de dossiers patients.",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16 bg-primary/5 rounded-3xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projets Récents</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Découvrez nos dernières réalisations et comment nous avons aidé nos clients à atteindre leurs objectifs.
          </p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" size="icon" aria-label="Projet précédent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Projet suivant">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <img
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
              />
              <div className="absolute top-4 left-4 bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium">
                {project.category}
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <Button variant="outline" size="sm" asChild>
                <Link href="#">Voir le projet</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <Button asChild>
          <Link href="#">Voir tous nos projets</Link>
        </Button>
      </div>
    </section>
  )
}

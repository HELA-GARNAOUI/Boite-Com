import { Card, CardContent } from "@/components/ui/card"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Testimonials() {
  const testimonials = [
    {
      name: "Sophie Martin",
      position: "Directrice Marketing, Mode Élégance",
      content:
        "Travailler avec DigitalAgency a été une expérience exceptionnelle. Leur équipe a non seulement créé un site e-commerce magnifique, mais a également mis en place une stratégie SEO qui a considérablement augmenté notre trafic et nos ventes.",
      image: "/placeholder.svg?height=100&width=100&text=SM",
    },
    {
      name: "Thomas Dubois",
      position: "Fondateur, Restaurant Le Gourmet",
      content:
        "Grâce à DigitalAgency, notre restaurant a vu une augmentation de 45% des réservations en ligne. Leur approche personnalisée et leur compréhension de notre secteur ont fait toute la différence.",
      image: "/placeholder.svg?height=100&width=100&text=TD",
    },
    {
      name: "Marie Leroy",
      position: "Directrice, Cabinet Médical Santé+",
      content:
        "L'application développée par DigitalAgency a révolutionné notre gestion des rendez-vous et des dossiers patients. Un travail professionnel qui a dépassé toutes nos attentes.",
      image: "/placeholder.svg?height=100&width=100&text=ML",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ce que disent nos clients</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Découvrez les témoignages de clients satisfaits qui ont transformé leur présence digitale avec nous
        </p>
      </div>

      <div className="relative">
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-primary/5 border-none">
              <CardContent className="p-8 relative">
                <Quote className="h-10 w-10 text-primary/20 absolute top-4 right-4" />
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold">{testimonial.name}</h3>
                    <p className="text-sm text-muted-foreground">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-muted-foreground">{testimonial.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          <Button variant="outline" size="icon" aria-label="Témoignage précédent">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" aria-label="Témoignage suivant">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

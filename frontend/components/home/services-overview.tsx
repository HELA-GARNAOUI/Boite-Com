import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Globe, LineChart } from "lucide-react"

export default function ServicesOverview() {
  const services = [
    {
      title: "Développement Web",
      description: "Sites vitrines, e-commerce et applications web sur mesure pour répondre à vos besoins spécifiques.",
      icon: <Code className="h-10 w-10 text-primary" />,
      link: "/services/web-development",
    },
    {
      title: "SEO",
      description:
        "Optimisation pour les moteurs de recherche pour améliorer votre visibilité et attirer plus de trafic qualifié.",
      icon: <Globe className="h-10 w-10 text-primary" />,
      link: "/services/seo",
    },
    {
      title: "Gestion des Réseaux Sociaux",
      description:
        "Stratégies de contenu et gestion de communauté pour renforcer votre présence sur les réseaux sociaux.",
      icon: <LineChart className="h-10 w-10 text-primary" />,
      link: "/services/social-media",
    },
  ]

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Nos Services</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Des solutions digitales complètes pour propulser votre entreprise
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <div className="mb-4">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm">
                {[
                  "Conception sur mesure",
                  "Développement responsive",
                  "Optimisation des performances",
                  "Support technique",
                ].map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={service.link}>En savoir plus</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  )
}

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Code, Globe, LineChart, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      title: "Développement Web",
      description: "Sites vitrines, e-commerce et applications web sur mesure pour répondre à vos besoins spécifiques.",
      icon: <Code className="h-10 w-10 text-primary" />,
      link: "/services/web-development",
      features: [
        "Sites web responsifs",
        "Applications web sur mesure",
        "E-commerce",
        "Maintenance et support"
      ]
    },
    {
      title: "SEO",
      description: "Optimisation pour les moteurs de recherche pour améliorer votre visibilité et attirer plus de trafic qualifié.",
      icon: <Globe className="h-10 w-10 text-primary" />,
      link: "/services/seo",
      features: [
        "Audit SEO complet",
        "Optimisation technique",
        "Content marketing",
        "Suivi des performances"
      ]
    },
    {
      title: "Gestion des Réseaux Sociaux",
      description: "Stratégies de contenu et gestion de communauté pour renforcer votre présence sur les réseaux sociaux.",
      icon: <LineChart className="h-10 w-10 text-primary" />,
      link: "/services/social-media",
      features: [
        "Gestion de communauté",
        "Création de contenu",
        "Publicités sociales",
        "Analyse de performance"
      ]
    }
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">Nos Services</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Des solutions digitales complètes pour propulser votre entreprise vers le succès
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <div className="mb-4">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <ul className="space-y-2 text-sm mb-6">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <span className="text-primary mr-2">•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button asChild className="w-full">
                <Link href={service.link} className="flex items-center justify-center gap-2">
                  En savoir plus
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Prêt à démarrer votre projet ?</h2>
        <p className="text-muted-foreground mb-8">
          Contactez-nous pour discuter de vos besoins et obtenir un devis personnalisé
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Demander un devis</Link>
        </Button>
      </div>
    </div>
  )
} 
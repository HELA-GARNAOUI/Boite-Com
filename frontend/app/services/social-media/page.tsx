import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Facebook, Instagram, Linkedin, Twitter, Users, BarChart, MessageSquare, Share2 } from "lucide-react"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Gestion des Réseaux Sociaux | DigitalAgency",
  description: "Stratégies de contenu et gestion de communauté pour renforcer votre présence sur les réseaux sociaux.",
}

export default function SocialMediaPage() {
  const services = [
    {
      title: "Gestion de Communauté",
      description: "Créez et maintenez une communauté engagée autour de votre marque avec notre expertise en modération et animation.",
      icon: <Users className="h-10 w-10 text-primary" />,
    },
    {
      title: "Analyse de Performance",
      description: "Suivez et analysez vos performances sociales avec des rapports détaillés et des recommandations personnalisées.",
      icon: <BarChart className="h-10 w-10 text-primary" />,
    },
    {
      title: "Création de Contenu",
      description: "Contenu engageant et adapté à chaque plateforme pour maximiser votre impact sur les réseaux sociaux.",
      icon: <MessageSquare className="h-10 w-10 text-primary" />,
    },
    {
      title: "Stratégie Social Media",
      description: "Développez une présence cohérente et efficace sur tous les réseaux sociaux pertinents pour votre entreprise.",
      icon: <Share2 className="h-10 w-10 text-primary" />,
    },
  ]

  const platforms = [
    {
      name: "Facebook",
      icon: <Facebook className="h-8 w-8" />,
      description: "Gestion de pages et publicités Facebook pour atteindre votre audience cible.",
    },
    {
      name: "Instagram",
      icon: <Instagram className="h-8 w-8" />,
      description: "Création de contenu visuel et stories pour une présence Instagram impactante.",
    },
    {
      name: "Twitter",
      icon: <Twitter className="h-8 w-8" />,
      description: "Gestion de votre compte Twitter et engagement avec votre communauté.",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="h-8 w-8" />,
      description: "Développement de votre présence professionnelle sur LinkedIn.",
    },
  ]

  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Gestion des Réseaux Sociaux</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Renforcez votre présence en ligne et engagez votre audience avec nos services de gestion des réseaux sociaux.
        </p>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <Card key={index}>
            <CardHeader>
              <div className="mb-4">{service.icon}</div>
              <CardTitle>{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      {/* Platforms Section */}
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-center">Plateformes Gérées</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {platforms.map((platform, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="mb-4">{platform.icon}</div>
                <CardTitle>{platform.name}</CardTitle>
                <CardDescription>{platform.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Prêt à Booster Votre Présence Sociale ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Contactez-nous dès aujourd'hui pour discuter de votre stratégie de réseaux sociaux.
        </p>
        <div className="flex justify-center gap-4">
          <Button asChild size="lg">
            <Link href="/contact">Contactez-Nous</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/services">Voir Nos Autres Services</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 
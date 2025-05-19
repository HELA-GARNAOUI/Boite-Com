"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { Check, Code, Database, Globe, Layers, Rocket } from "lucide-react"
import { CheckoutModal } from "@/components/checkout/checkout-modal"

export default function WebDevelopmentPage() {
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string
    price: string
    description: string
    features: string[]
  } | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handlePlanSelect = (plan: {
    title: string
    price: string
    description: string
    features: string[]
  }) => {
    setSelectedPlan(plan)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Développement Web Professionnel</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Nous créons des sites web et des applications qui transforment votre présence numérique et stimulent votre
          croissance.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg" asChild>
            <Link href="/contact">Demander un devis</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#portfolio">Voir notre portfolio</Link>
          </Button>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Notre Stack Technologique</h2>
          <p className="text-muted-foreground mt-2">
            Nous utilisons les technologies les plus récentes et les plus performantes
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {[
            { name: "Next.js", icon: <Code className="h-10 w-10" /> },
            { name: "React", icon: <Layers className="h-10 w-10" /> },
            { name: "Node.js", icon: <Database className="h-10 w-10" /> },
            { name: "TailwindCSS", icon: <Rocket className="h-10 w-10" /> },
            { name: "WordPress", icon: <Globe className="h-10 w-10" /> },
            { name: "Shopify", icon: <Database className="h-10 w-10" /> },
          ].map((tech, index) => (
            <Card key={index} className="text-center">
              <CardContent className="pt-6">
                <div className="flex justify-center mb-4">{tech.icon}</div>
                <h3 className="font-medium">{tech.name}</h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Process Steps */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Notre Processus</h2>
          <p className="text-muted-foreground mt-2">Une approche méthodique pour des résultats exceptionnels</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Découverte",
              description: "Nous analysons vos besoins, objectifs et public cible pour définir la portée du projet.",
              icon: (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  1
                </div>
              ),
            },
            {
              title: "Conception",
              description:
                "Nous créons des wireframes et des maquettes pour visualiser l'interface utilisateur et l'expérience.",
              icon: (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  2
                </div>
              ),
            },
            {
              title: "Développement",
              description: "Nous codons votre site avec les technologies les plus adaptées à vos besoins.",
              icon: (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  3
                </div>
              ),
            },
            {
              title: "Lancement",
              description:
                "Nous testons, optimisons et déployons votre site pour qu'il soit prêt à conquérir le monde.",
              icon: (
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                  4
                </div>
              ),
            },
          ].map((step, index) => (
            <Card key={index}>
              <CardHeader>
                {step.icon}
                <CardTitle>{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Nos Forfaits</h2>
          <p className="text-muted-foreground mt-2">Des solutions adaptées à tous les budgets</p>
        </div>

        <Tabs defaultValue="website" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="website">Site Vitrine</TabsTrigger>
            <TabsTrigger value="ecommerce">E-commerce</TabsTrigger>
            <TabsTrigger value="application">Application Web</TabsTrigger>
          </TabsList>

          <TabsContent value="website" className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Essentiel",
                price: "1 500€",
                description: "Idéal pour les petites entreprises",
                features: [
                  "Site jusqu'à 5 pages",
                  "Design responsive",
                  "Formulaire de contact",
                  "Optimisation SEO de base",
                  "Hébergement 1 an inclus",
                ],
              },
              {
                title: "Business",
                price: "3 500€",
                description: "Pour les entreprises en croissance",
                features: [
                  "Site jusqu'à 10 pages",
                  "Design personnalisé",
                  "Intégration de blog",
                  "Optimisation SEO avancée",
                  "Hébergement 1 an inclus",
                  "Support technique 6 mois",
                ],
                highlighted: true,
              },
              {
                title: "Premium",
                price: "7 000€",
                description: "Solution complète et personnalisée",
                features: [
                  "Pages illimitées",
                  "Design sur mesure",
                  "Système de gestion de contenu",
                  "Stratégie SEO complète",
                  "Intégration CRM",
                  "Hébergement 2 ans inclus",
                  "Support technique 1 an",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Choisir ce forfait
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="ecommerce" className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Boutique Starter",
                price: "3 500€",
                description: "Pour démarrer votre activité en ligne",
                features: [
                  "Jusqu'à 100 produits",
                  "Paiement sécurisé",
                  "Gestion des stocks",
                  "Mobile-friendly",
                  "Support 3 mois",
                ],
              },
              {
                title: "Boutique Pro",
                price: "7 000€",
                description: "Pour les boutiques en croissance",
                features: [
                  "Jusqu'à 500 produits",
                  "Multi-paiements",
                  "Gestion avancée des stocks",
                  "Marketing automation",
                  "Support 6 mois",
                  "Formation incluse",
                ],
                highlighted: true,
              },
              {
                title: "Boutique Enterprise",
                price: "15 000€",
                description: "Solution e-commerce complète",
                features: [
                  "Produits illimités",
                  "Multi-boutiques",
                  "API personnalisée",
                  "Intégration ERP",
                  "Support 1 an",
                  "Formation complète",
                  "Maintenance incluse",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Choisir ce forfait
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="application" className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Application Standard",
                price: "Sur devis",
                description: "Pour les besoins métier spécifiques",
                features: [
                  "Analyse des besoins",
                  "Développement sur mesure",
                  "Tests & assurance qualité",
                  "Formation utilisateurs",
                  "Support technique",
                ],
              },
              {
                title: "Application Pro",
                price: "Sur devis",
                description: "Pour les applications complexes",
                features: [
                  "Analyse approfondie",
                  "Architecture scalable",
                  "API RESTful",
                  "Tests automatisés",
                  "Documentation complète",
                  "Support premium",
                ],
                highlighted: true,
              },
              {
                title: "Application Enterprise",
                price: "Sur devis",
                description: "Solution complète pour grandes entreprises",
                features: [
                  "Consulting stratégique",
                  "Architecture microservices",
                  "Sécurité avancée",
                  "Monitoring 24/7",
                  "Support dédié",
                  "Formation complète",
                  "Maintenance évolutive",
                ],
              },
            ].map((plan, index) => (
              <Card key={index} className={`flex flex-col ${plan.highlighted ? "border-primary shadow-lg" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                  <div className="mt-4">
                    <span className="text-3xl font-bold">{plan.price}</span>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-2">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button 
                    className="w-full" 
                    variant={plan.highlighted ? "default" : "outline"}
                    onClick={() => handlePlanSelect(plan)}
                  >
                    Demander un devis
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </section>

      {/* Portfolio Examples */}
      <section id="portfolio" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Notre Portfolio</h2>
          <p className="text-muted-foreground mt-2">Découvrez nos réalisations récentes</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Card key={item} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/placeholder.svg?height=300&width=500&text=Projet+${item}`}
                  alt={`Projet ${item}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>Projet {item}</CardTitle>
                <CardDescription>
                  Site web pour une entreprise de {item % 2 === 0 ? "services" : "produits"}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline" size="sm">
                  Voir le projet
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Questions Fréquentes</h2>
          <p className="text-muted-foreground mt-2">
            Tout ce que vous devez savoir sur nos services de développement web
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {[
            {
              question: "Combien de temps faut-il pour développer un site web ?",
              answer:
                "Le délai de développement varie en fonction de la complexité du projet. Un site vitrine simple peut prendre 4 à 6 semaines, tandis qu'un site e-commerce ou une application web peut nécessiter 2 à 4 mois. Nous établissons un calendrier précis lors de la phase de découverte.",
            },
            {
              question: "Quelles technologies utilisez-vous pour le développement ?",
              answer:
                "Nous utilisons les technologies les plus modernes et adaptées à chaque projet, notamment Next.js, React, Node.js pour les applications web dynamiques, et WordPress ou Shopify pour les sites e-commerce selon les besoins spécifiques.",
            },
            {
              question: "Proposez-vous des services de maintenance après le lancement ?",
              answer:
                "Oui, nous offrons des forfaits de maintenance qui incluent les mises à jour de sécurité, les corrections de bugs, les sauvegardes régulières et l'assistance technique. Ces forfaits peuvent être personnalisés selon vos besoins.",
            },
            {
              question: "Comment assurez-vous que mon site sera bien référencé ?",
              answer:
                "Nous intégrons les bonnes pratiques SEO dès la conception du site : structure optimisée, vitesse de chargement rapide, balisage sémantique, méta-données appropriées, et compatibilité mobile. Nous proposons également des services SEO avancés pour améliorer votre classement.",
            },
            {
              question: "Puis-je mettre à jour moi-même le contenu de mon site ?",
              answer:
                "Absolument ! Nous développons tous nos sites avec des systèmes de gestion de contenu intuitifs qui vous permettent de modifier facilement textes, images et autres contenus. Nous vous formons également à l'utilisation de ces outils.",
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 rounded-lg p-8 text-center space-y-6">
        <h2 className="text-3xl font-bold">Prêt à lancer votre projet web ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Contactez-nous dès aujourd'hui pour discuter de vos besoins et obtenir un devis personnalisé.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Demander un devis gratuit</Link>
        </Button>
      </section>

      {selectedPlan && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => {
            setIsCheckoutOpen(false)
            setSelectedPlan(null)
          }}
          plan={selectedPlan}
          serviceType="web-development"
        />
      )}
    </div>
  )
}

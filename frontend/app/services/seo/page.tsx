"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { BarChart, Check, LineChart, Search, TrendingUp } from "lucide-react"
import { CheckoutModal } from "@/components/checkout/checkout-modal"
import { toast } from "react-hot-toast"

export default function SEOPage() {
  const [selectedPlan, setSelectedPlan] = useState<{
    title: string
    price: string
    description: string
    features: string[]
  } | null>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)
  const [roiData, setRoiData] = useState({
    traffic: "",
    conversion: "",
    value: "",
  })
  const [roiResult, setRoiResult] = useState<{
    currentRevenue: number
    projectedRevenue: number
    potentialIncrease: number
    roi: number
  } | null>(null)

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan)
    setIsCheckoutOpen(true)
  }

  const calculateROI = () => {
    const traffic = parseFloat(roiData.traffic)
    const conversion = parseFloat(roiData.conversion) / 100
    const value = parseFloat(roiData.value)

    if (isNaN(traffic) || isNaN(conversion) || isNaN(value)) {
      toast.error("Veuillez remplir tous les champs avec des valeurs valides")
      return
    }

    // Calculate current revenue
    const currentRevenue = traffic * conversion * value

    // Projected improvements (conservative estimates)
    const projectedTrafficIncrease = 1.5 // 50% increase
    const projectedConversionIncrease = 1.2 // 20% increase

    // Calculate projected revenue
    const projectedRevenue = (traffic * projectedTrafficIncrease) * (conversion * projectedConversionIncrease) * value

    // Calculate potential increase and ROI
    const potentialIncrease = projectedRevenue - currentRevenue
    const roi = (potentialIncrease / 1200) * 100 // Assuming average monthly SEO cost of 1200€

    setRoiResult({
      currentRevenue,
      projectedRevenue,
      potentialIncrease,
      roi,
    })
  }

  const handleRoiInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setRoiData(prev => ({ ...prev, [id]: value }))
  }

  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Services SEO Professionnels</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Améliorez votre visibilité en ligne et attirez plus de clients qualifiés grâce à nos stratégies SEO éprouvées.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button size="lg" asChild>
            <Link href="/contact">Demander un audit gratuit</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#case-studies">Voir nos résultats</Link>
          </Button>
        </div>
      </section>

      {/* SEO Packages */}
      <section id="packages" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Nos Forfaits SEO</h2>
          <p className="text-muted-foreground mt-2">Des solutions adaptées à tous les besoins et budgets</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              title: "Essentiel",
              price: "500€/mois",
              description: "Pour les petites entreprises locales",
              features: [
                "Audit SEO initial",
                "Optimisation on-page (5 pages)",
                "Recherche de mots-clés (10 mots-clés)",
                "Optimisation des méta-données",
                "Rapport mensuel de performance",
              ],
            },
            {
              title: "Business",
              price: "1 200€/mois",
              description: "Pour les entreprises en croissance",
              features: [
                "Audit SEO approfondi",
                "Optimisation on-page (15 pages)",
                "Recherche de mots-clés (30 mots-clés)",
                "Création de contenu (2 articles/mois)",
                "Optimisation technique",
                "Stratégie de backlinks",
                "Rapports bi-mensuels détaillés",
              ],
              highlighted: true,
            },
            {
              title: "Premium",
              price: "2 500€/mois",
              description: "Pour les entreprises établies",
              features: [
                "Audit SEO complet",
                "Optimisation on-page (site entier)",
                "Recherche de mots-clés avancée",
                "Création de contenu (4 articles/mois)",
                "Optimisation technique complète",
                "Stratégie de backlinks premium",
                "Optimisation locale/internationale",
                "Rapports hebdomadaires personnalisés",
                "Consultant SEO dédié",
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
        </div>
      </section>

      {/* Process & Methodology */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Notre Méthodologie SEO</h2>
          <p className="text-muted-foreground mt-2">Une approche structurée pour des résultats durables</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: <Search className="h-8 w-8" />,
              title: "Audit",
              description: "Analyse approfondie de votre site et de votre positionnement actuel",
            },
            {
              icon: <BarChart className="h-8 w-8" />,
              title: "Stratégie",
              description: "Développement d'une stratégie SEO personnalisée et d'un plan d'action",
            },
            {
              icon: <TrendingUp className="h-8 w-8" />,
              title: "Optimisation",
              description: "Mise en œuvre des optimisations techniques et de contenu",
            },
            {
              icon: <LineChart className="h-8 w-8" />,
              title: "Suivi",
              description: "Surveillance continue des performances et ajustements stratégiques",
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

      {/* ROI Calculator */}
      <section className="space-y-8 bg-primary/5 rounded-lg p-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Calculez votre ROI SEO</h2>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Estimez le retour sur investissement potentiel de votre stratégie SEO avec notre calculateur
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-background rounded-lg p-6 shadow-sm">
          <div className="grid gap-6">
            <div className="grid gap-2">
              <label htmlFor="traffic" className="font-medium">
                Trafic mensuel actuel
              </label>
              <input
                type="number"
                id="traffic"
                value={roiData.traffic}
                onChange={handleRoiInputChange}
                placeholder="ex: 1000"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="conversion" className="font-medium">
                Taux de conversion actuel (%)
              </label>
              <input
                type="number"
                id="conversion"
                value={roiData.conversion}
                onChange={handleRoiInputChange}
                placeholder="ex: 2"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="value" className="font-medium">
                Valeur moyenne d'une conversion (€)
              </label>
              <input
                type="number"
                id="value"
                value={roiData.value}
                onChange={handleRoiInputChange}
                placeholder="ex: 100"
                className="w-full p-2 border rounded-md"
              />
            </div>

            <Button onClick={calculateROI}>Calculer mon ROI</Button>

            {roiResult && (
              <div className="p-6 bg-primary/10 rounded-md space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Revenu mensuel actuel</p>
                    <p className="text-xl font-bold">{roiResult.currentRevenue.toLocaleString('fr-FR')}€</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Revenu mensuel projeté</p>
                    <p className="text-xl font-bold">{roiResult.projectedRevenue.toLocaleString('fr-FR')}€</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">Augmentation potentielle</p>
                    <p className="text-xl font-bold text-green-600">+{roiResult.potentialIncrease.toLocaleString('fr-FR')}€</p>
                  </div>
                  <div className="p-4 bg-background rounded-lg">
                    <p className="text-sm text-muted-foreground">ROI estimé</p>
                    <p className="text-xl font-bold text-primary">{roiResult.roi.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Questions Fréquentes</h2>
          <p className="text-muted-foreground mt-2">Tout ce que vous devez savoir sur nos services SEO</p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {[
            {
              question: "Combien de temps faut-il pour voir des résultats SEO ?",
              answer:
                "Les résultats SEO sont généralement visibles après 3 à 6 mois de travail régulier. Cependant, certains facteurs comme l'âge du domaine, la concurrence et la qualité du contenu peuvent influencer ce délai. Nous fournissons des rapports réguliers pour suivre les progrès.",
            },
            {
              question: "Quelle est la différence entre le SEO et le SEA (Google Ads) ?",
              answer:
                "Le SEO (Search Engine Optimization) vise à améliorer votre visibilité dans les résultats de recherche organiques (non payants), tandis que le SEA (Search Engine Advertising) concerne les annonces payantes. Le SEO offre des résultats durables à long terme, alors que le SEA génère du trafic immédiat mais s'arrête dès que vous cessez de payer.",
            },
            {
              question: "Garantissez-vous la première position sur Google ?",
              answer:
                "Non, aucune agence sérieuse ne peut garantir la première position sur Google. Les algorithmes des moteurs de recherche sont complexes et en constante évolution. Nous nous engageons à utiliser les meilleures pratiques pour améliorer significativement votre classement, mais les résultats exacts dépendent de nombreux facteurs, dont certains sont hors de notre contrôle.",
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
        <h2 className="text-3xl font-bold">Prêt à améliorer votre visibilité en ligne ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Contactez-nous dès aujourd'hui pour un audit SEO gratuit et découvrez votre potentiel de croissance.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Demander un audit gratuit</Link>
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
          serviceType="seo"
        />
      )}
    </div>
  )
}

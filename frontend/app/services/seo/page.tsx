import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Image from "next/image"
import Link from "next/link"
import { BarChart, Check, LineChart, Search, TrendingUp } from "lucide-react"

export default function SEOPage() {
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
                <Button className="w-full" variant={plan.highlighted ? "default" : "outline"}>
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
          <p className="text-muted-foreground mt-2">Une approche systématique pour des résultats durables</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Audit & Analyse",
              description:
                "Nous analysons votre site et celui de vos concurrents pour identifier les opportunités d'amélioration.",
              icon: <Search className="h-10 w-10 text-primary" />,
            },
            {
              title: "Stratégie",
              description: "Nous élaborons une stratégie SEO personnalisée basée sur vos objectifs commerciaux.",
              icon: <LineChart className="h-10 w-10 text-primary" />,
            },
            {
              title: "Optimisation",
              description: "Nous optimisons votre site pour les moteurs de recherche et les utilisateurs.",
              icon: <TrendingUp className="h-10 w-10 text-primary" />,
            },
            {
              title: "Suivi & Ajustement",
              description: "Nous suivons les performances et ajustons la stratégie pour maximiser les résultats.",
              icon: <BarChart className="h-10 w-10 text-primary" />,
            },
          ].map((step, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-col items-center text-center">
                {step.icon}
                <CardTitle className="mt-4">{step.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-center">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Case Studies */}
      <section id="case-studies" className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Études de Cas</h2>
          <p className="text-muted-foreground mt-2">Des résultats concrets pour nos clients</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "E-commerce de Mode",
              results: ["+156% de trafic organique", "+94% de conversions", "Top 3 pour 45 mots-clés compétitifs"],
              duration: "6 mois",
            },
            {
              title: "Cabinet d'Avocats",
              results: [
                "+210% de demandes de consultation",
                "+78% de visibilité locale",
                "Domination des recherches locales",
              ],
              duration: "4 mois",
            },
          ].map((study, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="relative h-48">
                <Image
                  src={`/placeholder.svg?height=300&width=500&text=Étude+de+Cas+${index + 1}`}
                  alt={`Étude de Cas ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>Durée: {study.duration}</CardDescription>
              </CardHeader>
              <CardContent>
                <h3 className="font-medium mb-2">Résultats:</h3>
                <ul className="space-y-2">
                  {study.results.map((result, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="h-5 w-5 text-primary shrink-0 mr-2" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Voir l'étude complète</Button>
              </CardFooter>
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
              <input type="number" id="traffic" placeholder="ex: 1000" className="w-full p-2 border rounded-md" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="conversion" className="font-medium">
                Taux de conversion actuel (%)
              </label>
              <input type="number" id="conversion" placeholder="ex: 2" className="w-full p-2 border rounded-md" />
            </div>

            <div className="grid gap-2">
              <label htmlFor="value" className="font-medium">
                Valeur moyenne d'une conversion (€)
              </label>
              <input type="number" id="value" placeholder="ex: 100" className="w-full p-2 border rounded-md" />
            </div>

            <Button>Calculer mon ROI</Button>

            <div className="p-4 bg-primary/10 rounded-md text-center">
              <p className="text-sm text-muted-foreground">Les résultats s'afficheront ici</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold">Questions Fréquentes</h2>
          <p className="text-muted-foreground mt-2">Tout ce que vous devez savoir sur le SEO</p>
        </div>

        <Accordion type="single" collapsible className="w-full max-w-3xl mx-auto">
          {[
            {
              question: "Combien de temps faut-il pour voir des résultats SEO ?",
              answer:
                "Le SEO est un investissement à long terme. Les premiers résultats sont généralement visibles après 3 à 6 mois, mais les effets les plus significatifs se manifestent souvent après 6 à 12 mois de travail continu. Cela dépend également de la concurrence dans votre secteur et de l'état initial de votre site.",
            },
            {
              question: "Comment mesurez-vous le succès d'une campagne SEO ?",
              answer:
                "Nous mesurons le succès à travers plusieurs indicateurs clés : l'augmentation du trafic organique, l'amélioration des positions pour les mots-clés ciblés, l'augmentation du taux de conversion, la croissance des leads ou des ventes générés par le trafic organique, et le retour sur investissement global.",
            },
            {
              question: "Le SEO fonctionne-t-il pour tous les types d'entreprises ?",
              answer:
                "Oui, le SEO peut bénéficier à pratiquement tous les types d'entreprises, mais la stratégie doit être adaptée à votre secteur, votre audience et vos objectifs spécifiques. Certains secteurs très concurrentiels peuvent nécessiter plus de temps et d'investissement pour obtenir des résultats significatifs.",
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
    </div>
  )
}

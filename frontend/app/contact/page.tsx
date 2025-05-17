import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Calendar, Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="container mx-auto py-12 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-5xl font-bold">Contactez-Nous</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Nous sommes là pour répondre à toutes vos questions et vous accompagner dans vos projets digitaux.
        </p>
      </section>

      {/* Contact Information and Form */}
      <section className="grid md:grid-cols-2 gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Nos Coordonnées</h2>
            <div className="space-y-4">
              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <MapPin className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg">Adresse</h3>
                    <p className="text-muted-foreground">
                      123 Avenue des Champs-Élysées
                      <br />
                      75008 Paris, France
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <Phone className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg">Téléphone</h3>
                    <p className="text-muted-foreground">+33 (0)1 23 45 67 89</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <Mail className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg">Email</h3>
                    <p className="text-muted-foreground">contact@agencedigitale.com</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-start gap-4 p-6">
                  <Calendar className="h-6 w-6 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-lg">Horaires</h3>
                    <p className="text-muted-foreground">
                      Lundi - Vendredi: 9h00 - 18h00
                      <br />
                      Samedi - Dimanche: Fermé
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold mb-6">Suivez-Nous</h2>
            <div className="flex gap-4">
              {[
                {
                  name: "Facebook",
                  icon: "M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z",
                },
                {
                  name: "Twitter",
                  icon: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z",
                },
                {
                  name: "LinkedIn",
                  icon: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
                {
                  name: "Instagram",
                  icon: "M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z",
                },
              ].map((social, index) => (
                <Link
                  key={index}
                  href="#"
                  className="w-12 h-12 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                  aria-label={social.name}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-5 w-5"
                  >
                    <path d={social.icon} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-bold mb-6">Envoyez-Nous un Message</h2>
          <Tabs defaultValue="contact" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="contact">Contact</TabsTrigger>
              <TabsTrigger value="devis">Demande de Devis</TabsTrigger>
            </TabsList>

            <TabsContent value="contact" className="mt-0">
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Prénom</Label>
                      <Input id="first-name" placeholder="Jean" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Nom</Label>
                      <Input id="last-name" placeholder="Dupont" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="jean.dupont@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Téléphone</Label>
                    <Input id="phone" placeholder="+33 6 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Sujet</Label>
                    <Input id="subject" placeholder="Demande d'information" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Votre message..." className="min-h-[150px]" />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Envoyer le message
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="devis" className="mt-0">
              <form className="space-y-6">
                <div className="grid gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Nom de l'entreprise</Label>
                      <Input id="company-name" placeholder="Entreprise SAS" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contact-name">Nom du contact</Label>
                      <Input id="contact-name" placeholder="Jean Dupont" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="devis-email">Email</Label>
                    <Input id="devis-email" type="email" placeholder="jean.dupont@entreprise.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="devis-phone">Téléphone</Label>
                    <Input id="devis-phone" placeholder="+33 6 12 34 56 78" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-type">Type de projet</Label>
                    <select id="project-type" className="w-full p-2 border rounded-md">
                      <option value="">Sélectionnez une option</option>
                      <option value="website">Site Web</option>
                      <option value="ecommerce">E-commerce</option>
                      <option value="seo">SEO</option>
                      <option value="social">Gestion des Réseaux Sociaux</option>
                      <option value="other">Autre</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="budget">Budget estimé</Label>
                    <select id="budget" className="w-full p-2 border rounded-md">
                      <option value="">Sélectionnez une option</option>
                      <option value="less-5k">Moins de 5 000€</option>
                      <option value="5k-10k">5 000€ - 10 000€</option>
                      <option value="10k-20k">10 000€ - 20 000€</option>
                      <option value="more-20k">Plus de 20 000€</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="project-description">Description du projet</Label>
                    <Textarea
                      id="project-description"
                      placeholder="Décrivez votre projet en détail..."
                      className="min-h-[150px]"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full">
                  Demander un devis
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Map Section */}
      <section>
        <div className="h-96 bg-muted rounded-lg flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Carte interactive</p>
            <p className="text-sm text-muted-foreground">(Intégration Google Maps)</p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center">Questions Fréquentes</h2>
        <Accordion type="single" collapsible className="w-full">
          {[
            {
              question: "Quels sont vos délais de réponse ?",
              answer:
                "Nous nous engageons à répondre à toutes les demandes dans un délai de 24 à 48 heures ouvrées. Pour les demandes urgentes, n'hésitez pas à nous contacter par téléphone.",
            },
            {
              question: "Proposez-vous des rendez-vous en visioconférence ?",
              answer:
                "Oui, nous proposons des rendez-vous en visioconférence via Zoom, Google Meet ou Microsoft Teams selon votre préférence. C'est une option pratique pour les clients qui ne peuvent pas se déplacer à nos bureaux.",
            },
            {
              question: "Comment se déroule la première consultation ?",
              answer:
                "La première consultation est gratuite et dure environ 30 minutes. Elle nous permet de comprendre vos besoins, vos objectifs et de vous présenter nos services. À l'issue de cette consultation, nous vous proposerons une solution adaptée à votre projet.",
            },
            {
              question: "Travaillez-vous avec des entreprises à l'international ?",
              answer:
                "Oui, nous travaillons avec des clients du monde entier. Notre équipe est multilingue et peut communiquer en français, anglais et espagnol. Nous adaptons nos horaires pour accommoder les différents fuseaux horaires.",
            },
          ].map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Live Chat Section */}
      <section className="text-center space-y-6">
        <h2 className="text-3xl font-bold">Besoin d'une Réponse Rapide ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Notre équipe est disponible en chat en direct pendant nos heures d'ouverture.
        </p>
        <Button size="lg">Démarrer un chat</Button>
      </section>
    </div>
  )
}

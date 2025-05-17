import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, BarChart, Search } from "lucide-react"

export default function DigitalPostureWidget() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Analysez votre posture digitale</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Découvrez comment votre présence en ligne se compare à celle de vos concurrents et identifiez les
            opportunités d'amélioration.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Analyse SEO complète</h3>
                <p className="text-muted-foreground">
                  Évaluation de votre référencement et recommandations d'optimisation
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <BarChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Analyse de la concurrence</h3>
                <p className="text-muted-foreground">
                  Comparaison avec vos concurrents directs et identification des opportunités
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <LineChart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-bold">Recommandations personnalisées</h3>
                <p className="text-muted-foreground">Plan d'action concret pour améliorer votre présence digitale</p>
              </div>
            </div>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Analyseur de Posture Digitale</CardTitle>
            <CardDescription>
              Obtenez une analyse gratuite de votre site web et de votre présence en ligne
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="website">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="website">Site Web</TabsTrigger>
                <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
              </TabsList>

              <TabsContent value="website" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="website-url">URL de votre site web</Label>
                  <Input id="website-url" placeholder="https://www.votresite.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="competitor">URL d'un concurrent (optionnel)</Label>
                  <Input id="competitor" placeholder="https://www.concurrent.com" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Votre email</Label>
                  <Input id="email" type="email" placeholder="vous@example.com" />
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="facebook">Page Facebook</Label>
                  <Input id="facebook" placeholder="https://www.facebook.com/votrepage" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instagram">Compte Instagram</Label>
                  <Input id="instagram" placeholder="https://www.instagram.com/votrecompte" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="social-email">Votre email</Label>
                  <Input id="social-email" type="email" placeholder="vous@example.com" />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Obtenir mon analyse gratuite</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

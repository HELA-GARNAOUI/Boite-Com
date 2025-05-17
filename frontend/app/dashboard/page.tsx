import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { BarChart, LineChart, PieChart } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-12 space-y-12">
      {/* Header */}
      <section className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-4xl font-bold">Tableau de Bord</h1>
          <p className="text-muted-foreground mt-1">
            Bienvenue, Entreprise SAS. Voici un aperçu de vos projets et performances.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Exporter
          </Button>
          <Button size="sm">Nouveau Projet</Button>
        </div>
      </section>

      {/* Overview Cards */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "Projets Actifs",
            value: "3",
            description: "+1 depuis le mois dernier",
            trend: "positive",
          },
          {
            title: "Trafic Mensuel",
            value: "12,543",
            description: "+23% depuis le mois dernier",
            trend: "positive",
          },
          {
            title: "Taux de Conversion",
            value: "3.2%",
            description: "-0.5% depuis le mois dernier",
            trend: "negative",
          },
          {
            title: "Score SEO",
            value: "78/100",
            description: "+12 points depuis le mois dernier",
            trend: "positive",
          },
        ].map((card, index) => (
          <Card key={index}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{card.value}</div>
              <p className={`text-xs mt-1 ${card.trend === "positive" ? "text-green-500" : "text-red-500"}`}>
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* Analytics Dashboard */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Analyse de Performance</CardTitle>
            <CardDescription>Aperçu de vos performances digitales sur les 30 derniers jours</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="traffic">
              <TabsList className="mb-4">
                <TabsTrigger value="traffic">Trafic</TabsTrigger>
                <TabsTrigger value="conversions">Conversions</TabsTrigger>
                <TabsTrigger value="social">Réseaux Sociaux</TabsTrigger>
              </TabsList>

              <TabsContent value="traffic" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <LineChart className="h-16 w-16 mb-2" />
                    <p>Graphique d'analyse du trafic</p>
                    <p className="text-sm">(Données simulées)</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { label: "Visiteurs Uniques", value: "8,245", change: "+18%" },
                    { label: "Pages Vues", value: "32,456", change: "+12%" },
                    { label: "Temps Moyen", value: "2m 45s", change: "+5%" },
                  ].map((stat, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <div className="text-sm font-medium text-muted-foreground">{stat.label}</div>
                        <div className="text-2xl font-bold mt-1">{stat.value}</div>
                        <div className="text-xs text-green-500 mt-1">{stat.change}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="conversions" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <BarChart className="h-16 w-16 mb-2" />
                    <p>Graphique d'analyse des conversions</p>
                    <p className="text-sm">(Données simulées)</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="h-[300px] flex items-center justify-center bg-muted rounded-md">
                  <div className="flex flex-col items-center text-muted-foreground">
                    <PieChart className="h-16 w-16 mb-2" />
                    <p>Graphique d'analyse des réseaux sociaux</p>
                    <p className="text-sm">(Données simulées)</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </section>

      {/* Project Status */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Statut des Projets</h2>
          <Button variant="outline" size="sm">
            Voir tous les projets
          </Button>
        </div>

        <div className="space-y-4">
          {[
            {
              name: "Refonte Site Web",
              status: "En cours",
              progress: 65,
              dueDate: "15/07/2023",
              statusColor: "bg-amber-500",
            },
            {
              name: "Campagne SEO",
              status: "En cours",
              progress: 40,
              dueDate: "30/08/2023",
              statusColor: "bg-amber-500",
            },
            {
              name: "Stratégie Réseaux Sociaux",
              status: "Terminé",
              progress: 100,
              dueDate: "01/05/2023",
              statusColor: "bg-green-500",
            },
          ].map((project, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium">{project.name}</h3>
                      <Badge className={project.statusColor}>{project.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Échéance: {project.dueDate}</p>
                  </div>

                  <div className="w-full md:w-1/3 space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progression</span>
                      <span>{project.progress}%</span>
                    </div>
                    <Progress value={project.progress} className="h-2" />
                  </div>

                  <Button variant="outline" size="sm">
                    Détails
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Digital Posture Analysis */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>Analyse de Posture Digitale</CardTitle>
            <CardDescription>Évaluation de votre présence en ligne et recommandations d'amélioration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  category: "SEO",
                  score: 78,
                  status: "Bon",
                  recommendations: [
                    "Optimiser les balises meta sur 5 pages",
                    "Améliorer la vitesse de chargement mobile",
                  ],
                },
                {
                  category: "Expérience Utilisateur",
                  score: 85,
                  status: "Excellent",
                  recommendations: ["Simplifier le processus d'inscription", "Ajouter des témoignages clients"],
                },
                {
                  category: "Présence Sociale",
                  score: 62,
                  status: "Moyen",
                  recommendations: ["Augmenter la fréquence de publication", "Engager davantage avec la communauté"],
                },
              ].map((analysis, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{analysis.category}</CardTitle>
                    <div className="flex items-center gap-2">
                      <div className="text-2xl font-bold">{analysis.score}/100</div>
                      <Badge
                        className={
                          analysis.score >= 80 ? "bg-green-500" : analysis.score >= 60 ? "bg-amber-500" : "bg-red-500"
                        }
                      >
                        {analysis.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <h4 className="text-sm font-medium mb-2">Recommandations:</h4>
                    <ul className="text-sm space-y-1">
                      {analysis.recommendations.map((rec, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" size="sm" className="w-full">
                      Voir l'analyse complète
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            <div className="flex justify-center">
              <Button>Générer un rapport complet</Button>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Support Tickets */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Tickets de Support</h2>
          <Button variant="outline" size="sm">
            Nouveau Ticket
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">ID</th>
                    <th className="text-left p-4 font-medium">Sujet</th>
                    <th className="text-left p-4 font-medium">Statut</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "T-1234",
                      subject: "Problème de connexion",
                      status: "Ouvert",
                      date: "12/05/2023",
                      statusColor: "bg-amber-500",
                    },
                    {
                      id: "T-1235",
                      subject: "Mise à jour de contenu",
                      status: "En attente",
                      date: "08/05/2023",
                      statusColor: "bg-blue-500",
                    },
                    {
                      id: "T-1236",
                      subject: "Erreur 404 sur page produit",
                      status: "Résolu",
                      date: "01/05/2023",
                      statusColor: "bg-green-500",
                    },
                  ].map((ticket, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{ticket.id}</td>
                      <td className="p-4">{ticket.subject}</td>
                      <td className="p-4">
                        <Badge className={ticket.statusColor}>{ticket.status}</Badge>
                      </td>
                      <td className="p-4">{ticket.date}</td>
                      <td className="p-4">
                        <Button variant="ghost" size="sm">
                          Voir
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Invoice History */}
      <section className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Historique des Factures</h2>
          <Button variant="outline" size="sm">
            Voir toutes les factures
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-medium">Facture</th>
                    <th className="text-left p-4 font-medium">Date</th>
                    <th className="text-left p-4 font-medium">Montant</th>
                    <th className="text-left p-4 font-medium">Statut</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    {
                      id: "INV-2023-001",
                      date: "01/05/2023",
                      amount: "1 500,00 €",
                      status: "Payée",
                      statusColor: "bg-green-500",
                    },
                    {
                      id: "INV-2023-002",
                      date: "01/06/2023",
                      amount: "1 500,00 €",
                      status: "En attente",
                      statusColor: "bg-amber-500",
                    },
                    {
                      id: "INV-2023-003",
                      date: "01/07/2023",
                      amount: "1 500,00 €",
                      status: "À venir",
                      statusColor: "bg-blue-500",
                    },
                  ].map((invoice, index) => (
                    <tr key={index} className="border-b">
                      <td className="p-4">{invoice.id}</td>
                      <td className="p-4">{invoice.date}</td>
                      <td className="p-4">{invoice.amount}</td>
                      <td className="p-4">
                        <Badge className={invoice.statusColor}>{invoice.status}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button variant="ghost" size="sm">
                            Voir
                          </Button>
                          <Button variant="ghost" size="sm">
                            Télécharger
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}

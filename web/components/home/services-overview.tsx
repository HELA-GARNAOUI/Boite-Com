import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Globe, Search, Share2, Database, Palette } from "lucide-react"

export function ServicesOverview() {
  const services = [
    {
      title: "Web Development",
      description: "Custom websites and web applications tailored to your business needs.",
      icon: <Globe className="h-10 w-10 text-primary" />,
      link: "/services/web-development",
    },
    {
      title: "SEO Services",
      description: "Improve your search engine rankings and drive more organic traffic.",
      icon: <Search className="h-10 w-10 text-primary" />,
      link: "/services/seo",
    },
    {
      title: "Social Media",
      description: "Engage with your audience and build your brand on social platforms.",
      icon: <Share2 className="h-10 w-10 text-primary" />,
      link: "/services/social-media",
    },
    {
      title: "ERP Integration",
      description: "Seamless integration with Odoo and other ERP systems.",
      icon: <Database className="h-10 w-10 text-primary" />,
      link: "/services/erp-integration",
    },
    {
      title: "Branding",
      description: "Create a strong brand identity that resonates with your audience.",
      icon: <Palette className="h-10 w-10 text-primary" />,
      link: "/services/branding",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Our Services</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We offer a comprehensive range of digital services to help your business grow.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center justify-center">{service.icon}</div>
                <CardTitle className="text-xl text-center">{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-center">{service.description}</CardDescription>
              </CardContent>
              <CardFooter className="pt-4 flex justify-center">
                <Button asChild variant="outline">
                  <Link href={service.link}>Learn More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

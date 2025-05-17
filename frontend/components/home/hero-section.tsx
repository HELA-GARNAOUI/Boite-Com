import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-16 md:py-24">
      <div className="flex flex-col lg:flex-row items-center gap-12">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Transformez Votre <span className="text-primary">Présence Digitale</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Nous créons des expériences digitales exceptionnelles qui connectent votre marque avec votre audience et
            stimulent votre croissance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="/contact">Demander un devis</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/services/web-development">Découvrir nos services</Link>
            </Button>
          </div>
          <div className="pt-8">
            <p className="text-sm text-muted-foreground mb-4">Ils nous font confiance :</p>
            <div className="flex flex-wrap gap-8 items-center">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <img
                    src={`/placeholder.svg?height=30&width=120&text=Client+${i}`}
                    alt={`Client ${i}`}
                    className="h-8"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full h-[400px] md:h-[500px] bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg overflow-hidden">
            <img
              src="/placeholder.svg?height=500&width=600&text=Digital+Agency"
              alt="Digital Agency"
              className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/placeholder.svg?height=300&width=400&text=Hero+Image"
                alt="Hero"
                className="w-3/4 h-auto shadow-xl rounded-lg"
              />
            </div>
          </div>
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
          <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-xl"></div>
        </div>
      </div>
    </section>
  )
}

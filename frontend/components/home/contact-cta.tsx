import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ContactCTA() {
  return (
    <section className="container mx-auto px-4 py-16">
      <div className="bg-primary/10 rounded-3xl p-8 md:p-16 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer votre présence digitale ?</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à
          atteindre vos objectifs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/contact">Demander un devis gratuit</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

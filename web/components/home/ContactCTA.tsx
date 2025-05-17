import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function ContactCTA() {
  return (
    <section className="bg-indigo-600 text-white">
      <div className="container-custom py-16 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-2">Ready to Transform Your Digital Presence?</h2>
          <p className="mt-6 text-lg leading-8 text-indigo-100">
            Let's discuss how our services can help your business grow. Contact us today for a free consultation.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-indigo-600 hover:bg-indigo-50">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                Explore Our Services
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

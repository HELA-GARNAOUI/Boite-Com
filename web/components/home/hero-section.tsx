import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Digital Solutions for Your Business
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                We help businesses grow with innovative digital strategies, web development, and marketing solutions.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg">
                <Link href="/contact">Get Started</Link>
              </Button>
              <Button variant="outline" size="lg">
                <Link href="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative h-[300px] w-full md:h-[400px] lg:h-[500px]">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/50 rounded-lg opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-3/4 w-3/4 rounded-lg bg-muted"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

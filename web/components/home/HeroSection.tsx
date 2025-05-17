"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <div className="relative isolate overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>

      <div className="container-custom py-24 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="heading-1 text-gray-900 dark:text-white">Transform Your Digital Presence</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            We create innovative digital solutions that help businesses grow, engage customers, and stand out in today's competitive landscape.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link href="/contact">
              <Button size="lg" className="rounded-md px-6">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/services" className="text-sm font-semibold leading-6 text-gray-900 dark:text-white">
              Explore our services <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {[
            { value: "10+", label: "Years of Experience" },
            { value: "200+", label: "Completed Projects" },
            { value: "50+", label: "Happy Clients" },
            { value: "15+", label: "Industry Awards" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <h2 className="text-4xl font-bold tracking-tight text-indigo-600 dark:text-indigo-400">{stat.value}</h2>
              <p className="mt-2 text-sm font-semibold text-gray-600 dark:text-gray-300">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Background gradient (bottom) */}
      <div
        className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        aria-hidden="true"
      >
        <div
          className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
          }}
        />
      </div>
    </div>
  )
}

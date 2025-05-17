"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    category: "Web Development",
    description: "A fully responsive e-commerce platform with advanced filtering and payment integration.",
    image: "/placeholder.svg?height=600&width=800",
    link: "/projects/ecommerce-platform",
  },
  {
    id: 2,
    title: "Healthcare App",
    category: "Mobile Development",
    description: "A healthcare application that connects patients with doctors for virtual consultations.",
    image: "/placeholder.svg?height=600&width=800",
    link: "/projects/healthcare-app",
  },
  {
    id: 3,
    title: "Real Estate Website",
    category: "Web Development",
    description: "A modern real estate website with property listings, search functionality, and virtual tours.",
    image: "/placeholder.svg?height=600&width=800",
    link: "/projects/real-estate-website",
  },
  {
    id: 4,
    title: "Restaurant Ordering System",
    category: "Web Application",
    description: "An online ordering system for restaurants with menu management and order tracking.",
    image: "/placeholder.svg?height=600&width=800",
    link: "/projects/restaurant-ordering",
  },
]

export default function ProjectsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % projects.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + projects.length) % projects.length)
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  // Auto-advance slides
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <section className="bg-gray-50 dark:bg-gray-800/50 py-16 md:py-24">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="heading-2 text-gray-900 dark:text-white">Featured Projects</h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Take a look at some of our recent work that showcases our expertise and creativity.
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="relative h-[500px] md:h-[600px] w-full overflow-hidden rounded-xl">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                  index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <div className="absolute inset-0 bg-black/50 z-10" />
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 md:p-12 text-white">
                  <span className="text-sm font-medium text-indigo-300">{project.category}</span>
                  <h3 className="mt-2 text-2xl md:text-3xl font-bold">{project.title}</h3>
                  <p className="mt-2 max-w-xl text-gray-200">{project.description}</p>
                  <div className="mt-6">
                    <Link href={project.link}>
                      <Button
                        variant="outline"
                        className="bg-transparent text-white border-white hover:bg-white hover:text-gray-900"
                      >
                        View Project
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation buttons */}
          <div className="absolute top-1/2 left-4 -translate-y-1/2 z-30">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 rounded-full"
              onClick={prevSlide}
              aria-label="Previous project"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 right-4 -translate-y-1/2 z-30">
            <Button
              variant="outline"
              size="icon"
              className="bg-white/20 backdrop-blur-sm border-0 text-white hover:bg-white/30 rounded-full"
              onClick={nextSlide}
              aria-label="Next project"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex space-x-2">
            {projects.map((_, index) => (
              <button
                key={index}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  index === currentIndex ? "bg-white w-8" : "bg-white/50"
                }`}
                onClick={() => {
                  setCurrentIndex(index)
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link href="/projects">
            <Button>View All Projects</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

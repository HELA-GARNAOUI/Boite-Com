"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { Menu, ChevronDown, MessageCircle, Globe } from "lucide-react"
import { ModeToggle } from "@/components/mode-toggle"
import Cookies from "js-cookie"

interface NavigationItem {
  name: string
  href: string
  children?: NavigationItem[]
}

export default function ClientHeader() {
  const [mounted, setMounted] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Check if user is authenticated
    const checkAuth = () => {
      const token = document.cookie.includes('token=')
      setIsAuthenticated(token)
    }
    checkAuth()
  }, [])

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container mx-auto flex items-center justify-between p-4">
          <div className="flex lg:flex-1">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">DigiFlow</span>
              <span className="text-sm text-muted-foreground">Agency</span>
            </div>
          </div>
        </nav>
      </header>
    )
  }

  const navigation: NavigationItem[] = [
    { name: "Home", href: "/" },
    { 
      name: "Services", 
      href: "/services",
      children: [
        { name: "Web Development", href: "/services/web-development" },
        { name: "SEO", href: "/services/seo" },
        { name: "Social Media", href: "/services/social-media" }
      ]
    },
    { name: "Blog", href: "/blog" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto flex items-center justify-between p-4">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">DigiFlow</span>
            <span className="text-sm text-muted-foreground">Agency</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon" aria-label="Menu">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <SheetTitle>Menu</SheetTitle>
            <div className="flex flex-col gap-6 mt-6">
              {navigation.map((item: NavigationItem) => (
                <div key={item.name} className="space-y-3">
                  {item.children ? (
                    <>
                      <div className="font-medium">{item.name}</div>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child: NavigationItem) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className="block text-muted-foreground hover:text-foreground"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className="block font-medium hover:text-primary"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="flex flex-col gap-2 mt-4">
                <Button variant="ghost" size="icon" className="relative self-start" aria-label="Chat">
                  <MessageCircle className="h-5 w-5" />
                  <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
                    1
                  </span>
                </Button>
                {isAuthenticated ? (
                  <>
                    <Button asChild>
                      <Link href="/dashboard">Client Area</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/contact">Prendre un devis</Link>
                    </Button>
                  </>
                ) : (
                  <>
                    <Button asChild>
                      <Link href="/contact">Prendre un devis</Link>
                    </Button>
                    <Button variant="outline" asChild>
                      <Link href="/client/login">Login</Link>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>

        {/* Desktop menu */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item: NavigationItem) => (
            <div key={item.name} className="relative">
              {item.children ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-1">
                      {item.name}
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center" className="w-48">
                    {item.children.map((child: NavigationItem) => (
                      <DropdownMenuItem key={child.name} asChild>
                        <Link href={child.href}>{child.name}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
                  {item.name}
                </Link>
              )}
            </div>
          ))}
        </div>

        {/* Right section */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          {/* Language Selector Placeholder (using DropdownMenu for consistent styling) */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Select language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-20">
              <DropdownMenuItem>FR</DropdownMenuItem>
              <DropdownMenuItem>AR</DropdownMenuItem>
              <DropdownMenuItem>An</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button variant="ghost" size="icon" className="relative" aria-label="Chat">
            <MessageCircle className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              1
            </span>
          </Button>
          <ModeToggle />

          {isAuthenticated ? (
            <>
              <Button asChild>
                <Link href="/dashboard">Client Area</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Prendre un devis</Link>
              </Button>
            </>
          ) : (
            <>
              <Button variant="outline" asChild>
                <Link href="/client/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/contact">Prendre un devis</Link>
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
} 
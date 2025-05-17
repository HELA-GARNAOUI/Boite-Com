"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Menu, X, Globe, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { useUI } from "@/components/Providers"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/services" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

const languages = [
  { code: "fr", name: "Français" },
  { code: "en", name: "English" },
  { code: "ar", name: "العربية" },
]

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { isMobileMenuOpen, toggleMobileMenu, closeMobileMenu } = useUI()
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [currentLang, setCurrentLang] = useState("fr")

  // After mounting, we can safely show the UI that depends on the theme
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    // Close mobile menu when navigating
    closeMobileMenu()
  }, [pathname, closeMobileMenu])

  const handleLanguageChange = (langCode: string) => {
    setCurrentLang(langCode)
    // In a real implementation, this would update the locale in the URL
    // For now, we'll just simulate the change
    console.log(`Language changed to ${langCode}`)
    // router.push(pathname, { locale: langCode })
  }

  return (
    <header className="bg-white dark:bg-gray-900 sticky top-0 z-50 shadow-sm">
      <nav className="container-custom mx-auto flex items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2">
            <span className="sr-only">DigiFlow</span>
            <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
              DF
            </div>
            <span className="text-xl font-bold">DigiFlow</span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-200"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-semibold leading-6 ${
                pathname === item.href
                  ? "text-indigo-600 dark:text-indigo-400"
                  : "text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted && (theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />)}
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Change language">
                <Globe className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => handleLanguageChange(lang.code)}
                  className={currentLang === lang.code ? "bg-muted" : ""}
                >
                  {lang.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/dashboard">
            <Button variant="outline">Client Area</Button>
          </Link>

          <Link href="/contact">
            <Button>Get Started</Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`lg:hidden ${isMobileMenuOpen ? "fixed inset-0 z-50" : "hidden"}`}>
        <div className="fixed inset-0 bg-black/30" aria-hidden="true" onClick={closeMobileMenu} />

        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white dark:bg-gray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={closeMobileMenu}>
              <span className="sr-only">DigiFlow</span>
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-xs">
                DF
              </div>
              <span className="text-xl font-bold">DigiFlow</span>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-200"
              onClick={closeMobileMenu}
            >
              <span className="sr-only">Close menu</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 ${
                      pathname === item.href
                        ? "text-indigo-600 dark:text-indigo-400"
                        : "text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400"
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>

              <div className="py-6 space-y-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    aria-label="Toggle theme"
                    className="justify-start w-full"
                  >
                    {mounted &&
                      (theme === "dark" ? <Sun className="h-5 w-5 mr-2" /> : <Moon className="h-5 w-5 mr-2" />)}
                    <span>Toggle theme</span>
                  </Button>
                </div>

                <div className="space-y-1">
                  <p className="px-2 text-sm font-medium">Language</p>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageChange(lang.code)}
                      className={`w-full text-left px-2 py-1.5 text-sm rounded-md ${
                        currentLang === lang.code
                          ? "bg-indigo-100 text-indigo-900 dark:bg-indigo-900/50 dark:text-indigo-100"
                          : "hover:bg-gray-100 dark:hover:bg-gray-800"
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                <Link href="/dashboard" className="w-full">
                  <Button variant="outline" className="w-full">
                    Client Area
                  </Button>
                </Link>

                <Link href="/contact" className="w-full">
                  <Button className="w-full">Get Started</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

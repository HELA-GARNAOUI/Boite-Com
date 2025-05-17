"use client"

import { createContext, useContext, useState, type ReactNode } from "react"
import { ThemeProvider } from "next-themes"
import { SWRConfig } from "swr"

// Auth Context
type User = {
  id: string
  name: string
  email: string
  role: "admin" | "client"
} | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  isLoading: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: false,
})

export const useAuth = () => useContext(AuthContext)

// UI Context
type UIContextType = {
  isMobileMenuOpen: boolean
  toggleMobileMenu: () => void
  closeMobileMenu: () => void
}

const UIContext = createContext<UIContextType>({
  isMobileMenuOpen: false,
  toggleMobileMenu: () => {},
  closeMobileMenu: () => {},
})

export const useUI = () => useContext(UIContext)

// Combined Providers
export function Providers({ children }: { children: ReactNode }) {
  // Auth state
  const [user, setUser] = useState<User>(null)
  const [isLoading, setIsLoading] = useState(false)

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Mock login - replace with actual API call
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setUser({
        id: "1",
        name: "John Doe",
        email,
        role: "client",
      })
    } catch (error) {
      console.error("Login failed:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
  }

  // UI state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev)
  const closeMobileMenu = () => setIsMobileMenuOpen(false)

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
          revalidateOnFocus: false,
        }}
      >
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
          <UIContext.Provider value={{ isMobileMenuOpen, toggleMobileMenu, closeMobileMenu }}>
            {children}
          </UIContext.Provider>
        </AuthContext.Provider>
      </SWRConfig>
    </ThemeProvider>
  )
}

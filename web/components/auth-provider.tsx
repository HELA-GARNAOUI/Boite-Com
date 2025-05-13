"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import type { Session } from "next-auth"
import { signIn, signOut } from "next-auth/react"

type AuthContextType = {
  session: Session | null
  status: "loading" | "authenticated" | "unauthenticated"
  signIn: (credentials?: Record<string, string>) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null)
  const [status, setStatus] = useState<"loading" | "authenticated" | "unauthenticated">("loading")
  const router = useRouter()

  useEffect(() => {
    // Fetch session on mount
    const fetchSession = async () => {
      try {
        const res = await fetch("/api/auth/session")
        const data = await res.json()

        if (data && data.session) {
          setSession(data.session)
          setStatus("authenticated")
        } else {
          setSession(null)
          setStatus("unauthenticated")
        }
      } catch (error) {
        console.error("Failed to fetch session:", error)
        setStatus("unauthenticated")
      }
    }

    fetchSession()
  }, [])

  const handleSignIn = async (credentials?: Record<string, string>) => {
    try {
      setStatus("loading")
      await signIn("odoo", { redirect: false, ...credentials })
      router.refresh()
      setStatus("authenticated")
    } catch (error) {
      console.error("Sign in failed:", error)
      setStatus("unauthenticated")
    }
  }

  const handleSignOut = async () => {
    try {
      setStatus("loading")
      await signOut({ redirect: false })
      router.refresh()
      setStatus("unauthenticated")
    } catch (error) {
      console.error("Sign out failed:", error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        status,
        signIn: handleSignIn,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

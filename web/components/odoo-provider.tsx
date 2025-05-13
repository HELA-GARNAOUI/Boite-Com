"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { OdooClient } from "@/lib/odoo-client"

type OdooContextType = {
  client: OdooClient | null
  isConnected: boolean
  isLoading: boolean
  error: Error | null
}

const OdooContext = createContext<OdooContextType | undefined>(undefined)

export function OdooProvider({ children }: { children: React.ReactNode }) {
  const { session, status } = useAuth()
  const [client, setClient] = useState<OdooClient | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (status === "authenticated" && session) {
      const initOdoo = async () => {
        try {
          setIsLoading(true)
          const odooClient = new OdooClient({
            baseUrl: process.env.NEXT_PUBLIC_ODOO_URL || "",
            db: process.env.NEXT_PUBLIC_ODOO_DB || "",
            sessionId: session.odooSession,
          })

          await odooClient.connect()
          setClient(odooClient)
          setIsConnected(true)
          setError(null)
        } catch (err) {
          console.error("Failed to connect to Odoo:", err)
          setError(err instanceof Error ? err : new Error("Failed to connect to Odoo"))
          setIsConnected(false)
        } finally {
          setIsLoading(false)
        }
      }

      initOdoo()
    } else {
      setClient(null)
      setIsConnected(false)
      setIsLoading(false)
    }
  }, [session, status])

  return (
    <OdooContext.Provider
      value={{
        client,
        isConnected,
        isLoading,
        error,
      }}
    >
      {children}
    </OdooContext.Provider>
  )
}

export const useOdoo = () => {
  const context = useContext(OdooContext)
  if (context === undefined) {
    throw new Error("useOdoo must be used within an OdooProvider")
  }
  return context
}

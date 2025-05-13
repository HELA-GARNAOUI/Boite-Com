import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/components/auth-provider"
import { NextIntlClientProvider } from "next-intl"
import { getMessages } from "@/lib/get-messages"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Agency Dashboard",
  description: "Agency website with Odoo integration",
    generator: 'v0.dev'
}

export default async function RootLayout({
  children,
  params: { locale = "en" },
}: {
  children: React.ReactNode
  params: { locale?: string }
}) {
  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <AuthProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              {children}
            </ThemeProvider>
          </AuthProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

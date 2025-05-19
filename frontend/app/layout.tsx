import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import HeaderWrapper from "@/components/layout/header-wrapper"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { ChatWidget } from "@/components/chat/chat-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DigiFlow Agency - Transform Your Online Presence",
  description: "Full-service digital agency specializing in web development, SEO, and social media management.",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        <div id="app-root">
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
            <div className="flex min-h-screen flex-col">
              <HeaderWrapper />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
            <Toaster />
            <ChatWidget />
          </ThemeProvider>
        </div>
      </body>
    </html>
  )
}

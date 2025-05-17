import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import { Providers } from "@/components/Providers"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Digital Agency | Creative Solutions for Your Business",
  description:
    "We provide web development, SEO, and social media management services to help your business grow online.",
  keywords: "digital agency, web development, SEO, social media management",
  openGraph: {
    title: "Digital Agency | Creative Solutions for Your Business",
    description:
      "We provide web development, SEO, and social media management services to help your business grow online.",
    url: "https://youragency.com",
    siteName: "Digital Agency",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Digital Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Agency | Creative Solutions for Your Business",
    description:
      "We provide web development, SEO, and social media management services to help your business grow online.",
    images: ["/images/twitter-image.jpg"],
  },
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}

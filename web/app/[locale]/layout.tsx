import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"
import Header from "@/components/navigation/Header"
import Footer from "@/components/navigation/Footer"
import { Providers } from "@/components/Providers"
import { NextIntlClientProvider } from "next-intl"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "DigiFlow | Creative Solutions for Your Business",
  description:
    "We provide web development, SEO, and social media management services to help your business grow online.",
  keywords: "digital agency, web development, SEO, social media management",
  openGraph: {
    title: "DigiFlow | Creative Solutions for Your Business",
    description:
      "We provide web development, SEO, and social media management services to help your business grow online.",
    url: "https://digiflow.com",
    siteName: "DigiFlow",
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "DigiFlow",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DigiFlow | Creative Solutions for Your Business",
    description:
      "We provide web development, SEO, and social media management services to help your business grow online.",
    images: ["/images/twitter-image.jpg"],
  },
}

async function getMessages(locale: string) {
  try {
    // In a real app, you would load messages from a file or API
    // For this example, we'll use a simple object
    const messages = {
      en: {
        home: {
          title: "Transform Your Digital Presence",
          subtitle:
            "We create innovative digital solutions that help businesses grow, engage customers, and stand out in today's competitive landscape.",
          cta: "Get Started",
          explore: "Explore our services",
        },
        navigation: {
          home: "Home",
          services: "Services",
          blog: "Blog",
          contact: "Contact",
          clientArea: "Client Area",
        },
      },
      fr: {
        home: {
          title: "Transformez Votre Présence Numérique",
          subtitle:
            "Nous créons des solutions numériques innovantes qui aident les entreprises à se développer, à engager les clients et à se démarquer dans le paysage concurrentiel d'aujourd'hui.",
          cta: "Commencer",
          explore: "Explorez nos services",
        },
        navigation: {
          home: "Accueil",
          services: "Services",
          blog: "Blog",
          contact: "Contact",
          clientArea: "Espace Client",
        },
      },
      ar: {
        home: {
          title: "حوّل وجودك الرقمي",
          subtitle:
            "نحن نبتكر حلولًا رقمية مبتكرة تساعد الشركات على النمو وإشراك العملاء والتميز في المشهد التنافسي اليوم.",
          cta: "ابدأ الآن",
          explore: "استكشف خدماتنا",
        },
        navigation: {
          home: "الرئيسية",
          services: "الخدمات",
          blog: "المدونة",
          contact: "اتصل بنا",
          clientArea: "منطقة العميل",
        },
      },
    }

    return messages[locale as keyof typeof messages] || messages.en
  } catch (error) {
    console.error("Failed to load messages:", error)
    return {}
  }
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  const messages = await getMessages(locale)

  // Set the text direction based on the locale
  const dir = locale === "ar" ? "rtl" : "ltr"

  return (
    <html lang={locale} dir={dir} suppressHydrationWarning>
      <body className={inter.className}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

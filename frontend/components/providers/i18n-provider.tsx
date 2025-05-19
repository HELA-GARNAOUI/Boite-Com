'use client'

import { PropsWithChildren, useEffect, useState } from 'react'
import { createI18nClient } from 'next-international/client'
import { locales } from '@/lib/constants'

const translations = {
  fr: () => import('../../translations/fr.json'),
  en: () => import('../../translations/en.json'),
  ar: () => import('../../translations/ar.json'),
}

const { I18nProviderClient } = createI18nClient(translations)

export function I18nProvider({ children, locale }: PropsWithChildren<{ locale: string }>) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="flex min-h-screen flex-col">
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
        <main className="flex-1">
          <div className="container mx-auto p-4">
            <div className="flex items-center justify-center h-[50vh]">
              <div className="animate-pulse">Loading...</div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <I18nProviderClient locale={locale} fallback={<div>Loading...</div>}>
      {children}
    </I18nProviderClient>
  )
} 
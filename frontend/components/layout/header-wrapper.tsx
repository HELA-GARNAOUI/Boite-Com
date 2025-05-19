'use client'

import { Suspense, useEffect, useState } from 'react'
import dynamic from 'next/dynamic'

const ClientHeader = dynamic(() => import('./client-header'), {
  ssr: false,
  loading: () => (
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
  ),
})

export default function HeaderWrapper() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
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

  return (
    <Suspense fallback={
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
    }>
      <ClientHeader />
    </Suspense>
  )
} 
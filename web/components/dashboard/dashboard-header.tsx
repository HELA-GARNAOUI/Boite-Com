import type React from "react"
import { UserNav } from "@/components/dashboard/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { Search } from "@/components/dashboard/search"
import { Notifications } from "@/components/dashboard/notifications-dropdown"
import Link from "next/link"

interface DashboardHeaderProps {
  heading?: string
  text?: string
  children?: React.ReactNode
}

export function DashboardHeader({ heading, text, children }: DashboardHeaderProps) {
  return (
    <div className="flex h-16 items-center justify-between border-b px-4">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="font-bold">Agency</span>
        </Link>
        {heading && (
          <div className="hidden md:block">
            <h1 className="text-xl font-bold">{heading}</h1>
            {text && <p className="text-sm text-muted-foreground">{text}</p>}
          </div>
        )}
      </div>
      <div className="flex items-center gap-4">
        <Search />
        <Notifications />
        <ModeToggle />
        <UserNav />
      </div>
    </div>
  )
}

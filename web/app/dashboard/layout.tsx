import type React from "react"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { Sidebar } from "@/components/dashboard/sidebar"
import { OdooProvider } from "@/components/odoo-provider"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <OdooProvider>
      <div className="flex min-h-screen flex-col">
        <DashboardHeader />
        <div className="container flex-1 items-start md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10">
          <Sidebar className="hidden md:block" />
          <main className="flex w-full flex-col overflow-hidden">{children}</main>
        </div>
      </div>
    </OdooProvider>
  )
}

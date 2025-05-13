"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { BarChart3, CreditCard, FileText, Home, Settings, Users, Building2, ShoppingCart } from "lucide-react"

interface NavItem {
  title: string
  href: string
  icon: React.ReactNode
  disabled?: boolean
}

export function DashboardNav() {
  const pathname = usePathname()

  const items: NavItem[] = [
    {
      title: "Overview",
      href: "/dashboard",
      icon: <Home className="mr-2 h-4 w-4" />,
    },
    {
      title: "Projects",
      href: "/dashboard/projects",
      icon: <FileText className="mr-2 h-4 w-4" />,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: <BarChart3 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Invoices",
      href: "/dashboard/invoices",
      icon: <CreditCard className="mr-2 h-4 w-4" />,
    },
    {
      title: "CRM",
      href: "/dashboard/crm",
      icon: <Users className="mr-2 h-4 w-4" />,
    },
    {
      title: "HR Portal",
      href: "/dashboard/hr",
      icon: <Building2 className="mr-2 h-4 w-4" />,
    },
    {
      title: "Sales Portal",
      href: "/dashboard/sales",
      icon: <ShoppingCart className="mr-2 h-4 w-4" />,
    },
    {
      title: "Profile",
      href: "/dashboard/profile",
      icon: <Settings className="mr-2 h-4 w-4" />,
    },
  ]

  return (
    <nav className="grid items-start gap-2">
      {items.map((item, index) => (
        <Link
          key={index}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost" }),
            pathname === item.href ? "bg-muted hover:bg-muted" : "hover:bg-transparent hover:underline",
            "justify-start",
          )}
        >
          {item.icon}
          {item.title}
        </Link>
      ))}
    </nav>
  )
}

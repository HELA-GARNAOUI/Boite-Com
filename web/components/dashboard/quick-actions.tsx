import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusCircle, FileText, Calendar, Users } from "lucide-react"

interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function QuickActions({ className, ...props }: QuickActionsProps) {
  const actions = [
    {
      title: "New Project",
      icon: <PlusCircle className="h-4 w-4" />,
      href: "/dashboard/projects/new",
    },
    {
      title: "Create Invoice",
      icon: <FileText className="h-4 w-4" />,
      href: "/dashboard/invoices/new",
    },
    {
      title: "Schedule Meeting",
      icon: <Calendar className="h-4 w-4" />,
      href: "/dashboard/calendar/new",
    },
    {
      title: "Add Client",
      icon: <Users className="h-4 w-4" />,
      href: "/dashboard/crm/clients/new",
    },
  ]

  return (
    <Card className={className} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
        <CardDescription>Shortcuts to common tasks</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2">
          {actions.map((action, i) => (
            <Button key={i} variant="outline" className="h-auto justify-start py-2" asChild>
              <a href={action.href}>
                {action.icon}
                <span className="ml-2">{action.title}</span>
              </a>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

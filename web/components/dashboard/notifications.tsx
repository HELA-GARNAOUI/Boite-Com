import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Bell, CheckCircle, AlertCircle, Clock } from "lucide-react"

interface NotificationsProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Notifications({ className, ...props }: NotificationsProps) {
  // Sample notifications data
  const notifications = [
    {
      id: 1,
      title: "New project assigned",
      description: "Web Development for Client XYZ",
      time: "2 hours ago",
      type: "info",
    },
    {
      id: 2,
      title: "Invoice paid",
      description: "Invoice #INV-2023-001",
      time: "Yesterday",
      type: "success",
    },
    {
      id: 3,
      title: "Meeting reminder",
      description: "Team meeting in 30 minutes",
      time: "Today",
      type: "warning",
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case "warning":
        return <Clock className="h-4 w-4 text-yellow-500" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />
      default:
        return <Bell className="h-4 w-4 text-blue-500" />
    }
  }

  return (
    <Card className={className} {...props}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">Recent Notifications</CardTitle>
        <CardDescription>You have {notifications.length} unread notifications</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className="flex items-start gap-4">
              <div className="mt-1">{getIcon(notification.type)}</div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <div className="flex items-center pt-2">
                  <time className="text-xs text-muted-foreground">{notification.time}</time>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

"use client"

import { useState } from "react"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

// Sample notification data
const sampleNotifications = [
  {
    id: 1,
    title: "New project assigned",
    description: "You have been assigned to a new web development project.",
    time: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Invoice paid",
    description: "Client XYZ has paid invoice #INV-2023-001.",
    time: "Yesterday",
    read: false,
  },
  {
    id: 3,
    title: "Meeting reminder",
    description: "Team meeting in 30 minutes.",
    time: "Today",
    read: true,
  },
  {
    id: 4,
    title: "Task completed",
    description: "Homepage redesign task has been marked as completed.",
    time: "3 days ago",
    read: true,
  },
]

export function Notifications() {
  const [notifications, setNotifications] = useState(sampleNotifications)

  const unreadCount = notifications.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {unreadCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
            >
              {unreadCount}
            </Badge>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          <span>Notifications</span>
          {unreadCount > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-auto text-xs p-1">
              Mark all as read
            </Button>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {notifications.length === 0 ? (
          <div className="py-4 text-center text-sm text-muted-foreground">No notifications</div>
        ) : (
          notifications.map((notification) => (
            <DropdownMenuItem
              key={notification.id}
              className={`flex flex-col items-start p-4 ${!notification.read ? "bg-muted/50" : ""}`}
              onClick={() => markAsRead(notification.id)}
            >
              <div className="flex w-full justify-between">
                <span className="font-medium">{notification.title}</span>
                <span className="text-xs text-muted-foreground">{notification.time}</span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{notification.description}</p>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer justify-center">
          <Button variant="ghost" className="w-full justify-center" asChild>
            <a href="/dashboard/notifications">View all notifications</a>
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface RecentActivitiesProps extends React.HTMLAttributes<HTMLDivElement> {}

export function RecentActivities({ className, ...props }: RecentActivitiesProps) {
  // Sample activities data
  const activities = [
    {
      id: 1,
      user: {
        name: "John Doe",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JD",
      },
      action: "completed a task",
      target: "Homepage Design",
      time: "2 hours ago",
      project: "Website Redesign",
    },
    {
      id: 2,
      user: {
        name: "Jane Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "JS",
      },
      action: "commented on",
      target: "Mobile App Wireframes",
      time: "4 hours ago",
      project: "Mobile App Development",
    },
    {
      id: 3,
      user: {
        name: "Mike Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "MJ",
      },
      action: "uploaded",
      target: "SEO Report - November",
      time: "Yesterday",
      project: "SEO Campaign",
    },
    {
      id: 4,
      user: {
        name: "Sarah Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "SW",
      },
      action: "created a new task",
      target: "Logo Design",
      time: "Yesterday",
      project: "Branding Project",
    },
    {
      id: 5,
      user: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DB",
      },
      action: "scheduled a meeting",
      target: "Project Kickoff",
      time: "2 days ago",
      project: "Website Redesign",
    },
  ]

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Latest actions across your projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-8 w-8">
                <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                <AvatarFallback>{activity.user.initials}</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm">
                  <span className="font-medium">{activity.user.name}</span> {activity.action}{" "}
                  <span className="font-medium">{activity.target}</span>
                </p>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span>{activity.time}</span>
                  <span className="mx-1">•</span>
                  <span>{activity.project}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

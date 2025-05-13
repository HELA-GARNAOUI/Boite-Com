import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface ProjectStatusSummaryProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ProjectStatusSummary({ className, ...props }: ProjectStatusSummaryProps) {
  // Sample projects data
  const projects = [
    {
      id: 1,
      name: "Website Redesign",
      client: "ABC Corp",
      progress: 75,
      status: "In Progress",
      dueDate: "2023-12-15",
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "XYZ Inc",
      progress: 40,
      status: "In Progress",
      dueDate: "2024-01-30",
    },
    {
      id: 3,
      name: "SEO Campaign",
      client: "123 Industries",
      progress: 90,
      status: "Almost Complete",
      dueDate: "2023-11-30",
    },
    {
      id: 4,
      name: "Branding Project",
      client: "Smith & Co",
      progress: 20,
      status: "Just Started",
      dueDate: "2024-02-28",
    },
  ]

  const getProgressColor = (progress: number) => {
    if (progress < 30) return "bg-yellow-500"
    if (progress < 70) return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <Card className={cn("col-span-3", className)} {...props}>
      <CardHeader>
        <CardTitle>Project Status</CardTitle>
        <CardDescription>Overview of your active projects</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {projects.map((project) => (
            <div key={project.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium leading-none">{project.name}</p>
                  <p className="text-sm text-muted-foreground">{project.client}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium leading-none">{project.progress}%</p>
                  <p className="text-sm text-muted-foreground">Due {new Date(project.dueDate).toLocaleDateString()}</p>
                </div>
              </div>
              <Progress
                value={project.progress}
                className="h-2"
                indicatorClassName={getProgressColor(project.progress)}
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

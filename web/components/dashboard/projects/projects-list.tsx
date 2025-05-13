"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Eye, Edit, Trash, FileText } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export function ProjectsList() {
  // Sample projects data
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Website Redesign",
      client: "ABC Corp",
      startDate: "2023-09-01",
      dueDate: "2023-12-15",
      status: "In Progress",
      progress: 75,
      budget: 15000,
    },
    {
      id: 2,
      name: "Mobile App Development",
      client: "XYZ Inc",
      startDate: "2023-10-15",
      dueDate: "2024-01-30",
      status: "In Progress",
      progress: 40,
      budget: 25000,
    },
    {
      id: 3,
      name: "SEO Campaign",
      client: "123 Industries",
      startDate: "2023-08-01",
      dueDate: "2023-11-30",
      status: "Almost Complete",
      progress: 90,
      budget: 8000,
    },
    {
      id: 4,
      name: "Branding Project",
      client: "Smith & Co",
      startDate: "2023-11-01",
      dueDate: "2024-02-28",
      status: "Just Started",
      progress: 20,
      budget: 12000,
    },
    {
      id: 5,
      name: "E-commerce Platform",
      client: "Fashion Outlet",
      startDate: "2023-07-15",
      dueDate: "2023-12-31",
      status: "In Progress",
      progress: 60,
      budget: 30000,
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-green-500"
      case "Almost Complete":
        return "bg-blue-500"
      case "In Progress":
        return "bg-yellow-500"
      case "Just Started":
        return "bg-orange-500"
      case "Not Started":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Timeline</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Progress</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell>{project.client}</TableCell>
                <TableCell>
                  {formatDate(project.startDate)} - {formatDate(project.dueDate)}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(project.status)} text-white`}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 w-20" />
                    <span className="text-xs">{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{formatCurrency(project.budget)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>
                        <Eye className="mr-2 h-4 w-4" />
                        <span>View Details</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Edit Project</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <FileText className="mr-2 h-4 w-4" />
                        <span>View Documents</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Project</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

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
import { MoreHorizontal, Eye, Edit, Trash, ArrowUpRight } from "lucide-react"

export function LeadManagement() {
  // Sample leads data
  const [leads, setLeads] = useState([
    {
      id: 1,
      name: "John Smith",
      company: "ABC Corp",
      email: "john.smith@abccorp.com",
      phone: "+1 (555) 123-4567",
      source: "Website",
      status: "New",
      date: "2023-11-10",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      company: "XYZ Inc",
      email: "sarah.j@xyzinc.com",
      phone: "+1 (555) 987-6543",
      source: "Referral",
      status: "Contacted",
      date: "2023-11-08",
    },
    {
      id: 3,
      name: "Michael Brown",
      company: "123 Industries",
      email: "m.brown@123industries.com",
      phone: "+1 (555) 456-7890",
      source: "LinkedIn",
      status: "Qualified",
      date: "2023-11-05",
    },
    {
      id: 4,
      name: "Emily Davis",
      company: "Tech Solutions",
      email: "emily@techsolutions.com",
      phone: "+1 (555) 234-5678",
      source: "Google Ads",
      status: "Negotiation",
      date: "2023-11-01",
    },
    {
      id: 5,
      name: "David Wilson",
      company: "Global Enterprises",
      email: "d.wilson@globalent.com",
      phone: "+1 (555) 876-5432",
      source: "Trade Show",
      status: "Contacted",
      date: "2023-10-28",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New":
        return "bg-blue-500"
      case "Contacted":
        return "bg-yellow-500"
      case "Qualified":
        return "bg-green-500"
      case "Negotiation":
        return "bg-purple-500"
      case "Lost":
        return "bg-red-500"
      case "Won":
        return "bg-emerald-500"
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

  return (
    <Card>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Company</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leads.map((lead) => (
              <TableRow key={lead.id}>
                <TableCell className="font-medium">{lead.name}</TableCell>
                <TableCell>{lead.company}</TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <span className="text-xs">{lead.email}</span>
                    <span className="text-xs text-muted-foreground">{lead.phone}</span>
                  </div>
                </TableCell>
                <TableCell>{lead.source}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(lead.status)} text-white`}>
                    {lead.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDate(lead.date)}</TableCell>
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
                        <span>Edit Lead</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <ArrowUpRight className="mr-2 h-4 w-4" />
                        <span>Convert to Opportunity</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Lead</span>
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

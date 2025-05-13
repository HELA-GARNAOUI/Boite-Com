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
import { MoreHorizontal, Eye, Download, Send, CreditCard } from "lucide-react"

export function InvoicesList() {
  // Sample invoices data
  const [invoices, setInvoices] = useState([
    {
      id: "INV-2023-001",
      client: "ABC Corp",
      amount: 5000,
      date: "2023-10-15",
      dueDate: "2023-11-15",
      status: "Paid",
    },
    {
      id: "INV-2023-002",
      client: "XYZ Inc",
      amount: 7500,
      date: "2023-10-20",
      dueDate: "2023-11-20",
      status: "Pending",
    },
    {
      id: "INV-2023-003",
      client: "123 Industries",
      amount: 3000,
      date: "2023-11-01",
      dueDate: "2023-12-01",
      status: "Overdue",
    },
    {
      id: "INV-2023-004",
      client: "Smith & Co",
      amount: 4500,
      date: "2023-11-05",
      dueDate: "2023-12-05",
      status: "Pending",
    },
    {
      id: "INV-2023-005",
      client: "Fashion Outlet",
      amount: 9000,
      date: "2023-11-10",
      dueDate: "2023-12-10",
      status: "Paid",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-500"
      case "Pending":
        return "bg-yellow-500"
      case "Overdue":
        return "bg-red-500"
      case "Cancelled":
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
              <TableHead>Invoice</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Due Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell className="font-medium">{invoice.id}</TableCell>
                <TableCell>{invoice.client}</TableCell>
                <TableCell>{formatCurrency(invoice.amount)}</TableCell>
                <TableCell>{formatDate(invoice.date)}</TableCell>
                <TableCell>{formatDate(invoice.dueDate)}</TableCell>
                <TableCell>
                  <Badge variant="outline" className={`${getStatusColor(invoice.status)} text-white`}>
                    {invoice.status}
                  </Badge>
                </TableCell>
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
                        <span>View Invoice</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Download className="mr-2 h-4 w-4" />
                        <span>Download PDF</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Send className="mr-2 h-4 w-4" />
                        <span>Send to Client</span>
                      </DropdownMenuItem>
                      {invoice.status === "Pending" && (
                        <>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>
                            <CreditCard className="mr-2 h-4 w-4" />
                            <span>Mark as Paid</span>
                          </DropdownMenuItem>
                        </>
                      )}
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

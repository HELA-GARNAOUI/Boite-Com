"use client"

import { useState } from "react"

type Opportunity = {
  id: string
  title: string
  company: string
  value: number
  probability: number
  contact: {
    name: string
    avatar: string
    initials: string
  }
  dueDate: string
}

type Column = {
  id: string
  title: string
  opportunities: Opportunity[]
}

export function PipelineView() {
  // Sample pipeline data
  const [columns, setColumns] = useState<Column[]>([
    {
      id: "new",
      title: "New",
      opportunities: [
        {
          id: "opp-1",
          title: "Website Redesign",
          company: "ABC Corp",
          value: 15000,
          probability: 20,
          contact: {
            name: "John Smith",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "JS",
          },
          dueDate: "2023-12-15",
        },
        {
          id: "opp-2",
          title: "SEO Services",
          company: "XYZ Inc",
          value: 8000,
          probability: 30,
          contact: {
            name: "Sarah Johnson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "SJ",
          },
          dueDate: "2023-12-30",
        },
      ],
    },
    {
      id: "qualified",
      title: "Qualified",
      opportunities: [
        {
          id: "opp-3",
          title: "E-commerce Platform",
          company: "Fashion Outlet",
          value: 30000,
          probability: 50,
          contact: {
            name: "Emily Davis",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "ED",
          },
          dueDate: "2024-01-15",
        },
      ],
    },
    {
      id: "proposal",
      title: "Proposal",
      opportunities: [
        {
          id: "opp-4",
          title: "Social Media Campaign",
          company: "123 Industries",
          value: 12000,
          probability: 70,
          contact: {
            name: "Michael Brown",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "MB",
          },
          dueDate: "2023-12-10",
        },
        {
          id: "opp-5",
          title: "Branding Project",
          company: "Tech Solutions",
          value: 18000,
          probability: 60,
          contact: {
            name: "David Wilson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "DW",
          },
          dueDate: "2023-12-20",
        },
      ],
    },
    {
      id: "negotiation",
      title: "Negotiation",
      opportunities: [
        {
          id: "opp-6",
          title: "ERP Integration",
          company: "Global Enterprises",
          value: 45000,
          probability: 80,
          contact: {
            name: "Lisa Anderson",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "LA",
          },
          dueDate: "2023-11-30",
        },
      ],
    },
    {
      id: "closed",
      title: "Closed Won",
      opportunities: [
        {
          id: "opp-7",
          title: "Mobile App Development",
          company: "Smith & Co",
          value: 25000,
          probability: 100,
          contact: {
            name: "Robert Taylor",
            avatar: "/placeholder.svg?height=32&width=32",
            initials: "RT",
          },
          dueDate: "2023-11-15",
        },
      ],
    },
  ])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId } = result

    // If there's no destination or the item is dropped back to its original position
    if (!destination || (destination.droppableId === source.droppableId && destination.index === source.index)) {
      return
    }

    // Find the source and destination columns
    const sourceColumn = columns.find(col => col.id === source.droppableId)
    const destColumn = columns.find(col => col.id === destination.droppableId)

    if (!sourceColumn || !destColumn) return

    // Create new arrays for the columns
    const newColumns = [...columns]
    const sourceColIndex = newColumns.findIndex(col => col.id === source.droppableId)
    const dest

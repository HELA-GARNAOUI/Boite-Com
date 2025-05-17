"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  LineChart,
  PieChart,
  Activity,
  FileText,
  MessageSquare,
  Users,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")

  return (
    <div className="space-y-8 p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Client Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your projects and analytics.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Clock className="mr-2 h-4 w-4" />
            Last updated: 2 hours ago
          </Button>
          <Button size="sm">
            <Activity className="mr-2 h-4 w-4" />
            Refresh Data
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="projects">Projects</TabsTrigger>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="support">Support</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Total Projects", value: "12", icon: FileText, change: "+2 from last month" },
              { title: "Active Projects", value: "4", icon: Activity, change: "Same as last month" },
              { title: "Support Tickets", value: "2", icon: MessageSquare, change: "-3 from last month" },
              { title: "Upcoming Meetings", value: "3", icon: Calendar, change: "+1 from last month" },
            ].map((stat, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs text-muted-foreground">{stat.change}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recent Activity and Project Status */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Project Status</CardTitle>
                <CardDescription>Current status of your active projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Website Redesign", progress: 75, status: "In Progress" },
                    { name: "SEO Campaign", progress: 40, status: "In Progress" },
                    { name: "Social Media Strategy", progress: 90, status: "Almost Complete" },
                    { name: "Content Creation", progress: 20, status: "Just Started" },
                  ].map((project, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-full">
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">{project.name}</span>
                          <span className="text-sm font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                          <div
                            className="bg-indigo-600 h-2.5 rounded-full"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between mt-1">
                          <span className="text-xs text-gray-500 dark:text-gray-400">{project.status}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest updates on your projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "Website Mockup Approved",
                      description: "The design team has approved your website mockup.",
                      time: "2 hours ago",
                    },
                    {
                      title: "New Comment on SEO Report",
                      description: "John left a comment on your SEO performance report.",
                      time: "5 hours ago",
                    },
                    {
                      title: "Social Media Post Scheduled",
                      description: "Your content for Instagram has been scheduled for tomorrow.",
                      time: "1 day ago",
                    },
                    {
                      title: "Invoice Paid",
                      description: "Payment received for Invoice #1234.",
                      time: "2 days ago",
                    },
                  ].map((activity, index) => (
                    <div
                      key={index}
                      className="flex items-start pb-4 last:pb-0 last:border-0 border-b border-gray-200 dark:border-gray-700"
                    >
                      <div>
                        <p className="text-sm font-medium">{activity.title}</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{activity.description}</p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Activity
                </Button>
              </CardFooter>
            </Card>
          </div>

          {/* Upcoming Meetings */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Meetings</CardTitle>
              <CardDescription>Your scheduled meetings for the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    title: "Website Progress Review",
                    date: "May 15, 2023",
                    time: "10:00 AM - 11:00 AM",
                    attendees: ["John Smith", "Sarah Johnson", "You"],
                  },
                  {
                    title: "SEO Strategy Discussion",
                    date: "May 17, 2023",
                    time: "2:00 PM - 3:00 PM",
                    attendees: ["Michael Chen", "Emma Rodriguez", "You"],
                  },
                  {
                    title: "Content Calendar Planning",
                    date: "May 19, 2023",
                    time: "11:00 AM - 12:00 PM",
                    attendees: ["Emma Rodriguez", "You"],
                  },
                ].map((meeting, index) => (
                  <div
                    key={index}
                    className="flex items-start pb-4 last:pb-0 last:border-0 border-b border-gray-200 dark:border-gray-700"
                  >
                    <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                      <Calendar className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{meeting.title}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {meeting.date} • {meeting.time}
                      </p>
                      <div className="mt-2 flex items-center">
                        <Users className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                        <p className="text-xs text-gray-500 dark:text-gray-400">{meeting.attendees.join(", ")}</p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <Button variant="outline" size="sm">
                        Join
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full">
                View Calendar
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Website Analytics</CardTitle>
              <CardDescription>Performance metrics for your website over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                <LineChart className="h-8 w-8 text-gray-400" />
                <span className="ml-2 text-gray-500 dark:text-gray-400">Analytics Chart</span>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Traffic Sources</CardTitle>
                <CardDescription>Where your website visitors are coming from</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <PieChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400">Traffic Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Conversion Rates</CardTitle>
                <CardDescription>How visitors are converting on your website</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <BarChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400">Conversion Chart</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Social Media Performance</CardTitle>
                <CardDescription>Engagement metrics across social platforms</CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <div className="h-full w-full flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-md">
                  <BarChart className="h-8 w-8 text-gray-400" />
                  <span className="ml-2 text-gray-500 dark:text-gray-400">Social Media Chart</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Your Projects</h2>
              <p className="text-muted-foreground">Manage and track all your projects in one place</p>
            </div>
            <Button>New Project Request</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Website Redesign",
                description: "Complete overhaul of company website with new branding and improved UX.",
                status: "In Progress",
                progress: 75,
                dueDate: "June 15, 2023",
              },
              {
                title: "SEO Campaign",
                description: "Improving search engine rankings for key industry terms.",
                status: "In Progress",
                progress: 40,
                dueDate: "July 30, 2023",
              },
              {
                title: "Social Media Strategy",
                description: "Developing and implementing a comprehensive social media strategy.",
                status: "Almost Complete",
                progress: 90,
                dueDate: "May 25, 2023",
              },
              {
                title: "Content Creation",
                description: "Creating blog posts, videos, and infographics for marketing campaigns.",
                status: "Just Started",
                progress: 20,
                dueDate: "August 10, 2023",
              },
              {
                title: "Email Marketing",
                description: "Setting up automated email campaigns for lead nurturing.",
                status: "Planning",
                progress: 5,
                dueDate: "September 1, 2023",
              },
              {
                title: "Analytics Setup",
                description: "Implementing advanced analytics tracking for better insights.",
                status: "Completed",
                progress: 100,
                dueDate: "Completed on April 30, 2023",
              },
            ].map((project, index) => (
              <Card key={index} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle>{project.title}</CardTitle>
                    <span
                      className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                        project.status === "Completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                          : project.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : project.status === "Almost Complete"
                              ? "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
                              : project.status === "Just Started"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>
                  <CardDescription className="line-clamp-2 h-10">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="mb-4">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs font-medium">Progress</span>
                      <span className="text-xs font-medium">{project.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                      <div
                        className={`h-2 rounded-full ${
                          project.progress === 100
                            ? "bg-green-600"
                            : project.progress > 75
                              ? "bg-purple-600"
                              : project.progress > 25
                                ? "bg-blue-600"
                                : "bg-yellow-600"
                        }`}
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="h-3.5 w-3.5 mr-1" />
                    Due: {project.dueDate}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invoices" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Invoice History</h2>
              <p className="text-muted-foreground">View and manage your invoices and payments</p>
            </div>
            <Button variant="outline">Download All</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="text-xs uppercase bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Invoice #
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Date
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Amount
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Status
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { id: "INV-2023-001", date: "May 1, 2023", amount: "$2,500.00", status: "Paid" },
                      { id: "INV-2023-002", date: "April 1, 2023", amount: "$1,800.00", status: "Paid" },
                      { id: "INV-2023-003", date: "March 1, 2023", amount: "$3,200.00", status: "Paid" },
                      { id: "INV-2023-004", date: "February 1, 2023", amount: "$2,100.00", status: "Paid" },
                      { id: "INV-2023-005", date: "January 1, 2023", amount: "$1,950.00", status: "Paid" },
                    ].map((invoice, index) => (
                      <tr key={index} className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                        <td className="px-6 py-4 font-medium">{invoice.id}</td>
                        <td className="px-6 py-4">{invoice.date}</td>
                        <td className="px-6 py-4">{invoice.amount}</td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              Download
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="support" className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold">Support Center</h2>
              <p className="text-muted-foreground">Get help with your projects and services</p>
            </div>
            <Button>New Support Ticket</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Active Support Tickets</CardTitle>
                <CardDescription>Your current open support requests</CardDescription>
              </CardHeader>
              <CardContent>
                {[
                  {
                    id: "TKT-2023-001",
                    title: "Website Form Not Working",
                    status: "In Progress",
                    priority: "High",
                    lastUpdate: "2 hours ago",
                  },
                  {
                    id: "TKT-2023-002",
                    title: "Need Help with Analytics Setup",
                    status: "Waiting for Response",
                    priority: "Medium",
                    lastUpdate: "1 day ago",
                  },
                ].map((ticket, index) => (
                  <div
                    key={index}
                    className={`p-4 mb-4 last:mb-0 border rounded-lg ${
                      index === 0
                        ? "border-indigo-200 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-900/20"
                        : "border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium">{ticket.title}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Ticket ID: {ticket.id}</p>
                      </div>
                      <span
                        className={`text-xs font-medium px-2.5 py-0.5 rounded ${
                          ticket.status === "In Progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                        }`}
                      >
                        {ticket.status}
                      </span>
                    </div>
                    <div className="mt-2 flex justify-between items-center">
                      <span
                        className={`text-xs px-2 py-0.5 rounded ${
                          ticket.priority === "High"
                            ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                            : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
                        }`}
                      >
                        {ticket.priority} Priority
                      </span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">Updated {ticket.lastUpdate}</span>
                    </div>
                    <div className="mt-4">
                      <Button variant="outline" size="sm" className="w-full">
                        View Ticket
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Tickets
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Knowledge Base</CardTitle>
                <CardDescription>Helpful resources and documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      title: "How to Update Your Website Content",
                      category: "Website Management",
                      views: "245 views",
                    },
                    {
                      title: "Understanding Your SEO Reports",
                      category: "SEO",
                      views: "189 views",
                    },
                    {
                      title: "Best Practices for Social Media Posts",
                      category: "Social Media",
                      views: "312 views",
                    },
                    {
                      title: "Troubleshooting Common Website Issues",
                      category: "Website Management",
                      views: "276 views",
                    },
                  ].map((article, index) => (
                    <div
                      key={index}
                      className="pb-4 last:pb-0 last:border-0 border-b border-gray-200 dark:border-gray-700"
                    >
                      <Link href="#" className="block group">
                        <h3 className="text-sm font-medium group-hover:text-indigo-600 dark:group-hover:text-indigo-400">
                          {article.title}
                        </h3>
                        <div className="mt-1 flex items-center justify-between">
                          <span className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-2 py-0.5 rounded">
                            {article.category}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">{article.views}</span>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Browse Knowledge Base
                </Button>
              </CardFooter>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Contact Your Account Manager</CardTitle>
              <CardDescription>
                Need personalized assistance? Reach out to your dedicated account manager.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="relative h-16 w-16 rounded-full overflow-hidden mr-4">
                  <Image
                    src="/placeholder.svg?height=100&width=100"
                    alt="Account Manager"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Sarah Johnson</h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Senior Account Manager</p>
                  <div className="mt-2 flex space-x-4">
                    <Link
                      href="mailto:sarah@digitalagency.com"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      sarah@digitalagency.com
                    </Link>
                    <Link
                      href="tel:+15551234567"
                      className="text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                    >
                      +1 (555) 123-4567
                    </Link>
                  </div>
                </div>
                <div className="ml-auto">
                  <Button>
                    Schedule Meeting
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

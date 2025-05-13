import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectStatusSummary } from "@/components/dashboard/project-status-summary"
import { RecentActivities } from "@/components/dashboard/recent-activities"
import { QuickActions } from "@/components/dashboard/quick-actions"
import { PerformanceMetrics } from "@/components/dashboard/performance-metrics"
import { Notifications } from "@/components/dashboard/notifications"

export default function DashboardPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Dashboard" text="Overview of your projects and activities" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <QuickActions />
        <Notifications />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <ProjectStatusSummary className="lg:col-span-4" />
        <RecentActivities className="lg:col-span-3" />
      </div>
      <PerformanceMetrics />
    </DashboardShell>
  )
}

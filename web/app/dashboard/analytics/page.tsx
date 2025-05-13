import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { AnalyticsCharts } from "@/components/dashboard/analytics/analytics-charts"
import { AnalyticsFilters } from "@/components/dashboard/analytics/analytics-filters"
import { AnalyticsSummary } from "@/components/dashboard/analytics/analytics-summary"

export default function AnalyticsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analytics" text="Track your performance metrics" />
      <AnalyticsFilters />
      <AnalyticsSummary />
      <AnalyticsCharts />
    </DashboardShell>
  )
}

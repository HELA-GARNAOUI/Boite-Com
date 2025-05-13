import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { LeadManagement } from "@/components/dashboard/crm/lead-management"
import { OpportunityTracking } from "@/components/dashboard/crm/opportunity-tracking"
import { PipelineView } from "@/components/dashboard/crm/pipeline-view"
import { ActivityCalendar } from "@/components/dashboard/crm/activity-calendar"
import { SalesForecasts } from "@/components/dashboard/crm/sales-forecasts"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CrmPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="CRM" text="Manage your customer relationships" />
      <Tabs defaultValue="leads" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="pipeline">Pipeline</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="forecasts">Forecasts</TabsTrigger>
        </TabsList>
        <TabsContent value="leads">
          <LeadManagement />
        </TabsContent>
        <TabsContent value="opportunities">
          <OpportunityTracking />
        </TabsContent>
        <TabsContent value="pipeline">
          <PipelineView />
        </TabsContent>
        <TabsContent value="activities">
          <ActivityCalendar />
        </TabsContent>
        <TabsContent value="forecasts">
          <SalesForecasts />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

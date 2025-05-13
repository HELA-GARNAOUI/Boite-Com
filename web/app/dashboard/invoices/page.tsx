import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { InvoicesList } from "@/components/dashboard/invoices/invoices-list"
import { InvoiceFilters } from "@/components/dashboard/invoices/invoice-filters"
import { InvoiceSummary } from "@/components/dashboard/invoices/invoice-summary"

export default function InvoicesPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Invoices" text="Manage your invoices and payments" />
      <InvoiceSummary />
      <InvoiceFilters />
      <InvoicesList />
    </DashboardShell>
  )
}

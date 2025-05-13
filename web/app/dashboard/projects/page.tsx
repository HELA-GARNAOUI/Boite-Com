import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProjectsList } from "@/components/dashboard/projects/projects-list"
import { ProjectFilters } from "@/components/dashboard/projects/project-filters"

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage and track your projects" />
      <ProjectFilters />
      <ProjectsList />
    </DashboardShell>
  )
}

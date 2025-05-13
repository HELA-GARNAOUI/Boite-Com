import { DashboardShell } from "@/components/dashboard/dashboard-shell"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { ProfileForm } from "@/components/dashboard/profile/profile-form"
import { SecuritySettings } from "@/components/dashboard/profile/security-settings"
import { CompanyDetails } from "@/components/dashboard/profile/company-details"
import { Preferences } from "@/components/dashboard/profile/preferences"
import { ApiKeys } from "@/components/dashboard/profile/api-keys"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ProfilePage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Profile" text="Manage your account settings" />
      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="company">Company</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="api">API Keys</TabsTrigger>
        </TabsList>
        <TabsContent value="personal">
          <ProfileForm />
        </TabsContent>
        <TabsContent value="company">
          <CompanyDetails />
        </TabsContent>
        <TabsContent value="preferences">
          <Preferences />
        </TabsContent>
        <TabsContent value="security">
          <SecuritySettings />
        </TabsContent>
        <TabsContent value="api">
          <ApiKeys />
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DashboardOverview } from '@/components/dashboard/overview';
import { DashboardAnalytics } from '@/components/dashboard/analytics';
import { DashboardSettings } from '@/components/dashboard/settings';
import { DashboardNotifications } from '@/components/dashboard/notifications';

export default function DashboardPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview">
          <DashboardOverview />
        </TabsContent>
        
        <TabsContent value="analytics">
          <DashboardAnalytics />
        </TabsContent>
        
        <TabsContent value="settings">
          <DashboardSettings />
        </TabsContent>
        
        <TabsContent value="notifications">
          <DashboardNotifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}

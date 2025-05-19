'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MarketingCampaigns } from '@/components/marketing/campaigns';
import { MarketingAnalytics } from '@/components/marketing/analytics';
import { MarketingStrategy } from '@/components/marketing/strategy';

export default function MarketingPage() {
  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Marketing Dashboard</h1>
      
      <Tabs defaultValue="campaigns" className="space-y-4">
        <TabsList>
          <TabsTrigger value="campaigns">Campaigns</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="strategy">Strategy</TabsTrigger>
        </TabsList>
        
        <TabsContent value="campaigns">
          <MarketingCampaigns />
        </TabsContent>
        
        <TabsContent value="analytics">
          <MarketingAnalytics />
        </TabsContent>
        
        <TabsContent value="strategy">
          <MarketingStrategy />
        </TabsContent>
      </Tabs>
    </div>
  );
} 
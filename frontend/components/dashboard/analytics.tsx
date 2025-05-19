'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

interface AnalyticsData {
  campaign_performance: Array<{
    id: number;
    name: string;
    impressions: number;
    clicks: number;
    conversions: number;
    revenue: number;
  }>;
  lead_generation: Array<{
    date: string;
    leads: number;
    qualified_leads: number;
  }>;
  conversion_rates: Array<{
    channel: string;
    rate: number;
    trend: 'up' | 'down' | 'stable';
  }>;
}

export function DashboardAnalytics() {
  const [data, setData] = useState<AnalyticsData>({
    campaign_performance: [],
    lead_generation: [],
    conversion_rates: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<AnalyticsData>('/api/v1/dashboard/analytics/');
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching analytics data:', err);
        setError('Failed to load analytics data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Campaign Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Campaign</th>
                  <th className="text-right py-2">Impressions</th>
                  <th className="text-right py-2">Clicks</th>
                  <th className="text-right py-2">Conversions</th>
                  <th className="text-right py-2">Revenue</th>
                </tr>
              </thead>
              <tbody>
                {data.campaign_performance.map((campaign) => (
                  <tr key={campaign.id} className="border-b">
                    <td className="py-2">{campaign.name}</td>
                    <td className="text-right py-2">{campaign.impressions.toLocaleString()}</td>
                    <td className="text-right py-2">{campaign.clicks.toLocaleString()}</td>
                    <td className="text-right py-2">{campaign.conversions.toLocaleString()}</td>
                    <td className="text-right py-2">${campaign.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Lead Generation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Date</th>
                  <th className="text-right py-2">Total Leads</th>
                  <th className="text-right py-2">Qualified Leads</th>
                </tr>
              </thead>
              <tbody>
                {data.lead_generation.map((lead) => (
                  <tr key={lead.date} className="border-b">
                    <td className="py-2">{new Date(lead.date).toLocaleDateString()}</td>
                    <td className="text-right py-2">{lead.leads.toLocaleString()}</td>
                    <td className="text-right py-2">{lead.qualified_leads.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Conversion Rates by Channel</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2">Channel</th>
                  <th className="text-right py-2">Rate</th>
                  <th className="text-right py-2">Trend</th>
                </tr>
              </thead>
              <tbody>
                {data.conversion_rates.map((rate) => (
                  <tr key={rate.channel} className="border-b">
                    <td className="py-2">{rate.channel}</td>
                    <td className="text-right py-2">{(rate.rate * 100).toFixed(1)}%</td>
                    <td className="text-right py-2">
                      {rate.trend === 'up' && '↑'}
                      {rate.trend === 'down' && '↓'}
                      {rate.trend === 'stable' && '→'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
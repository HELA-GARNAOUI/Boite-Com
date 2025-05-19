'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

interface OverviewData {
  total_campaigns: number;
  active_campaigns: number;
  total_leads: number;
  recent_activities: Array<{
    id: number;
    description: string;
    timestamp: string;
  }>;
}

export function DashboardOverview() {
  const [data, setData] = useState<OverviewData>({
    total_campaigns: 0,
    active_campaigns: 0,
    total_leads: 0,
    recent_activities: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get<OverviewData>('/api/v1/dashboard/overview/');
        setData(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching overview data:', err);
        setError('Failed to load dashboard data. Please try again later.');
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
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Total Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.total_campaigns}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.active_campaigns}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Leads</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.total_leads}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>
        <CardContent>
          {data.recent_activities.length > 0 ? (
            <ul className="space-y-2">
              {data.recent_activities.map((activity) => (
                <li key={activity.id} className="flex items-center gap-2">
                  <span className="text-primary">•</span>
                  <span>{activity.description}</span>
                  <span className="text-sm text-muted-foreground ml-auto">
                    {new Date(activity.timestamp).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-muted-foreground">No recent activities</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
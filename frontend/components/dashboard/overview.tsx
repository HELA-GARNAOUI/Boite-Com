'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api';

interface OverviewData {
  total_campaigns: number;
  active_campaigns: number;
  analysis_score: number;
  recent_activities: Array<{
    id: string | number;
    type: string;
    description: string;
    timestamp: string;
  }>;
  company_name: string;
  industry: string;
  subscription_plan: string;
  is_setup_complete: boolean;
  setup_tasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    description: string;
  }>;
}

export function DashboardOverview() {
  const [data, setData] = useState<OverviewData>({
    total_campaigns: 0,
    active_campaigns: 0,
    analysis_score: 0,
    recent_activities: [],
    company_name: '',
    industry: '',
    subscription_plan: '',
    is_setup_complete: false,
    setup_tasks: []
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
            <CardTitle>Digital Maturity Score</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{data.analysis_score.toFixed(1)}%</p>
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

      <Card>
        <CardHeader>
          <CardTitle>Setup Tasks</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-4">
            {data.setup_tasks.map((task) => (
              <li key={task.id} className="flex items-start gap-3">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center mt-0.5 ${
                  task.completed ? 'bg-primary border-primary' : 'border-muted-foreground'
                }`}>
                  {task.completed && (
                    <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <h3 className="font-medium">{task.title}</h3>
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
} 
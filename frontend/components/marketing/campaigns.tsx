'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';

interface Campaign {
  id: number;
  name: string;
  description: string;
  status: 'draft' | 'active' | 'paused' | 'completed';
  start_date: string;
  end_date: string | null;
  budget: number;
  created_by: string;
  created_at: string;
  updated_at: string;
  metrics: {
    id: number;
    date: string;
    impressions: number;
    clicks: number;
    conversions: number;
    spend: number;
    revenue: number;
  }[];
}

export function MarketingCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await api.get<Campaign[]>('/api/v1/marketing/campaigns/');
      setCampaigns(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch campaigns');
      toast.error('Failed to fetch campaigns');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleStatusUpdate = async (campaignId: number, newStatus: string) => {
    try {
      await api.post(`/api/v1/marketing/campaigns/${campaignId}/update_status/`, {
        status: newStatus,
      });
      toast.success('Campaign status updated');
      fetchCampaigns();
    } catch (err) {
      toast.error('Failed to update campaign status');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 p-4">
        {error}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketing Campaigns</h2>
        <Button onClick={() => window.location.href = '/marketing/campaigns/new'}>
          New Campaign
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {campaigns.map((campaign) => (
          <Card key={campaign.id}>
            <CardHeader>
              <CardTitle>{campaign.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-sm text-gray-500">{campaign.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">
                    Status: {campaign.status}
                  </span>
                  <div className="space-x-2">
                    {campaign.status === 'draft' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(campaign.id, 'active')}
                      >
                        Activate
                      </Button>
                    )}
                    {campaign.status === 'active' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusUpdate(campaign.id, 'paused')}
                      >
                        Pause
                      </Button>
                    )}
                    {campaign.status === 'paused' && (
                      <Button
                        size="sm"
                        onClick={() => handleStatusUpdate(campaign.id, 'active')}
                      >
                        Resume
                      </Button>
                    )}
                  </div>
                </div>
                <div className="text-sm">
                  <p>Budget: ${campaign.budget}</p>
                  <p>Start Date: {new Date(campaign.start_date).toLocaleDateString()}</p>
                  {campaign.end_date && (
                    <p>End Date: {new Date(campaign.end_date).toLocaleDateString()}</p>
                  )}
                </div>
                {campaign.metrics && campaign.metrics.length > 0 && (
                  <div className="text-sm">
                    <p>Latest Metrics:</p>
                    <ul className="list-disc list-inside">
                      <li>Impressions: {campaign.metrics[0].impressions}</li>
                      <li>Clicks: {campaign.metrics[0].clicks}</li>
                      <li>Conversions: {campaign.metrics[0].conversions}</li>
                      <li>Revenue: ${campaign.metrics[0].revenue}</li>
                    </ul>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 
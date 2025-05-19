'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Strategy {
  id: number;
  name: string;
  description: string;
  status: string;
}

interface Recommendation {
  id: number;
  title: string;
  description: string;
  priority: string;
}

export function MarketingStrategy() {
  const [strategies, setStrategies] = useState<Strategy[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement API call to fetch strategies and recommendations
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading strategy data...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Marketing Strategy</h2>
        <Button>Create Strategy</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Active Strategies</h3>
          {strategies.map((strategy) => (
            <Card key={strategy.id}>
              <CardHeader>
                <CardTitle>{strategy.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{strategy.description}</p>
                <p className="mt-2">Status: {strategy.status}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Recommendations</h3>
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id}>
              <CardHeader>
                <CardTitle>{recommendation.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p>{recommendation.description}</p>
                <p className="mt-2">Priority: {recommendation.priority}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
} 
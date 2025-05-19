'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface Service {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'pending';
  price: number;
  created_at: string;
}

export function DashboardServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true);
        const response = await api.get<Service[]>('/api/v1/services/');
        setServices(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handleStatusChange = async (serviceId: number, newStatus: Service['status']) => {
    try {
      await api.patch(`/api/v1/services/${serviceId}/`, { status: newStatus });
      setServices(services.map(service => 
        service.id === serviceId ? { ...service, status: newStatus } : service
      ));
      toast({
        title: 'Success',
        description: 'Service status updated successfully.',
      });
    } catch (err) {
      console.error('Error updating service status:', err);
      toast({
        title: 'Error',
        description: 'Failed to update service status.',
        variant: 'destructive',
      });
    }
  };

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
          <CardTitle>Your Services</CardTitle>
        </CardHeader>
        <CardContent>
          {services.length > 0 ? (
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="p-4 rounded-lg border bg-card"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-medium">{service.name}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {service.description}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Price: ${service.price.toLocaleString()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Created: {new Date(service.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <select
                        value={service.status}
                        onChange={(e) => handleStatusChange(service.id, e.target.value as Service['status'])}
                        className="p-2 border rounded-md"
                      >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                        <option value="pending">Pending</option>
                      </select>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No services found</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
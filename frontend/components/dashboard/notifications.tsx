'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface Notification {
  id: number;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export function DashboardNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const response = await api.get<Notification[]>('/api/v1/dashboard/notifications/');
      setNotifications(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching notifications:', err);
      setError('Failed to load notifications. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      await api.post(`/api/v1/dashboard/${id}/mark_notification_read/`);
      setNotifications(notifications.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      ));
      toast({
        title: 'Success',
        description: 'Notification marked as read.',
      });
    } catch (err) {
      console.error('Error marking notification as read:', err);
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read.',
        variant: 'destructive',
      });
    }
  };

  const deleteNotification = async (id: number) => {
    try {
      await api.delete(`/api/v1/dashboard/${id}/delete_notification/`);
      setNotifications(notifications.filter(notification => notification.id !== id));
      toast({
        title: 'Success',
        description: 'Notification deleted.',
      });
    } catch (err) {
      console.error('Error deleting notification:', err);
      toast({
        title: 'Error',
        description: 'Failed to delete notification.',
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
          <CardTitle>Notifications</CardTitle>
        </CardHeader>
        <CardContent>
          {notifications.length > 0 ? (
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg border ${
                    notification.read ? 'bg-muted' : 'bg-background'
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{notification.title}</h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-2">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      {!notification.read && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => markAsRead(notification.id)}
                        >
                          Mark as Read
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => deleteNotification(notification.id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">No notifications</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 
'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import api from '@/lib/api';

interface Settings {
  notifications: boolean;
  theme: 'light' | 'dark' | 'system';
  language: 'en' | 'fr' | 'es';
}

export function DashboardSettings() {
  const [settings, setSettings] = useState<Settings>({
    notifications: true,
    theme: 'light',
    language: 'en'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true);
        const response = await api.get<Settings>('/api/v1/dashboard/settings/');
        setSettings(response.data);
        setError(null);
      } catch (err) {
        console.error('Error fetching settings:', err);
        setError('Failed to load settings. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      setSaving(true);
      await api.post('/api/v1/dashboard/settings/', settings);
      toast({
        title: 'Settings saved',
        description: 'Your settings have been updated successfully.',
      });
    } catch (err) {
      console.error('Error saving settings:', err);
      toast({
        title: 'Error',
        description: 'Failed to save settings. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
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
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="notifications">Email Notifications</Label>
            <Switch
              id="notifications"
              checked={settings.notifications}
              onCheckedChange={(checked) => setSettings({ ...settings, notifications: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="theme">Theme</Label>
            <select
              id="theme"
              className="w-full p-2 border rounded-md"
              value={settings.theme}
              onChange={(e) => setSettings({ ...settings, theme: e.target.value as Settings['theme'] })}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="language">Language</Label>
            <select
              id="language"
              className="w-full p-2 border rounded-md"
              value={settings.language}
              onChange={(e) => setSettings({ ...settings, language: e.target.value as Settings['language'] })}
            >
              <option value="en">English</option>
              <option value="fr">Français</option>
              <option value="es">Español</option>
            </select>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full"
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
} 
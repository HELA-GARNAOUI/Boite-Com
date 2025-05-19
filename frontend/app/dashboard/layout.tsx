'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { LogoutButton } from '@/components/dashboard/logout-button';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { User, LayoutDashboard, BarChart, Settings, Bell, Package } from 'lucide-react';
import api from '@/lib/api';

interface UserData {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get<UserData>('/api/v1/auth/profile/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
        router.push('/auth/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold">Espace Client</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-600">
              {user?.first_name} {user?.last_name}
            </span>
            <LogoutButton />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar */}
          <div className="col-span-3">
            <Card className="p-4">
              <nav className="space-y-2">
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard">
                    <LayoutDashboard className="mr-2 h-4 w-4" />
                    Tableau de bord
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/analytics">
                    <BarChart className="mr-2 h-4 w-4" />
                    Analytics
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/notifications">
                    <Bell className="mr-2 h-4 w-4" />
                    Notifications
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/my-services">
                    <Package className="mr-2 h-4 w-4" />
                    Services
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start"
                  asChild
                >
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Paramètres
                  </Link>
                </Button>
              </nav>
            </Card>
          </div>

          {/* Main content */}
          <div className="col-span-9">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
} 
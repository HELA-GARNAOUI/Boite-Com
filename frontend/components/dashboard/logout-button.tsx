'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

export function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // Clear auth tokens
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    // Show success message
    toast.success('Logged out successfully');

    // Redirect to login page
    router.push('/client/login');
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      className="flex items-center gap-2"
      onClick={handleLogout}
    >
      <LogOut className="h-4 w-4" />
      Logout
    </Button>
  );
} 
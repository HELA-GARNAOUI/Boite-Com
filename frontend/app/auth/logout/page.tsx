'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { toast } from 'react-hot-toast';

export default function LogoutPage() {
  const router = useRouter();

  useEffect(() => {
    // Clear auth tokens
    Cookies.remove('access_token');
    Cookies.remove('refresh_token');

    // Show success message
    toast.success('Déconnexion réussie');

    // Redirect to home page
    router.push('/');
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
} 
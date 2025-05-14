'use client';

import { useEffect, useState } from 'react';
import { api } from '@/lib/api-client';

export default function ApiTestPage() {
  const [status, setStatus] = useState<string>('loading');
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const response = await api.health.check();
        setStatus(response.status);
        setMessage(response.message);
      } catch (error) {
        setStatus('error');
        setMessage(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    checkHealth();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API Connection Test</h1>
      <div className="p-4 border rounded">
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Message:</strong> {message}</p>
      </div>
    </div>
  );
} 
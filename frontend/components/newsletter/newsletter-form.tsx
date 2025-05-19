'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import api from '@/lib/api';
import { toast } from 'react-hot-toast';

export function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/v1/newsletter/', { email });
      toast.success('Merci pour votre inscription !');
      setEmail('');
    } catch {
      toast.error("Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <Input
        type="email"
        placeholder="Votre email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        className="max-w-[220px]"
      />
      <Button type="submit" disabled={loading}>
        {loading ? 'Envoi...' : "S'abonner"}
      </Button>
    </form>
  );
} 
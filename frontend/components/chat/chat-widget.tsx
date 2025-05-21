'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MessageCircle, X, Send, Loader2, HelpCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'react-hot-toast';
import api from '@/lib/api';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Message {
  id: number;
  message: string;
  is_from_user: boolean;
  created_at: string;
}

interface ChatSession {
  id: number;
  session_id: string;
  status: string;
  messages: Message[];
}

const FAQ_SUGGESTIONS = [
  "Quels services proposez-vous ?",
  "Quels sont vos tarifs ?",
  "Comment vous contacter ?",
  "Comment se déroule un projet avec vous ?",
  "Pouvez-vous me montrer vos réalisations ?"
];

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<ChatSession | null>(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen && session) {
      scrollToBottom();
    }
  }, [isOpen, session?.messages]);

  const startChat = async () => {
    try {
      console.log('Démarrage du chat...');
      setLoading(true);
      
      // Vérifier si l'API est accessible
      try {
        await api.get('/api/v1/chat/sessions/', {
          headers: {
            'X-Skip-Auth': 'true',
            'Accept': 'application/json',
          },
          withCredentials: true
        });
      } catch (err: any) {
        console.error('Erreur de connexion à l\'API:', err);
        toast.error('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
        return;
      }

      const response = await api.post('/api/v1/chat/sessions/', {}, {
        headers: {
          'X-Skip-Auth': 'true',
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('Réponse du serveur:', response.data);
      setSession(response.data as ChatSession);
      setIsOpen(true);
      toast.success('Chat démarré avec succès');
    } catch (err: any) {
      console.error('Erreur détaillée:', err);
      console.error('Message d\'erreur:', err.message);
      console.error('Réponse d\'erreur:', err.response?.data);
      
      if (err.response?.status === 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Impossible de démarrer la session de chat');
      }
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || !session) return;

    try {
      console.log('Envoi du message:', message);
      setLoading(true);
      
      const response = await api.post<Message[]>(`/api/v1/chat/sessions/${session.id}/send_message/`, {
        message: message.trim(),
      }, {
        headers: {
          'X-Skip-Auth': 'true',
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('Réponse du serveur:', response.data);
      setSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, ...response.data],
      } : null);
      setMessage('');
    } catch (err: any) {
      console.error('Erreur détaillée:', err);
      console.error('Message d\'erreur:', err.message);
      console.error('Réponse d\'erreur:', err.response?.data);
      
      if (err.response?.status === 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Impossible d\'envoyer le message');
      }
    } finally {
      setLoading(false);
    }
  };

  const closeChat = async () => {
    if (session) {
      try {
        console.log('Fermeture de la session...');
        await api.post(`/api/v1/chat/sessions/${session.id}/close_session/`, {}, {
          headers: {
            'X-Skip-Auth': 'true',
            'Accept': 'application/json',
          },
          withCredentials: true
        });
        console.log('Session fermée avec succès');
      } catch (err: any) {
        console.error('Erreur détaillée:', err);
        console.error('Message d\'erreur:', err.message);
        console.error('Réponse d\'erreur:', err.response?.data);
        toast.error(err.response?.data?.message || err.message || 'Erreur lors de la fermeture de la session');
      }
    }
    setSession(null);
    setIsOpen(false);
  };

  const handleFAQClick = async (suggestion: string) => {
    if (!session) return;
    
    try {
      setLoading(true);
      setMessage(suggestion);
      
      const response = await api.post<Message[]>(`/api/v1/chat/sessions/${session.id}/send_message/`, {
        message: suggestion,
      }, {
        headers: {
          'X-Skip-Auth': 'true',
          'Accept': 'application/json',
        },
        withCredentials: true
      });
      
      console.log('Réponse du serveur:', response.data);
      setSession(prev => prev ? {
        ...prev,
        messages: [...prev.messages, ...response.data],
      } : null);
      setMessage('');
    } catch (err: any) {
      console.error('Erreur détaillée:', err);
      console.error('Message d\'erreur:', err.message);
      console.error('Réponse d\'erreur:', err.response?.data);
      
      if (err.response?.status === 500) {
        toast.error('Erreur serveur. Veuillez réessayer plus tard.');
      } else {
        toast.error(err.response?.data?.message || err.message || 'Impossible d\'envoyer le message');
      }
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button
        onClick={startChat}
        disabled={loading}
        variant="default"
        size="icon"
        className="h-12 w-12 rounded-full shadow-lg fixed bottom-4 right-4 z-50 hover:scale-110 transition-transform"
      >
        {loading ? (
          <Loader2 className="h-6 w-6 animate-spin" />
        ) : (
          <MessageCircle className="h-6 w-6" />
        )}
      </Button>
    );
  }

  return (
    <Card className="w-[350px] shadow-xl fixed bottom-4 right-4 z-50">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Chat avec nous</h3>
        <Button
          variant="ghost"
          size="icon"
          onClick={closeChat}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-[400px] p-4 overflow-y-auto">
        <div className="space-y-4">
          {/* FAQ Suggestions - Always visible at the top */}
          <div className="space-y-4 mb-4">
            <p className="text-sm text-muted-foreground text-center">
              Comment puis-je vous aider aujourd'hui ?
            </p>
            <div className="grid grid-cols-1 gap-2">
              {FAQ_SUGGESTIONS.map((suggestion, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-start text-left h-auto py-2"
                  onClick={() => handleFAQClick(suggestion)}
                  disabled={loading}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </div>

          {/* Chat Messages */}
          {session?.messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                "flex items-start gap-2",
                msg.is_from_user ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div className={cn(
                "h-8 w-8 rounded-full flex items-center justify-center",
                msg.is_from_user ? "bg-primary" : "bg-primary/10"
              )}>
                <MessageCircle className={cn(
                  "h-4 w-4",
                  msg.is_from_user ? "text-primary-foreground" : "text-primary"
                )} />
              </div>
              <div className={cn(
                "flex-1 space-y-2",
                msg.is_from_user ? "items-end" : "items-start"
              )}>
                <p className={cn(
                  "text-sm font-medium",
                  msg.is_from_user ? "text-right" : "text-left"
                )}>
                  {msg.is_from_user ? "Vous" : "DigiFlow Assistant"}
                </p>
                <p className={cn(
                  "text-sm rounded-lg p-3 max-w-[80%]",
                  msg.is_from_user
                    ? "bg-primary text-primary-foreground ml-auto"
                    : "bg-muted text-muted-foreground"
                )}>
                  {msg.message}
                </p>
                <p className="text-xs text-muted-foreground">
                  {new Date(msg.created_at).toLocaleTimeString()}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <form onSubmit={sendMessage} className="p-4 border-t">
        <div className="flex gap-2">
          <Input
            placeholder="Écrivez votre message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1"
            disabled={loading}
          />
          <Button type="submit" size="icon" disabled={loading}>
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
} 
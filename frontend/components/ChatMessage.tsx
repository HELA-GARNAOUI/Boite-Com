import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ChatMessageProps {
  message: string;
  isUser: boolean;
  image?: string;
}

export function ChatMessage({ message, isUser, image }: ChatMessageProps) {
  return (
    <div className={cn(
      "flex w-full mb-4",
      isUser ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "flex flex-col max-w-[80%]",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "rounded-lg px-4 py-2",
          isUser 
            ? "bg-primary text-primary-foreground" 
            : "bg-muted"
        )}>
          <p className="text-sm">{message}</p>
        </div>
        {image && !isUser && (
          <div className="mt-2 rounded-lg overflow-hidden">
            <Image
              src={`/images/chatbot/${image}`}
              alt="Chatbot response"
              width={400}
              height={200}
              className="object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
} 
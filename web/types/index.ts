// Common types used throughout the application

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  read: boolean;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  price: number;
  duration: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

// API Response types
export interface ApiResponse<T> {
  data: T;
  message: string;
  status: number;
}

// Theme types
export type Theme = 'light' | 'dark' | 'system'; 
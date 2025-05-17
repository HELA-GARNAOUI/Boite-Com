// Application constants

export const APP_NAME = 'Boite-Com';
export const APP_DESCRIPTION = 'Your trusted communication platform';

// Navigation
export const NAVIGATION_ITEMS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Contact', href: '/contact' },
  { label: 'Dashboard', href: '/dashboard' },
] as const;

// API endpoints
export const API_ENDPOINTS = {
  MESSAGES: '/api/messages',
  USERS: '/api/users',
  SERVICES: '/api/services',
  CONTACT: '/api/contact',
} as const;

// Theme
export const THEME_STORAGE_KEY = 'theme';
export const DEFAULT_THEME = 'system';

// Contact form
export const CONTACT_FORM_FIELDS = {
  NAME: 'name',
  EMAIL: 'email',
  SUBJECT: 'subject',
  MESSAGE: 'message',
} as const;

// Validation
export const EMAIL_REGEX = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
export const MIN_PASSWORD_LENGTH = 8; 
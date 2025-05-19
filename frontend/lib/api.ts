import axios from 'axios';
import Cookies from 'js-cookie';

interface TokenResponse {
  access: string;
  refresh: string;
}

// Create axios instance with better error handling
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 15000, // Increased timeout to 15 seconds
});

// Custom error class for better error handling
class APIError extends Error {
  constructor(
    message: string,
    public status?: number,
    public data?: any,
    public isNetworkError: boolean = false
  ) {
    super(message);
    this.name = 'APIError';
  }
}

// Request interceptor
api.interceptors.request.use(
  (config) => {
    // Add default headers
    config.headers = {
      ...config.headers,
      'Accept': 'application/json',
    };

    // Skip auth for chat requests
    if (config.url?.includes('/chat/')) {
      config.headers['X-Skip-Auth'] = 'true';
    }

    const token = Cookies.get('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(new APIError('Failed to send request', undefined, undefined, true));
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error: any) => {
    // Handle network errors
    if (!error.response && !error.request) {
      return Promise.reject(
        new APIError(
          'Network error: Unable to connect to the server. Please check your internet connection and try again.',
          undefined,
          undefined,
          true
        )
      );
    }

    // Handle server not responding
    if (error.code === 'ECONNABORTED' || !error.response) {
      return Promise.reject(
        new APIError(
          'Server error: The server is not responding. Please make sure the backend server is running and try again.',
          undefined,
          undefined,
          true
        )
      );
    }

    const originalRequest = error.config;

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest?._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          Cookies.remove('access_token');
          Cookies.remove('refresh_token');
          window.location.href = '/client/login?error=session_expired';
          return Promise.reject(
            new APIError('Your session has expired. Please log in again.', 401)
          );
        }

        // Try to refresh the token
        const response = await axios.post<TokenResponse>(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;

        // Update the access token
        Cookies.set('access_token', access, { 
          expires: 1,
          path: '/',
          sameSite: 'Lax',
          secure: process.env.NODE_ENV === 'production'
        });

        // Retry the original request with the new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/client/login?error=session_expired';
        return Promise.reject(
          new APIError('Your session has expired. Please log in again.', 401)
        );
      }
    }

    // Handle 500 Internal Server Error
    if (error.response?.status === 500) {
      return Promise.reject(
        new APIError(
          'Server error: The server encountered an unexpected error. Please try again later or contact support if the issue persists.',
          500,
          error.response?.data
        )
      );
    }

    // Handle other errors
    const errorMessage = error.response?.data?.detail || 
                        error.response?.data?.message || 
                        'An unexpected error occurred. Please try again.';
    
    return Promise.reject(
      new APIError(
        errorMessage,
        error.response?.status,
        error.response?.data
      )
    );
  }
);

export default api; 
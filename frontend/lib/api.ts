import axios from 'axios';
import Cookies from 'js-cookie';

interface TokenResponse {
  access: string;
  refresh: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
  timeout: 10000, // 10 secondes de timeout
});

// Intercepteur pour les requêtes
api.interceptors.request.use(
  (config) => {
    // Ajout des headers par défaut
    config.headers = {
      ...config.headers,
      'Accept': 'application/json',
    };

    // Si c'est une requête de chat, on ajoute le header X-Skip-Auth
    if (config.url?.includes('/chat/')) {
      config.headers['X-Skip-Auth'] = 'true';
    }

    const token = Cookies.get('access_token');
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log('Requête envoyée:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error('Erreur de requête:', error);
    return Promise.reject(error);
  }
);

// Intercepteur pour les réponses
api.interceptors.response.use(
  (response) => {
    console.log('Réponse reçue:', {
      url: response.config.url,
      status: response.status,
      data: response.data,
    });
    return response;
  },
  async (error) => {
    console.error('Erreur de réponse:', error);
    
    if (error.response) {
      // La requête a été faite et le serveur a répondu avec un code d'état
      console.error('Données de réponse:', error.response.data);
      console.error('Status:', error.response.status);
      console.error('Headers:', error.response.headers);
    } else if (error.request) {
      // La requête a été faite mais aucune réponse n'a été reçue
      console.error('Pas de réponse reçue:', error.request);
    } else {
      // Une erreur s'est produite lors de la configuration de la requête
      console.error('Erreur de configuration:', error.message);
    }

    // Si c'est une erreur réseau
    if (!error.response) {
      console.error('Network error:', error.message);
      return Promise.reject(new Error('Impossible de se connecter au serveur. Veuillez vérifier votre connexion internet.'));
    }

    const originalRequest = error.config;

    // If the error is 401 and we haven't tried to refresh the token yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh_token');
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Try to refresh the token
        const response = await axios.post<TokenResponse>(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'}/api/v1/auth/token/refresh/`,
          { refresh: refreshToken }
        );

        const { access } = response.data;

        // Update the access token
        Cookies.set('access_token', access, { expires: 1 });

        // Retry the original request with the new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        return api(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear tokens and redirect to login
        Cookies.remove('access_token');
        Cookies.remove('refresh_token');
        window.location.href = '/auth/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api; 
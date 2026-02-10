import axios, { AxiosInstance, AxiosError } from 'axios';

const SPOTIFY_API_BASE = import.meta.env.VITE_SPOTIFY_API_URL || 'https://api.spotify.com/v1';

export const createApiClient = (accessToken?: string): AxiosInstance => {
  const client = axios.create({
    baseURL: SPOTIFY_API_BASE,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (accessToken) {
    client.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }

  client.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expired, redirect to login
        localStorage.removeItem('spotify_access_token');
        window.location.href = '/';
      }
      return Promise.reject(error);
    }
  );

  return client;
};

export const handleApiError = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      return error.response.data?.error?.message || 'An error occurred';
    }
    if (error.request) {
      return 'No response from server';
    }
  }
  return 'An unexpected error occurred';
};

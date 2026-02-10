import { useEffect } from 'react';
import { useAuthStore } from '@/store/authStore';
import { spotifyService } from '@/services/spotify';

export const useAuth = () => {
  const {
    accessToken,
    user,
    isAuthenticated,
    setAuth,
    setUser,
    logout,
    isTokenExpired,
  } = useAuthStore();

  useEffect(() => {
    // Check if token is expired on mount
    if (accessToken && isTokenExpired()) {
      logout();
    }
  }, [accessToken, isTokenExpired, logout]);

  const login = () => {
    window.location.href = spotifyService.getAuthUrl();
  };

  const handleCallback = async (hash: string) => {
    const params = new URLSearchParams(hash.substring(1));
    const accessToken = params.get('access_token');
    const expiresIn = params.get('expires_in');

    if (accessToken && expiresIn) {
      setAuth(accessToken, parseInt(expiresIn));
      
      try {
        const userData = await spotifyService.getCurrentUser(accessToken);
        setUser(userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
        logout();
      }
    }
  };

  return {
    accessToken,
    user,
    isAuthenticated,
    login,
    logout,
    handleCallback,
  };
};

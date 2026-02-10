import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SpotifyUser } from '@/types/spotify';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: number | null;
  user: SpotifyUser | null;
  isAuthenticated: boolean;
  setAuth: (accessToken: string, expiresIn: number, refreshToken?: string) => void;
  setUser: (user: SpotifyUser) => void;
  logout: () => void;
  isTokenExpired: () => boolean;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      refreshToken: null,
      expiresAt: null,
      user: null,
      isAuthenticated: false,

      setAuth: (accessToken: string, expiresIn: number, refreshToken?: string) => {
        const expiresAt = Date.now() + expiresIn * 1000;
        set({
          accessToken,
          refreshToken: refreshToken || get().refreshToken,
          expiresAt,
          isAuthenticated: true,
        });
      },

      setUser: (user: SpotifyUser) => {
        set({ user });
      },

      logout: () => {
        set({
          accessToken: null,
          refreshToken: null,
          expiresAt: null,
          user: null,
          isAuthenticated: false,
        });
        localStorage.removeItem('spotify_access_token');
      },

      isTokenExpired: () => {
        const { expiresAt } = get();
        if (!expiresAt) return true;
        return Date.now() >= expiresAt;
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);

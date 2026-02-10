import { create } from 'zustand';
import { SpotifyTrack, SpotifyArtist, TimeRange } from '@/types/spotify';

interface MusicState {
  topTracks: Record<TimeRange, SpotifyTrack[]>;
  topArtists: Record<TimeRange, SpotifyArtist[]>;
  recentTracks: SpotifyTrack[];
  currentTrack: SpotifyTrack | null;
  isLoading: boolean;
  error: string | null;
  
  setTopTracks: (timeRange: TimeRange, tracks: SpotifyTrack[]) => void;
  setTopArtists: (timeRange: TimeRange, artists: SpotifyArtist[]) => void;
  setRecentTracks: (tracks: SpotifyTrack[]) => void;
  setCurrentTrack: (track: SpotifyTrack | null) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useMusicStore = create<MusicState>((set) => ({
  topTracks: {
    short_term: [],
    medium_term: [],
    long_term: [],
  },
  topArtists: {
    short_term: [],
    medium_term: [],
    long_term: [],
  },
  recentTracks: [],
  currentTrack: null,
  isLoading: false,
  error: null,

  setTopTracks: (timeRange, tracks) =>
    set((state) => ({
      topTracks: { ...state.topTracks, [timeRange]: tracks },
    })),

  setTopArtists: (timeRange, artists) =>
    set((state) => ({
      topArtists: { ...state.topArtists, [timeRange]: artists },
    })),

  setRecentTracks: (tracks) => set({ recentTracks: tracks }),
  setCurrentTrack: (track) => set({ currentTrack: track }),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));

import { createApiClient, handleApiError } from '@/utils/api';
import {
  SpotifyUser,
  TopTracksResponse,
  TopArtistsResponse,
  RecentlyPlayedResponse,
  AudioFeatures,
  TimeRange,
  RecommendationsResponse,
} from '@/types/spotify';

const SPOTIFY_AUTH_URL = import.meta.env.VITE_SPOTIFY_AUTH_URL || 'https://accounts.spotify.com';
const CLIENT_ID = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_SPOTIFY_REDIRECT_URI || 'http://localhost:3000/callback';

const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played',
  'user-library-read',
  'playlist-read-private',
  'playlist-read-collaborative',
].join(' ');

export const spotifyService = {
  // Authentication
  getAuthUrl: (): string => {
    const params = new URLSearchParams({
      client_id: CLIENT_ID || '',
      response_type: 'token',
      redirect_uri: REDIRECT_URI,
      scope: SCOPES,
      show_dialog: 'true',
    });
    return `${SPOTIFY_AUTH_URL}/authorize?${params.toString()}`;
  },

  // User
  getCurrentUser: async (accessToken: string): Promise<SpotifyUser> => {
    try {
      const api = createApiClient(accessToken);
      const response = await api.get<SpotifyUser>('/me');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Top Items
  getTopTracks: async (
    accessToken: string,
    timeRange: TimeRange = 'medium_term',
    limit: number = 20
  ): Promise<TopTracksResponse> => {
    try {
      const api = createApiClient(accessToken);
      const response = await api.get<TopTracksResponse>('/me/top/tracks', {
        params: { time_range: timeRange, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  getTopArtists: async (
    accessToken: string,
    timeRange: TimeRange = 'medium_term',
    limit: number = 20
  ): Promise<TopArtistsResponse> => {
    try {
      const api = createApiClient(accessToken);
      const response = await api.get<TopArtistsResponse>('/me/top/artists', {
        params: { time_range: timeRange, limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Recently Played
  getRecentlyPlayed: async (
    accessToken: string,
    limit: number = 20
  ): Promise<RecentlyPlayedResponse> => {
    try {
      const api = createApiClient(accessToken);
      const response = await api.get<RecentlyPlayedResponse>('/me/player/recently-played', {
        params: { limit },
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Audio Features
  getAudioFeatures: async (
    accessToken: string,
    trackIds: string[]
  ): Promise<AudioFeatures[]> => {
    try {
      const api = createApiClient(accessToken);
      const response = await api.get<{ audio_features: AudioFeatures[] }>(
        '/audio-features',
        {
          params: { ids: trackIds.join(',') },
        }
      );
      return response.data.audio_features;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },

  // Recommendations
  getRecommendations: async (
    accessToken: string,
    seedTracks?: string[],
    seedArtists?: string[],
    limit: number = 20
  ): Promise<RecommendationsResponse> => {
    try {
      const api = createApiClient(accessToken);
      const params: Record<string, string | number> = { limit };
      
      if (seedTracks?.length) {
        params.seed_tracks = seedTracks.slice(0, 5).join(',');
      }
      if (seedArtists?.length) {
        params.seed_artists = seedArtists.slice(0, 5).join(',');
      }

      const response = await api.get<RecommendationsResponse>('/recommendations', {
        params,
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error));
    }
  },
};

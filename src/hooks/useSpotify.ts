import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import { useMusicStore } from '@/store/musicStore';
import { spotifyService } from '@/services/spotify';
import { TimeRange } from '@/types/spotify';

export const useSpotify = () => {
  const { accessToken } = useAuthStore();
  const {
    topTracks,
    topArtists,
    recentTracks,
    setTopTracks,
    setTopArtists,
    setRecentTracks,
    setLoading,
    setError,
  } = useMusicStore();

  const [isInitialized, setIsInitialized] = useState(false);

  const fetchTopTracks = async (timeRange: TimeRange = 'medium_term') => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await spotifyService.getTopTracks(accessToken, timeRange);
      setTopTracks(timeRange, data.items);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch top tracks');
    } finally {
      setLoading(false);
    }
  };

  const fetchTopArtists = async (timeRange: TimeRange = 'medium_term') => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await spotifyService.getTopArtists(accessToken, timeRange);
      setTopArtists(timeRange, data.items);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch top artists');
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentTracks = async () => {
    if (!accessToken) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await spotifyService.getRecentlyPlayed(accessToken);
      setRecentTracks(data.items.map(item => item.track));
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch recent tracks');
    } finally {
      setLoading(false);
    }
  };

  const fetchAudioFeatures = async (trackIds: string[]) => {
    if (!accessToken) return null;
    
    try {
      return await spotifyService.getAudioFeatures(accessToken, trackIds);
    } catch (error) {
      console.error('Failed to fetch audio features:', error);
      return null;
    }
  };

  const fetchRecommendations = async (seedTracks?: string[], seedArtists?: string[]) => {
    if (!accessToken) return null;
    
    try {
      return await spotifyService.getRecommendations(accessToken, seedTracks, seedArtists);
    } catch (error) {
      console.error('Failed to fetch recommendations:', error);
      return null;
    }
  };

  useEffect(() => {
    if (accessToken && !isInitialized) {
      // Fetch initial data
      fetchTopTracks('medium_term');
      fetchTopArtists('medium_term');
      fetchRecentTracks();
      setIsInitialized(true);
    }
  }, [accessToken, isInitialized]);

  return {
    topTracks,
    topArtists,
    recentTracks,
    fetchTopTracks,
    fetchTopArtists,
    fetchRecentTracks,
    fetchAudioFeatures,
    fetchRecommendations,
  };
};

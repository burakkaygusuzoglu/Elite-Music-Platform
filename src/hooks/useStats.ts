import { useMemo } from 'react';
import { SpotifyTrack, SpotifyArtist, AudioFeatures } from '@/types/spotify';

export const useStats = (
  topTracks: SpotifyTrack[],
  topArtists: SpotifyArtist[],
  audioFeatures?: AudioFeatures[]
) => {
  const genreDistribution = useMemo(() => {
    const genreCount: Record<string, number> = {};
    
    topArtists.forEach(artist => {
      artist.genres.forEach(genre => {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      });
    });

    return Object.entries(genreCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([name, value]) => ({ name, value }));
  }, [topArtists]);

  const averagePopularity = useMemo(() => {
    if (topTracks.length === 0) return 0;
    const sum = topTracks.reduce((acc, track) => acc + track.popularity, 0);
    return Math.round(sum / topTracks.length);
  }, [topTracks]);

  const totalListeningTime = useMemo(() => {
    return topTracks.reduce((acc, track) => acc + track.duration_ms, 0);
  }, [topTracks]);

  const audioStats = useMemo(() => {
    if (!audioFeatures || audioFeatures.length === 0) {
      return null;
    }

    const features = {
      danceability: 0,
      energy: 0,
      valence: 0,
      acousticness: 0,
      instrumentalness: 0,
      speechiness: 0,
    };

    audioFeatures.forEach(feature => {
      features.danceability += feature.danceability;
      features.energy += feature.energy;
      features.valence += feature.valence;
      features.acousticness += feature.acousticness;
      features.instrumentalness += feature.instrumentalness;
      features.speechiness += feature.speechiness;
    });

    const count = audioFeatures.length;
    return {
      danceability: Math.round((features.danceability / count) * 100),
      energy: Math.round((features.energy / count) * 100),
      valence: Math.round((features.valence / count) * 100),
      acousticness: Math.round((features.acousticness / count) * 100),
      instrumentalness: Math.round((features.instrumentalness / count) * 100),
      speechiness: Math.round((features.speechiness / count) * 100),
    };
  }, [audioFeatures]);

  const moodAnalysis = useMemo(() => {
    if (!audioFeatures || audioFeatures.length === 0) {
      return null;
    }

    const avgEnergy = audioFeatures.reduce((acc, f) => acc + f.energy, 0) / audioFeatures.length;
    const avgValence = audioFeatures.reduce((acc, f) => acc + f.valence, 0) / audioFeatures.length;

    if (avgEnergy > 0.7 && avgValence > 0.6) return 'Energetic & Happy';
    if (avgValence > 0.6) return 'Happy & Uplifting';
    if (avgEnergy < 0.4 && avgValence < 0.4) return 'Melancholic & Calm';
    if (avgEnergy > 0.7) return 'Intense & Powerful';
    return 'Balanced & Chill';
  }, [audioFeatures]);

  return {
    genreDistribution,
    averagePopularity,
    totalListeningTime,
    audioStats,
    moodAnalysis,
  };
};

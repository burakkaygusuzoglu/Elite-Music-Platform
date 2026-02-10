import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { TopTracks } from '@/components/stats/TopTracks';
import { TopArtists } from '@/components/stats/TopArtists';
import { GenreChart } from '@/components/stats/GenreChart';
import { AudioFeaturesRadar } from '@/components/stats/AudioFeaturesRadar';
import { useSpotify } from '@/hooks/useSpotify';
import { useStats } from '@/hooks/useStats';
import { TimeRange } from '@/types/spotify';

export const Stats = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('medium_term');
  const [audioFeatures, setAudioFeatures] = useState<{
    danceability: number;
    energy: number;
    valence: number;
    acousticness: number;
    instrumentalness: number;
    speechiness: number;
  } | null>(null);
  const { topTracks, topArtists, fetchTopTracks, fetchTopArtists, fetchAudioFeatures } = useSpotify();
  const { genreDistribution } = useStats(
    topTracks[timeRange],
    topArtists[timeRange]
  );

  useEffect(() => {
    const loadAudioFeatures = async () => {
      const tracks = topTracks[timeRange];
      if (tracks.length > 0) {
        const trackIds = tracks.slice(0, 10).map(t => t.id);
        const features = await fetchAudioFeatures(trackIds);
        if (features) {
          const avg = {
            danceability: 0,
            energy: 0,
            valence: 0,
            acousticness: 0,
            instrumentalness: 0,
            speechiness: 0,
          };
          features.forEach(f => {
            avg.danceability += f.danceability;
            avg.energy += f.energy;
            avg.valence += f.valence;
            avg.acousticness += f.acousticness;
            avg.instrumentalness += f.instrumentalness;
            avg.speechiness += f.speechiness;
          });
          const count = features.length;
          setAudioFeatures({
            danceability: Math.round((avg.danceability / count) * 100),
            energy: Math.round((avg.energy / count) * 100),
            valence: Math.round((avg.valence / count) * 100),
            acousticness: Math.round((avg.acousticness / count) * 100),
            instrumentalness: Math.round((avg.instrumentalness / count) * 100),
            speechiness: Math.round((avg.speechiness / count) * 100),
          });
        }
      }
    };
    loadAudioFeatures();
  }, [topTracks, timeRange, fetchAudioFeatures]);

  const timeRangeOptions: { value: TimeRange; label: string }[] = [
    { value: 'short_term', label: 'Last 4 Weeks' },
    { value: 'medium_term', label: 'Last 6 Months' },
    { value: 'long_term', label: 'All Time' },
  ];

  const handleTimeRangeChange = async (newTimeRange: TimeRange) => {
    setTimeRange(newTimeRange);
    if (topTracks[newTimeRange].length === 0) {
      await fetchTopTracks(newTimeRange);
    }
    if (topArtists[newTimeRange].length === 0) {
      await fetchTopArtists(newTimeRange);
    }
  };

  return (
    <div className="space-y-8">
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-4xl font-bold gradient-text mb-2">Your Music Stats</h1>
          <p className="text-gray-400">Deep dive into your listening habits</p>
        </div>
        <div className="flex gap-2">
          {timeRangeOptions.map((option) => (
            <Button
              key={option.value}
              variant={timeRange === option.value ? 'default' : 'outline'}
              size="sm"
              onClick={() => handleTimeRangeChange(option.value)}
            >
              {option.label}
            </Button>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-8">
          {topTracks[timeRange].length > 0 && (
            <TopTracks tracks={topTracks[timeRange].slice(0, 10)} timeRange={timeRange} />
          )}
        </div>
        <div className="space-y-8">
          {topArtists[timeRange].length > 0 && (
            <TopArtists artists={topArtists[timeRange].slice(0, 6)} timeRange={timeRange} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {genreDistribution.length > 0 && (
          <GenreChart data={genreDistribution} />
        )}
        <AudioFeaturesRadar data={audioFeatures} />
      </div>
    </div>
  );
};

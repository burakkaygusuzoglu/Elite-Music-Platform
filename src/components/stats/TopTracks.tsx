import { motion } from 'framer-motion';
import { Play, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SpotifyTrack, TimeRange } from '@/types/spotify';
import { formatDuration } from '@/utils/formatters';

interface TopTracksProps {
  tracks: SpotifyTrack[];
  timeRange: TimeRange;
}

export const TopTracks = ({ tracks, timeRange }: TopTracksProps) => {
  const timeRangeLabel = {
    short_term: 'Last 4 Weeks',
    medium_term: 'Last 6 Months',
    long_term: 'All Time',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-text">
          Top Tracks - {timeRangeLabel[timeRange]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {tracks.map((track, index) => (
            <motion.div
              key={track.id}
              className="flex items-center gap-3 p-3 rounded-lg glass-hover cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="text-2xl font-bold text-purple-500 w-8">
                #{index + 1}
              </div>
              <div className="relative flex-shrink-0">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-16 h-16 rounded-md"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <Play className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate group-hover:text-purple-400 transition-colors">
                  {track.name}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {track.artists.map((a) => a.name).join(', ')}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-24 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-primary"
                      style={{ width: `${track.popularity}%` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500">
                    {track.popularity}% popularity
                  </span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <span className="text-sm text-gray-400">
                  {formatDuration(track.duration_ms)}
                </span>
                <a
                  href={track.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-500 hover:text-green-400"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { SpotifyArtist, TimeRange } from '@/types/spotify';
import { formatNumber } from '@/utils/formatters';

interface TopArtistsProps {
  artists: SpotifyArtist[];
  timeRange: TimeRange;
}

export const TopArtists = ({ artists, timeRange }: TopArtistsProps) => {
  const timeRangeLabel = {
    short_term: 'Last 4 Weeks',
    medium_term: 'Last 6 Months',
    long_term: 'All Time',
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-text">
          Top Artists - {timeRangeLabel[timeRange]}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {artists.map((artist, index) => (
            <motion.div
              key={artist.id}
              className="relative group"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="glass rounded-xl overflow-hidden cursor-pointer">
                <div className="relative aspect-square">
                  <img
                    src={artist.images[0]?.url || '/placeholder-artist.png'}
                    alt={artist.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-bold text-sm">
                          #{index + 1}
                        </span>
                        <a
                          href={artist.external_urls.spotify}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-500 hover:text-green-400"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg truncate group-hover:text-purple-400 transition-colors">
                    {artist.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-2 text-sm text-gray-400">
                    <span>{formatNumber(artist.followers.total)} followers</span>
                  </div>
                  {artist.genres.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {artist.genres.slice(0, 2).map((genre) => (
                        <span
                          key={genre}
                          className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300"
                        >
                          {genre}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { motion } from 'framer-motion';
import { Play, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSpotify } from '@/hooks/useSpotify';

export const ActivityFeed = () => {
  const { recentTracks } = useSpotify();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5 text-purple-500" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentTracks.slice(0, 5).map((track, index) => (
            <motion.div
              key={`${track.id}-${index}`}
              className="flex items-center gap-3 p-3 rounded-lg glass-hover cursor-pointer group"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              whileHover={{ scale: 1.02, x: 5 }}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className="w-12 h-12 rounded-md"
                />
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-md">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium truncate group-hover:text-purple-400 transition-colors">
                  {track.name}
                </p>
                <p className="text-sm text-gray-400 truncate">
                  {track.artists.map((a) => a.name).join(', ')}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

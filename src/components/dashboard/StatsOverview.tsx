import { motion } from 'framer-motion';
import { Music, Mic2, TrendingUp, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useSpotify } from '@/hooks/useSpotify';
import { formatListeningTime } from '@/utils/formatters';

export const StatsOverview = () => {
  const { topTracks, topArtists } = useSpotify();

  const stats = [
    {
      icon: Music,
      label: 'Top Tracks',
      value: topTracks.medium_term.length,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/20',
    },
    {
      icon: Mic2,
      label: 'Top Artists',
      value: topArtists.medium_term.length,
      color: 'text-pink-500',
      bgColor: 'bg-pink-500/20',
    },
    {
      icon: TrendingUp,
      label: 'Avg Popularity',
      value: Math.round(
        topTracks.medium_term.reduce((acc, t) => acc + t.popularity, 0) /
          (topTracks.medium_term.length || 1)
      ),
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/20',
    },
    {
      icon: Clock,
      label: 'Total Time',
      value: formatListeningTime(
        topTracks.medium_term.reduce((acc, t) => acc + t.duration_ms, 0)
      ),
      color: 'text-green-500',
      bgColor: 'bg-green-500/20',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="hover:scale-105 transition-transform cursor-pointer">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-400">
                  {stat.label}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${stat.color}`}>
                  {stat.value}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

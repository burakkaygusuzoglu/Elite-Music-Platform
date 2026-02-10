import { Hero } from '@/components/dashboard/Hero';
import { StatsOverview } from '@/components/dashboard/StatsOverview';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';
import { TopTracks } from '@/components/stats/TopTracks';
import { useSpotify } from '@/hooks/useSpotify';

export const Dashboard = () => {
  const { topTracks } = useSpotify();

  return (
    <div className="space-y-8">
      <Hero />
      <StatsOverview />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {topTracks.medium_term.length > 0 && (
            <TopTracks
              tracks={topTracks.medium_term.slice(0, 10)}
              timeRange="medium_term"
            />
          )}
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
};

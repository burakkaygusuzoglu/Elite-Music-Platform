import { motion } from 'framer-motion';
import { FriendsList } from '@/components/social/FriendsList';
import { ActivityFeed } from '@/components/dashboard/ActivityFeed';

export const Social = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Social Hub</h1>
        <p className="text-gray-400">Connect with friends and share your music journey</p>
      </motion.div>

      <FriendsList />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <ActivityFeed />
        <motion.div
          className="glass rounded-xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold mb-4 gradient-text">Shared Playlists</h2>
          <p className="text-gray-400">Coming soon! Create and share playlists with friends.</p>
        </motion.div>
      </div>
    </div>
  );
};

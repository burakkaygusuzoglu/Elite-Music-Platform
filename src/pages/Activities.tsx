import { motion } from 'framer-motion';
import { GuessTheSong } from '@/components/activities/GuessTheSong';
import { MusicBingo } from '@/components/activities/MusicBingo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Trophy, Zap } from 'lucide-react';

export const Activities = () => {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Activities & Games</h1>
        <p className="text-gray-400">Have fun with your music in new and exciting ways</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <GuessTheSong />
        <MusicBingo />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Trophy className="w-6 h-6" />
                Genre Challenge
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Explore new genres and discover music you've never heard before!
              </p>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 gradient-text">
                <Zap className="w-6 h-6" />
                Decade Discovery
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400 mb-4">
                Travel through time and explore music from different decades!
              </p>
              <p className="text-sm text-gray-500">Coming soon...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

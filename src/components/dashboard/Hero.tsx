import { motion } from 'framer-motion';
import { Music2, Sparkles } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export const Hero = () => {
  const { user } = useAuth();

  return (
    <motion.section
      className="relative overflow-hidden rounded-2xl glass p-8 md:p-12 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Welcome back, <span className="gradient-text">{user?.display_name}</span>
          </h1>
          <p className="text-gray-400 text-lg mb-6">
            Discover your music story, compete with friends, and explore new sounds
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <div className="glass-hover px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
            <Music2 className="w-5 h-5 text-purple-400" />
            <span className="text-sm">Your Music Journey</span>
          </div>
          <div className="glass-hover px-4 py-2 rounded-lg border border-white/10 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-pink-400" />
            <span className="text-sm">Personalized Insights</span>
          </div>
        </motion.div>
      </div>

      {/* Animated background elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
        <motion.div
          className="absolute top-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-10 right-20 w-40 h-40 bg-pink-500 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </div>
    </motion.section>
  );
};

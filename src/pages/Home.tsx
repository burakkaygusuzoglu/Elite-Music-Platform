import { motion } from 'framer-motion';
import { Music2, Sparkles, TrendingUp } from 'lucide-react';
import { LoginButton } from '@/components/auth/LoginButton';

export const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-20 left-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-pink-500 rounded-full blur-3xl opacity-20"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 7, repeat: Infinity }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full blur-3xl opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center justify-center gap-3 mb-8"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Music2 className="w-16 h-16 text-purple-500" />
            <h1 className="text-6xl font-bold gradient-text">Elite Music</h1>
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-2xl md:text-3xl text-gray-300 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Your Music Journey, <span className="gradient-text">Reimagined</span>
          </motion.p>

          <motion.p
            className="text-lg text-gray-400 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Deep insights, AI-powered recommendations, and social features that make music discovery exciting
          </motion.p>

          {/* Features */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <div className="glass rounded-xl p-6">
              <TrendingUp className="w-12 h-12 text-purple-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Deep Analytics</h3>
              <p className="text-gray-400">
                Comprehensive statistics about your music taste and listening habits
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <Sparkles className="w-12 h-12 text-pink-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Smart Recommendations</h3>
              <p className="text-gray-400">
                AI-powered suggestions tailored to your unique music preferences
              </p>
            </div>
            <div className="glass rounded-xl p-6">
              <Music2 className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Social & Fun</h3>
              <p className="text-gray-400">
                Connect with friends, compete, and discover music together
              </p>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1 }}
          >
            <LoginButton />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

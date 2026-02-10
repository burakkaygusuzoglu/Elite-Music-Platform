import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { motion } from 'framer-motion';

export const AuthCallback = () => {
  const navigate = useNavigate();
  const { handleCallback } = useAuth();

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      handleCallback(hash);
      navigate('/dashboard');
    }
  }, [handleCallback, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-dark">
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <motion.div
          className="w-16 h-16 mx-auto mb-4 border-4 border-purple-500 border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <h2 className="text-2xl font-bold gradient-text">
          Connecting to Spotify...
        </h2>
        <p className="text-gray-400 mt-2">Please wait a moment</p>
      </motion.div>
    </div>
  );
};

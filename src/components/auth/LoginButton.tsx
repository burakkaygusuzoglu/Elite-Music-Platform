import { Music2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';

export const LoginButton = () => {
  const { login } = useAuth();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Button
        onClick={login}
        size="lg"
        className="group relative overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          <Music2 className="w-5 h-5" />
          Connect with Spotify
        </span>
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500"
          initial={{ x: '-100%' }}
          whileHover={{ x: 0 }}
          transition={{ duration: 0.3 }}
        />
      </Button>
    </motion.div>
  );
};

import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Music2, LogOut, User } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/Button';

export const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-2 group">
          <Music2 className="w-8 h-8 text-purple-500 group-hover:text-pink-500 transition-colors" />
          <span className="text-xl font-bold gradient-text">Elite Music</span>
        </Link>

        <div className="flex items-center gap-6">
          {user && (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-2 hover:text-purple-400 transition-colors"
              >
                {user.images?.[0]?.url ? (
                  <img
                    src={user.images[0].url}
                    alt={user.display_name}
                    className="w-8 h-8 rounded-full border-2 border-purple-500"
                  />
                ) : (
                  <User className="w-8 h-8" />
                )}
                <span className="hidden md:inline">{user.display_name}</span>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

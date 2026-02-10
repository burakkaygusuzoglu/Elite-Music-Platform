import { motion } from 'framer-motion';
import { User, Mail, MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { useAuth } from '@/hooks/useAuth';
import { formatNumber } from '@/utils/formatters';

export const Profile = () => {
  const { user } = useAuth();

  if (!user) return null;

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-bold gradient-text mb-2">Your Profile</h1>
        <p className="text-gray-400">Manage your account and preferences</p>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center text-center mb-6">
                {user.images?.[0]?.url ? (
                  <img
                    src={user.images[0].url}
                    alt={user.display_name}
                    className="w-32 h-32 rounded-full border-4 border-purple-500 mb-4"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-gradient-primary flex items-center justify-center mb-4">
                    <User className="w-16 h-16" />
                  </div>
                )}
                <h2 className="text-2xl font-bold gradient-text mb-2">
                  {user.display_name}
                </h2>
                <p className="text-gray-400">{user.id}</p>
              </div>

              <div className="space-y-3">
                {user.email && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{user.email}</span>
                  </div>
                )}
                {user.country && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span className="text-sm">{user.country}</span>
                  </div>
                )}
                <div className="flex items-center gap-3 text-gray-300">
                  <User className="w-5 h-5 text-purple-400" />
                  <span className="text-sm">
                    {formatNumber(user.followers.total)} followers
                  </span>
                </div>
                {user.product && (
                  <div className="flex items-center gap-3 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span className="text-sm capitalize">{user.product} account</span>
                  </div>
                )}
              </div>

              <a
                href={`https://open.spotify.com/user/${user.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 flex items-center justify-center gap-2 glass-hover px-4 py-2 rounded-lg text-green-500 hover:text-green-400 transition-colors"
              >
                View on Spotify
                <ExternalLink className="w-4 h-4" />
              </a>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="lg:col-span-2 space-y-8"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Account settings and preferences will be available here soon.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-400">
                Track your music listening milestones and unlock achievements!
              </p>
              <p className="text-sm text-gray-500 mt-2">Coming soon...</p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

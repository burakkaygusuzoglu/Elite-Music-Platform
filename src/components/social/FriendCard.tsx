import { motion } from 'framer-motion';
import { Music, MessageCircle } from 'lucide-react';
import { Friend } from '@/types/user';
import { Button } from '@/components/ui/Button';
import { CompatibilityScore } from './CompatibilityScore';

interface FriendCardProps {
  friend: Friend;
}

export const FriendCard = ({ friend }: FriendCardProps) => {
  return (
    <motion.div
      className="glass rounded-xl p-4 hover:scale-105 transition-transform cursor-pointer"
      whileHover={{ y: -5 }}
    >
      <div className="flex items-center gap-3 mb-3">
        <img
          src={friend.image}
          alt={friend.name}
          className="w-16 h-16 rounded-full border-2 border-purple-500"
        />
        <div className="flex-1">
          <h3 className="font-semibold">{friend.name}</h3>
          <p className="text-sm text-gray-400 flex items-center gap-1">
            <Music className="w-3 h-3" />
            {friend.mutualArtists} mutual artists
          </p>
        </div>
      </div>

      {friend.compatibilityScore && (
        <CompatibilityScore score={friend.compatibilityScore} />
      )}

      <div className="flex gap-2 mt-3">
        <Button size="sm" variant="outline" className="flex-1">
          <MessageCircle className="w-4 h-4 mr-1" />
          Message
        </Button>
        <Button size="sm" className="flex-1">
          View Profile
        </Button>
      </div>
    </motion.div>
  );
};

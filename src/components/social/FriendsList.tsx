import { motion } from 'framer-motion';
import { Users, UserPlus } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { FriendCard } from './FriendCard';
import { Button } from '@/components/ui/Button';
import { useSocialStore } from '@/store/socialStore';

export const FriendsList = () => {
  const { friends } = useSocialStore();

  // Mock friends data for demo
  const mockFriends = friends.length > 0 ? friends : [
    {
      id: '1',
      name: 'Alex Johnson',
      image: 'https://i.pravatar.cc/150?img=1',
      mutualArtists: 24,
      compatibilityScore: 87,
    },
    {
      id: '2',
      name: 'Sarah Williams',
      image: 'https://i.pravatar.cc/150?img=2',
      mutualArtists: 18,
      compatibilityScore: 72,
    },
    {
      id: '3',
      name: 'Mike Davis',
      image: 'https://i.pravatar.cc/150?img=3',
      mutualArtists: 31,
      compatibilityScore: 94,
    },
  ];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-500" />
            Your Friends
          </CardTitle>
          <Button size="sm" variant="outline">
            <UserPlus className="w-4 h-4 mr-2" />
            Add Friend
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockFriends.map((friend, index) => (
            <motion.div
              key={friend.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <FriendCard friend={friend} />
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

import { create } from 'zustand';
import { Friend, Activity } from '@/types/user';

interface SocialState {
  friends: Friend[];
  activities: Activity[];
  isLoading: boolean;
  
  setFriends: (friends: Friend[]) => void;
  addFriend: (friend: Friend) => void;
  removeFriend: (friendId: string) => void;
  setActivities: (activities: Activity[]) => void;
  addActivity: (activity: Activity) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useSocialStore = create<SocialState>((set) => ({
  friends: [],
  activities: [],
  isLoading: false,

  setFriends: (friends) => set({ friends }),
  
  addFriend: (friend) =>
    set((state) => ({
      friends: [...state.friends, friend],
    })),

  removeFriend: (friendId) =>
    set((state) => ({
      friends: state.friends.filter((f) => f.id !== friendId),
    })),

  setActivities: (activities) => set({ activities }),
  
  addActivity: (activity) =>
    set((state) => ({
      activities: [activity, ...state.activities].slice(0, 50), // Keep only last 50
    })),

  setLoading: (isLoading) => set({ isLoading }),
}));

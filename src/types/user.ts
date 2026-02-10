import { SpotifyUser } from './spotify';

export interface User extends SpotifyUser {
  createdAt?: string;
  lastLogin?: string;
}

export interface Friend {
  id: string;
  name: string;
  image: string;
  mutualArtists?: number;
  compatibilityScore?: number;
  recentActivity?: Activity[];
}

export interface Activity {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  type: 'track' | 'artist' | 'playlist' | 'achievement';
  content: string;
  timestamp: string;
  trackId?: string;
  artistId?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
  progress?: number;
  total?: number;
}

export interface UserStats {
  totalListeningTime: number;
  topGenre: string;
  tracksDiversity: number;
  averagePopularity: number;
  moodScore: number;
  explorationScore: number;
}

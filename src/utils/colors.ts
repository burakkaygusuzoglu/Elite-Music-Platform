export const genreColors: Record<string, string> = {
  pop: '#EC4899',
  rock: '#EF4444',
  'hip hop': '#8B5CF6',
  'r&b': '#F59E0B',
  electronic: '#06B6D4',
  jazz: '#10B981',
  classical: '#3B82F6',
  country: '#F97316',
  metal: '#DC2626',
  indie: '#14B8A6',
  folk: '#84CC16',
  blues: '#6366F1',
  reggae: '#22C55E',
  latin: '#F43F5E',
  default: '#8B5CF6',
};

export const getGenreColor = (genre: string): string => {
  const lowerGenre = genre.toLowerCase();
  for (const [key, color] of Object.entries(genreColors)) {
    if (lowerGenre.includes(key)) {
      return color;
    }
  }
  return genreColors.default;
};

export const moodColors = {
  energetic: '#EF4444',
  happy: '#F59E0B',
  calm: '#06B6D4',
  sad: '#6366F1',
  intense: '#DC2626',
};

export const getMoodFromAudioFeatures = (
  energy: number,
  valence: number
): string => {
  if (energy > 0.7 && valence > 0.6) return 'energetic';
  if (valence > 0.6) return 'happy';
  if (energy < 0.4 && valence < 0.4) return 'sad';
  if (energy > 0.7) return 'intense';
  return 'calm';
};

export const getGradientForScore = (score: number): string => {
  if (score >= 80) return 'from-green-500 to-emerald-500';
  if (score >= 60) return 'from-blue-500 to-cyan-500';
  if (score >= 40) return 'from-yellow-500 to-orange-500';
  return 'from-red-500 to-pink-500';
};

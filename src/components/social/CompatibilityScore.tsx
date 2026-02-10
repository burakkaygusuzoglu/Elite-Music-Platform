import { motion } from 'framer-motion';
import { getGradientForScore } from '@/utils/colors';

interface CompatibilityScoreProps {
  score: number;
}

export const CompatibilityScore = ({ score }: CompatibilityScoreProps) => {
  const gradient = getGradientForScore(score);

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-400">Music Compatibility</span>
        <span className="text-sm font-bold text-purple-400">{score}%</span>
      </div>
      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
        <motion.div
          className={`h-full bg-gradient-to-r ${gradient}`}
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 1, ease: 'easeOut' }}
        />
      </div>
    </div>
  );
};

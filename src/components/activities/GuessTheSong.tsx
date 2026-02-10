import { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Check, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSpotify } from '@/hooks/useSpotify';

export const GuessTheSong = () => {
  const { topTracks } = useSpotify();
  const [currentRound, setCurrentRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const tracks = topTracks.medium_term.slice(0, 10);
  
  if (tracks.length === 0) {
    return null;
  }

  const startGame = () => {
    setGameStarted(true);
    setCurrentRound(0);
    setScore(0);
    setSelectedAnswer(null);
  };

  const currentTrack = tracks[currentRound];
  
  // Generate options (correct answer + 3 random tracks)
  const options = [
    currentTrack,
    ...tracks.filter(t => t.id !== currentTrack.id).slice(0, 3)
  ].sort(() => Math.random() - 0.5);

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index);
    if (options[index].id === currentTrack.id) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentRound < tracks.length - 1) {
        setCurrentRound(currentRound + 1);
        setSelectedAnswer(null);
      } else {
        // Game over
        setGameStarted(false);
      }
    }, 1500);
  };

  if (!gameStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Music className="w-6 h-6" />
            Guess The Song
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 mb-6">
            Listen to song previews and guess the correct track!
          </p>
          {currentRound > 0 && (
            <motion.div
              className="mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <div className="text-4xl font-bold gradient-text mb-2">
                {score} / {tracks.length}
              </div>
              <p className="text-gray-400">Final Score</p>
            </motion.div>
          )}
          <Button onClick={startGame} size="lg">
            <Play className="w-5 h-5 mr-2" />
            {currentRound > 0 ? 'Play Again' : 'Start Game'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Music className="w-6 h-6" />
            Guess The Song
          </CardTitle>
          <div className="text-right">
            <div className="text-sm text-gray-400">Score</div>
            <div className="text-2xl font-bold text-purple-400">
              {score} / {currentRound + 1}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-400">
              Round {currentRound + 1} of {tracks.length}
            </span>
            <span className="text-sm text-gray-400">
              Artist: {currentTrack.artists[0].name}
            </span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-primary"
              initial={{ width: 0 }}
              animate={{ width: `${((currentRound + 1) / tracks.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {currentTrack.preview_url && (
          <div className="glass rounded-lg p-4 mb-6">
            <audio controls className="w-full" src={currentTrack.preview_url}>
              Your browser does not support the audio element.
            </audio>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {options.map((track, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = track.id === currentTrack.id;
            const showResult = selectedAnswer !== null;

            return (
              <motion.button
                key={track.id}
                className={`p-4 rounded-lg text-left transition-all ${
                  showResult && isCorrect
                    ? 'bg-green-500/20 border-2 border-green-500'
                    : showResult && isSelected
                    ? 'bg-red-500/20 border-2 border-red-500'
                    : 'glass glass-hover border border-white/10'
                }`}
                onClick={() => !showResult && handleAnswer(index)}
                disabled={showResult}
                whileHover={!showResult ? { scale: 1.02 } : {}}
                whileTap={!showResult ? { scale: 0.98 } : {}}
              >
                <div className="flex items-center gap-3">
                  <img
                    src={track.album.images[0]?.url}
                    alt={track.name}
                    className="w-12 h-12 rounded"
                  />
                  <div className="flex-1">
                    <p className="font-semibold truncate">{track.name}</p>
                    <p className="text-sm text-gray-400 truncate">
                      {track.album.name}
                    </p>
                  </div>
                  {showResult && isCorrect && (
                    <Check className="w-6 h-6 text-green-500" />
                  )}
                  {showResult && isSelected && !isCorrect && (
                    <X className="w-6 h-6 text-red-500" />
                  )}
                </div>
              </motion.button>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

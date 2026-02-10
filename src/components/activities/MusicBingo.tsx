import { useState } from 'react';
import { motion } from 'framer-motion';
import { Grid3x3, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useSpotify } from '@/hooks/useSpotify';

export const MusicBingo = () => {
  const { topTracks } = useSpotify();
  const [bingoCard, setBingoCard] = useState<number[]>([]);
  const [markedCells, setMarkedCells] = useState<boolean[]>(Array(9).fill(false));
  const [gameStarted, setGameStarted] = useState(false);

  const tracks = topTracks.medium_term.slice(0, 20);

  if (tracks.length < 9) {
    return null;
  }

  const startGame = () => {
    // Generate random 9 tracks for bingo card
    const shuffled = [...Array(tracks.length).keys()].sort(() => Math.random() - 0.5);
    setBingoCard(shuffled.slice(0, 9));
    setMarkedCells(Array(9).fill(false));
    setGameStarted(true);
  };

  const toggleCell = (index: number) => {
    const newMarked = [...markedCells];
    newMarked[index] = !newMarked[index];
    setMarkedCells(newMarked);
  };

  const checkWin = () => {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (markedCells[i * 3] && markedCells[i * 3 + 1] && markedCells[i * 3 + 2]) {
        return true;
      }
    }
    // Check columns
    for (let i = 0; i < 3; i++) {
      if (markedCells[i] && markedCells[i + 3] && markedCells[i + 6]) {
        return true;
      }
    }
    // Check diagonals
    if (markedCells[0] && markedCells[4] && markedCells[8]) return true;
    if (markedCells[2] && markedCells[4] && markedCells[6]) return true;
    return false;
  };

  const hasWon = checkWin();

  if (!gameStarted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 gradient-text">
            <Grid3x3 className="w-6 h-6" />
            Music Bingo
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-400 mb-6">
            Mark tracks as you listen to them. Get three in a row to win!
          </p>
          <Button onClick={startGame} size="lg">
            <Grid3x3 className="w-5 h-5 mr-2" />
            Generate Bingo Card
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
            <Grid3x3 className="w-6 h-6" />
            Music Bingo
          </CardTitle>
          <Button variant="outline" size="sm" onClick={startGame}>
            New Card
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {hasWon && (
          <motion.div
            className="mb-4 p-4 rounded-lg bg-gradient-primary text-center"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
          >
            <Trophy className="w-8 h-8 mx-auto mb-2" />
            <p className="font-bold text-xl">BINGO! You Win! 🎉</p>
          </motion.div>
        )}

        <div className="grid grid-cols-3 gap-3">
          {bingoCard.map((trackIndex, cellIndex) => {
            const track = tracks[trackIndex];
            const isMarked = markedCells[cellIndex];

            return (
              <motion.button
                key={cellIndex}
                className={`aspect-square rounded-lg overflow-hidden relative group ${
                  isMarked ? 'ring-4 ring-green-500' : ''
                }`}
                onClick={() => toggleCell(cellIndex)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={track.album.images[0]?.url}
                  alt={track.name}
                  className={`w-full h-full object-cover ${
                    isMarked ? 'opacity-50' : ''
                  }`}
                />
                {isMarked && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                      <span className="text-2xl">✓</span>
                    </div>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <p className="text-xs font-semibold truncate">
                      {track.name}
                    </p>
                    <p className="text-xs text-gray-300 truncate">
                      {track.artists[0].name}
                    </p>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        <div className="mt-4 text-center text-sm text-gray-400">
          <p>Click on tracks as you listen to them</p>
          <p className="mt-1">Get 3 in a row (horizontal, vertical, or diagonal) to win!</p>
        </div>
      </CardContent>
    </Card>
  );
};

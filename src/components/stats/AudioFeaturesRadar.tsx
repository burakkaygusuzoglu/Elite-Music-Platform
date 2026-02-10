import { motion } from 'framer-motion';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';

interface AudioFeaturesRadarProps {
  data: {
    danceability: number;
    energy: number;
    valence: number;
    acousticness: number;
    instrumentalness: number;
    speechiness: number;
  } | null;
}

export const AudioFeaturesRadar = ({ data }: AudioFeaturesRadarProps) => {
  if (!data) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="gradient-text">Audio Features</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-400 text-center py-8">
            Loading audio features...
          </p>
        </CardContent>
      </Card>
    );
  }

  const chartData = [
    { feature: 'Danceability', value: data.danceability },
    { feature: 'Energy', value: data.energy },
    { feature: 'Happiness', value: data.valence },
    { feature: 'Acoustic', value: data.acousticness },
    { feature: 'Instrumental', value: data.instrumentalness },
    { feature: 'Speechiness', value: data.speechiness },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-text">Audio Features Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <RadarChart data={chartData}>
              <PolarGrid stroke="rgba(255, 255, 255, 0.1)" />
              <PolarAngleAxis
                dataKey="feature"
                tick={{ fill: '#fff', fontSize: 12 }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={{ fill: '#999', fontSize: 10 }}
              />
              <Radar
                name="Audio Features"
                dataKey="value"
                stroke="#8B5CF6"
                fill="#8B5CF6"
                fillOpacity={0.6}
                animationDuration={1000}
              />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
          {chartData.map((item, index) => (
            <motion.div
              key={item.feature}
              className="glass rounded-lg p-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <p className="text-sm text-gray-400">{item.feature}</p>
              <p className="text-xl font-bold text-purple-400">{item.value}%</p>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

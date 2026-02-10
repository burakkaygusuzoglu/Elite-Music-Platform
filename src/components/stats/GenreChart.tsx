import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getGenreColor } from '@/utils/colors';

interface GenreChartProps {
  data: { name: string; value: number }[];
}

export const GenreChart = ({ data }: GenreChartProps) => {
  const colors = data.map((item) => getGenreColor(item.name));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="gradient-text">Genre Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                animationDuration={1000}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(0, 0, 0, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '8px',
                }}
              />
              <Legend
                wrapperStyle={{ color: '#fff' }}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
        
        <div className="mt-4 space-y-2">
          {data.slice(0, 5).map((item, index) => (
            <motion.div
              key={item.name}
              className="flex items-center justify-between"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: colors[index] }}
                />
                <span className="text-sm capitalize">{item.name}</span>
              </div>
              <span className="text-sm text-gray-400">{item.value} artists</span>
            </motion.div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

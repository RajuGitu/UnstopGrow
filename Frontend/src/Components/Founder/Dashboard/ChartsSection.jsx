import { Card, CardHeader, CardTitle, CardContent } from '../../UI/Card';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { usePitchPost } from '../../../context/PitchPostContext';
import { useEffect } from 'react';

const feedbackData = [
  { name: 'Product Ideas', value: 35, color: '#8B5CF6' },
  { name: 'Growth Tips', value: 25, color: '#10B981' },
  { name: 'Technical', value: 20, color: '#F59E0B' },
  { name: 'Marketing', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#6B7280' }
];

const ChartsSection = () => {
  const { post, pitch, getAllPitches } = usePitchPost();

  useEffect(() => {
    getAllPitches();
  }, []);

  const processPostsData = (posts) => {
    const monthlyData = {};

    posts.forEach(post => {
      const date = new Date(post.createdAt);
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });

      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          likes: 0,
          comments: 0,
          posts: 0
        };
      }

      monthlyData[monthKey].likes += post.likes?.length || 0;
      monthlyData[monthKey].comments += post.comments?.length || 0;
      monthlyData[monthKey].posts += 1;
    });

    return Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month) - new Date(b.month);
    });
  };

  const processPitchData = (pitchs) => {
    const monthlyData = {};
    pitchs.forEach(pitch => {
      const date = new Date(pitch.createdAt);
      const monthKey = date.toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric'
      });
      if (!monthlyData[monthKey]) {
        monthlyData[monthKey] = {
          month: monthKey,
          likes: 0,
          pitchs: 0,
        };
      }
      monthlyData[monthKey].likes += pitch.likes?.length || 0;
      monthlyData[monthKey].pitchs += 1;
    });
    return Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month) - new Date(b.month);
    })
  }

  const pitchData = processPitchData(pitch);
  const reachData = processPostsData(post);

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
            <span>Post Reach Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {reachData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
              <LineChart data={reachData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  className="text-xs md:text-sm"
                />
                <YAxis
                  fontSize={12}
                  className="text-xs md:text-sm"
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'likes') return [value, 'Likes'];
                    if (name === 'comments') return [value, 'Comments'];
                    if (name === 'posts') return [value, 'Posts'];
                    return [value, name];
                  }}
                  contentStyle={{
                    fontSize: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="likes"
                  dot={{ r: 3 }}
                  className="md:stroke-2"
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="comments"
                  dot={{ r: 3 }}
                  className="md:stroke-2"
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="posts"
                  dot={{ r: 3 }}
                  className="md:stroke-2"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] md:h-[300px] text-slate-500">
              <p className="text-sm md:text-base">No post data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader className="pb-3 md:pb-4">
          <CardTitle className="flex items-center space-x-2 text-lg md:text-xl">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-indigo-600" />
            <span>Pitch Reach Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-3 md:p-6">
          {pitchData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250} className="md:h-[300px]">
              <LineChart data={pitchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="month"
                  fontSize={12}
                  className="text-xs md:text-sm"
                />
                <YAxis
                  fontSize={12}
                  className="text-xs md:text-sm"
                />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'likes') return [value, 'Likes'];
                    if (name === 'pitchs') return [value, 'Pitchs'];
                    return [value, name];
                  }}
                  contentStyle={{
                    fontSize: '12px',
                    backgroundColor: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="likes"
                  dot={{ r: 3 }}
                  className="md:stroke-2"
                />
                <Line
                  type="monotone"
                  dataKey="pitchs"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="pitchs"
                  dot={{ r: 3 }}
                  className="md:stroke-2"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[250px] md:h-[300px] text-slate-500">
              <p className="text-sm md:text-base">No Pitch data available</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
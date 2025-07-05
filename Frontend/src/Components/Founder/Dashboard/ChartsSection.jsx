import { Card, CardHeader, CardTitle, CardContent } from '../../UI/Card';
import { TrendingUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
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
          comments: 0,
          pitchs: 0,
        };
      }
      monthlyData[monthKey].likes += pitch.likes?.length || 0;
      monthlyData[monthKey].comments += pitch.comments?.length || 0;
      monthlyData[monthKey].pitchs += 1;
    });
    return Object.values(monthlyData).sort((a, b) => {
      return new Date(a.month) - new Date(b.month);
    })
  }

  const pitchData = processPitchData(pitch);

  const reachData = processPostsData(post);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Post Reach Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {reachData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={reachData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'likes') return [value, 'Likes'];
                    if (name === 'comments') return [value, 'Comments'];
                    if (name === 'posts') return [value, 'Posts'];
                    return [value, name];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="likes"
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="comments"
                />
                <Line
                  type="monotone"
                  dataKey="posts"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="posts"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              <p>No post data available</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Post Reach Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {pitchData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={pitchData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'likes') return [value, 'Likes'];
                    if (name === 'comments') return [value, 'Comments'];
                    if (name === 'pitchs') return [value, 'Pitchs'];
                    return [value, name];
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="likes"
                  stroke="#10B981"
                  strokeWidth={2}
                  name="likes"
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  name="comments"
                />
                <Line
                  type="monotone"
                  dataKey="pitchs"
                  stroke="#8B5CF6"
                  strokeWidth={2}
                  name="pitchs"
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-[300px] text-slate-500">
              <p>No Pitch data available</p>
            </div>
          )}
        </CardContent>
      </Card>

    </div>
  );
};

export default ChartsSection;
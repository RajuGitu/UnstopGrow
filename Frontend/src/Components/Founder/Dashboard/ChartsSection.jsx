import { Card, CardHeader, CardTitle, CardContent } from '../../UI/Card';
import { TrendingUp, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const reachData = [
  { month: 'Jan', views: 1200, likes: 45, feedback: 12 },
  { month: 'Feb', views: 1900, likes: 67, feedback: 18 },
  { month: 'Mar', views: 3200, likes: 89, feedback: 25 },
  { month: 'Apr', views: 2800, likes: 112, feedback: 31 },
  { month: 'May', views: 4100, likes: 156, feedback: 42 },
  { month: 'Jun', views: 5200, likes: 198, feedback: 58 }
];

const feedbackData = [
  { name: 'Product Ideas', value: 35, color: '#8B5CF6' },
  { name: 'Growth Tips', value: 25, color: '#10B981' },
  { name: 'Technical', value: 20, color: '#F59E0B' },
  { name: 'Marketing', value: 15, color: '#EF4444' },
  { name: 'Other', value: 5, color: '#6B7280' }
];

const ChartsSection = () => {
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={reachData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="views" stroke="#8B5CF6" strokeWidth={3} />
              <Line type="monotone" dataKey="likes" stroke="#10B981" strokeWidth={2} />
              <Line type="monotone" dataKey="feedback" stroke="#F59E0B" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MessageSquare className="h-5 w-5 text-green-600" />
            <span>Feedback Categories</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={feedbackData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {feedbackData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChartsSection;
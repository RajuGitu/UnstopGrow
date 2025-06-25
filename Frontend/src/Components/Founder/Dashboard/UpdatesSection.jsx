import { Badge } from '../../UI/Badge';
import { Button } from '../../UI/Button';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../UI/Card';

const recentUpdates = [
  { title: 'Product Launch Success!', date: '2 days ago', engagement: '234 views', status: 'trending' },
  { title: 'Team Expansion Update', date: '5 days ago', engagement: '156 views', status: 'normal' },
  { title: 'Funding Milestone Reached', date: '1 week ago', engagement: '445 views', status: 'viral' }
];

const UpdatesSection = () => {
  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Recent Updates</span>
          </div>
          <Button variant="outline" size="sm">View All</Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {recentUpdates.map((update, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-slate-900">{update.title}</p>
              <p className="text-sm text-slate-500">{update.date} • {update.engagement}</p>
            </div>
            <Badge
              variant={update.status === 'viral' ? 'default' : update.status === 'trending' ? 'secondary' : 'outline'}
              className={update.status === 'viral' ? 'bg-green-500' : update.status === 'trending' ? 'bg-blue-500' : ''}
            >
              {update.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default UpdatesSection;

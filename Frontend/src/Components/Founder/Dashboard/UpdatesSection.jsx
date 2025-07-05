import { Badge } from '../../UI/Badge';
import { Button } from '../../UI/Button';
import { TrendingUp } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../../UI/Card';
import { Link } from "react-router-dom";
import { usePitchPost } from '../../../context/PitchPostContext';
import { useEffect, useState } from 'react';

const UpdatesSection = () => {
  const { post, getAllPost } = usePitchPost();
  const [expandedPosts, setExpandedPosts] = useState({});

  useEffect(() => {
    getAllPost()
  }, [getAllPost]);

  const toggleExpanded = (postId) => {
    setExpandedPosts(prev => ({
      ...prev,
      [postId]: !prev[postId]
    }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const truncateDescription = (description, maxLength = 100) => {
    if (description.length <= maxLength) return description;
    return description.substring(0, maxLength) + '...';
  };

  // Show only first 3 posts
  const displayPosts = post?.slice(0, 3) || [];

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600" />
            <span>Recent Updates</span>
          </div>
          <Link to="/founder/all-post">
            <Button variant="outline" size="sm">View All</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {displayPosts.length > 0 ? (
          displayPosts.map((update) => (
            <div key={update._id} className="flex flex-col p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium text-slate-900 text-sm">{update.title}</h3>
                <Badge variant="outline" className="text-xs">
                  {formatDate(update.createdAt)}
                </Badge>
              </div>
              <div className="text-sm text-slate-700">
                {expandedPosts[update._id] ? (
                  <div>
                    <p>{update.description}</p>
                    <button
                      onClick={() => toggleExpanded(update._id)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs mt-1 underline"
                    >
                      Read less
                    </button>
                  </div>
                ) : (
                  <div>
                    <p>{truncateDescription(update.description)}</p>
                    {update.description.length > 100 && (
                      <button
                        onClick={() => toggleExpanded(update._id)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs mt-1 underline"
                      >
                        Read more
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-4 text-slate-500">
            No posts available
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdatesSection;
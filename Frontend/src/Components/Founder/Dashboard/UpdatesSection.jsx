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
    <Card className="bg-white/80 backdrop-blur-sm w-full">
      <CardHeader>
        <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5 text-indigo-600 flex-shrink-0" />
            <span className="text-base sm:text-lg">Recent Updates</span>
          </div>
          <Link to="/founder/all-post">
            <Button variant="outline" size="sm" className="w-full sm:w-auto">View All</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4">
        {displayPosts.length > 0 ? (
          displayPosts.map((update) => (
            <div key={update._id} className="flex flex-col p-3 sm:p-4 bg-slate-50 rounded-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2 space-y-2 sm:space-y-0">
                <h3 className="font-medium text-slate-900 text-sm sm:text-base leading-tight pr-2">
                  {update.title}
                </h3>
                <Badge variant="outline" className="text-xs flex-shrink-0 self-start sm:self-center">
                  {formatDate(update.createdAt)}
                </Badge>
              </div>
              <div className="text-sm sm:text-base text-slate-700">
                {expandedPosts[update._id] ? (
                  <div>
                    <p className="leading-relaxed">{update.description}</p>
                    <button
                      onClick={() => toggleExpanded(update._id)}
                      className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm mt-1 underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded"
                    >
                      Read less
                    </button>
                  </div>
                ) : (
                  <div>
                    <p className="leading-relaxed">{truncateDescription(update.description)}</p>
                    {update.description.length > 100 && (
                      <button
                        onClick={() => toggleExpanded(update._id)}
                        className="text-indigo-600 hover:text-indigo-800 text-xs sm:text-sm mt-1 underline focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 rounded"
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
          <div className="text-center py-6 sm:py-8 text-slate-500">
            <p className="text-sm sm:text-base">No posts available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default UpdatesSection;
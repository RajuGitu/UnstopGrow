import {
  Loader2,
  MessageSquare,
  Heart,
} from "lucide-react";


import { Badge } from "../../../Components/UI/Badge";
import { useEffect, useState } from "react";
import PostCard from "../AllPost/PostCard"; // Import the PostCard component
import axiosInstance from "../../../../utils/axiosInstance"; // Adjust path as needed

const LikedPostList = () => {
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likesPosts, setLikesPosts] = useState({});
  const [commentsPosts, setCommentsPosts] = useState({});

  const getLikedPosts = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axiosInstance.get('/supporter/supporterLikesPosts', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data && response.data.success) {
        setLikedPosts(response.data.data || []);
        
        // Initialize likes count
        const likesCount = {};
        (response.data.data || []).forEach((post) => {
          likesCount[post._id] = post.likes?.length || 0;
        });
        setLikesPosts(likesCount);

        // Initialize comments count
        const commentsCount = {};
        (response.data.data || []).forEach((post) => {
          commentsCount[post._id] = post.comments?.length || 0;
        });
        setCommentsPosts(commentsCount);
      }
    } catch (error) {
      console.error('Error fetching liked posts:', error);
      setLikedPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getLikedPosts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading liked posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Your Liked Posts
        </h2>
        <Badge variant="outline" className="text-sm">
          {likedPosts.length} posts liked
        </Badge>
      </div>

      {/* Liked Posts Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {likedPosts.length > 0 ? (
          likedPosts.map((postItem) => (
            <PostCard
              key={postItem._id}
              postItem={postItem}
              likesPosts={likesPosts}
              setLikesPosts={setLikesPosts}
              commentsPosts={commentsPosts}
              setCommentsPosts={setCommentsPosts}
            />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <div className="text-slate-400 mb-4">
              <Heart className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No liked posts yet
            </h3>
            <p className="text-slate-600">
              Start exploring and liking posts to see them here
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LikedPostList;
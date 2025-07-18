import React, { useState, useEffect } from "react";
import {
  Calendar,
  Heart,
  MessageSquare,
  Tag,
  Image,
  UserPlus,
} from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../Components/UI/Card";
import { Button } from "../../../Components/UI/Button";
import { Badge } from "../../../Components/UI/Badge";
import axiosInstance from "../../../../utils/axiosInstance";
import CommentModal from "./CommentModal"; // Import the new component

const PostCard = ({
  postItem,
  likesPosts,
  setLikesPosts,
  commentsPosts,
  setCommentsPosts,
}) => {
  const [likedPosts, setLikedPosts] = useState({});
  const [isLikeLoading, setIsLikeLoading] = useState(false);
  const [followedStartups, setFollowedStartups] = useState({});
  const [isFollowLoading, setIsFollowLoading] = useState(false);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);

  // Initialize liked state properly using useEffect
  useEffect(() => {
    setLikedPosts((prev) => ({
      ...prev,
      [postItem._id]: postItem.isLiked || false,
    }));
  }, [postItem._id, postItem.isLiked]);

  // Initialize followed state properly using useEffect
  useEffect(() => {
    setFollowedStartups((prev) => ({
      ...prev,
      [postItem.startupId]: postItem.isFollowed || false,
    }));
  }, [postItem.startupId, postItem.isFollowed]);

  const handleComment = () => {
    setIsCommentModalOpen(true);
  };

  const handleLike = async (postId) => {
    setIsLikeLoading(true);

    try {
      const token = localStorage.getItem("token");
      const currentlyLiked = likedPosts[postId];

      let response;

      if (currentlyLiked) {
        // Unlike the post
        response = await axiosInstance.delete(
          "/supporter/supporterLikesPosts",
          {
            data: {
              postId: postId,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        setLikesPosts((prev) => ({
          ...prev,
          [postId]: Math.max(0, (prev[postId] || 0) - 1),
        }));
      } else {
        // Like the post
        response = await axiosInstance.post(
          "/supporter/supporterLikesPosts",
          {
            postId: postId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
        setLikesPosts((prev) => ({
          ...prev,
          [postId]: (prev[postId] || 0) + 1,
        }));
      }

      if (response.data.success) {
        // Update local state to reflect the like/unlike
        setLikedPosts((prev) => ({
          ...prev,
          [postId]: !prev[postId],
        }));

        // Debug logging
        console.log("Like/Unlike successful:", {
          postId,
          previousState: currentlyLiked,
          newState: !currentlyLiked,
          response: response.data,
        });

        // Show success message (consider using a proper toast notification)
        console.log(
          currentlyLiked
            ? "Post unliked successfully"
            : "Post liked successfully"
        );
      } else {
        // Handle errors
        console.error("Error with post like/unlike:", response.data.error);
        alert(response.data.error || "Failed to like/unlike post");
      }
    } catch (error) {
      console.error("API error:", error);

      // Handle different types of errors
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert("Please log in to like posts");
      } else if (error.response?.status === 400) {
        alert("Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        alert("Post not found or like not previously expressed");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setIsLikeLoading(false);
    }
  };

  const handleFollow = async (startupId) => {
    setIsFollowLoading(true);

    try {
      const token = localStorage.getItem("token");
      const currentlyFollowed = followedStartups[startupId];

      let response;

      if (currentlyFollowed) {
        // Unfollow the startup
        response = await axiosInstance.delete(
          "/supporter/supporterFollowPosts",
          {
            data: {
              startupId: startupId,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } else {
        // Follow the startup
        response = await axiosInstance.post(
          "/supporter/supporterFollowPosts",
          {
            startupId: startupId,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      }

      if (response.data.success) {
        // Update local state to reflect the follow/unfollow
        setFollowedStartups((prev) => ({
          ...prev,
          [startupId]: !prev[startupId],
        }));

        // Debug logging
        console.log("Follow/Unfollow successful:", {
          startupId,
          previousState: currentlyFollowed,
          newState: !currentlyFollowed,
          response: response.data,
        });

        // Show success message (consider using a proper toast notification)
        console.log(
          currentlyFollowed
            ? "Startup unfollowed successfully"
            : "Startup followed successfully"
        );
      } else {
        // Handle errors
        console.error(
          "Error with startup follow/unfollow:",
          response.data.error
        );
        alert(response.data.error || "Failed to follow/unfollow startup");
      }
    } catch (error) {
      console.error("API error:", error);

      // Handle different types of errors
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert("Please log in to follow startups");
      } else if (error.response?.status === 400) {
        alert("Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        alert("Startup not found or follow not previously expressed");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setIsFollowLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const makeImageUrl = (imagePath) => {
    if (!imagePath) return null;
    const parsed = JSON.parse(imagePath);
    return parsed.url;
  };

  const isLiked = likedPosts[postItem._id] ?? postItem.isLiked;
  const isFollowed =
    followedStartups[postItem.startupId] ?? postItem.isFollowed;

  return (
    <>
      <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1 min-w-0">
              <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate">
                {postItem.companyName || "Unnamed Startup"}
              </CardTitle>
              <p className="text-xs text-gray-500 mb-2 sm:mb-3 truncate">
                Owner: {postItem.ownerName || "Unknown"}
              </p>

              <div className="mb-2 sm:mb-3">
                <p className="text-sm sm:text-base font-medium text-slate-800 line-clamp-2">
                  {postItem.title}
                </p>
                <p className="text-xs sm:text-sm text-indigo-600 line-clamp-1">
                  {postItem.tagline}
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                <span className="truncate">{formatDate(postItem.createdAt)}</span>
              </div>
            </div>
            {/* Follow Button */}
            <Button
              variant="outline"
              size="sm"
              className={`transition-colors duration-200 cursor-pointer flex-shrink-0 text-xs sm:text-sm px-2 sm:px-3 py-1 sm:py-2 ${isFollowed
                  ? "text-green-600 border-green-300 hover:bg-green-50"
                  : "text-blue-600 border-blue-200 hover:bg-blue-50"
                } ${isFollowLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              onClick={() => handleFollow(postItem.startupId)}
              disabled={isFollowLoading}
            >
              <UserPlus
                className={`h-3 w-3 sm:h-4 sm:w-4 mr-1 ${isFollowed ? "fill-current" : ""}`}
              />
              <span className="hidden sm:inline">
                {isFollowLoading
                  ? "Processing..."
                  : isFollowed
                    ? "Following"
                    : "Follow"}
              </span>
              <span className="sm:hidden">
                {isFollowLoading ? "..." : isFollowed ? "✓" : "+"}
              </span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 sm:space-y-4 p-4 pt-0">
          {/* Image */}
          {postItem.media && (
            <div className="relative">
              <img
                src={makeImageUrl(postItem.media)}
                alt={postItem.title}
                className="w-full h-40 sm:h-48 object-cover rounded-lg"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/400x200?text=Image+Not+Found";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge
                  variant="secondary"
                  className="bg-white/80 backdrop-blur-sm text-xs"
                >
                  <Image className="h-3 w-3 mr-1" />
                  Media
                </Badge>
              </div>
            </div>
          )}

          {/* Description */}
          <div>
            <p className="text-slate-700 text-sm leading-relaxed line-clamp-3">
              {postItem.description}
            </p>
          </div>

          {/* Tags */}
          {postItem.tags && postItem.tags.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Tag className="h-3 w-3 sm:h-4 sm:w-4 text-slate-500 flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium text-slate-700">Tags</span>
              </div>
              <div className="flex flex-wrap gap-1 sm:gap-2">
                {postItem.tags.slice(0, 5).map((tag, index) => (
                  <Badge
                    key={`${tag}-${index}`}
                    variant="outline"
                    className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 truncate max-w-32"
                  >
                    {tag}
                  </Badge>
                ))}
                {postItem.tags.length > 5 && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-50 text-gray-600 border-gray-200"
                  >
                    +{postItem.tags.length - 5}
                  </Badge>
                )}
              </div>
            </div>
          )}

          {/* Engagement Stats */}
          <div className="flex items-center justify-between pt-3 border-t border-slate-200">
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Clickable Heart Icon for Like */}
              <button
                onClick={() => handleLike(postItem._id)}
                disabled={isLikeLoading}
                className={`flex items-center gap-1 transition-colors duration-200 cursor-pointer hover:scale-105 ${isLiked
                    ? "text-red-500 hover:text-red-600"
                    : "text-slate-500 hover:text-red-400"
                  } ${isLikeLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
                <span className="text-xs sm:text-sm">{likesPosts[postItem._id] || 0}</span>
              </button>

              {/* Clickable Comment Icon */}
              <button
                onClick={handleComment}
                className="flex items-center gap-1 text-slate-500 hover:text-blue-500 transition-colors duration-200 cursor-pointer hover:scale-105"
              >
                <MessageSquare className="h-4 w-4" />
                <span className="text-xs sm:text-sm">
                  {commentsPosts[postItem._id] || 0}
                </span>
              </button>
            </div>

            <div className="text-xs text-slate-400 hidden sm:block">
              Updated {formatDate(postItem.updatedAt)}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Comment Modal */}
      <CommentModal
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        postItem={postItem}
        commentsPosts={commentsPosts}
        setCommentsPosts={setCommentsPosts}
      />
    </>
  );
};

export default PostCard;
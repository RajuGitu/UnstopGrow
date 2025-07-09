import React, { useState, useEffect } from "react";
import { Send, Trash2, User } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../UI/Dialog";
import { Button } from "../../UI/Button";
import axiosInstance from "../../../../utils/axiosInstance";

const CommentModal = ({
  isOpen,
  onClose,
  postItem,
  commentsPosts,
  setCommentsPosts,
}) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState({});
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID from localStorage or context
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("authUser");
    if (token && userId) {
      setCurrentUserId(userId);
    }
  }, []);

  // Initialize comments from postItem
  useEffect(() => {
    if (postItem?.comments) {
      setComments(postItem.comments);
    }
  }, [postItem]);

  const makeImageUrl = (imagePath) => {
    if (!imagePath) return "https://via.placeholder.com/400x200?text=No+Image";
    const normalizedPath = imagePath.replace(/\\/g, "/");
    const uploadsIndex = normalizedPath.indexOf("uploads/");
    if (uploadsIndex === -1)
      return "https://via.placeholder.com/400x200?text=No+Image";
    const relativePath = normalizedPath.substring(uploadsIndex);
    return `http://localhost:5000/${relativePath}`;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.post(
        "/supporter/supporterCommentsPosts",
        {
          postId: postItem._id,
          comment: newComment.trim(),
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        // Create new comment object with the response data
        const newCommentObj = {
          _id: response.data.data.commentId, // Temporary ID until refresh
          userId: currentUserId,
          comment: newComment.trim(),
          username: response.data.data.username,
          createdAt: new Date().toISOString(),
        };

        // Update local comments state
        setComments((prev) => [...prev, newCommentObj]);

        // Update parent component's comment count
        setCommentsPosts((prev) => ({
          ...prev,
          [postItem._id]: (prev[postItem._id] || 0) + 1,
        }));

        setNewComment("");
        console.log("Comment posted successfully");
      } else {
        alert(response.data.error || "Failed to post comment");
      }
    } catch (error) {
      console.error("Comment post error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert("Please log in to post comments");
      } else {
        alert("Failed to post comment. Please try again.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId) => {
    setIsDeleting((prev) => ({ ...prev, [commentId]: true }));

    try {
      const token = localStorage.getItem("token");
      const response = await axiosInstance.delete(
        "/supporter/supporterCommentsPosts",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
          data: {
            postId: postItem._id,
            commentId: commentId,
          },
        }
      );

      if (response.data.success) {
        // Remove comment from local state
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );

        // Update parent component's comment count
        setCommentsPosts((prev) => ({
          ...prev,
          [postItem._id]: Math.max(0, (prev[postItem._id] || 0) - 1),
        }));

        console.log("Comment deleted successfully");
      } else {
        alert(response.data.error || "Failed to delete comment");
      }
    } catch (error) {
      console.error("Comment delete error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert("Please log in to delete comments");
      } else if (error.response?.status === 403) {
        alert("You can only delete your own comments");
      } else {
        alert("Failed to delete comment. Please try again.");
      }
    } finally {
      setIsDeleting((prev) => ({ ...prev, [commentId]: false }));
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[99vh] p-0 overflow-hidden">
        <div className="flex h-[600px]">
          {/* Left side - Image */}
          <div className="flex-1 bg-black flex items-center justify-center">
            <img
              src={makeImageUrl(postItem?.media)}
              alt={postItem?.title}
              className="max-w-full max-h-full object-contain"
              onError={(e) => {
                e.target.src =
                  "https://via.placeholder.com/400x400?text=No+Image";
              }}
            />
          </div>

          {/* Right side - Comments */}
          <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <DialogHeader className="p-4 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div>
                  <DialogTitle className="text-sm font-semibold">
                    {postItem?.companyName || "Unnamed Startup"}
                  </DialogTitle>
                  <p className="text-xs text-gray-500">
                    {postItem?.ownerName || "Unknown"}
                  </p>
                </div>
              </div>
            </DialogHeader>

            {/* Post Description */}
            {/* <div className="p-4 border-b border-gray-100 flex-shrink-0">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-semibold text-gray-900">
                      {postItem?.companyName || "Unnamed Startup"}
                    </span>{" "}
                    {postItem?.description}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(postItem?.createdAt)}
                  </p>
                </div>
              </div>
            </div> */}

            {/* Comments List - Scrollable */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-0">
              {comments.length === 0 ? (
                <div className="text-center text-gray-500 py-8">
                  <p>No comments yet.</p>
                  <p className="text-sm">Be the first to comment!</p>
                </div>
              ) : (
                comments.map((comment) => (
                  <div key={comment._id} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-green-500 flex items-center justify-center flex-shrink-0">
                      <User className="w-3 h-3 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-gray-900">
                          {comment.username}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatDate(comment.createdAt)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 break-words">
                        {comment.comment}
                      </p>
                    </div>
                    {comment.userId === currentUserId && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-6 w-6 p-0 text-gray-400 hover:text-red-500 flex-shrink-0"
                        onClick={() => handleDeleteComment(comment._id)}
                        disabled={isDeleting[comment._id]}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Comment Input - Fixed at bottom */}
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
              <form onSubmit={handleSubmitComment} className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                  maxLength={300}
                />
                <Button
                  type="submit"
                  disabled={!newComment.trim() || isSubmitting}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 flex-shrink-0"
                >
                  {isSubmitting ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
              <div className="flex justify-between items-center text-xs">
                <span className="text-gray-500">
                  {commentsPosts[postItem?._id] || 0} comments
                </span>
                <span className="text-gray-400">
                  {300 - newComment.length} characters remaining
                </span>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CommentModal;

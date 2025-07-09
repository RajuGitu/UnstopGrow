import {
  Filter,
  Loader2,
  Search,
  MessageSquare,
} from "lucide-react";

import {
  Card,
  CardContent,
} from "../../../Components/UI/Card";
import { Input } from "../../../Components/UI/Input";
import { Button } from "../../../Components/UI/Button";
import { Badge } from "../../../Components/UI/Badge";
import { useEffect, useState } from "react";
import { useAllPostSupporter } from "../../../context/getAllPostSupporterContext";
import PostCard from "./PostCard"; // Import the new PostCard component

const AllPostList = () => {
  const { allPostSupporter, loading, getAllPostSupporter } = useAllPostSupporter();
  const [search, setSearch] = useState("");
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [likesPosts, setLikesPosts] = useState({});
  const [commentsPosts, setCommentsPosts] = useState({});

  useEffect(() => {
    getAllPostSupporter();
  }, []);

  useEffect(() => {
    if (allPostSupporter && allPostSupporter.length > 0) {
      const filtered = allPostSupporter.filter(
        (p) =>
          p.title?.toLowerCase().includes(search.toLowerCase()) ||
          p.description?.toLowerCase().includes(search.toLowerCase()) ||
          p.tags?.some((tag) =>
            tag.toLowerCase().includes(search.toLowerCase())
          ) ||
          p.companyName?.toLowerCase().includes(search.toLowerCase()) ||
          p.ownerName?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);

      const likesCount = {};
      filtered.forEach((post) => {
        likesCount[post._id] = post.likes?.length || 0;
      });
      setLikesPosts(likesCount);

      const commentsCount = {};
      filtered.forEach((post) => {
        commentsCount[post._id] = post.comments?.length || 0;
      });
      setCommentsPosts(commentsCount);
    }
  }, [allPostSupporter, search]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
          <p className="text-gray-600">Loading updates...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search Section */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search updates by title, description, or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Explore Startup Posts
        </h2>
        <Badge variant="outline" className="text-sm">
          {filteredPosts.length} updates found
        </Badge>
      </div>

      {/* Updates Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((postItem) => (
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
              <MessageSquare className="h-12 w-12 mx-auto mb-4" />
            </div>
            <h3 className="text-lg font-medium text-slate-900 mb-2">
              No updates found
            </h3>
            <p className="text-slate-600">
              {search
                ? "Try adjusting your search terms"
                : "No updates available yet"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPostList;
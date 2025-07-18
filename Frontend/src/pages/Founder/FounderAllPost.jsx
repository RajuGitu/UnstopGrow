import { Filter, Loader2, Search, Trash2, Calendar, Heart, MessageSquare, Tag, Image } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import { usePitchPost } from "../../context/PitchPostContext";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Button } from "../../Components/UI/Button";
import { Badge } from "../../Components/UI/Badge";
import { useEffect, useState } from "react";

const FounderAllPost = () => {
    const { loading, post, getAllPost } = usePitchPost();
    const [search, setSearch] = useState("");
    const [filteredPosts, setFilteredPosts] = useState([]);

    useEffect(() => {
        getAllPost();
    }, [getAllPost]);

    useEffect(() => {
        if (post) {
            const filtered = post.filter(p =>
                p.title?.toLowerCase().includes(search.toLowerCase()) ||
                p.description?.toLowerCase().includes(search.toLowerCase()) ||
                p.tags?.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
            );
            setFilteredPosts(filtered);
        }
    }, [post, search]);

    const handleDelete = async (postId) => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.delete(`/founder/deletePost/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getAllPost();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const makeImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const parsed = JSON.parse(imagePath);
        return parsed.url;
    };

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
        <div className="space-y-4 md:space-y-6 h-screen overflow-y-auto p-4 md:p-6">
            {/* Search Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search updates by title, description, or tags..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 text-sm md:text-base"
                            />
                        </div>
                        <Button variant="outline" className="flex items-center justify-center gap-2 whitespace-nowrap">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    All Updates
                </h2>
                <Badge variant="outline" className="text-sm self-start sm:self-center">
                    {filteredPosts.length} updates found
                </Badge>
            </div>

            {/* Updates Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                {filteredPosts.length > 0 ? (
                    filteredPosts.map((postItem) => (
                        <Card key={postItem._id} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                            <CardHeader className="pb-3 p-4 md:p-6">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex-1 min-w-0">
                                        <CardTitle className="text-lg md:text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                                            {postItem.title}
                                        </CardTitle>
                                        <div className="flex items-center gap-2 text-sm text-slate-500">
                                            <Calendar className="h-4 w-4 flex-shrink-0" />
                                            <span className="whitespace-nowrap">{formatDate(postItem.createdAt)}</span>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(postItem._id)}
                                        className="text-red-500 hover:text-red-700 hover:bg-red-50 flex-shrink-0"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                                {/* Image */}
                                {postItem.media && (
                                    <div className="relative">
                                        <img
                                            src={makeImageUrl(postItem.media)}
                                            alt={postItem.title}
                                            className="w-full h-40 sm:h-48 object-cover rounded-lg"
                                            onError={(e) => {
                                                e.target.src = "https://via.placeholder.com/400x200?text=Image+Not+Found";
                                            }}
                                        />
                                        <div className="absolute top-2 right-2">
                                            <Badge variant="secondary" className="bg-white/80 backdrop-blur-sm">
                                                <Image className="h-3 w-3 mr-1" />
                                                <span className="hidden sm:inline">Media</span>
                                            </Badge>
                                        </div>
                                    </div>
                                )}

                                {/* Description */}
                                <div>
                                    <p className="text-slate-700 text-sm leading-relaxed line-clamp-4">
                                        {postItem.description}
                                    </p>
                                </div>

                                {/* Tags */}
                                {postItem.tags && postItem.tags.length > 0 && (
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <Tag className="h-4 w-4 text-slate-500 flex-shrink-0" />
                                            <span className="text-sm font-medium text-slate-700">Tags</span>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {postItem.tags.map((tag, index) => (
                                                <Badge
                                                    key={`${tag}-${index}`}
                                                    variant="outline"
                                                    className="text-xs bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 border-indigo-200 break-all"
                                                >
                                                    {tag}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Engagement Stats */}
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <Heart className="h-4 w-4 flex-shrink-0" />
                                            <span className="text-sm">{postItem.likes?.length || 0}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-slate-500">
                                            <MessageSquare className="h-4 w-4 flex-shrink-0" />
                                            <span className="text-sm">{postItem.comments?.length || 0}</span>
                                        </div>
                                    </div>

                                    <div className="text-xs text-slate-400">
                                        Updated {formatDate(postItem.updatedAt)}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-slate-400 mb-4">
                            <MessageSquare className="h-12 w-12 mx-auto mb-4" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No updates found</h3>
                        <p className="text-slate-600">
                            {search ? "Try adjusting your search terms" : "No updates available yet"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FounderAllPost;
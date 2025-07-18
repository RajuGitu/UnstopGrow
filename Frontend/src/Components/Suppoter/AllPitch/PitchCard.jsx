// PitchCard.jsx
import { useState } from "react";
import {
    Loader2,
    TrendingUp,
    DollarSign,
    Target,
    Calendar,
    FileText,
    Youtube,
    Building,
    Heart,
    UserPlus,
    UserCheck,
    Users
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import axiosInstance from "../../../../utils/axiosInstance";

const PitchCard = ({
    pitchItem,
    pitchLikes,
    setPitchLikes,
    filteredPitches,
    setFilteredPitches
}) => {
    const [loadingLikes, setLoadingLikes] = useState(new Set());
    const [loadingFollows, setLoadingFollows] = useState(new Set());

    const handleLike = async (pitchId) => {
        const token = localStorage.getItem("token");

        // Prevent multiple simultaneous requests
        if (loadingLikes.has(pitchId)) return;

        setLoadingLikes(prev => new Set(prev).add(pitchId));

        try {
            // Find the current pitch to get its isSaved status
            const currentPitch = filteredPitches.find(p => p._id === pitchId);
            const isCurrentlyLiked = currentPitch?.isSaved || false;

            if (isCurrentlyLiked) {
                // Unlike the pitch
                await axiosInstance.delete(`/supporter/supporterpitchunlikes/${pitchId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isSaved to false
                setFilteredPitches(prev =>
                    prev.map(pitch =>
                        pitch._id === pitchId
                            ? { ...pitch, isSaved: false }
                            : pitch
                    )
                );

                setPitchLikes(prev => ({
                    ...prev,
                    [pitchId]: Math.max(0, (prev[pitchId] || 0) - 1)
                }));
            } else {
                await axiosInstance.post(`/supporter/supporterpitchlikes/${pitchId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setFilteredPitches(prev =>
                    prev.map(pitch =>
                        pitch._id === pitchId
                            ? { ...pitch, isSaved: true }
                            : pitch
                    )
                );

                setPitchLikes(prev => ({
                    ...prev,
                    [pitchId]: (prev[pitchId] || 0) + 1
                }));
            }
        } catch (error) {
            console.error("Error liking/unliking pitch:", error);

            // Revert optimistic update on error
            const currentPitch = filteredPitches.find(p => p._id === pitchId);
            const wasLiked = currentPitch?.isSaved || false;

            // Revert the isSaved state
            setFilteredPitches(prev =>
                prev.map(pitch =>
                    pitch._id === pitchId
                        ? { ...pitch, isSaved: wasLiked }
                        : pitch
                )
            );

            if (wasLiked) {
                setPitchLikes(prev => ({
                    ...prev,
                    [pitchId]: (prev[pitchId] || 0) + 1
                }));
            } else {
                setPitchLikes(prev => ({
                    ...prev,
                    [pitchId]: Math.max(0, (prev[pitchId] || 0) - 1)
                }));
            }
        } finally {
            setLoadingLikes(prev => {
                const newSet = new Set(prev);
                newSet.delete(pitchId);
                return newSet;
            });
        }
    };

    const handleFollow = async (startupId) => {
        const token = localStorage.getItem("token");

        // Prevent multiple simultaneous requests
        if (loadingFollows.has(startupId)) return;

        setLoadingFollows(prev => new Set(prev).add(startupId));

        try {
            // Find the current pitch to get its isFollow status
            const currentPitch = filteredPitches.find(p => p.startupId === startupId);
            const isCurrentlyFollowing = currentPitch?.isFollow || false;

            if (isCurrentlyFollowing) {
                // Unfollow the startup
                await axiosInstance.delete(`/supporter/supporterpitchunfollow/${startupId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isFollow to false for all pitches with this startupId
                setFilteredPitches(prev =>
                    prev.map(pitch =>
                        pitch.startupId === startupId
                            ? { ...pitch, isFollow: false }
                            : pitch
                    )
                );
            } else {
                // Follow the startup
                await axiosInstance.post(`/supporter/supporterpitchfollow/${startupId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isFollow to true for all pitches with this startupId
                setFilteredPitches(prev =>
                    prev.map(pitch =>
                        pitch.startupId === startupId
                            ? { ...pitch, isFollow: true }
                            : pitch
                    )
                );
            }
        } catch (error) {
            console.error("Error following/unfollowing startup:", error);

            // Revert optimistic update on error
            const currentPitch = filteredPitches.find(p => p.startupId === startupId);
            const wasFollowing = currentPitch?.isFollow || false;

            // Revert the isFollow state
            setFilteredPitches(prev =>
                prev.map(pitch =>
                    pitch.startupId === startupId
                        ? { ...pitch, isFollow: wasFollowing }
                        : pitch
                )
            );
        } finally {
            setLoadingFollows(prev => {
                const newSet = new Set(prev);
                newSet.delete(startupId);
                return newSet;
            });
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Updated function to handle Cloudinary PDF URLs
    const makePdfUrl = (pdfData) => {
        if (!pdfData) return null;

        try {
            // // If it's already a direct URL (backward compatibility)
            // if (typeof pdfData === 'string' && pdfData.startsWith('http')) {
            //     return pdfData;
            // }

            // If it's a JSON string, parse it
            if (typeof pdfData === 'string' && pdfData.startsWith('{')) {
                const parsedData = JSON.parse(pdfData);
                return parsedData.url || null;
            }

            // // If it's already a parsed object
            // if (typeof pdfData === 'object' && pdfData.url) {
            //     return pdfData.url;
            // }

            // Fallback for old local path format
            // if (typeof pdfData === 'string' && pdfData.includes('uploads/')) {
            //     const normalizedPath = pdfData.replace(/\\/g, "/");
            //     const uploadsIndex = normalizedPath.indexOf("uploads/");
            //     if (uploadsIndex === -1) return null;
            //     const relativePath = normalizedPath.substring(uploadsIndex);
            //     return `http://localhost:5000/${relativePath}`;
            // }

            return null;
        } catch (error) {
            console.error("Error parsing PDF data:", error);
            return null;
        }
    };

    // Helper function to get PDF filename for display
    const getPdfFileName = (pdfData) => {
        if (!pdfData) return "PDF";

        try {
            // If it's a JSON string, parse it
            if (typeof pdfData === 'string' && pdfData.startsWith('{')) {
                const parsedData = JSON.parse(pdfData);
                return parsedData.originalName || "PDF";
            }

            // If it's already a parsed object
            // if (typeof pdfData === 'object' && pdfData.originalName) {
            //     return pdfData.originalName;
            // }

            return "PDF";
        } catch (error) {
            console.error("Error getting PDF filename:", error);
            return "PDF";
        }
    };

    return (
        <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
            <CardHeader className="pb-3">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                    <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl font-bold text-slate-900 mb-1 truncate">
                            {pitchItem.companyName || "Unnamed Startup"}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mb-2 sm:mb-3">
                            Owner: {pitchItem.ownerName || "Unknown"}
                        </p>

                        <div className="mb-3">
                            <p className="text-sm sm:text-base font-medium text-slate-800 line-clamp-2">
                                {pitchItem.title}
                            </p>
                            <p className="text-sm text-indigo-600 line-clamp-2">
                                {pitchItem.tagline}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                        {/* Like Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleLike(pitchItem._id)}
                            disabled={loadingLikes.has(pitchItem._id)}
                            className={`flex items-center gap-1 ${pitchItem.isSaved
                                ? "text-red-500 hover:text-red-600"
                                : "text-gray-500 hover:text-red-500"
                                }`}
                        >
                            {loadingLikes.has(pitchItem._id) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Heart
                                    className={`h-4 w-4 ${pitchItem.isSaved ? "fill-current" : ""}`}
                                />
                            )}
                            <span className="text-xs">
                                {pitchLikes[pitchItem._id] || 0}
                            </span>
                        </Button>

                        {/* Follow Button */}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleFollow(pitchItem.startupId)}
                            disabled={loadingFollows.has(pitchItem.startupId)}
                            className={`flex items-center gap-1 ${pitchItem.isFollow
                                ? "text-green-600 hover:text-green-700"
                                : "text-blue-600 hover:text-blue-700"
                                }`}
                        >
                            {loadingFollows.has(pitchItem.startupId) ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : pitchItem.isFollow ? (
                                <UserCheck className="h-4 w-4" />
                            ) : (
                                <UserPlus className="h-4 w-4" />
                            )}
                            <span className="text-xs hidden sm:inline">
                                {pitchItem.isFollow ? "Following" : "Follow"}
                            </span>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4 flex-1">
                {/* Problem & Solution */}
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Problem</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6 line-clamp-3">
                            {pitchItem.problem}
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building className="h-4 w-4 text-green-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Solution</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6 line-clamp-3">
                            {pitchItem.solution}
                        </p>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-3 border-t border-slate-200">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700">Funding</span>
                        </div>
                        <p className="text-sm text-slate-900 font-medium truncate">
                            {pitchItem.funding}
                        </p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                            <span className="text-xs font-medium text-slate-700">Raised</span>
                        </div>
                        <p className="text-sm text-slate-900 font-medium truncate">
                            {pitchItem.raised}
                        </p>
                    </div>
                </div>

                {/* Market & Traction */}
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Market</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6 line-clamp-2">
                            {pitchItem.market}
                        </p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-orange-500 flex-shrink-0" />
                            <span className="text-sm font-medium text-slate-700">Traction</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6 line-clamp-2">
                            {pitchItem.traction}
                        </p>
                    </div>
                </div>

                {/* Team & Active Users */}
                <div className="grid grid-cols-1 gap-3">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-sm font-medium text-slate-700 flex-shrink-0">
                            Team:
                        </span>
                        <span className="text-sm text-slate-600 truncate">
                            {pitchItem.team}
                        </span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                        <span className="text-sm font-medium text-slate-700 flex-shrink-0">
                            Active Users:
                        </span>
                        <span className="text-sm text-slate-600 truncate">
                            {pitchItem.activeUser}
                        </span>
                    </div>
                </div>

                {/* Links and Date */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-3 border-t border-slate-200">
                    <div className="flex items-center gap-3">
                        {pitchItem.youtube && (
                            <a
                                href={pitchItem.youtube}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                            >
                                <Youtube className="h-4 w-4" />
                                <span className="text-xs">Video</span>
                            </a>
                        )}
                        {pitchItem.pdf && makePdfUrl(pitchItem.pdf) && (
                            <a
                                href={makePdfUrl(pitchItem.pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                                title={getPdfFileName(pitchItem.pdf)}
                            >
                                <FileText className="h-4 w-4" />
                                <span className="text-xs">PDF</span>
                            </a>
                        )}
                    </div>

                    <div className="flex items-center gap-1 text-slate-500">
                        <Calendar className="h-3 w-3" />
                        <span className="text-xs">{formatDate(pitchItem.createdAt)}</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PitchCard;
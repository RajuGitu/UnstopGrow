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

const LikedPitchCard = ({
    pitchItem,
    pitchLikes,
    setPitchLikes,
    allLikedPitch,
    setAllLikedPitch
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
            const currentPitch = allLikedPitch?.find(p => p._id === pitchId);
            const isCurrentlyLiked = currentPitch?.isSaved || false;

            if (isCurrentlyLiked) {
                // Unlike the pitch
                await axiosInstance.delete(`/supporter/supporterpitchunlikes/${pitchId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isSaved to false
                setAllLikedPitch(prev =>
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
                // Like the pitch
                await axiosInstance.post(`/supporter/supporterpitchlikes/${pitchId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                setAllLikedPitch(prev =>
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
            const currentPitch = allLikedPitch?.find(p => p._id === pitchId);
            const wasLiked = currentPitch?.isSaved || false;

            // Revert the isSaved state
            setAllLikedPitch(prev =>
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
            const currentPitch = allLikedPitch?.find(p => p.startupId === startupId);
            const isCurrentlyFollowing = currentPitch?.isFollow === true;

            console.log('Current follow status:', isCurrentlyFollowing);

            if (isCurrentlyFollowing) {
                // Unfollow the startup - DELETE request
                await axiosInstance.delete(`/supporter/supporterpitchunfollow/${startupId}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isFollow to false for all pitches with this startupId
                setAllLikedPitch(prev =>
                    prev.map(pitch =>
                        pitch.startupId === startupId
                            ? { ...pitch, isFollow: false }
                            : pitch
                    )
                );
            } else {
                // Follow the startup - POST request
                await axiosInstance.post(`/supporter/supporterpitchfollow/${startupId}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state - set isFollow to true for all pitches with this startupId
                setAllLikedPitch(prev =>
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
            const currentPitch = allLikedPitch?.find(p => p.startupId === startupId);
            const wasFollowing = currentPitch?.isFollow === true;

            // Revert the isFollow state
            setAllLikedPitch(prev =>
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

    const makePdfUrl = (pdfPath) => {
        if (!pdfPath) return null;
        const normalizedPath = pdfPath.replace(/\\/g, "/");
        const uploadsIndex = normalizedPath.indexOf("uploads/");
        if (uploadsIndex === -1) return null;
        const relativePath = normalizedPath.substring(uploadsIndex);
        return `https://unstopgrowb.onrender.com/${relativePath}`;
    };

    return (
        <Card className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <CardTitle className="text-xl font-bold text-slate-900 mb-1">
                            {pitchItem.companyName || "Unnamed Startup"}
                        </CardTitle>
                        <p className="text-xs text-gray-500 mb-3">
                            Owner: {pitchItem.ownerName || "Unknown"}
                        </p>

                        <div className="mb-3">
                            <p className="text-base font-medium text-slate-800">{pitchItem.title}</p>
                            <p className="text-sm text-indigo-600">{pitchItem.tagline}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
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
                            <span className="text-xs">
                                {pitchItem.isFollow ? "Following" : "Follow"}
                            </span>
                        </Button>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="space-y-4">
                {/* Problem & Solution */}
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Target className="h-4 w-4 text-red-500" />
                            <span className="text-sm font-medium text-slate-700">Problem</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6">{pitchItem.problem}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Building className="h-4 w-4 text-green-500" />
                            <span className="text-sm font-medium text-slate-700">Solution</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6">{pitchItem.solution}</p>
                    </div>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <DollarSign className="h-4 w-4 text-green-600" />
                            <span className="text-xs font-medium text-slate-700">Funding</span>
                        </div>
                        <p className="text-sm text-slate-900 font-medium">{pitchItem.funding}</p>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-blue-600" />
                            <span className="text-xs font-medium text-slate-700">Raised</span>
                        </div>
                        <p className="text-sm text-slate-900 font-medium">{pitchItem.raised}</p>
                    </div>
                </div>

                {/* Market & Traction */}
                <div className="space-y-3">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Users className="h-4 w-4 text-purple-500" />
                            <span className="text-sm font-medium text-slate-700">Market</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6">{pitchItem.market}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                            <span className="text-sm font-medium text-slate-700">Traction</span>
                        </div>
                        <p className="text-sm text-slate-600 pl-6">{pitchItem.traction}</p>
                    </div>
                </div>

                {/* Team & Active Users */}
                <div className="grid grid-cols-1 gap-3">
                    <div>
                        <span className="text-sm font-medium text-slate-700">Team: </span>
                        <span className="text-sm text-slate-600">{pitchItem.team}</span>
                    </div>
                    <div>
                        <span className="text-sm font-medium text-slate-700">Active Users: </span>
                        <span className="text-sm text-slate-600">{pitchItem.activeUser}</span>
                    </div>
                </div>

                {/* Links and Date */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
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
                        {pitchItem.pdf && (
                            <a
                                href={makePdfUrl(pitchItem.pdf)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
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

export default LikedPitchCard;
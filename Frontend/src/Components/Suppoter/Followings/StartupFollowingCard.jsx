import { useState } from "react";
import { Button } from "../../UI/Button";
import { Loader2, UserCheck, UserPlus, Building } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Avatar, AvatarFallback } from "../../UI/Avatar";

const StartupFollowingCard = ({ startup, onFollowStatusChange }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isFollowing, setIsFollowing] = useState(startup.isFollow);

    const makeImageUrl = (imagePath) => {
        if (!imagePath) return null;
        const normalizedPath = imagePath.replace(/\\/g, "/");
        const uploadsIndex = normalizedPath.indexOf("uploads/");
        if (uploadsIndex === -1) return null;
        const relativePath = normalizedPath.substring(uploadsIndex);
        return `http://localhost:5000/${relativePath}`;
    };

    const handleFollow = async () => {
        const token = localStorage.getItem("token");

        if (!token) {
            console.error("No token found");
            return;
        }

        if (isLoading) return; // Prevent multiple simultaneous requests

        setIsLoading(true);

        try {
            console.log('Current follow status:', isFollowing);

            if (isFollowing) {
                // Unfollow the startup - DELETE request
                await axiosInstance.delete(`/supporter/supporterpitchunfollow/${startup._id}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state
                setIsFollowing(false);

                // Notify parent component if callback is provided
                if (onFollowStatusChange) {
                    onFollowStatusChange(startup._id, false);
                }
            } else {
                // Follow the startup - POST request
                await axiosInstance.post(`/supporter/supporterpitchfollow/${startup._id}`, {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                // Update local state
                setIsFollowing(true);

                // Notify parent component if callback is provided
                if (onFollowStatusChange) {
                    onFollowStatusChange(startup._id, true);
                }
            }
        } catch (error) {
            console.error("Error following/unfollowing startup:", error);

            // Show error message to user (you might want to use a toast notification here)
            // For now, we'll just log it
            alert(`Failed to ${isFollowing ? 'unfollow' : 'follow'} startup. Please try again.`);
        } finally {
            setIsLoading(false);
        }
    };

    const getInitials = (name) => {
        const words = name.split(" ");
        if (words.length === 0) return "??";
        if (words.length === 1) return words[0].charAt(0).toUpperCase();
        return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
    };
    const logoUrl = makeImageUrl(startup.logo);

    return (
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center overflow-hidden">
                        <Avatar className="w-16 h-16 rounded-xl shadow-md">
                            {startup.logo && (
                                <img
                                    src={logoUrl}
                                    alt={`${startup.companyName} logo`}
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                        e.target.nextSibling.style.display = 'flex';
                                    }}
                                />
                            )}
                            {!startup.logo && (
                                <AvatarFallback>
                                    {getInitials(startup.companyName || "Unknown")}
                                </AvatarFallback>
                            )}
                        </Avatar>
                    </div>

                    <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm">
                            {startup.companyName}
                        </h3>
                        <p className="text-gray-500 text-xs">
                            Owner: {startup.ownerName}
                        </p>
                    </div>
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    disabled={isLoading}
                    onClick={handleFollow}
                    className={`text-sm px-4 py-2 flex items-center gap-2 ${isFollowing
                        ? "text-green-600 border-green-600 hover:bg-green-50"
                        : "text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                >
                    {isLoading ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                    ) : isFollowing ? (
                        <UserCheck className="h-4 w-4" />
                    ) : (
                        <UserPlus className="h-4 w-4" />
                    )}
                    <span>{isFollowing ? "Following" : "Follow"}</span>
                </Button>
            </div>
        </div>
    );
};

export default StartupFollowingCard;
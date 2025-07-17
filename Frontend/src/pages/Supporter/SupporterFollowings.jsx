import { useState, useEffect } from "react";
import { Loader2, Users } from "lucide-react";
import axiosInstance from "../../../utils/axiosInstance";
import StartupFollowingCard from "../../Components/Suppoter/Followings/StartupFollowingCard";

const SupporterFollowings = () => {
    const [followedStartups, setFollowedStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFollowedStartups = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setFollowedStartups([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axiosInstance.get('/supporter/allfollowedstartup', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const startups = response?.data?.founder || [];
                setFollowedStartups(startups);
                setError(null);
            } catch (err) {
                console.error("Error fetching followed startups:", err);
                setError("Failed to load followed startups");
                setFollowedStartups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchFollowedStartups();
    }, []);

    // Handle follow status changes from child components
    const handleFollowStatusChange = (startupId, isFollowing) => {
        if (isFollowing) {
            // If following, the startup should already be in the list
            // Update the isFollow status
            setFollowedStartups(prev =>
                prev.map(startup =>
                    startup._id === startupId
                        ? { ...startup, isFollow: true }
                        : startup
                )
            );
        } else {
            // If unfollowing, remove from the list since this is a "following" page
            setFollowedStartups(prev =>
                prev.filter(startup => startup._id !== startupId)
            );
        }
    };

    if (loading) {
        return (
            <div className="flex-1 p-4 sm:p-6 overflow-auto">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center">
                        <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                        <p className="text-gray-600 text-sm sm:text-base">Loading followed startups...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex-1 p-4 sm:p-6 overflow-auto max-h-screen">
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="text-center px-4">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-red-600" />
                        </div>
                        <p className="text-red-600 mb-2 text-sm sm:text-base">Error loading startups</p>
                        <p className="text-gray-600 text-xs sm:text-sm">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 p-4 sm:p-6 overflow-auto">
            <div className="space-y-6 sm:space-y-8 p-2 sm:p-5 max-h-screen bg-white">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
                    <div className="flex-1">
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Startups You're Following
                        </h1>
                        <p className="text-slate-600 mt-2 text-sm sm:text-base">
                            Discover updates from the startups you've chosen to follow. Stay engaged with their latest innovations and pitch progress.
                        </p>
                    </div>
                    <div className="text-left sm:text-right">
                        <p className="text-sm text-gray-500">
                            Following {followedStartups.length} startup{followedStartups.length !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>

                {followedStartups.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                        {followedStartups.map((startup) => (
                            <StartupFollowingCard
                                key={startup._id}
                                startup={startup}
                                onFollowStatusChange={handleFollowStatusChange}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center">
                        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-indigo-600" />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                            No Startups Followed Yet
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base max-w-md mx-auto">
                            Start following startups to see their updates and progress here.
                            Explore pitch decks and follow the ones that interest you!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SupporterFollowings;
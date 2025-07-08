import { Heart, Loader2, MessageCircle, Users } from "lucide-react";
import SupporterMetricCard from "./SupporterMetricCard";
import { useState, useEffect } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

const SupporterKeyMetrics = () => {
    const [likes, setLikes] = useState(0);
    const [follow, setFollow] = useState(0);
    const [comments, setComments] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchMetrics = async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    setError("No authentication token found");
                    return;
                }

                const [likesRes, followRes] = await Promise.all([
                    axiosInstance.get("/supporter/getCountLikes", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                    axiosInstance.get("/supporter/getcountfollow", {
                        headers: { Authorization: `Bearer ${token}` },
                    }),
                ]);

                setLikes(likesRes.data?.data?.totalLikesCount ?? 0);
                setFollow(followRes.data?.data?.followCount ?? 0);
            } catch (err) {
                console.error("Error fetching supporter metrics:", err);
                setError("Failed to load metrics");
            } finally {
                setLoading(false);
            }
        };

        fetchMetrics();
    }, []);

    const metrics = [
        {
            title: "Total Following",
            value: `${follow}`,
            icon: <Users className="h-8 w-8 text-blue-500" />,
            color: "blue",
        },
        {
            title: "Total Liked",
            value: `${likes}`,
            icon: <Heart className="h-8 w-8 text-red-500" />,
            color: "green",
        },
        {
            title: "Total Comments",
            value: `${comments}`,
            icon: <MessageCircle className="h-8 w-8 text-purple-500" />,
            color: "purple",
        },
    ];

    if (loading) {
        return (
            <div className="max-h-screen px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map((_, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-sm p-6 border border-gray-200"
                        >
                            <div className="flex items-center justify-center">
                                <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-h-screen px-4">
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <p className="text-red-600 text-sm">{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-h-screen px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                    <SupporterMetricCard key={index} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default SupporterKeyMetrics;

// TrendingStartup.js
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
// import { Link } from "react-router-dom";

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
    <div className="px-4 py-4 sm:px-6">{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg sm:text-xl font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
    <div className="px-4 py-4 sm:px-6">{children}</div>
);

const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => (
    <button
        className={`px-3 py-2 sm:px-4 sm:py-2 rounded-md font-medium transition-colors ${variant === "outline"
            ? "border border-gray-300 bg-white hover:bg-gray-50"
            : "bg-blue-600 text-white hover:bg-blue-700"
            } ${size === "sm" ? "text-sm px-2 py-1 sm:px-3 sm:py-1" : ""} ${className}`}
        onClick={onClick}
    >
        {children}
    </button>
);

function TrendingStartup() {
    const [trendingStartups, setTrendingStartups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            setTrendingStartups([]);
            setLoading(false);
            return;
        }

        const fetchTrendingStartups = async () => {
            try {
                const res = await axiosInstance.get("/supporter/trending", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setTrendingStartups(res.data.data || []);
            } catch (error) {
                console.error("Server Side Problem", error);
                setTrendingStartups([]);
            } finally {
                setLoading(false);
            }
        };

        fetchTrendingStartups();
    }, []);

    const getLogoFromName = (name) => {
        if (!name) return "?";
        return name.charAt(0).toUpperCase() + (name.charAt(1) || "").toUpperCase();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const makeUrl = (absolute) => {
        if (!absolute) return null;
        const parsed = JSON.parse(absolute);
        return parsed.url;
    };

    const displayedStartups = trendingStartups.slice(0, 3);

    return (
        <div className="w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span className="text-base sm:text-lg md:text-xl">🔥 Trending Startups This Week</span>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <p className="text-gray-500 text-center py-8">Loading trending startups...</p>
                    ) : displayedStartups.length === 0 ? (
                        <p className="text-gray-500 text-center py-8">No trending startups available right now.</p>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            {displayedStartups.map((startup) => {
                                const profile = startup.founderProfile;
                                if (!profile) return null;

                                return (
                                    <div
                                        key={startup.startupId}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white"
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            {profile.logo ? (
                                                <img
                                                    src={makeUrl(profile.logo)}
                                                    alt={profile.startUpName}
                                                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover flex-shrink-0"
                                                />
                                            ) : (
                                                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold text-sm sm:text-base flex-shrink-0">
                                                    {getLogoFromName(profile.startUpName)}
                                                </div>
                                            )}

                                            <div className="min-w-0 flex-1">
                                                <h3 className="font-semibold text-sm sm:text-base truncate">{profile.startUpName}</h3>
                                                <p className="text-xs sm:text-sm text-gray-600 truncate">{profile.domain}</p>
                                            </div>
                                        </div>

                                        <p className="text-xs sm:text-sm text-gray-700 mb-3 line-clamp-2 min-h-[2.5rem] sm:min-h-[3rem]">
                                            {profile.bio}
                                        </p>

                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 sm:gap-0 text-xs text-gray-500">
                                            <span className="truncate">📍 {profile.location}</span>
                                            <span className="flex-shrink-0">📅 {formatDate(profile.createdAt)}</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}

export default TrendingStartup;
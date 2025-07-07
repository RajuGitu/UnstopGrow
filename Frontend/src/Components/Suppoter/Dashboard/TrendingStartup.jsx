import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Link } from "react-router-dom";

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-lg shadow-sm  ${className}`}>{children}</div>
);

const CardHeader = ({ children }) => (
    <div className="px-6 py-4 ">{children}</div>
);

const CardTitle = ({ children, className = "" }) => (
    <h3 className={`text-lg font-semibold ${className}`}>{children}</h3>
);

const CardContent = ({ children }) => (
    <div className="px-6 py-4">{children}</div>
);

const Button = ({ children, variant = "default", size = "default", className = "", onClick }) => (
    <button
        className={`px-4 py-2 rounded-md font-medium transition-colors ${variant === "outline" ? "border border-gray-300 bg-white hover:bg-gray-50" : "bg-blue-600 text-white hover:bg-blue-700"
            } ${size === "sm" ? "text-sm px-3 py-1" : ""} ${className}`}
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
                // Access the nested data array
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

    // Function to format date
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const makeUrl = (absolute) => {
        const rel = absolute.split("uploads")[1];
        return rel
            ? `http://localhost:5000/uploads${rel.replace(/\\/g, "/")}`
            : imgPlaceholder;
    };

    const displayedStartups = trendingStartups.slice(0, 3);

    return (
        <div>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <span>🔥 Trending Startups This Week</span>
                        <Link to="/supporter/explore-pitch">
                            <Button variant="" size="sm" className="border-gray-300">
                                View All
                            </Button>
                        </Link>
                    </CardTitle>
                </CardHeader>

                <CardContent>
                    {loading ? (
                        <p className="text-gray-500">Loading trending startups...</p>
                    ) : displayedStartups.length === 0 ? (
                        <p className="text-gray-500">No trending startups available right now.</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {displayedStartups.map((startup) => {
                                const profile = startup.founderProfile;
                                if (!profile) return null;

                                return (
                                    <div
                                        key={startup.startupId}
                                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                                    >
                                        <div className="flex items-center space-x-3 mb-3">
                                            {/* Logo or initials */}
                                            {profile.logo ? (
                                                <img
                                                    src={makeUrl(profile.logo)}
                                                    alt={profile.startUpName}
                                                    className="w-12 h-12 rounded-lg object-cover"
                                                />
                                            ) : (
                                                <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center text-white font-semibold">
                                                    {getLogoFromName(profile.startUpName)}
                                                </div>
                                            )}

                                            <div>
                                                <h3 className="font-semibold">{profile.startUpName}</h3>
                                                <p className="text-sm text-gray-600">{profile.domain}</p>
                                            </div>
                                        </div>

                                        {/* Bio */}
                                        <p className="text-sm text-gray-700 mb-3 line-clamp-2">
                                            {profile.bio}
                                        </p>

                                        {/* Location and Date */}
                                        <div className="flex justify-between items-center text-xs text-gray-500">
                                            <span>📍 {profile.location}</span>
                                            <span>📅 {formatDate(profile.createdAt)}</span>
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
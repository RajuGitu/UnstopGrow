import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { GitMerge, Mail, MapPin, Globe, Linkedin, Calendar, Star } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

// Fixed Button component with proper variant handling
const Button = ({ variant = "default", className, children, isActive = false, disabled = false, ...props }) => {
    const getVariantClasses = () => {
        if (disabled) {
            return "bg-gray-300 text-gray-500 cursor-not-allowed";
        }

        switch (variant) {
            case "success":
                return isActive
                    ? "bg-green-600 text-white border-green-600"
                    : "bg-green-500 text-white hover:bg-green-600 border-green-500";
            case "destructive":
                return isActive
                    ? "bg-red-600 text-white border-red-600"
                    : "bg-red-500 text-white hover:bg-red-600 border-red-500";
            case "outline":
                return isActive
                    ? "border border-slate-400 bg-slate-100 text-slate-900"
                    : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
            default:
                return "bg-slate-900 text-white hover:bg-slate-800";
        }
    };

    return (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors border ${getVariantClasses()} ${className || ''}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

// Function to format date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
};

// Function to get domain color
const getDomainColor = (domain) => {
    const colors = {
        'GreenTech': 'bg-green-100 text-green-800',
        'FinTech': 'bg-blue-100 text-blue-800',
        'HealthTech': 'bg-red-100 text-red-800',
        'EdTech': 'bg-purple-100 text-purple-800',
        'default': 'bg-gray-100 text-gray-800'
    };
    return colors[domain] || colors.default;
};

// Function to get status color and text
const getStatusDisplay = (status) => {
    const statusMap = {
        'pending': {
            text: 'Pending',
            color: 'bg-blue-100 text-blue-800 border-blue-300',
            badgeColor: 'bg-blue-500 text-white'
        },
        'accepted': {
            text: 'Accepted',
            color: 'bg-green-100 text-green-800 border-green-300',
            badgeColor: 'bg-green-500 text-white'
        },
        'rejected': {
            text: 'Rejected',
            color: 'bg-red-100 text-red-800 border-red-300',
            badgeColor: 'bg-red-500 text-white'
        }
    };
    return statusMap[status] || statusMap.pending;
};

export default function ActiveRequestsCard() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        const handleRequest = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setRequests([]);
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const response = await axiosInstance.get('/founder/getrequest', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true
                });
                setRequests(response.data.mergedArray || []);
            } catch (error) {
                console.error("Status update failed:", error);
                setRequests([]);
            } finally {
                setLoading(false);
            }
        };
        handleRequest();
    }, []);

    const handleStatusUpdate = async (requestId, newStatus) => {
        const token = localStorage.getItem("token");
        if (!token) return;
        setActionLoading(requestId);

        try {
            await axiosInstance.put(
                `/founder/updaterequest/${requestId}`,
                { status: newStatus },
                {
                    headers: { Authorization: `Bearer ${token}` },
                    withCredentials: true,
                }
            );

            setRequests((prev) =>
                prev.map((req) =>
                    req._id === requestId ? { ...req, status: newStatus } : req
                )
            );
        } catch (err) {
            console.error("Status update failed:", err);
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return <p className="text-center text-slate-500">Loading received requests...</p>;
    }

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                    <div className="flex items-center space-x-2">
                        <GitMerge className="h-5 w-5 text-green-600" />
                        <span>Active Requests</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">{requests?.length}</Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-4">
                {requests.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <GitMerge className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                        <p>No requests received yet</p>
                    </div>
                ) : (
                    requests.map((requestData) => {
                        const founderData = requestData.founderProfile;
                        const statusDisplay = getStatusDisplay(requestData.status);
                        const isLoading = actionLoading === requestData._id;
                        const isPending = requestData.status === "pending";
                        const isAccepted = requestData.status === "accepted";
                        const isRejected = requestData.status === "rejected";

                        return (
                            <div key={requestData._id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                {/* Header with startup info */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-2">
                                            <h4 className="font-semibold text-lg">{founderData?.startUpName || 'Unknown Startup'}</h4>
                                            <Badge className={getDomainColor(founderData?.domain)}>
                                                {founderData?.domain || 'General'}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 text-sm text-slate-600">
                                            <div className="flex items-center gap-1">
                                                <MapPin className="h-4 w-4" />
                                                <span>{founderData?.location || 'Location not specified'}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>{formatDate(requestData.createdAt)}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Badge className={statusDisplay.badgeColor}>
                                        {statusDisplay.text}
                                    </Badge>
                                </div>

                                {/* Bio and message */}
                                <div className="mb-4">
                                    <p className="text-sm text-slate-700 mb-2">{founderData?.bio || 'No bio available'}</p>
                                    <div className="bg-slate-50 p-3 rounded-md">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Their Message:</p>
                                        <p className="text-sm text-slate-700">{requestData.describe}</p>
                                    </div>
                                </div>

                                {/* Achievements */}
                                {founderData?.achievements && (
                                    <div className="mb-4">
                                        <div className="flex items-center gap-1 mb-1">
                                            <Star className="h-4 w-4 text-yellow-500" />
                                            <p className="text-sm font-medium text-slate-600">Achievements:</p>
                                        </div>
                                        <p className="text-sm text-slate-700">{founderData.achievements}</p>
                                    </div>
                                )}

                                {/* Links and contact */}
                                <div className="flex justify-between items-center mb-4">
                                    <div className="flex items-center gap-3">
                                        {founderData?.socials?.linkedin && (
                                            <a
                                                href={founderData.socials.linkedin}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                <Linkedin className="h-4 w-4" />
                                                <span>LinkedIn</span>
                                            </a>
                                        )}
                                        {founderData?.website && (
                                            <a
                                                href={founderData.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-green-600 hover:text-green-800 text-sm"
                                            >
                                                <Globe className="h-4 w-4" />
                                                <span>Website</span>
                                            </a>
                                        )}
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="flex items-center gap-1"
                                        onClick={() => window.open(`mailto:${founderData?.email}`, '_blank')}
                                    >
                                        <Mail className="h-4 w-4" />
                                        Contact
                                    </Button>
                                </div>

                                {/* Status display */}
                                <div className={`mb-4 px-3 py-2 bg-white rounded-md border-l-4 ${statusDisplay.color}`}>
                                    <p className="text-sm font-medium text-slate-700">
                                        Status: <span className="capitalize font-semibold">{statusDisplay.text}</span>
                                        {isPending && (
                                            <span className="ml-2 text-xs text-slate-500">• Awaiting your response</span>
                                        )}
                                    </p>
                                </div>

                                {/* Action buttons */}
                                <div className="flex justify-end space-x-2">
                                    <Button
                                        variant="success"
                                        isActive={isAccepted}
                                        onClick={() => handleStatusUpdate(requestData._id, "accepted")}
                                        disabled={isLoading || !isPending}
                                    >
                                        {isLoading && !isAccepted ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </span>
                                        ) : isAccepted ? (
                                            "Accepted ✓"
                                        ) : (
                                            "Accept"
                                        )}
                                    </Button>
                                    <Button
                                        variant="destructive"
                                        isActive={isRejected}
                                        onClick={() => handleStatusUpdate(requestData._id, "rejected")}
                                        disabled={isLoading || !isPending}
                                    >
                                        {isLoading && !isRejected ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Processing...
                                            </span>
                                        ) : isRejected ? (
                                            "Rejected ✗"
                                        ) : (
                                            "Reject"
                                        )}
                                    </Button>
                                </div>
                            </div>
                        );
                    })
                )}
            </CardContent>
        </Card>
    );
};
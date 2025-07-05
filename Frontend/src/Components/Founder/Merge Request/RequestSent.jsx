import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { GitMerge, Mail, MapPin, Globe, Linkedin, Calendar, Trash2, AlertTriangle } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

// Simple Button component
const Button = ({ variant = "default", className, children, isActive = false, ...props }) => {
    const variants = {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        outline: isActive
            ? "border border-slate-400 bg-slate-100 text-slate-900"
            : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        destructive: isActive
            ? "bg-red-600 text-white"
            : "bg-red-500 text-white hover:bg-red-600",
        success: isActive
            ? "bg-green-600 text-white"
            : "bg-green-500 text-white hover:bg-green-600",
    };

    return (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${variants[variant]} ${className || ''}`}
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

// Function to get status color
const getStatusColor = (status) => {
    const colors = {
        'pending': 'bg-yellow-100 text-yellow-800 border-yellow-300',
        'accepted': 'bg-green-100 text-green-800 border-green-300',
        'rejected': 'bg-red-100 text-red-800 border-red-300',
        'default': 'bg-gray-100 text-gray-800 border-gray-300'
    };
    return colors[status] || colors.default;
};

export default function RequestSent() {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(null);
    const [showConfirmDialog, setShowConfirmDialog] = useState(null);

    useEffect(() => {
        const getAllSentRequest = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            setLoading(true);
            try {
                const response = await axiosInstance.get('/founder/getsentrequest', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                });
                setRequests(response.data?.mergedArray || []);
            } catch (err) {
                console.error("Server side Problem", err);

            } finally {
                setLoading(false);
            }
        };
        getAllSentRequest();
    }, []);

    const handleDeleteRequest = async (requestId) => {
        const token = localStorage.getItem("token");
        if (!token) return;

        setDeleteLoading(requestId);
        try {
            await axiosInstance.delete(`/founder/deleterequest/${requestId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            // Remove the deleted request from the state
            setRequests(prevRequests =>
                prevRequests.filter(req => req._doc._id !== requestId)
            );

            setShowConfirmDialog(null);
        } catch (err) {
            console.error("Error deleting request:", err);
            // You might want to show an error message to the user here
        } finally {
            setDeleteLoading(null);
        }
    };

    const ConfirmDialog = ({ requestId, startupName, onConfirm, onCancel }) => (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                <div className="flex items-center gap-3 mb-4">
                    <AlertTriangle className="h-6 w-6 text-red-500" />
                    <h3 className="text-lg font-semibold">Delete Request</h3>
                </div>
                <p className="text-slate-600 mb-6">
                    Are you sure you want to delete your request to <span className="font-semibold">{startupName}</span>?
                    This action cannot be undone.
                </p>
                <div className="flex justify-end gap-3">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={() => onConfirm(requestId)}
                        disabled={deleteLoading === requestId}
                    >
                        {deleteLoading === requestId ? (
                            <span className="flex items-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Deleting...
                            </span>
                        ) : (
                            'Delete'
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );

    if (loading) {
        return <p className="text-center text-slate-500">Loading sent requests...</p>;
    }

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                    <div className="flex items-center space-x-2">
                        <GitMerge className="h-5 w-5 text-green-600" />
                        <span>Requests Sent</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">{requests.length}</Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-4">
                {requests.length === 0 ? (
                    <div className="text-center py-8 text-slate-500">
                        <GitMerge className="h-12 w-12 mx-auto mb-4 text-slate-300" />
                        <p>No requests sent yet</p>
                    </div>
                ) : (
                    requests.map((requestData) => {

                        const founderData = requestData.founderProfile;

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
                                    <Badge className={getStatusColor(requestData.status)}>
                                        {requestData.status}
                                    </Badge>
                                </div>

                                {/* Bio and description */}
                                <div className="mb-4">
                                    <p className="text-sm text-slate-700 mb-2">{founderData?.bio || 'No bio available'}</p>
                                    <div className="bg-slate-50 p-3 rounded-md">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Your Message:</p>
                                        <p className="text-sm text-slate-700">{requestData.describe}</p>
                                    </div>
                                </div>

                                {/* Achievements */}
                                {founderData?.achievements && (
                                    <div className="mb-4">
                                        <p className="text-sm font-medium text-slate-600 mb-1">Achievements:</p>
                                        <p className="text-sm text-slate-700">{founderData.achievements}</p>
                                    </div>
                                )}

                                {/* Links and actions */}
                                <div className="flex justify-between items-center">
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
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="flex items-center gap-1"
                                            onClick={() => window.open(`mailto:${founderData?.email}`, '_blank')}
                                        >
                                            <Mail className="h-4 w-4" />
                                            Contact
                                        </Button>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            className="flex items-center gap-1"
                                            onClick={() => setShowConfirmDialog({
                                                id: requestData._id,
                                                startupName: founderData?.startUpName || 'Unknown Startup'
                                            })}
                                            disabled={deleteLoading === requestData._id}
                                        >
                                            {deleteLoading === requestData._id ? (
                                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <Trash2 className="h-4 w-4" />
                                            )}
                                            Delete
                                        </Button>
                                    </div>
                                </div>

                                {/* Status display */}
                                <div className={`mt-3 px-3 py-2 bg-white rounded-md border-l-4 ${getStatusColor(requestData.status)}`}>
                                    <p className="text-sm font-medium text-slate-700">
                                        Status: <span className="capitalize font-semibold">{requestData.status}</span>
                                        {requestData.status === 'pending' && (
                                            <span className="ml-2 text-xs text-slate-500">• Awaiting response</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                )}

                {/* Confirmation Dialog */}
                {showConfirmDialog && (
                    <ConfirmDialog
                        requestId={showConfirmDialog.id}
                        startupName={showConfirmDialog.startupName}
                        onConfirm={handleDeleteRequest}
                        onCancel={() => setShowConfirmDialog(null)}
                    />
                )}
            </CardContent>
        </Card>
    );
}
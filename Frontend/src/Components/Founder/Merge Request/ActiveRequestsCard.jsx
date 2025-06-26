import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { GitMerge, Mail } from "lucide-react";
import { useState } from "react";


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


export default function ActiveRequestsCard() {
    const requests = [
        {
            id: 1,
            title: "DataStream Analytics",
            founder: "Alex Kim",
            status: "pending",
            tag: "Data Analytics",
            message: "Interested in exploring synergies between our platforms",
            time: "2 days ago"
        },
        {
            id: 2,
            title: "EduTech Pro",
            founder: "Lisa Park",
            status: "reviewing",
            tag: "EdTech",
            message: "Our AI learning platform could complement your solutions",
            time: "5 days ago"
        }
    ];

    const [statusMap, setStatusMap] = useState({});
    const [loadingMap, setLoadingMap] = useState({});

    const handleStatusChange = async (id, newStatus) => {
        if (loadingMap[id]) return;

        setLoadingMap((prev) => ({ ...prev, [id]: true }));

        try {
            const currentStatus = statusMap[id];
            const finalStatus = currentStatus === newStatus ? null : newStatus;

            setStatusMap((prev) => ({ ...prev, [id]: finalStatus }));

            // Optional: API call
            // await updateStatus(id, finalStatus);
        } catch (error) {
            console.error("Status update failed:", error);
            alert("Error updating status. Try again.");
        } finally {
            setLoadingMap((prev) => ({ ...prev, [id]: false }));
        }
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center justify-between text-2xl font-semibold">
                    <div className="flex items-center space-x-2">
                        <GitMerge className="h-5 w-5 text-green-600" />
                        <span>Active Requests</span>
                    </div>
                    <Badge className="bg-secondary text-secondary-foreground">{requests.length}</Badge>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-4">
                {requests.map((req) => {
                    const isLoading = loadingMap[req.id];
                    const selectedStatus = statusMap[req.id] || null;

                    return (
                        <div key={req.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold">{req.title}</h4>
                                    <p className="text-sm text-slate-600">by {req.founder}</p>
                                </div>
                                <Badge className={req.status === "pending" ? "bg-primary text-white" : "bg-secondary"}>
                                    {req.status}
                                </Badge>
                            </div>

                            <Badge className="mb-2">{req.tag}</Badge>
                            <p className="text-sm text-slate-600 mb-3">{req.message}</p>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">{req.time}</span>
                                <Button variant="outline" size="sm" className="flex justify-between items-center">
                                    <Mail className="h-4 w-4 mr-1" /> Contact
                                </Button>
                            </div>

                            {/* Status display */}
                            {selectedStatus && (
                                <div className="mt-3 px-3 py-2 bg-white rounded-md border-l-4 border-l-blue-500">
                                    <p className="text-sm font-medium text-slate-700">
                                        Status: <span className="capitalize text-blue-600">{selectedStatus}</span>
                                    </p>
                                </div>
                            )}

                            {/* Action buttons */}
                            <div className="flex justify-end space-x-2 mt-3">
                                <Button
                                    variant="success"
                                    isActive={selectedStatus === "accepted"}
                                    onClick={() => handleStatusChange(req.id, "accepted")}
                                    disabled={isLoading}
                                >
                                    {selectedStatus === "accepted" ? "Accepted ✓" : "Accept"}
                                </Button>
                                <Button
                                    variant="destructive"
                                    isActive={selectedStatus === "rejected"}
                                    onClick={() => handleStatusChange(req.id, "rejected")}
                                    disabled={isLoading}
                                >
                                    {selectedStatus === "rejected" ? "Rejected ✗" : "Reject"}
                                </Button>
                            </div>

                            {isLoading && (
                                <p className="text-xs text-slate-500 text-right mt-1">Updating status...</p>
                            )}
                        </div>
                    );
                })}
            </CardContent>
        </Card>
    );
}

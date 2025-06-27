import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import {
    CheckCircle,
    Clock,
    XCircle,
    MessageSquare,
    Calendar,
} from "lucide-react";

/**
 * One request card
 */
const ContactRequestCard = ({ request }) => {
    /* Helpers -------------------------------------------------------------- */
    const getStatusIcon = (status) =>
    ({
        accepted: <CheckCircle className="w-4 h-4 text-green-500" />,
        pending: <Clock className="w-4 h-4 text-orange-500" />,
        declined: <XCircle className="w-4 h-4 text-red-500" />,
    }[status] || null);

    const getStatusColor = (status) =>
    ({
        accepted: "bg-green-100 text-green-800",
        pending: "bg-orange-100 text-orange-800",
        declined: "bg-red-100 text-red-800",
    }[status] || "bg-gray-100 text-gray-800");

    /* Render --------------------------------------------------------------- */
    return (
        <div className="border border-gray-300 bg-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
                {/* ── left column ── */}
                <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-lg">{request.startup}</h3>
                        <Badge className={getStatusColor(request.status)}>
                            {getStatusIcon(request.status)}
                            <span className="ml-1 capitalize">{request.status}</span>
                        </Badge>
                    </div>

                    <p className="text-gray-600 mb-2">
                        <strong>Founder:</strong> {request.founder}
                    </p>

                    <p className="text-gray-700 text-sm mb-3 bg-gray-50 p-3 rounded italic">
                        “{request.message}”
                    </p>

                    <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        Requested&nbsp;on&nbsp;
                        {new Date(request.requestedOn).toLocaleDateString()}
                    </div>
                </div>

                {/* ── right column (action) ── */}
                <div className="flex flex-col space-y-2 ml-4">
                    {request.status === "accepted" && (
                        <Button size="sm" className="bg-gray-900 text-white">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            View&nbsp;Messages
                        </Button>
                    )}

                    {request.status === "pending" && (
                        <Button size="sm" variant="outline" disabled>
                            <Clock className="w-4 h-4 mr-2" />
                            Waiting&nbsp;for&nbsp;Response
                        </Button>
                    )}

                    {request.status === "declined" && (
                        <Button size="sm" variant="outline">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Send&nbsp;Follow-up
                        </Button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactRequestCard;

import { Card, CardContent } from "../../UI/Card";
import { CheckCircle, Clock, MessageSquare } from "lucide-react";
import { mockContactRequests } from "../../Investor/MockInvestorData";
const ContactStatus = () => {
    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card >
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between ">
                            <div>
                                <p className="text-sm text-gray-600">Total Requests</p>
                                <p className="text-2xl font-bold">{mockContactRequests.length}</p>
                            </div>
                            <MessageSquare className="w-8 h-8 text-blue-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4 ">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Accepted</p>
                                <p className="text-2xl font-bold text-green-600">
                                    {mockContactRequests.filter(req => req.status === "accepted").length}
                                </p>
                            </div>
                            <CheckCircle className="w-8 h-8 text-green-500" />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-gray-600">Pending</p>
                                <p className="text-2xl font-bold text-orange-600">
                                    {mockContactRequests.filter(req => req.status === "pending").length}
                                </p>
                            </div>
                            <Clock className="w-8 h-8 text-orange-500" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}
export default ContactStatus;

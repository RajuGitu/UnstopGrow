import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { CheckCircle, Clock, XCircle, MessageSquare, Calendar } from "lucide-react";
import { mockContactRequests } from "../../Components/Investor/MockInvestorData";

const InvestorContacts = () => {
  const getStatusIcon = (status) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "pending":
        return <Clock className="w-4 h-4 text-orange-500" />;
      case "declined":
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-orange-100 text-orange-800";
      case "declined":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Contact Requests</h1>
        <p className="text-gray-600">Track your connection attempts with startup founders</p>
      </div>

      {/* Stats Cards */}
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

      {/* Contact Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Contact Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockContactRequests.map((request) => (
              <div key={request.id} className="border border-gray-300 bg-gray-100 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
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
                      "{request.message}"
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      Requested on {new Date(request.requestedOn).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    {request.status === "accepted" && (
                      <Button size="sm" className="border-gray-300 bg-gray-900 text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        View Messages
                      </Button>
                    )}
                    {request.status === "pending" && (
                      <Button size="sm" variant="outline" className="border-gray-300" disabled>
                        <Clock className="w-4 h-4 mr-2" />
                        Waiting for Response
                      </Button>
                    )}
                    {request.status === "declined" && (
                      <Button size="sm" variant="outline" className="border-gray-300">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Send Follow-up
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorContacts;
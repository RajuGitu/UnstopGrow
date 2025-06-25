import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import { Eye, GitMerge } from "lucide-react";

export default function ActiveRequestsCard() {
    const requests = [
        {
            title: "DataStream Analytics",
            founder: "Alex Kim",
            status: "pending",
            tag: "Data Analytics",
            message: "Interested in exploring synergies between our platforms",
            time: "2 days ago"
        },
        {
            title: "EduTech Pro",
            founder: "Lisa Park",
            status: "reviewing",
            tag: "EdTech",
            message: "Our AI learning platform could complement your solutions",
            time: "5 days ago"
        }
    ];

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

            <CardContent className="p-6 pt-0">
                <div className="space-y-4">
                    {requests.map((req, index) => (
                        <div key={index} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-2">
                                <div>
                                    <h4 className="font-semibold">{req.title}</h4>
                                    <p className="text-sm text-slate-600">by {req.founder}</p>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <Badge
                                        className={`${req.status === "pending"
                                            ? "bg-primary text-primary-foreground"
                                            : "bg-secondary text-secondary-foreground"
                                            }`}
                                    >
                                        {req.status}
                                    </Badge>
                                </div>
                            </div>

                            <Badge className="mb-2">{req.tag}</Badge>
                            <p className="text-sm text-slate-600 mb-3">{req.message}</p>

                            <div className="flex justify-between items-center">
                                <span className="text-xs text-slate-500">{req.time}</span>
                                <Button variant="outline" size="sm">
                                    <Eye className="h-4 w-4 mr-1" /> View Details
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}

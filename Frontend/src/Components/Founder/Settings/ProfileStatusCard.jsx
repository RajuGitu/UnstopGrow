import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Target } from "lucide-react";

export default function ProfileStatusCard() {
    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center space-x-2 text-2xl font-semibold">
                    <Target className="h-5 w-5 text-indigo-600" />
                    <span>Profile Status</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0 space-y-3">
                {/* Domain */}
                <div className="flex items-center justify-between">
                    <span className="text-sm">Domain</span>
                    <Badge>AI&nbsp;&amp;&nbsp;Machine&nbsp;Learning</Badge>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between">
                    <span className="text-sm">Location</span>
                    <Badge>San&nbsp;Francisco,&nbsp;CA</Badge>
                </div>

                {/* Merge Ready */}
                <div className="flex items-center justify-between">
                    <span className="text-sm">Merge Ready</span>
                    <Badge className="bg-green-500">Yes</Badge>
                </div>
            </CardContent>
        </Card>
    );
}

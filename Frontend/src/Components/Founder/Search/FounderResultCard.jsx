import {
    Card,
    CardContent,
    CardHeader,
} from "../../UI/Card";
import { Avatar, AvatarFallback } from "../../UI/Avatar";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";

import {
    Mail,
    Linkedin,
    TrendingUp,
    MapPin,
    Users,
    Building,
} from "lucide-react";

export default function FounderResultCard({ founder }) {
    return (
        <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            {/* ─────────── header ─────────── */}
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            <AvatarFallback>{founder.initials}</AvatarFallback>
                        </Avatar>

                        <div>
                            <h3 className="font-semibold text-lg">{founder.name}</h3>
                            <p className="text-sm text-slate-600 flex items-center">
                                <Building className="h-3 w-3 mr-1" />
                                {founder.company}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <Badge variant="warning">{founder.mergeStatus}</Badge>
                        <div className="flex items-center text-sm text-green-600">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            {founder.growth}% Growth
                        </div>
                    </div>
                </div>
            </CardHeader>

            {/* ─────────── body ─────────── */}
            <CardContent className="space-y-4 pt-0">
                {/* domain + blurb */}
                <div>
                    <Badge className="mb-2 bg-gray-100" variant="secondary">
                        {founder.domain}
                    </Badge>
                    <p className="text-sm text-slate-600">{founder.description}</p>
                </div>

                {/* location / team */}
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {founder.location}
                    </div>
                    <div className="flex items-center text-slate-600">
                        <Users className="h-4 w-4 mr-2" />
                        {founder.teamSize} team members
                    </div>
                </div>

                {/* tags */}
                <div className="flex flex-wrap gap-1">
                    {founder.tags.map((tag, i) => (
                        <Badge key={i} className="text-xs bg-gray-100" variant="secondary">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* merge interests */}
                <div className="space-y-2">
                    <p className="font-medium text-sm">Merge Interests:</p>
                    <div className="flex flex-wrap gap-1">
                        {founder.mergeInterests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="text-xs bg-gray-100">
                                {interest}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* actions */}
                <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                        </Button>
                        <Button variant="outline">
                            <Linkedin className="h-4 w-4 mr-1" />
                            LinkedIn
                        </Button>
                    </div>

                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500">
                        Send Merge Request
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

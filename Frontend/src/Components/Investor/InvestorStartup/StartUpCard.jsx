import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import { BookmarkX, MessageSquare, ExternalLink, Calendar } from "lucide-react";
const StartupCard = ({ startup }) => {

    return (
        <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                        <img
                            src={startup.logo}
                            alt={startup.name}
                            className="w-16 h-16 rounded-xl object-cover"
                        />

                        <div className="flex-1 space-y-2">
                            <div className="flex items-center space-x-3">
                                <h3 className="text-xl font-bold">{startup.name}</h3>
                                <Badge variant="outline" className="border-gray-300">
                                    {startup.domain}
                                </Badge>
                                {startup.verified && (
                                    <Badge variant="secondary">✅ Verified</Badge>
                                )}
                            </div>

                            <p className="text-gray-700">{startup.tagline}</p>

                            <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span className="flex items-center">
                                    <Calendar className="w-4 h-4 mr-1" />
                                    Saved {startup.savedDaysAgo || 4} days ago
                                </span>
                                <span>Founded: {startup.founded}</span>
                                <span>{startup.employees} employees</span>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {startup.tags && startup.tags.map((tag) => (
                                    <Badge key={tag} variant="outline" className="text-xs border-gray-300">
                                        #{tag}
                                    </Badge>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-2 ml-4">
                        <Button size="sm">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Contact Founder
                        </Button>
                        <Button size="sm" variant="outline" className="border-gray-300" >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            View Profile
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700" >
                            <BookmarkX className="w-4 h-4 mr-2" />
                            Unsave
                        </Button>
                    </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                    <div className="grid grid-cols-3 gap-4 text-center">
                        <div>
                            <p className="text-lg font-semibold text-green-600">
                                ₹{(startup.currentFunding / 100000).toFixed(1)}L
                            </p>
                            <p className="text-xs text-gray-600">Raised</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-blue-600">
                                {startup.traction.users.toLocaleString()}
                            </p>
                            <p className="text-xs text-gray-600">Users</p>
                        </div>
                        <div>
                            <p className="text-lg font-semibold text-purple-600">
                                {startup.traction.growth}%
                            </p>
                            <p className="text-xs text-gray-600">Growth</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};
export default StartupCard;
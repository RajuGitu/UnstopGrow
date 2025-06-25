import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Eye, Heart, MessageSquare, Calendar } from "lucide-react";

const RecentUpdates = ({ pastUpdates }) => {
    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Calendar className="h-5 w-5 text-slate-600" />
                        <span>Your Recent Updates</span>
                    </div>
                    <Badge variant="outline">{pastUpdates.length} published</Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {pastUpdates.map((update) => (
                        <div key={update.id} className="flex space-x-4 p-4 bg-slate-50 rounded-lg">
                            <img
                                src={update.image}
                                alt={update.title}
                                className="w-24 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <h3 className="font-semibold text-slate-900 mb-1">{update.title}</h3>
                                <p className="text-sm text-slate-600 mb-2">{update.description}</p>
                                <div className="flex items-center justify-between">
                                    <div className="flex space-x-2">
                                        {update.tags.map((tag) => (
                                            <Badge key={tag} variant="outline" className="text-xs">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex items-center space-x-4 text-xs text-slate-500">
                                        <span className="flex items-center">
                                            <Eye className="h-3 w-3 mr-1" />
                                            {update.stats.views}
                                        </span>
                                        <span className="flex items-center">
                                            <Heart className="h-3 w-3 mr-1" />
                                            {update.stats.likes}
                                        </span>
                                        <span className="flex items-center">
                                            <MessageSquare className="h-3 w-3 mr-1" />
                                            {update.stats.comments}
                                        </span>
                                        <span>{update.date}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default RecentUpdates;

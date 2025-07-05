import { Card, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const ExpandPost = () => {
    return (
        <Card className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="font-semibold text-indigo-900 mb-1">
                            Want to review all your updates?
                        </h3>
                        <p className="text-indigo-700 text-sm">
                            See everything you’ve shared so far—edit, delete, or celebrate your milestones.
                        </p>
                    </div>
                    <Link to="/founder/all-post">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                            <Users className="h-4 w-4 mr-2" />
                            Browse All Your Updates
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card >
    );
};

export default ExpandPost;
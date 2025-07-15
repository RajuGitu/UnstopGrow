import { Card, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const ExpandPost = () => {
    return (
        <Card className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200 w-full">
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-4 sm:space-y-0">
                    <div className="flex-1">
                        <h3 className="font-semibold text-indigo-900 mb-1 text-base sm:text-lg">
                            Want to review all your updates?
                        </h3>
                        <p className="text-indigo-700 text-sm sm:text-base">
                            See everything you've shared so far—edit, delete, or celebrate your milestones.
                        </p>
                    </div>
                    <Link to="/founder/all-post" className="w-full sm:w-auto">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full sm:w-auto whitespace-nowrap">
                            <Users className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Browse All Your Updates</span>
                            <span className="sm:hidden">View All Updates</span>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpandPost;
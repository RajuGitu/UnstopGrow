// ExpandPitch.js
import { Card, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const ExpandPitch = () => {
    return (
        <Card className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-indigo-900 mb-1 text-sm sm:text-base">
                            Want to review all your Pitch?
                        </h3>
                        <p className="text-indigo-700 text-xs sm:text-sm">
                            See everything you've shared so far—edit, delete, or celebrate your milestones.
                        </p>
                    </div>
                    <Link to="/founder/all-pitch" className="flex-shrink-0">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full sm:w-auto text-sm">
                            <Users className="h-4 w-4 mr-2" />
                            <span className="hidden sm:inline">Browse All Your Pitches</span>
                            <span className="sm:hidden">All Pitches</span>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpandPitch;
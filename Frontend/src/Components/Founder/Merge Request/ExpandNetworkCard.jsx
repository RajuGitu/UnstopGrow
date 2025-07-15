// ExpandNetworkCard.js
import { Card, CardContent } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Users } from "lucide-react";
import { Link } from "react-router-dom";

const ExpandNetworkCard = () => {
    return (
        <Card className="rounded-lg border bg-gradient-to-r from-indigo-50 to-purple-50 border-indigo-200">
            <CardContent className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                        <h3 className="font-semibold text-indigo-900 mb-1 text-lg md:text-xl">
                            Ready to expand your network?
                        </h3>
                        <p className="text-indigo-700 text-sm md:text-base">
                            Connect with like-minded founders and explore collaboration opportunities.
                        </p>
                    </div>
                    <Link to="/founder/search" className="w-full sm:w-auto">
                        <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white w-full sm:w-auto">
                            <Users className="h-4 w-4 mr-2" />
                            <span>Browse Founders</span>
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
};

export default ExpandNetworkCard;
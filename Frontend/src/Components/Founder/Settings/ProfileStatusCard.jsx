import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Target } from "lucide-react";
import { useProfile } from "../../../context/ProfileContext";

// ProfileStatusCard component with responsive improvements
export default function ProfileStatusCard() {
    const {form} = useProfile();
    let paste = "YES"
    if(form.readytomerge){
        paste = "YES";
    } else {
        paste = "NO";
    }
    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-4 sm:p-6">
                <CardTitle className="flex items-center space-x-2 text-xl sm:text-2xl font-semibold">
                    <Target className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
                    <span>Profile Status</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 pt-0 space-y-3">
                {/* Domain */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-600 min-w-0 flex-shrink">Domain</span>
                    <Badge className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{form.domain}</Badge>
                </div>

                {/* Location */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-600 min-w-0 flex-shrink">Location</span>
                    <Badge className="text-xs sm:text-sm truncate max-w-[150px] sm:max-w-none">{form.location}</Badge>
                </div>

                {/* Merge Ready */}
                <div className="flex items-center justify-between gap-2">
                    <span className="text-sm text-gray-600 min-w-0 flex-shrink">Merge Ready</span>
                    <Badge className="bg-green-500 text-xs sm:text-sm">{paste}</Badge>
                </div>
            </CardContent>
        </Card>
    );
}
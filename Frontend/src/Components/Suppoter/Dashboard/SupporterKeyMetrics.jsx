import { Heart, MessageCircle, Users } from "lucide-react";
import SupporterMetricCard from "./SupporterMetricCard";
const SupporterKeyMetrics = () => {
    const metrics = [
        {
            title: "Total Following",
            value: `Random`,
            icon: <Users className="h-8 w-8 text-blue-500" />,
            color: "blue",
        },
        {
            title: "Total Liked",
            value: "Random",
            icon: <Heart className="h-8 w-8" />,
            color: "green",
        },
        {
            title: "Total Comments",
            value: `Random`,
            icon: <MessageCircle className="h-8 w-8" />,
            color: "purple",
        },
    ];

    return (
        <div className="max-h-screen px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {metrics.map((metric, index) => (
                    <SupporterMetricCard key={index} {...metric} />
                ))}
            </div>
        </div>
    );
};

export default SupporterKeyMetrics;
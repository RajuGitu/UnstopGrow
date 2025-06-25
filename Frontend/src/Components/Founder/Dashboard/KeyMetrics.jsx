import MetricCard from "./MetricCard";
import { Eye, MessageCircle, Star } from "lucide-react";

const KeyMetrics = () => {
  const metrics = [
    {
      title: "Total Reach",
      value: "18.4K",
      change: "+12% from last month",
      icon: <Eye className="h-8 w-8" />,
      color: "blue",
    },
    {
      title: "Total Feedback",
      value: "186",
      change: "+25% from last month",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "green",
    },
    {
      title: "Investor Interest",
      value: "12",
      change: "+3 new this week",
      icon: <Star className="h-8 w-8" />,
      color: "purple",
    },
  ];

  return (
  <div className="max-h-screen px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {metrics.map((metric, index) => (
          <MetricCard key={index} {...metric} />
        ))}
      </div>
    </div>
  );
};

export default KeyMetrics;

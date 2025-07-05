import MetricCard from "./MetricCard";
import { MessageCircle, Star, Users } from "lucide-react";
import { usePitchPost } from "../../../context/PitchPostContext";
import { useInterest } from "../../../context/InterestContext";
import { useEffect } from "react";

const KeyMetrics = () => {
  const { post } = usePitchPost();

  const { getAllInterestedFounder,intereseted } = useInterest();
  useEffect(() => {
    getAllInterestedFounder()
  }, []);
  
  const likesCount = (post.likes && typeof post.likes.length === 'number')
    ? post.likes.length
    : Object.keys(post.likes || {}).length;

  function formatLikesCount(count) {
    if (count < 1000) return count.toString();
    if (count < 1_000_000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
  }

  const totalfollowers = formatLikesCount(likesCount);
  const metrics = [
    {
      title: "Total Followers",
      value: `${totalfollowers}`,
      icon: <Users className="h-8 w-8 text-blue-500" />,
      color: "blue",
    },
    {
      title: "Total Feedback",
      value: "186",
      icon: <MessageCircle className="h-8 w-8" />,
      color: "green",
    },
    {
      title: "Investor Interest",
      value: `${intereseted.length}`,
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

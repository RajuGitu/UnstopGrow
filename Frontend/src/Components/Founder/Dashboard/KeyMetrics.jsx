import MetricCard from "./MetricCard";
import { Heart, Star, Users } from "lucide-react";
import { usePitchPost } from "../../../context/PitchPostContext";
import { useInterest } from "../../../context/InterestContext";
import { useEffect } from "react";
import { useAuth } from "../../../context/AuthContext";

const KeyMetrics = () => {
  const { founder } = useAuth();
  const { post, pitch, getAllPitches, } = usePitchPost();

  const { getAllInterestedFounder, intereseted } = useInterest();
  useEffect(() => {
    getAllInterestedFounder(),
      getAllPitches()
  }, []);

  const PostLikes = post.reduce((total, item) => {
    if (Array.isArray(item.likes)) {
      return total + item.likes.length;
    } else if (item.likes && typeof item.likes === 'object') {
      return total + Object.keys(item.likes).length;
    }
    return total;
  }, 0);

  const PitchLikes = pitch.reduce((total, item) => {
    if (Array.isArray(item.likes)) {
      return total + item.likes.length;
    } else if (item.likes && typeof item.likes === 'object') {
      return total + Object.keys(item.likes).length;
    }
    return total;
  }, 0);

  function formatLikesCount(count) {
    if (count < 1000) return count.toString();
    if (count < 1_000_000) return (count / 1000).toFixed(1).replace(/\.0$/, '') + "K";
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, '') + "M";
  }

  const totalRawLikes = PostLikes + PitchLikes;
  const totalLikes = formatLikesCount(totalRawLikes);
  const metrics = [
    {
      title: "Total Likes",
      value: `${totalLikes}`,
      icon: <Heart className="h-8 w-8 text-blue-500" />,
      color: "blue",
    },
    {
      title: "Total Followers",
      value: `${founder.followers.length}`,
      icon: <Users className="h-8 w-8" />,
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

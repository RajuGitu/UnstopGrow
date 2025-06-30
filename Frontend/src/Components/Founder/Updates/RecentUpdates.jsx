import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Eye, Heart, MessageSquare, Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";

const RecentUpdates = () => {
  const [recentUpdates, setRecentUpdates] = useState([]);

  useEffect(() => {
    const fetchRecentUpdates = async () => {
      try {
        const token = localStorage.getItem("token");
        const endpoint = "/founder/recentUpdates";

        const res = await axiosInstance.get(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        });

        console.log("Recent Updates Response:", res.data.data);
        setRecentUpdates(res.data.data);
      } catch (error) {
        console.log("Error fetching recent updates:", error);
        if (error.response?.status === 404) {
          console.log("No recent updates found");
        } else if (error.response?.status === 401) {
          console.log("Unauthorized. Please login again.");
        } else if (error.response?.status === 500) {
          console.log("Server error. Please try again later.");
        } else {
          console.log("Failed to fetch recent updates");
        }
      }
    };
    fetchRecentUpdates();
  }, []);

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-slate-600" />
            <span>Your Recent Updates</span>
          </div>
          <Badge variant="outline">{recentUpdates.length} published</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {recentUpdates.map((update) => {
            const localPath = update.media;
            const relativePath = localPath?.split("uploads")[1];
            const publicURL = relativePath
              ? `http://localhost:5000/uploads${relativePath.replace(
                  /\\/g,
                  "/"
                )}`
              : "https://via.placeholder.com/150";

            return (
              <div
                key={update._id}
                className="flex space-x-4 p-4 bg-slate-50 rounded-lg"
              >
                <img
                  src={publicURL}
                  alt={update.title}
                  className="w-24 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 mb-1">
                    {update.title}
                  </h3>
                  <p className="text-sm text-slate-600 mb-2">
                    {update.description}
                  </p>
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
                        <Heart className="h-3 w-3 mr-1" />
                        {update.likes.length}
                      </span>
                      <span className="flex items-center">
                        <MessageSquare className="h-3 w-3 mr-1" />
                        {update.comments.length}
                      </span>
                      <span>{update.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentUpdates;

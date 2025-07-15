import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import {
  BookmarkX,
  MessageSquare,
  ExternalLink,
  Calendar,
  FileText,
  Heart,
} from "lucide-react";
import { Avatar, AvatarFallback } from "../../UI/Avatar";
import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { PitchDeckModal } from "../PitchDeckModel";
import { useInvestorSavedStartups } from "../../../context/getinvestorSavedStartupsContext";

const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";

const StartupCard = ({ startup }) => {
  const { getAllSavedStartups } = useInvestorSavedStartups();
  const [selectedPitchStartup, setSelectedPitchStartup] = useState(null);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [isUnsaving, setIsUnsaving] = useState(false);
  const [isInterestLoading, setIsInterestLoading] = useState(false);
  const [interestedStartups, setInterestedStartups] = useState({});

  useEffect(() => {
    setInterestedStartups((prev) => {
      if (prev[startup.savedstartupId] === undefined) {
        return {
          ...prev,
          [startup.savedstartupId]: startup.isInterest || false,
        };
      }
      return prev;
    });
  }, [startup.savedstartupId, startup.isInterest]);

  const handleExpressInterest = async (startupId) => {
    setIsInterestLoading(true);

    try {
      const token = localStorage.getItem("token");
      const currentlyInterested = interestedStartups[startupId];

      let response;

      if (currentlyInterested) {
        response = await axiosInstance.delete(
          "/investor/investorInterestStartups",
          {
            data: { startUpId: startupId },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      } else {
        response = await axiosInstance.post(
          "/investor/investorInterestStartups",
          { startUpId: startupId },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );
      }

      if (response.data.success) {
        setInterestedStartups((prev) => ({
          ...prev,
          [startupId]: !prev[startupId],
        }));

        console.log("Interest state updated:", {
          startupId,
          from: currentlyInterested,
          to: !currentlyInterested,
        });
      } else {
        alert(response.data.error || "Failed to express/remove interest");
      }
    } catch (error) {
      console.error("API error:", error);
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert("Please log in to express interest");
      } else if (error.response?.status === 400) {
        alert("Invalid request. Please try again.");
      } else if (error.response?.status === 404) {
        alert("Startup not found or interest not previously expressed");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setIsInterestLoading(false);
    }
  };

  const handleUnsave = async (startupId) => {
    try {
      setIsUnsaving(true);
      const token = localStorage.getItem("token");

      const response = await axiosInstance.delete(
        "/investor/investorSaveStartups",
        {
          data: { startUpId: startupId },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200 || response.status === 204) {
        // Only refresh the saved startups list after successful unsave
        await getAllSavedStartups();
      }
    } catch (error) {
      console.error("Unsave error:", error);
      alert("Failed to unsave the startup. Please try again later.");
    } finally {
      setIsUnsaving(false);
    }
  };

  // REMOVED: The problematic useEffect that was causing infinite loop
  // useEffect(() => {
  //   getAllSavedStartups();
  // }, []);

  if (!startup || Object.keys(startup).length === 0) {
    return (
      <div className="p-4 bg-white rounded-lg border shadow-sm">
        <p className="text-slate-500 text-center">
          No saved startup data available
        </p>
      </div>
    );
  }

  const profile = startup.profile || {};
  const NoOfFollowers = startup.follow?.followers?.length || 0;

  const now = new Date();
  const createdDate = new Date(profile.createdAt);
  const diffTime = Math.abs(now - createdDate);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const makeUrl = (imagePath) => {
    if (!imagePath) return imgPlaceholder;
    const rel = imagePath.split("uploads")[1];
    return rel
      ? `https://unstopgrowb.onrender.com/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  const handleViewPitch = async (startup) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const response = await axiosInstance.get(
        `/investor/investorViewPitch/${startup.savedstartupId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const pitchData = response.data.data;
      if (!pitchData) {
        alert("No pitch data available for this startup.");
        return;
      }

      setSelectedPitchStartup(pitchData);
      setIsPitchModalOpen(true);
    } catch (error) {
      console.error("Fetch pitch error:", error);
      alert("Something went wrong while fetching the pitch.");
    }
  };

  const isInterested =
    interestedStartups[startup.savedstartupId] ?? startup.isInterest;

  // Inside the return JSX
return (
  <Card className="hover:shadow-lg transition-shadow">
    <CardContent className="p-6">
      <div className="flex flex-col md:flex-row items-start justify-between gap-4">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 flex-1">
          <Avatar className="h-12 w-12 flex-shrink-0">
            <AvatarFallback>
              {profile.logo ? (
                <img
                  src={makeUrl(profile.logo)}
                  alt={profile.startUpName || "Founder"}
                  className="w-full h-full object-cover rounded-full"
                  onError={(e) => {
                    e.target.src = imgPlaceholder;
                  }}
                />
              ) : (
                <div className="w-full h-full bg-slate-300 rounded-full flex items-center justify-center">
                  <span className="text-slate-600 font-medium">
                    {profile.startUpName
                      ? profile.startUpName.charAt(0).toUpperCase()
                      : "I"}
                  </span>
                </div>
              )}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="text-xl font-bold">{profile.startUpName}</h3>
              <Badge variant="outline" className="border-gray-300">
                {profile.domain}
              </Badge>
            </div>

            <p className="text-gray-700 text-sm md:text-base">{profile.bio}</p>

            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                Saved {diffDays || 4} days ago
              </span>
              <span>{NoOfFollowers} followers</span>
            </div>
          </div>
        </div>

          <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-2">
            <Button
              size="sm"
              onClick={() => handleExpressInterest(startup.savedstartupId)}
              disabled={isInterestLoading}
              className={`flex transition-colors items-center duration-200 cursor-pointer ${
                isInterested
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-red-700 hover:bg-red-800 text-white"
              } ${isInterestLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Heart
                className={`w-4 h-4 mr-2 ${isInterested ? "fill-current" : ""}`}
              />
              {isInterestLoading
                ? "Processing..."
                : isInterested
                ? "Interested"
                : "Interest"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewPitch(startup)}
              className="w-full border-gray-300 cursor-pointer"//ml-3.5
            >
              <FileText className="w-3 h-3 mr-2" />
              View Pitch
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUnsave(startup.savedstartupId)}
              disabled={isUnsaving} // Disable while loading
              className="w-full flex items-center transition-colors duration-200 cursor-pointer
             text-red-500 border-red-300 hover:bg-red-50 disabled:opacity-50"////ml-3.5
            >
              <BookmarkX className="w-4 h-4 mr-2" />
              {isUnsaving ? "Unsaving..." : "Unsave"}
            </Button>
          </div>
        </div>
      </CardContent>
      <PitchDeckModal
        isOpen={isPitchModalOpen}
        onClose={() => setIsPitchModalOpen(false)}
        startup={selectedPitchStartup}
      />
    </Card>
  );
};

export default StartupCard;
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import {
  BookmarkX,
  MessageSquare,
  ExternalLink,
  Calendar,
  FileText,
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
  const [isUnsaving, setIsUnsaving] = useState(false); // Loading state

  const handleUnsave = async (startupId) => {
    try {
      setIsUnsaving(true); // Set loading state
      const token = localStorage.getItem("token");
      
      const response = await axiosInstance.delete("/investor/investorSaveStartups", {
        data: {
          startUpId: startupId,
        },
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      // If successful, refresh the saved startups list
      if (response.status === 200 || response.status === 204) {
        await getAllSavedStartups(); // Refresh the list
        // Optional: Show success message
        // alert("Startup unsaved successfully!");
      }
    } catch (error) {
      console.error("API error:", error);
      alert("Failed to unsave the startup. Please try again later.");
    } finally {
      setIsUnsaving(false); // Reset loading state
    }
  };

  // Fetch saved startups when the component mounts (only once)
  useEffect(() => {
    getAllSavedStartups();
  }, []); // Empty dependency array - no more infinite loop

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
  const NoOfFollowers = startup.follow?.followers?.length || 0; // Fixed null safety

  var now = new Date();
  var createdDate = new Date(profile.createdAt); // Fixed date parsing
  var diffTime = Math.abs(now - createdDate);
  var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  const makeUrl = (imagePath) => {
    if (!imagePath) return imgPlaceholder;

    const rel = imagePath.split("uploads")[1];
    return rel
      ? `http://localhost:5000/uploads${rel.replace(/\\/g, "/")}`
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
        console.warn("No pitch data found for this startup.");
        alert("No pitch data available for this startup.");
        return;
      }

      console.log("Pitch Data:", pitchData);

      // Open the modal with pitch data
      setSelectedPitchStartup(pitchData);
      setIsPitchModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch pitch:", error);
      alert("Something went wrong while fetching the pitch. Please try again.");
    }
  };

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="flex space-x-4 flex-1">
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
              <div className="flex items-center space-x-3">
                <h3 className="text-xl font-bold">{profile.startUpName}</h3>
                <Badge variant="outline" className="border-gray-300">
                  {profile.domain}
                </Badge>
              </div>

              <p className="text-gray-700">{profile.bio}</p>

              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  Saved {diffDays || 4} days ago
                </span>
                <span>{NoOfFollowers} followers</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 ml-4">
            <Button size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Contact Founder
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewPitch(startup)}
              className="ml-3.5 border-gray-300 cursor-pointer"
            >
              <FileText className="w-3 h-3 mr-2" />
              View Pitch
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleUnsave(startup.savedstartupId)}
              disabled={isUnsaving} // Disable while loading
              className="ml-3.5 flex items-center transition-colors duration-200 cursor-pointer
             text-red-500 border-red-300 hover:bg-red-50 disabled:opacity-50"
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
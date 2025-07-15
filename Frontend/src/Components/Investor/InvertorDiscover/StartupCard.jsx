import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Badge } from "../../UI/Badge";
import {
  MapPin,
  Bookmark,
  Heart,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

import { PitchDeckModal } from "../../../Components/Investor/PitchDeckModel";
import { Avatar, AvatarFallback } from "../../UI/Avatar";
import axiosInstance from "../../../../utils/axiosInstance";

const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";

const StartupCard = ({ startup }) => {
  const [selectedPitchStartup, setSelectedPitchStartup] = useState(null);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);
  const [savedStartups, setSavedStartups] = useState({});
  const [interestedStartups, setInterestedStartups] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isInterestLoading, setIsInterestLoading] = useState(false);

  // Initialize saved state properly using useEffect
  useEffect(() => {
    setSavedStartups((prev) => ({
      ...prev,
      [startup.startupId]: startup.isSaved || false,
    }));
  }, [startup.startupId, startup.isSaved]);

  // Initialize interest state properly using useEffect
  useEffect(() => {
    setInterestedStartups((prev) => {
      // Only update if we don't already have a value for this startup
      // This prevents overwriting user actions with stale prop data
      if (prev[startup.startupId] === undefined) {
        return {
          ...prev,
          [startup.startupId]: startup.isInterest || false,
        };
      }
      return prev;
    });
  }, [startup.startupId, startup.isInterest]);

  const handleExpressInterest = async (startupId) => {
    setIsInterestLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const currentlyInterested = interestedStartups[startupId];
      
      let response;
      
      if (currentlyInterested) {
        // Remove interest
        response = await axiosInstance.delete('/investor/investorInterestStartups', {
          data: {
            startUpId: startupId
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      } else {
        // Express interest
        response = await axiosInstance.post('/investor/investorInterestStartups', {
          startUpId: startupId
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }

      if (response.data.success) {
        // Update local state to reflect the interest/remove interest
        setInterestedStartups((prev) => ({
          ...prev,
          [startupId]: !prev[startupId],
        }));
        
        // Debug logging
        console.log('Express/Remove Interest successful:', {
          startupId,
          previousState: currentlyInterested,
          newState: !currentlyInterested,
          response: response.data
        });
        
        // Show success message (consider using a proper toast notification)
        console.log(currentlyInterested ? 'Interest removed successfully' : 'Interest expressed successfully');
      } else {
        // Handle errors
        console.error('Error with express/remove interest:', response.data.error);
        alert(response.data.error || 'Failed to express/remove interest');
      }
    } catch (error) {
      console.error('API error:', error);
      
      // Handle different types of errors
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert('Please log in to express interest');
      } else if (error.response?.status === 400) {
        alert('Invalid request. Please try again.');
      } else if (error.response?.status === 404) {
        alert('Startup not found or interest not previously expressed');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setIsInterestLoading(false);
    }
  };

  const handleViewPitch = async (startup) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        alert("You are not logged in!");
        return;
      }

      const response = await axiosInstance.get(`/investor/investorViewPitch/${startup.startupId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

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

  const handleSaveForLater = async (startupId) => {
    setIsLoading(true);
    
    try {
      const token = localStorage.getItem('token');
      const currentlySaved = savedStartups[startupId];
      
      let response;
      
      if (currentlySaved) {
        // Unsave the startup
        response = await axiosInstance.delete('/investor/investorSaveStartups', {
          data: {
            startUpId: startupId
          },
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      } else {
        // Save the startup
        response = await axiosInstance.post('/investor/investorSaveStartups', {
          startUpId: startupId
        }, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });
      }

      if (response.data.success) {
        // Update local state to reflect the save/unsave
        setSavedStartups((prev) => ({
          ...prev,
          [startupId]: !prev[startupId],
        }));
        
        // Debug logging
        console.log('Save/Unsave successful:', {
          startupId,
          previousState: currentlySaved,
          newState: !currentlySaved,
          response: response.data
        });
        
        // Show success message (consider using a proper toast notification)
        console.log(currentlySaved ? 'Startup unsaved successfully' : 'Startup saved successfully');
      } else {
        // Handle errors
        console.error('Error with startup save/unsave:', response.data.error);
        alert(response.data.error || 'Failed to save/unsave startup');
      }
    } catch (error) {
      console.error('API error:', error);
      
      // Handle different types of errors
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else if (error.response?.status === 401) {
        alert('Please log in to save startups');
      } else if (error.response?.status === 400) {
        alert('Invalid request. Please try again.');
      } else if (error.response?.status === 404) {
        alert('Startup not found or not previously saved');
      } else {
        alert('Network error. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 0) return "??";
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  const makeUrl = (absolute) => {
    if (!absolute) return imgPlaceholder;
    const rel = absolute.split("uploads")[1];
    console.log("Relative Path:", rel);
    // Consider making this configurable via environment variables
    const baseUrl = "https://unstopgrowb.onrender.com";
    return rel
      ? `${baseUrl}/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  const isSaved = savedStartups[startup.startupId] ?? startup.isSaved;
  const isInterested = interestedStartups[startup.startupId] ?? startup.isInterest;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1 h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <Avatar className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl shadow-md flex-shrink-0">
              {startup.companyLogo && (
                <img
                  src={makeUrl(startup.companyLogo)}
                  alt={`${startup.companyName} logo`}
                  className="w-full h-full rounded-xl object-cover shadow-md"
                />
              )}
              {!startup.companyLogo && (
                <AvatarFallback className="text-xs sm:text-sm">
                  {getInitials(startup.companyName || "Unknown")}
                </AvatarFallback>
              )}
            </Avatar>
            <div className="min-w-0 flex-1">
              <h3 className="font-bold text-sm sm:text-lg truncate">{startup.companyName}</h3>
              <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                <span className="truncate">{startup.location}</span>
              </p>
              {startup.verified && (
                <Badge variant="secondary" className="mt-1 text-xs">
                  ✅ Verified
                </Badge>
              )}
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleSaveForLater(startup.startupId)}
            disabled={isLoading}
            className={`flex-shrink-0 transition-colors duration-200 ${
              isSaved 
                ? "text-red-500 hover:text-red-600 hover:bg-red-50" 
                : "text-gray-400 hover:text-gray-600 hover:bg-gray-50"
            }`}
            title={isSaved ? "Unsave startup" : "Save startup for later"}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4 flex-1 flex flex-col">
        <div className="space-y-2 flex-1">
          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3">
            {startup.tagline}
          </p>

          <div className="flex flex-wrap items-center gap-2">
            {startup.domain && (
              <Badge
                variant="outline"
                className="text-xs border-blue-300 text-blue-600"
              >
                {startup.domain}
              </Badge>
            )}
            {startup.website && (
              <a
                href={
                  startup.website.startsWith("http")
                    ? startup.website
                    : `https://${startup.website}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-blue-500 hover:text-blue-700 underline"
              >
                Visit Website
              </a>
            )}
          </div>

          {startup.achievements && (
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="text-xs text-yellow-800 font-medium">
                🏆 Achievements:
              </p>
              <p className="text-xs text-yellow-700 line-clamp-2">{startup.achievements}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center py-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-semibold flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              <span className="truncate">{startup.domain || "General"}</span>
            </p>
            <p className="text-xs text-gray-600">Domain</p>
          </div>
          <div>
            <p className="text-sm font-semibold flex items-center justify-center">
              <Users className="w-3 h-3 mr-1 text-blue-500" />
              {startup.readyToMerge ? "Yes" : "No"}
            </p>
            <p className="text-xs text-gray-600">Ready to Merge</p>
          </div>
        </div>

        {/* Button Container - Mobile: Icons only, Desktop: Text + Icons */}
        <div className="flex  gap-4 mt-auto  sm:flex sm:gap-2">
          {/* Mobile: Icon-only buttons in a row */}
          <div className="flex gap-4 sm:hidden ">
            <Button
              size="sm"
              onClick={() => handleExpressInterest(startup.startupId)}
              disabled={isInterestLoading}
              className={`w-2 h-2 p-0 rounded-full border-none transition-colors duration-200 ${
                isInterested
                  ? "text-red-500 hover:text-red-600 "
                  : "text-blue-600 hover:text-blue-700 "
              } ${isInterestLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isInterested ? "Remove Interest" : "Express Interest"}
            >
              <Heart className={`w-2 h-2 ${isInterested ? "fill-current" : ""}`} />
            </Button>

            <Button
              size="sm"
              onClick={() => handleViewPitch(startup)}
              className="w-2 h-2 p-0 rounded-full border-none text-gray-600 hover:text-gray-700 "
              title="View Pitch"
            >
              <FileText className="w-2 h-2" />
            </Button>

            <Button
              size="sm"
              onClick={() => handleSaveForLater(startup.startupId)}
              disabled={isLoading}
              className={`w-2 h-2 p-0 rounded-full border-none transition-colors duration-200 ${
                isSaved
                  ? "text-red-500 hover:text-red-600 "
                  : "text-gray-600 hover:text-gray-700 "
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              title={isSaved ? "Unsave" : "Save"}
            >
              <Bookmark className={`w-2 h-2 ${isSaved ? "fill-current" : ""}`} />
            </Button>
          </div>

          {/* Desktop: Text + Icons buttons */}
          <div className="hidden sm:flex   sm:gap-2">
            <Button
              size="sm"
              onClick={() => handleExpressInterest(startup.startupId)}
              disabled={isInterestLoading}
              className={`flex sm:flex-none transition-colors duration-200  ${
                isInterested
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              } ${isInterestLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Heart className={`w-4 h-4 mr-2 ${isInterested ? "fill-current" : ""}`} />
              {isInterestLoading ? "Loading..." : isInterested ? "Interested" : "Express Interest"}
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewPitch(startup)}
              className="flex sm:flex-none border-gray-300 hover:bg-gray-50"
            >
              <FileText className="w-4 h-4 mr-2" />
              View Pitch
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={() => handleSaveForLater(startup.startupId)}
              disabled={isLoading}
              className={`flex sm:flex-none transition-colors duration-200 ${
                isSaved
                  ? "text-red-500 border-red-300 hover:bg-red-50"
                  : "text-gray-600 border-gray-300 hover:bg-gray-50"
              } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <Bookmark className={`w-4 h-4 mr-2 ${isSaved ? "fill-current" : ""}`} />
              {isLoading ? "Loading..." : isSaved ? "Unsave" : "Save"}
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
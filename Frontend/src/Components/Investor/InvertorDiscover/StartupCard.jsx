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
    const baseUrl =  "http://localhost:5000";
    return rel
      ? `${baseUrl}/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  const isSaved = savedStartups[startup.startupId] ?? startup.isSaved;
  const isInterested = interestedStartups[startup.startupId] ?? startup.isInterest;

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-16 h-16 rounded-xl shadow-md">
              {startup.companyLogo && (
                <img
                  src={makeUrl(startup.companyLogo)}
                  alt={`${startup.companyName} logo`}
                  className="w-16 h-16 rounded-xl object-cover shadow-md"
                />
              )}
              {!startup.companyLogo && (
                <AvatarFallback>
                  {getInitials(startup.companyName || "Unknown")}
                </AvatarFallback>
              )}
            </Avatar>
            <div>
              <h3 className="font-bold text-lg">{startup.companyName}</h3>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {startup.location}
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
            className={
              isSaved ? "text-red-500" : "text-gray-400 cursor-pointer"
            }
            title={isSaved ? "Unsave startup" : "Save startup for later"}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-2">
          <p className="text-gray-700 text-sm leading-relaxed">
            {startup.tagline}
          </p>

          {startup.domain && (
            <div className="flex items-center space-x-2">
              <Badge
                variant="outline"
                className="text-xs border-blue-300 text-blue-600"
              >
                {startup.domain}
              </Badge>
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
          )}

          {startup.achievements && (
            <div className="bg-yellow-50 p-2 rounded-lg">
              <p className="text-xs text-yellow-800 font-medium">
                🏆 Achievements:
              </p>
              <p className="text-xs text-yellow-700">{startup.achievements}</p>
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center py-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-semibold flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              {startup.domain || "General"}
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

        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => handleExpressInterest(startup.startupId)}
            disabled={isInterestLoading}
            className={`flex transition-colors duration-200 cursor-pointer ${
              isInterested
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-red-700 hover:bg-red-800 text-white"
            } ${isInterestLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Heart className={`w-4 h-4 mr-3 ${isInterested ? "fill-current" : ""}`} />
            {isInterestLoading ? "Processing..." : isInterested ? "Interested" : "Interest"}
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
            onClick={() => handleSaveForLater(startup.startupId)}
            disabled={isLoading}
            className={`ml-3.5 flex items-center transition-colors duration-200 cursor-pointer ${
              isSaved
                ? "text-red-500 border-red-300 hover:bg-red-50"
                : "text-gray-600 hover:bg-gray-100"
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            {isLoading ? "Processing..." : isSaved ? "Unsave" : "Save for Later"}
          </Button>
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
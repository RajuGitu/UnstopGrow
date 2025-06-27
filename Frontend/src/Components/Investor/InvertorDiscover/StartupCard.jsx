import React, { useState } from "react";
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
import { ExpressInterestModal } from "../../../Components/Investor/ExpressInterestModal";
import { PitchDeckModal } from "../../../Components/Investor/PitchDeckModel";

const StartupCard = ({ startup }) => {
  const [selectedStartup,setSelectedStartup] = useState(null);
  const [isModalOpen,setIsModalOpen] = useState(false);
  const [selectedPitchStartup,setSelectedPitchStartup] = useState(null);
  const [isPitchModalOpen,setIsPitchModalOpen] = useState(false);
  const [savedStartups, setSavedStartups] = useState({});

  const isSaved = savedStartups[startup.id];
  const handleExpressInterest = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleViewPitch = (startup) => {
    setSelectedPitchStartup(startup);
    setIsPitchModalOpen(true);
  };

  const handleSaveForLater = (startupId) => {
    setSavedStartups((prev) => ({
      ...prev,
      [startupId]: !prev[startupId],
    }));
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-200 hover:-translate-y-1">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src={startup.logo}
              alt={startup.name}
              className="w-16 h-16 rounded-xl object-cover shadow-md"
            />
            <div>
              <h3 className="font-bold text-lg">{startup.name}</h3>
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
            onClick={() => handleSaveForLater(startup.id)}
            className={isSaved ? "text-red-500" : "text-gray-400 cursor-pointer"}
          >
            <Bookmark className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-gray-700 text-sm leading-relaxed ">
          {startup.tagline}
        </p>

        <div className="flex flex-wrap gap-2">
          {startup.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-gray-300"
            >
              #{tag}
            </Badge>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 text-center py-3 bg-gray-50 rounded-lg">
          <div>
            <p className="text-sm font-semibold flex items-center justify-center">
              <TrendingUp className="w-3 h-3 mr-1 text-green-500" />
              {startup.traction.growth}%
            </p>
            <p className="text-xs text-gray-600">Growth</p>
          </div>
          <div>
            <p className="text-sm font-semibold flex items-center justify-center">
              <Users className="w-3 h-3 mr-1 text-blue-500" />
              {startup.traction.users.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600">Users</p>
          </div>
        </div>

        <div className="flex space-x-2">
          <Button
            size="sm"
            onClick={() => handleExpressInterest(startup)}
            className="flex bg-red-700 text-white cursor-pointer"
          >
            <Heart className="w-4 h-4 mr-3" />
            Interest
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
            variant="ghost"
            onClick={() => handleSaveForLater(startup.id)}
            className={`ml-3.5 flex items-center border border-gray-300 rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              isSaved
                ? "text-red-500 border-red-300 hover:bg-red-50"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            <Bookmark className="w-4 h-4 mr-2" />
            {isSaved ? "Unsave" : "Save for Later"}
          </Button>
        </div>
      </CardContent>

      <ExpressInterestModal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              startup={selectedStartup}
            />
      
            <PitchDeckModal
              isOpen={isPitchModalOpen}
              onClose={() => setIsPitchModalOpen(false)}
              startup={selectedPitchStartup}
            />
    </Card>
  );
};

export default StartupCard;

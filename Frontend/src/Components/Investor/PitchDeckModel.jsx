import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../Components/UI/Dialog";
import { Button } from "../../Components/UI/Button";
import { Separator } from "../../Components/UI/Separator";

import {
  FileText,
  Download,
  Target,
  Lightbulb,
  TrendingUp,
  Star,
  DollarSign,
  Users,
  Play,
  Youtube,
  Video,
  Eye,
  MapPin,
  X,
} from "lucide-react";

import { Avatar, AvatarFallback } from "../../Components/UI/Avatar";


export const PitchDeckModal = ({ isOpen, onClose, startup }) => {
  if (!startup) return null;

  const getInitials = (name) => {
    const words = name.split(" ");
    if (words.length === 0) return "??";
    if (words.length === 1) return words[0].charAt(0).toUpperCase();
    return words[0].charAt(0).toUpperCase() + words[1].charAt(0).toUpperCase();
  };

  const makeUrl = (imagePath) => {
    if (!imagePath) return null;
    const parsed = JSON.parse(imagePath);
    return parsed.url;
  };

  // Updated function to handle Cloudinary PDF URLs
  const makePdfUrl = (pdfData) => {
    if (!pdfData) return null;

    try {
      // If it's already a direct URL (backward compatibility)
      // if (typeof pdfData === 'string' && pdfData.startsWith('http')) {
      //   return pdfData;
      // }

      // If it's a JSON string, parse it
      const parsedData = JSON.parse(pdfData);
      return parsedData.url || null;

      // If it's already a parsed object
      // if (typeof pdfData === 'object' && pdfData.url) {
      //   return pdfData.url;
      // }

      // Fallback for old local path format
      // if (typeof pdfData === 'string' && pdfData.includes('uploads/')) {
      //   const normalizedPath = pdfData.replace(/\\/g, "/");
      //   const uploadsIndex = normalizedPath.indexOf("uploads/");
      //   if (uploadsIndex === -1) return null;
      //   const relativePath = normalizedPath.substring(uploadsIndex);
      //   return `http://localhost:5000/${relativePath}`;
      // }
    } catch (error) {
      console.error("Error parsing PDF data:", error);
      return null;
    }
  };

  // Helper function to get PDF filename for display
  const getPdfFileName = (pdfData) => {
    if (!pdfData) return "PDF";

    try {
      // If it's a JSON string, parse it
      const parsedData = JSON.parse(pdfData);
      return parsedData.originalName || "PDF";


      // If it's already a parsed object
      // if (typeof pdfData === 'object' && pdfData.originalName) {
      //   return pdfData.originalName;
      // }

    } catch (error) {
      console.error("Error getting PDF filename:", error);
      return "PDF";
    }
  };

  // const startupName = startup.title || startup.startUpName || "StartupPitch";

  const pitchSections = [
    {
      icon: <Target className="h-4 w-4 sm:h-5 sm:w-5 text-red-600 mr-2" />,
      title: "Problem",
      content: startup.problem,
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
    },
    {
      icon: <Lightbulb className="h-4 w-4 sm:h-5 sm:w-5 text-green-600 mr-2" />,
      title: "Solution",
      content: startup.solution,
      bg: "bg-green-50",
      border: "border-green-200",
      text: "text-green-700",
    },
    {
      icon: <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600 mr-2" />,
      title: "Market Opportunity",
      content: startup.market,
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
    },
    {
      icon: <Star className="h-4 w-4 sm:h-5 sm:w-5 text-purple-600 mr-2" />,
      title: "Traction",
      content: startup.traction,
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
    },
    {
      icon: <DollarSign className="h-4 w-4 sm:h-5 sm:w-5 text-emerald-600 mr-2" />,
      title: "Funding Ask",
      content: startup.funding,
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
    },
    {
      icon: <Users className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600 mr-2" />,
      title: "Team",
      content: startup.team,
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
    },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl w-[95vw] max-h-[95vh] overflow-y-auto p-0">
        {/* Header */}
        <DialogHeader className="sticky top-0 z-10 bg-white border-b px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="flex items-center space-x-3 min-w-0 flex-1">
              <Avatar className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shadow-md flex-shrink-0">
                {startup.logo ? (
                  <img
                    src={makeUrl(startup.logo)}
                    alt={startup.startUpName}
                    className="w-full h-full rounded-lg object-cover shadow-md"
                  />
                ) : (
                  <AvatarFallback className="text-xs sm:text-sm">
                    {getInitials(startup.startUpName || "Unknown")}
                  </AvatarFallback>
                )}
              </Avatar>

              <div className="min-w-0 flex-1">
                <h2 className="text-lg sm:text-2xl font-bold truncate">
                  {startup.startUpName} Pitch Deck
                </h2>
                <p className="text-xs sm:text-sm text-gray-600 flex items-center">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{startup.location}</span>
                  {startup.domain && (
                    <>
                      <span className="mx-1 hidden sm:inline">•</span>
                      <span className="truncate hidden sm:inline">{startup.domain}</span>
                    </>
                  )}
                </p>
              </div>
            </DialogTitle>

            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="flex-shrink-0 ml-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Content */}
        <div className="px-4 sm:px-6 pb-6 space-y-6">
          {/* Title and Tagline */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-bold text-base sm:text-lg text-indigo-900 mb-1">
              {startup.title}
            </h3>
            <p className="text-sm sm:text-base text-indigo-700 italic">{startup.tagline}</p>
          </div>

          {/* Pitch Video Section */}
          {startup.youtube && (
            <div className="relative">
              <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-800/20"></div>
                <div className="text-center z-10 px-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                    <Play className="h-6 w-6 sm:h-8 sm:w-8 text-white ml-1" />
                  </div>
                  <h4 className="text-white font-semibold mb-2 text-sm sm:text-base">
                    Watch Pitch Video
                  </h4>
                  <Button
                    variant="secondary"
                    size="sm"
                    className="bg-white/90 hover:bg-white text-slate-900"
                    asChild
                  >
                    <a
                      href={startup.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Youtube className="h-4 w-4 mr-2 text-red-600" />
                      <span className="hidden sm:inline">Play on YouTube</span>
                      <span className="sm:hidden">Play Video</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {pitchSections.map((item, idx) => (
              <div
                key={idx}
                className={`p-4 rounded-lg border ${item.bg} ${item.border}`}
              >
                <div className="flex items-center mb-2">
                  {item.icon}
                  <h5 className={`font-semibold text-sm sm:text-base ${item.text}`}>
                    {item.title}
                  </h5>
                </div>
                <p className={`text-xs sm:text-sm ${item.text} leading-relaxed`}>
                  {item.content || "No information provided"}
                </p>
              </div>
            ))}
          </div>

          {/* Metrics */}
          {(startup.activeUser || startup.raised) && (
            <div className="p-4 bg-slate-50 rounded-lg">
              <h5 className="font-semibold text-slate-800 mb-3 text-sm sm:text-base">
                Current Metrics
              </h5>
              <div className="grid grid-cols-2 gap-4 text-center ">
                {startup.activeUser && (
                  <div className="p-3 bg-white rounded-lg border border-gray-300">
                    <p className="text-sm sm:text-base font-semibold text-emerald-600">
                      {startup.activeUser}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600">Active Users</p>
                  </div>
                )}
                {startup.raised && (
                  <div className="p-3 bg-white rounded-lg border border-gray-300">
                    <p className="text-sm sm:text-base font-semibold text-indigo-600">
                      {startup.raised}
                    </p>
                    <p className="text-xs sm:text-sm text-slate-600">Already Raised</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Download Section */}
          {startup.pdf && makePdfUrl(startup.pdf) && (
            <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
              <h5 className="font-semibold text-slate-700 text-sm sm:text-base">
                Download Resources
              </h5>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-white rounded border border-gray-300 gap-3">
                <div className="flex items-center space-x-3">
                  <FileText className="h-5 w-5 sm:h-6 sm:w-6 text-red-600 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-sm sm:text-base">Pitch Deck PDF</p>
                    <p className="text-xs text-gray-500">
                      {getPdfFileName(startup.pdf)}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 w-full sm:w-auto">
                  {/* <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none"
                    asChild
                  >
                    <a
                      href={makePdfUrl(startup.pdf)}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">View PDF</span>
                      <span className="sm:hidden">View</span>
                    </a>
                  </Button> */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 sm:flex-none border border-gray-300"
                    asChild
                  >
                    <a
                      href={makePdfUrl(startup.pdf)}
                      download={getPdfFileName(startup.pdf)}
                    >
                      <Download className="h-4 w-4 mr-1" />
                      <span className="hidden sm:inline">Download PDF</span>
                      <span className="sm:hidden">Download</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Additional Information */}
          {startup.domain && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-semibold text-blue-800 mb-2 text-sm sm:text-base">
                Domain & Industry
              </h5>
              <p className="text-xs sm:text-sm text-blue-700">{startup.domain}</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
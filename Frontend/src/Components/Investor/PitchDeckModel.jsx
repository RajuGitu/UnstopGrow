import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../Components/UI/Dialog";
import { Button } from "../../Components/UI/Button";
// import { Badge } from "@/components/ui/badge";
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
  MapPin
} from "lucide-react";

export const PitchDeckModal = ({ isOpen, onClose, startup }) => {
  if (!startup) return null;

  const mockPitchData = {
    title: `${startup.name} - Investment Opportunity`,
    tagline: startup.tagline,
    problem: "Traditional solutions are inefficient and costly, affecting millions of users globally.",
    solution: "Our innovative platform leverages cutting-edge technology to solve this problem at scale.",
    market: `₹${(startup.fundingGoal * 10 / 100000).toFixed(0)}Cr market opportunity with growing demand.`,
    traction: `${startup.traction.users.toLocaleString()} active users with ${startup.traction.growth}% month-over-month growth.`,
    funding: `Raising ₹${(startup.fundingGoal / 100000).toFixed(1)}L to accelerate growth and market expansion.`,
    team: "Experienced founding team with proven track record in technology and business development.",
    youtubeUrl: "https://youtube.com/watch?v=example",
    pdfFile: { name: `${startup.name}_Pitch_Deck.pdf`, size: 2500000 },
    videoFile: { name: `${startup.name}_Demo.mp4`, size: 15000000 }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            <img 
              src={startup.logo} 
              alt={startup.name}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h2 className="text-2xl font-bold">{startup.name} Pitch Deck</h2>
              <p className="text-sm text-gray-600 flex items-center">
                <MapPin className="w-3 h-3 mr-1" />
                {startup.location} • {startup.domain}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border-l-4 border-indigo-500">
            <h3 className="font-bold text-lg text-indigo-900 mb-1">{mockPitchData.title}</h3>
            <p className="text-indigo-700 italic">{mockPitchData.tagline}</p>
          </div>

          <div className="relative">
            <div className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 to-red-800/20"></div>
              <div className="text-center z-10">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
                  <Play className="h-8 w-8 text-white ml-1" />
                </div>
                <h4 className="text-white font-semibold mb-2">Watch Pitch Video</h4>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/90 hover:bg-white text-slate-900"
                >
                  <Youtube className="h-4 w-4 mr-2 text-red-600" />
                  Play on YouTube
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-red-50 rounded-lg border border-red-200">
              <div className="flex items-center mb-2">
                <Target className="h-5 w-5 text-red-600 mr-2" />
                <h5 className="font-semibold text-red-800">Problem</h5>
              </div>  
              <p className="text-sm text-red-700">{mockPitchData.problem}</p>
            </div>

            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center mb-2">
                <Lightbulb className="h-5 w-5 text-green-600 mr-2" />
                <h5 className="font-semibold text-green-800">Solution</h5>
              </div>
              <p className="text-sm text-green-700">{mockPitchData.solution}</p>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center mb-2">
                <TrendingUp className="h-5 w-5 text-blue-600 mr-2" />
                <h5 className="font-semibold text-blue-800">Market Opportunity</h5>
              </div>
              <p className="text-sm text-blue-700">{mockPitchData.market}</p>
            </div>

            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center mb-2">
                <Star className="h-5 w-5 text-purple-600 mr-2" />
                <h5 className="font-semibold text-purple-800">Traction</h5>
              </div>
              <p className="text-sm text-purple-700">{mockPitchData.traction}</p>
            </div>

            <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
              <div className="flex items-center mb-2">
                <DollarSign className="h-5 w-5 text-emerald-600 mr-2" />
                <h5 className="font-semibold text-emerald-800">Funding Ask</h5>
              </div>
              <p className="text-sm text-emerald-700">{mockPitchData.funding}</p>
            </div>

            <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
              <div className="flex items-center mb-2">
                <Users className="h-5 w-5 text-indigo-600 mr-2" />
                <h5 className="font-semibold text-indigo-800">Team</h5>
              </div>
              <p className="text-sm text-indigo-700">{mockPitchData.team}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-50 rounded-lg">
            <h5 className="font-semibold text-slate-800 mb-3">Current Metrics</h5>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-slate-900">{startup.traction.users.toLocaleString()}</p>
                <p className="text-sm text-slate-600">Active Users</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-green-600">{startup.traction.growth}%</p>
                <p className="text-sm text-slate-600">Monthly Growth</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-indigo-600">₹{(startup.currentFunding / 100000).toFixed(1)}L</p>
                <p className="text-sm text-slate-600">Already Raised</p>
              </div>
            </div>
          </div>

          <div className="space-y-3 p-4 bg-slate-50 rounded-lg">
            <h5 className="font-semibold text-slate-700">Download Resources</h5>
            
            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div className="flex items-center space-x-3">
                <FileText className="h-6 w-6 text-red-600" />
                <div>
                  <p className="font-medium text-sm">{mockPitchData.pdfFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(mockPitchData.pdfFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download PDF
              </Button>
            </div>

            <div className="flex items-center justify-between p-3 bg-white rounded border">
              <div className="flex items-center space-x-3">
                <Video className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="font-medium text-sm">{mockPitchData.videoFile.name}</p>
                  <p className="text-xs text-gray-500">
                    {(mockPitchData.videoFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                <Eye className="h-4 w-4 mr-1" />
                Watch Demo
              </Button>
            </div>
          </div>

          <Separator />

          <div className="flex space-x-3">
            <Button className="flex-1">
              Express Interest
            </Button>
            <Button variant="outline" className="flex-1">
              Schedule Meeting
            </Button>
            <Button variant="outline">
              Save for Later
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

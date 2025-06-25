import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../Components/UI/Select";
import { Checkbox } from "../../Components/UI/Checkbox";
import { Progress } from "../../Components/UI/Progress";
import {
  Bookmark,
  Heart,
  MapPin,
  Users,
  TrendingUp,
  FileText,
  Eye,
} from "lucide-react";
import { mockStartups } from "../../Components/Investor/MockInvestorData";
import { ExpressInterestModal } from "../../Components/Investor/ExpressInterestModal";
import { PitchDeckModal } from "../../Components/Investor/PitchDeckModel";

const InvestorDiscover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState("Grid");
  const [selectedStartup, setSelectedStartup] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPitchStartup, setSelectedPitchStartup] = useState(null);
  const [isPitchModalOpen, setIsPitchModalOpen] = useState(false);

  const filteredStartups = mockStartups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" || startup.domain === selectedDomain;
    const matchesVerified = !verifiedOnly || startup.verified;

    return matchesSearch && matchesDomain && matchesVerified;
  });

  const handleExpressInterest = (startup) => {
    setSelectedStartup(startup);
    setIsModalOpen(true);
  };

  const handleViewPitch = (startup) => {
    setSelectedPitchStartup(startup);
    setIsPitchModalOpen(true);
  };

  const StartupCard = ({ startup }) => {
    const fundingProgress =
      (startup.currentFunding / startup.fundingGoal) * 100;

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
              className={startup.saved ? "text-red-500" : "text-gray-400"}
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

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Funding Progress</span>
              <span className="font-medium">
                ₹{(startup.currentFunding / 100000).toFixed(1)}L / ₹
                {(startup.fundingGoal / 100000).toFixed(1)}L
              </span>
            </div>
            <Progress value={fundingProgress} className="h-2" />
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

          <div className="flex space-x-2 ">
            <Button
              size="sm"
             
              onClick={() => handleExpressInterest(startup)}
              className= "flex bg-red-700 text-white "
            >
              <Heart className="w-4 h-4 mr-3 " />
               Interest
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleViewPitch(startup)}
              className="ml-3.5 border-gray-300"
            >
              <FileText className="w-3 h-3 mr-2" />
              View Pitch
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Discover Startups
          </h1>
          <p className="text-gray-600">Find your next investment opportunity</p>
        </div>
        <div className="flex space-x-2">
          <Button
            variant={viewMode === "grid" ? "outline" : "default"}
            size="sm"
            onClick={() => setViewMode("grid")}
            className="border-gray-300"
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "list" ? "outline" : "default"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="border-gray-300"
          >
            List
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filters</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Search</label>
              <Input
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-gray-300"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-2 block ">Domain</label>
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All Domains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  <SelectItem value="AI">AI</SelectItem>
                  <SelectItem value="EdTech">EdTech</SelectItem>
                  <SelectItem value="FinTech">FinTech</SelectItem>
                  <SelectItem value="HealthTech">HealthTech</SelectItem>
                  <SelectItem value="GreenTech">GreenTech</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
              />
              <label htmlFor="verified" className="text-sm font-medium">
                Verified Only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredStartups.length} startup
            {filteredStartups.length !== 1 ? "s" : ""}
          </p>
        </div>

        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-4"
          }
        >
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </div>

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
    </div>
  );
};

export default InvestorDiscover;

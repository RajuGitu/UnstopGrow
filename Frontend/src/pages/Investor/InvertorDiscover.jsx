import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/UI/Select";
import { Checkbox } from "../../Components/UI/Checkbox";
import { Button } from "../../Components/UI/Button";
import axiosInstance from "../../../utils/axiosInstance";
import StartupCard from "../../Components/Investor/InvertorDiscover/StartupCard";

const InvestorDiscover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState("list");
  const [startups, setStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDiscoverStartups = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await axiosInstance.get("/investor/investorDiscoverStartups", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        const startupsData = Array.isArray(response.data.data) 
          ? response.data.data 
          : [response.data.data];

        const transformedStartups = startupsData.map((startup, index) => ({
          companyLogo: startup?.logo,
          domain: startup?.domain || "General",
          companyName: startup?.startUpName || startup?.name || "Unknown Company",
          location: startup?.location || "Location not specified",
          readyToMerge: startup?.readytoMerge || false,
          tagline: startup?.bio || startup?.tagline || "No description available",
          website: startup?.website || "",
          achievements: startup?.achievements || [],
          startupId: startup?.startupId || startup?._id || index,
          verified: startup?.verified || false,
          isSaved: startup?.isSaved || false,
          isInterest : startup?.isInterest || false,
        }));

        setStartups(transformedStartups);
      } else {
        setError("Failed to fetch startups");
      }
    } catch (error) {
      console.error("Error fetching Startups:", error);
      setError("Failed to load startup data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscoverStartups();
  }, []);

  const filteredStartups = startups.filter((startup) => {
    const matchesSearch = 
      startup.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain = 
      selectedDomain === "all" || startup.domain === selectedDomain;

    const matchesVerified = !verifiedOnly || startup.verified;

    return matchesSearch && matchesDomain && matchesVerified;
  });

  const uniqueDomains = [...new Set(startups.map(startup => startup.domain))];

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading startups...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">{error}</div>
            <Button onClick={fetchDiscoverStartups} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Discover Startups</h1>
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
              <label className="text-sm font-medium mb-2 block">Domain</label>
              <Select
                value={selectedDomain}
                onValueChange={setSelectedDomain}
              >
                <SelectTrigger className="border-gray-300">
                  <SelectValue placeholder="All Domains" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Domains</SelectItem>
                  {uniqueDomains.map((domain) => (
                    <SelectItem key={domain} value={domain}>
                      {domain}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2 pt-6">
              <Checkbox
                id="verified"
                checked={verifiedOnly}
                onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
              />
              <label htmlFor="verified" className="text-sm font-medium cursor-pointer">
                Verified Only
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredStartups.length} startup
            {filteredStartups.length !== 1 ? "s" : ""}
            {searchTerm && <span className="ml-1">for "{searchTerm}"</span>}
            {selectedDomain !== "all" && <span className="ml-1">in {selectedDomain}</span>}
          </p>

          {(searchTerm || selectedDomain !== "all" || verifiedOnly) && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedDomain("all");
                setVerifiedOnly(false);
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {filteredStartups.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 text-lg mb-2">No startups found</div>
            <p className="text-gray-400">
              Try adjusting your search criteria or clearing filters
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6"
                : "space-y-4"
            }
          >
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.startupId} startup={startup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorDiscover;

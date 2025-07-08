import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import StartupCard from "./StartUpCard";
import { Button } from "../../UI/Button";
import { useEffect, useState } from "react";
import { useInvestorSavedStartups } from "../../../context/getinvestorSavedStartupsContext";
import SavedStartUp from "./SavedStartUp";
import { Input } from "../../UI/Input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../UI/Select";

const StartupList = () => {
  const { savedStartups, loading, getAllSavedStartups } =
    useInvestorSavedStartups();
  // Fetch saved startups when the component mounts

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");

  useEffect(() => {
    getAllSavedStartups();
  }, []);

  const filteredStartups = savedStartups.filter((startup) => {
    const matchesSearch =
      startup.profile.startUpName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      startup.profile.bio.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.profile.domain.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesDomain =
      selectedDomain === "all" || startup.profile.domain === selectedDomain;

    return matchesSearch && matchesDomain;
  });

  const uniqueDomains = [
    ...new Set(savedStartups.map((startup) => startup.profile.domain)),
  ];

  if (loading) {
    <SavedStartUp />;
  }

  if (savedStartups.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <h3 className="text-lg font-semibold mb-2">No saved startups yet</h3>
          <p className="text-gray-600 mb-4">
            Start exploring startups and save the ones that interest you!
          </p>
          <Button>Discover Startups</Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <SavedStartUp />
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
              <Select value={selectedDomain} onValueChange={setSelectedDomain}>
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
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-gray-600">
            Showing {filteredStartups.length} startup
            {filteredStartups.length !== 1 ? "s" : ""}
            {searchTerm && <span className="ml-1">for "{searchTerm}"</span>}
            {selectedDomain !== "all" && (
              <span className="ml-1">in {selectedDomain}</span>
            )}
          </p>

          {(searchTerm || selectedDomain !== "all") && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchTerm("");
                setSelectedDomain("all");
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
          <div className="space-y-4">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup.savedstartupId} startup={startup} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupList;

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/UI/Select";
import { Checkbox } from "../../Components/UI/Checkbox";
import { mockStartups } from "../../Components/Investor/MockInvestorData";
import { Button } from "../../Components/UI/Button";

import StartupCard from "../../Components/Investor/InvertorDiscover/StartupCard";


const InvestorDiscover = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [viewMode, setViewMode] = useState("list");

  const filteredStartups = mockStartups.filter((startup) => {
    const matchesSearch =
      startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      startup.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDomain =
      selectedDomain === "all" || startup.domain === selectedDomain;
    const matchesVerified = !verifiedOnly || startup.verified;

    return matchesSearch && matchesDomain && matchesVerified;
  });

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
              <Select
                value={selectedDomain}
                onValueChange={setSelectedDomain}
                className="cursor-pointer"
              >
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
              ? "grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6"
              : "space-y-4"
          }
        >
          {filteredStartups.map((startup) => (
            <StartupCard key={startup.id} startup={startup} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default InvestorDiscover;

import React from "react";
import { useState } from "react";
import { Checkbox } from "../../UI/Checkbox";
import { Input } from "../../UI/Input";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { X } from "lucide-react";


function DomainInterest() {
  const allDomains = ["AI", "EdTech", "FinTech", "HealthTech", "GreenTech"];
  const [editMode, setEditMode] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState(["AI", "FinTech"]);
  const [customTag, setCustomTag] = useState("");

  const toggleDomain = (domain) => {
    setSelectedDomains((prev) =>
      prev.includes(domain)
        ? prev.filter((d) => d !== domain)
        : [...prev, domain]
    );
  };

  const handleSave = () => {
    setEditMode(false);
    setCustomTag("");
  };

  const handleAddCustomTag = () => {
    const trimmed = customTag.trim();
    if (trimmed && !selectedDomains.includes(trimmed)) {
      setSelectedDomains((prev) => [...prev, trimmed]);
    }
    setCustomTag("");
  };
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Domains of Interest */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Your Domains of Interest</span>
            </CardTitle>
          </CardHeader>

          <CardContent className=" border-gray-300 ">
            {editMode ? (
              <>
                {/* Selected Tags with Remove */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedDomains.map((domain) => (
                    <Badge
                      key={domain}
                      variant="secondary"
                      className="text-sm bg-gray-100 text-gray-800 flex items-center space-x-1"
                    >
                      <span>#{domain}</span>
                      <button
                        onClick={() =>
                          setSelectedDomains((prev) =>
                            prev.filter((d) => d !== domain)
                          )
                        }
                        className="ml-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>

                {/* Checkboxes */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {allDomains.map((domain) => (
                    <label key={domain} className="flex items-center space-x-2">
                      <Checkbox
                        checked={selectedDomains.includes(domain)}
                        onCheckedChange={() => toggleDomain(domain)}
                      />
                      <span className="text-sm">{domain}</span>
                    </label>
                  ))}
                </div>

                {/* Custom Tag Input */}
                <div className="flex items-center gap-2 mb-4">
                  <Input
                    type="text"
                    placeholder="Add custom domain..."
                    value={customTag}
                    onChange={(e) => setCustomTag(e.target.value)}
                    className="w-full max-w-xs text-sm"
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={handleAddCustomTag}
                    className="border-gray-300"
                  >
                    Add
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedDomains.map((domain) => (
                  <Badge
                    key={domain}
                    variant="secondary"
                    className="text-sm bg-gray-100 text-gray-800"
                  >
                    #{domain}
                  </Badge>
                ))}
              </div>
            )}

            <Button
              variant="outline"
              size="sm"
              className="border-gray-300"
              onClick={() => (editMode ? handleSave() : setEditMode(true))}
            >
              {editMode ? "Save Interests" : "Edit Interests"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default DomainInterest;

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Badge } from "../../UI/Badge";
import { X, Plus, Target } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";

const InvestorDomainInterest = () => {
  const [interests, setInterests] = useState([]);
  const [newInterest, setNewInterest] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔄 Get Interests from backend
  const fetchInterests = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/investor/investorDomainInterest", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success && res.data.data?.interests) {
        setInterests(res.data.data.interests);
      }
    } catch (error) {
      console.error("Fetch failed:", error);
      toast.error("Failed to fetch domain interests");
    }
  };

  // 📦 PUT updated interests to backend
  const updateInterests = async (updatedInterests) => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.put(
        "/investor/investorDomainInterest",
        { interests: updatedInterests },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Domain interests updated!");
    } catch (error) {
      console.error("Update failed:", error);
      toast.error("Failed to update domain interests");
    }
  };

  // ✅ Initial fetch on mount
  useEffect(() => {
    fetchInterests().finally(() => setLoading(false));
  }, []);

  // 🟢 Add Interest (Update + Re-fetch)
  const addInterest = async () => {
    const trimmed = newInterest.trim();
    if (!trimmed || interests.includes(trimmed)) return;

    const updated = [...interests, trimmed];

    try {
      await updateInterests(updated);  // PUT
      await fetchInterests();          // GET
      setNewInterest("");              // Clear input
    } catch (err) {
      console.error(err);
    }
  };

  // 🔴 Remove Interest
  const removeInterest = async (interest) => {
    const updated = interests.filter((i) => i !== interest);

    try {
      await updateInterests(updated); // PUT
      await fetchInterests();         // GET
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <Card className="w-full max-w-4xl mx-auto">
        <CardContent className="p-4 sm:p-6 text-center text-gray-500">
          Loading interests...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="p-4 sm:p-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Target className="w-5 h-5" />
          <span>Domains of Interest</span>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
        {/* 🏷️ Interest Tags */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Current Interests ({interests.length})
          </h3>
          
          {interests.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {interests.map((interest) => (
                <Badge
                  key={interest}
                  variant="secondary"
                  className="flex items-center space-x-2 px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <span className="break-all">{interest}</span>
                  <button
                    onClick={() => removeInterest(interest)}
                    className="ml-1 hover:text-red-500 transition-colors flex-shrink-0"
                    aria-label={`Remove ${interest}`}
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              <Target className="w-8 h-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No domain interests added yet.</p>
              <p className="text-xs">Add your first domain below to get started.</p>
            </div>
          )}
        </div>

        {/* ➕ Add New Domain */}
        <div className="space-y-3">
          <h3 className="text-sm font-medium text-gray-700">
            Add New Domain
          </h3>
          
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <div className="flex-1">
              <Input
                placeholder="e.g., FinTech, Healthcare, AI/ML"
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addInterest()}
                className="border-gray-300 w-full"
              />
            </div>
            <Button
              onClick={addInterest}
              className="bg-gray-900 text-white hover:bg-gray-800 transition-colors w-full sm:w-auto flex items-center justify-center gap-2"
              disabled={!newInterest.trim() || interests.includes(newInterest.trim())}
            >
              <Plus className="w-4 h-4" />
              <span className="hidden sm:inline">Add Domain</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </div>
          
          {/* Helper text */}
          <div className="text-xs text-gray-500 space-y-1">
            <p>• Add domains you're interested in investing in</p>
            <p>• Press Enter or click Add to save</p>
            <p>• Click the × to remove any domain</p>
          </div>
        </div>

        {/* Popular Suggestions (Optional Enhancement) */}
        <div className="space-y-3 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700">
            Popular Domains
          </h3>
          <div className="flex flex-wrap gap-2">
            {[
              "FinTech", "HealthTech", "AI/ML", "SaaS", "E-commerce", 
              "EdTech", "CleanTech", "Blockchain", "IoT", "Cybersecurity"
            ].filter(domain => !interests.includes(domain)).slice(0, 6).map((domain) => (
              <button
                key={domain}
                onClick={() => setNewInterest(domain)}
                className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-200"
              >
                {domain}
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorDomainInterest;
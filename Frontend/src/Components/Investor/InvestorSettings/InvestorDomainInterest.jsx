import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Badge } from "../../UI/Badge";
import { X } from "lucide-react";
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
      <Card>
        <CardContent className="p-6 text-gray-500">Loading interests...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Domains of Interest</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* 🏷️ Interest Tags */}
        <div className="flex flex-wrap gap-2">
          {interests.map((interest) => (
            <Badge
              key={interest}
              variant="secondary"
              className="flex items-center space-x-2"
            >
              <span>{interest}</span>
              <button
                onClick={() => removeInterest(interest)}
                className="ml-1 hover:text-red-500"
              >
                <X className="w-3 h-3" />
              </button>
            </Badge>
          ))}
        </div>

        {/* ➕ Add New Domain */}
        <div className="flex space-x-2">
          <Input
            placeholder="Add new domain (e.g., FinTech)"
            value={newInterest}
            onChange={(e) => setNewInterest(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addInterest()}
            className="border-gray-300"
          />
          <Button
            onClick={addInterest}
            className="bg-gray-900 text-white"
          >
            Add
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorDomainInterest;
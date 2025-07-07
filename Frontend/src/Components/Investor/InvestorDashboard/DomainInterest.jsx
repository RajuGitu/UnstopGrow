import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Badge } from "../../UI/Badge";
import { X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";


function DomainInterest() {
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    fetchInterests().finally(() => setLoading(false));
  }, []);

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
        <CardTitle>Your's Domains of Interest</CardTitle>
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
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default DomainInterest;

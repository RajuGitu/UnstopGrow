import React, { useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { BookOpen } from "lucide-react";
import { MessageSquare } from "lucide-react";
import { Target } from "lucide-react";
import { useInvestorInterestedStartups } from "../../../context/getinvertorInterestedContexr";
import { useInvestorSavedStartups } from "../../../context/getinvestorSavedStartupsContext";
import { useInvestorDiscoverStartups } from "../../../context/getinvestorDiscoverStartups";

function StatsCards() {
  const { interestedStartups, getAllInterestedStartups } =
    useInvestorInterestedStartups();
  const { savedStartups, getAllSavedStartups } = useInvestorSavedStartups();

  useEffect(() => {
    getAllSavedStartups();
  }, []);

  useEffect(() => {
    getAllInterestedStartups();
  }, []);

    const { startups,  getAllDiscoverStartups } = useInvestorDiscoverStartups();
  
    useEffect(() => {
      getAllDiscoverStartups();
    }, []);

  

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Saved Startups
            </CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedStartups.length}</div>
            {/* <p className="text-xs text-muted-foreground text-gray-500">
              +2 from last week
            </p> */}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Startups
            </CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{startups.length}</div>
            {/* <p className="text-xs text-muted-foreground text-gray-500">
              Awaiting response
            </p> */}
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Interests
            </CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{interestedStartups.length}</div>
            {/* <p className="text-xs text-muted-foreground text-gray-500">
              +2 from last week
            </p> */}
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default StatsCards;

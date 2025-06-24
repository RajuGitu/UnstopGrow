import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { TrendingUp, BookOpen, MessageSquare, Target } from "lucide-react";
import { mockStartups, mockContactRequests } from "../../Components/Investor/MockInvestorData";

const InvestorDashboard = () => {
  const savedStartups = mockStartups.filter(startup => startup.saved);
  const pendingRequests = mockContactRequests.filter(req => req.status === "pending");

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-8">
        <h1 className="text-3xl font-bold mb-2">Welcome back, John! 👋</h1>
        <p className="text-indigo-100">Discover promising startups and grow your investment portfolio.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Saved Startups</CardTitle>
            <BookOpen className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{savedStartups.length}</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <MessageSquare className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests.length}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Investments</CardTitle>
            <Target className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">₹75,000 total invested</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Portfolio Growth</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+23%</div>
            <p className="text-xs text-muted-foreground">Since last quarter</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domains of Interest */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <span>Your Domains of Interest</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-4">
              {["AI", "EdTech", "FinTech", "HealthTech", "GreenTech"].map((domain) => (
                <Badge key={domain} variant="secondary" className="text-sm">
                  #{domain}
                </Badge>
              ))}
            </div>
            <Button variant="outline" size="sm">Edit Interests</Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm">Saved EcoTech Solutions</span>
                <span className="text-xs text-gray-500">2 hours ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span className="text-sm">Expressed interest in HealthHub AI</span>
                <span className="text-xs text-gray-500">1 day ago</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span className="text-sm">Downloaded EdFuture pitch deck</span>
                <span className="text-xs text-gray-500">2 days ago</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trending Startups */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>🔥 Trending Startups This Week</span>
            <Button variant="outline" size="sm">View All</Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockStartups.slice(0, 3).map((startup) => (
              <div key={startup.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3 mb-3">
                  <img 
                    src={startup.logo} 
                    alt={startup.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-semibold">{startup.name}</h3>
                    <p className="text-sm text-gray-600">{startup.domain}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700 mb-3">{startup.tagline}</p>
                <div className="flex justify-between items-center">
                  <Badge variant="outline">{startup.stage}</Badge>
                  <Button size="sm" variant="outline">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorDashboard;
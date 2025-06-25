
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Badge } from "../../Components/UI/Badge";
import { Button } from "../../Components/UI/Button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../Components/UI/Select";
import { BookmarkX, MessageSquare, ExternalLink, Calendar } from "lucide-react";
import { mockStartups } from "../../Components/Investor/MockInvestorData";

const InvestorSaved = () => {
  const savedStartups = mockStartups.filter(startup => startup.saved);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Saved Startups</h1>
          <p className="text-gray-600">Your handpicked collection of promising startups</p>
        </div>
        <Select defaultValue="recent">
          <SelectTrigger className="w-40 border-gray-300">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">Most Recent</SelectItem>
            <SelectItem value="domain">By Domain</SelectItem>
            <SelectItem value="stage">By Stage</SelectItem>
            <SelectItem value="name">By Name</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {savedStartups.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <h3 className="text-lg font-semibold mb-2">No saved startups yet</h3>
            <p className="text-gray-600 mb-4">Start exploring startups and save the ones that interest you!</p>
            <Button>Discover Startups</Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {savedStartups.map((startup) => (
            <Card key={startup.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex space-x-4 flex-1">
                    <img 
                      src={startup.logo} 
                      alt={startup.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-3">
                        <h3 className="text-xl font-bold">{startup.name}</h3>
                        <Badge variant="outline" className="border-gray-300">{startup.domain}</Badge>
                        {/* <Badge variant="secondary">{startup.stage}</Badge> */}
                        {startup.verified && (
                          <Badge variant="secondary">✅ Verified</Badge>
                        )}
                      </div>
                      
                      <p className="text-gray-700">{startup.tagline}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          Saved 4 days ago
                        </span>
                        <span>Founded: {startup.founded}</span>
                        <span>{startup.employees} employees</span>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs border-gray-300">
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col space-y-2 ml-4">
                    <Button size="sm">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Founder
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-300">
                      <ExternalLink className="w-4 h-4 mr-2 " />
                      View Profile
                    </Button>
                    <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700">
                      <BookmarkX className="w-4 h-4 mr-2" />
                      Unsave
                    </Button>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-lg font-semibold text-green-600">
                        ₹{(startup.currentFunding / 100000).toFixed(1)}L
                      </p>
                      <p className="text-xs text-gray-600">Raised</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-blue-600">
                        {startup.traction.users.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-600">Users</p>
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-purple-600">
                        {startup.traction.growth}%
                      </p>
                      <p className="text-xs text-gray-600">Growth</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default InvestorSaved;
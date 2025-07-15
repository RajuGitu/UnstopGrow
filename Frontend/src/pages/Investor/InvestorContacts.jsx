import { useEffect } from "react";
import ContactCard from "../../Components/Investor/InvestorContacts/ContactCard";
import { useInvestorInterestedStartups } from "../../context/getinvertorInterestedContexr";
import { Card, CardContent } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { Loader2, AlertCircle, Users, MessageSquare } from "lucide-react";

const InvestorContacts = () => {
  const { interestedStartups, loading, error, getAllInterestedStartups } =
    useInvestorInterestedStartups();

  useEffect(() => {
    getAllInterestedStartups();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-sm">
            <CardContent className="py-16 px-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                <div className="text-center">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Loading startups...
                  </h3>
                  <p className="text-sm text-gray-600">
                    Please wait while we fetch your interested startups
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Card className="shadow-sm border-red-200">
            <CardContent className="py-16 px-6">
              <div className="flex flex-col items-center justify-center space-y-4">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-center max-w-md">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Something went wrong
                  </h3>
                  <p className="text-sm text-red-600 mb-6 leading-relaxed">
                    {error}
                  </p>
                  <Button
                    onClick={getAllInterestedStartups}
                    className="w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white"
                  >
                    Try Again
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="text-center sm:text-left">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                  Contact Interested Startups
                </h1>
              </div>
            </div>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto sm:mx-0 leading-relaxed">
              Track your connection attempts with startup founders and manage your outreach effectively
            </p>
          </div>
        </div>

        {/* Content Section */}
        {interestedStartups.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="py-16 px-6">
              <div className="text-center max-w-md mx-auto">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-3">
                  No interested startups yet
                </h3>
                <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                  Start expressing interest in startups to build your network and connect with founders
                </p>
                <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
                  Explore Startups
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Your Interested Startups
                </h2>
                <p className="text-sm text-gray-600">
                  {interestedStartups.length} startup{interestedStartups.length !== 1 ? 's' : ''} to connect with
                </p>
              </div>
              
              
            </div>

            {/* Contact Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              {interestedStartups.map((startup) => (
                <ContactCard
                  key={startup.id || startup.savedstartupId}
                  startup={startup}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvestorContacts;
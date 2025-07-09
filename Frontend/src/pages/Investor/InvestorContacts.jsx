import { useEffect } from "react";
import ContactCard from "../../Components/Investor/InvestorContacts/ContactCard";
import { useInvestorInterestedStartups } from "../../context/getinvertorInterestedContexr";

const InvestorContacts = () => {
  const { interestedStartups, loading, error, getAllInterestedStartups } =
    useInvestorInterestedStartups();

  useEffect(() => {
    getAllInterestedStartups();
  }, []);

  if (loading) {
    return (
      <div className="p-6 space-y-6 ">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading startups...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="text-lg text-red-600 mb-2">{error}</div>
            <Button onClick={getAllInterestedStartups} variant="outline">
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 max-h-screen">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Contact Interested Startups
        </h1>
        <p className="text-gray-600">
          Track your connection attempts with startup founders
        </p>
      </div>
      <div className="space-y-4">
        {interestedStartups.map((startup) => (
          <ContactCard key={startup.startupId} startup={startup} />
        ))}
      </div>
    </div>
  );
};

export default InvestorContacts;

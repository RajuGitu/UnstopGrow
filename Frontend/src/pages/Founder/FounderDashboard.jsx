import HeaderSection from "../../Components/Founder/Dashboard/HeaderSection"
import KeyMetrics from "../../Components/Founder/Dashboard/KeyMetrics"
import ChartsSection from "../../Components/Founder/Dashboard/ChartsSection"
import InvestorSection from "../../Components/Founder/Dashboard/InvestorSection"
import UpdatesSection from "../../Components/Founder/Dashboard/UpdatesSection"
import { useNavigate } from "react-router-dom"

const FounderDashboard = () => {
  const navigate = useNavigate();
  const authUser = localStorage.getItem("authUser");
  if (!authUser) {
    alert("Please Login First");
    navigate("/login");
    return;
  }

  return (
    <div className="flex-1 overflow-auto">
      {/* Main Content Container */}
      <div className="min-h-screen bg-gray-50">
        {/* Top Section - Header, Metrics, Charts */}
        <div className="w-full px-3 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="space-y-4 sm:space-y-6 lg:space-y-8 p-3 sm:p-4 lg:p-6 bg-white rounded-lg shadow-sm">
            <HeaderSection />
            <KeyMetrics />
            <ChartsSection />
          </div>
        </div>

        {/* Bottom Section - Investor and Updates */}
        <div className="w-full px-3 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
            <div className="w-full">
              <InvestorSection />
            </div>
            <div className="w-full">
              <UpdatesSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FounderDashboard;
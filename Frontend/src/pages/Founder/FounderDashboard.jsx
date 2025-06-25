import HeaderSection from "../../Components/Founder/Dashboard/HeaderSection"
import KeyMetrics from "../../Components/Founder/Dashboard/KeyMetrics"
import ChartsSection from "../../Components/Founder/Dashboard/ChartsSection"
import InvestorSection from "../../Components/Founder/Dashboard/InvestorSection"
import UpdatesSection from "../../Components/Founder/Dashboard/UpdatesSection"
const FounderDashboard = () => {
  return (
    <div className="flex-1 p-6 overflow-auto">
      <div className="space-y-8 p-5 max-h-screen bg-white">
        <HeaderSection />
        <KeyMetrics />
        <ChartsSection />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 py-8">
        <InvestorSection />
        <UpdatesSection />
      </div>
    </div>
  );
};

export default FounderDashboard;

import InvestorProfile from "../../Components/Investor/Settings/InvestorProfile";
import InvestorInvestment from "../../Components/Investor/Settings/InvestorInvestment";
import InvestorNotification from "../../Components/Investor/Settings/InvestorNotification";
import InvestorSecurity from "../../Components/Investor/Settings/InvestorSecurity";

const InvestorSettings = () => {


  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>
      <InvestorProfile />
      <InvestorInvestment />
      <InvestorNotification />
      <InvestorSecurity />
    </div>
  );
};

export default InvestorSettings;

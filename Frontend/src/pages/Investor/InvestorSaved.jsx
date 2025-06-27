import SavedStartUp from "../../Components/Investor/InvestorStartup/SavedStartUp";
import StartupList from "../../Components/Investor/InvestorStartup/StartUpList";

const InvestorSaved = () => {

  return (
    <div className="p-6 space-y-6">
      <SavedStartUp />
      <StartupList />
    </div>
  );
};

export default InvestorSaved;
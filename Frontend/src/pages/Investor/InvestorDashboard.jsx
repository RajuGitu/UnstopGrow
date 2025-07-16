import WelcomeHeader from "../../Components/Investor/InvestorDashboard/WelcomeHeader";
import StatsCards from "../../Components/Investor/InvestorDashboard/StatsCards";
import DomainInterest from "../../Components/Investor/InvestorDashboard/DomainInterest";
import TrendingStartups from "../../Components/Investor/InvestorDashboard/TrendingStartups";
// import { useNavigate } from "react-router-dom";

const InvestorDashboard = () => {
  // const navigate = useNavigate();
  // const authUser = localStorage.getItem("authUser");
  // if (!authUser) {
  //   alert("Please Login First");
  //   navigate("/login");
  //   return;
  // }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Header */}
      <WelcomeHeader />

      {/* Stats Cards */}
      <StatsCards />

      {/* Main Content Grid */}
      <DomainInterest />
      {/* Trending Startups */}
      <TrendingStartups />

    </div>
  );
};

export default InvestorDashboard;

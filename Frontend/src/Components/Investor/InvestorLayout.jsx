import { Outlet } from "react-router-dom";
import { InvestorSidebar } from "./InvestorSidebar";
import { InvestorNavbar } from "./InvestorNavbar";

const InvestorLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <InvestorSidebar />
      <div className="flex-1 flex flex-col">
        <InvestorNavbar />
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InvestorLayout;
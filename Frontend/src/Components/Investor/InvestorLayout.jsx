import { Outlet } from "react-router-dom";
import { InvestorSidebar } from "./InvestorSidebar";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

const InvestorLayout = () => {
  const { investor, loading, initialized, getInvestorName } = useAuth();
  useEffect(() => {
    getInvestorName()
  },[]);

  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (initialized && !investor) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <InvestorSidebar />
      {/* Main content area with proper spacing */}
      <div className="lg:ml-64 pt-16 lg:pt-0 min-h-screen">
        <main className="h-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default InvestorLayout;
import { Outlet } from "react-router-dom";
import { InvestorSidebar } from "./InvestorSidebar";
import { InvestorNavbar } from "./InvestorNavbar";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

const InvestorLayout = () => {
  const { investor, loading, initialized } = useAuth();

  // Show loading spinner while checking authentication
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
        <p className="ml-4 text-lg">Checking authentication...</p>
      </div>
    );
  }

  // Only redirect after initialization is complete and investor is null
  if (initialized && !investor) {
    return <Navigate to="/login" replace />;
  }
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
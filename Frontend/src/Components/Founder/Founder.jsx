import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useAuth } from "../../context/AuthContext";
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';

const Founder = () => {
  const { founder, loading, initialized, getFounderName } = useAuth();

  useEffect(() => {
    getFounderName();
  }, []);
  // Show loading spinner while checking authentication
  if (!initialized || loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
        <p className="ml-4 text-lg">Checking authentication...</p>
      </div>
    );
  }

  // Only redirect after initialization is complete and founder is null
  if (initialized && !founder) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <div className="w-1/5 bg-gray-800 text-white">
        <Sidebar />
      </div>
      <div className="w-4/5 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Founder;

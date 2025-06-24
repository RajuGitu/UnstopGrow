import { Outlet } from 'react-router-dom';// Adjust path as needed
import Sidebar from '../../Components/Investor/Sidebar';

const Investor = () => {
  return (
    <div className="flex min-h-screen">
      {/* Left Side - Sidebar (20%) */}
      <div className="w-1/5 bg-gray-800 text-white">
        <Sidebar />
      </div>

      {/* Right Side - Dynamic Content (80%) */}
      <div className="w-4/5 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Investor;

import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Founder = () => {
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

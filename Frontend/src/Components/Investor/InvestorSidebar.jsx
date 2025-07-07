import { NavLink, useNavigate } from "react-router-dom";
import { Home, Search, Mail, Settings, Bookmark, LogOut } from "lucide-react";
import { cn } from "../../libs/utils";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";

const navigation = [
  { name: "Dashboard", href: "/investor/dashboard", icon: Home },
  { name: "Discover Startups", href: "/investor/discover", icon: Search },
  { name: "Saved Startups", href: "/investor/saved", icon: Bookmark },
  { name: "Contact Interest", href: "/investor/contacts", icon: Mail },
  { name: "Settings", href: "/investor/settings", icon: Settings },
];

export const InvestorSidebar = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    try {
      await axiosInstance.post("/investor/logout");
      localStorage.removeItem("authUser");
      localStorage.removeItem('token');
      navigate('/login');
    } catch (err) {
      console.error("Logout failed (client will still clear token):", err);
      localStorage.removeItem("authUser");
      localStorage.removeItem("token");
      navigate("/login");
    }
  };
  const { investor } = useAuth();
  return (
    <div className="w-64 bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-lg">U</span>
          </div>
          <div>
            <h1 className="text-xl font-bold">UnstopGrow</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                isActive
                  ? "bg-indigo-600 text-white shadow-lg"
                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
              )
            }
          >
            <item.icon className="h-5 w-5" />
            <span className="font-medium">{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-slate-700">
        <div className="flex items-center justify-start space-x-3">
          <div>
            <p className="font-medium">{investor}</p>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-600 hover:bg-red-50 hover:text-red-700"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
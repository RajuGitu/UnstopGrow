import { NavLink, useNavigate } from "react-router-dom";
import { Home, Search, Mail, Settings, Bookmark, LogOut, Rocket, Menu, X } from "lucide-react";
import { cn } from "../../libs/utils";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";
import { useState, useEffect } from "react";

const navigation = [
  { name: "Dashboard", href: "/investor/dashboard", icon: Home },
  { name: "Discover Startups", href: "/investor/discover", icon: Search },
  { name: "Saved Startups", href: "/investor/saved", icon: Bookmark },
  { name: "Contact Interest", href: "/investor/contacts", icon: Mail },
  { name: "Settings", href: "/investor/settings", icon: Settings },
];

export const InvestorSidebar = () => {
  const navigate = useNavigate();
  const { investor } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && window.innerWidth < 1024) {
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        if (mobileMenu && !mobileMenu.contains(event.target) && !mobileMenuButton.contains(event.target)) {
          setIsMobileMenuOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen && window.innerWidth < 1024) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-slate-900 text-white shadow-lg">
        <div className="flex items-center justify-between p-4">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="h-5 w-5 text-white" />
            </div>
            <h1 className="text-lg font-bold">UnstopGrow</h1>
          </div>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-slate-800 transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-white" />
            ) : (
              <Menu className="h-6 w-6 text-white" />
            )}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Mobile Menu Content */}
            <div id="mobile-menu" className="absolute top-full left-0 right-0 bg-slate-900 border-t border-slate-700 z-50 shadow-xl">
              <nav className="p-4 space-y-2 max-h-[calc(100vh-80px)] overflow-y-auto">
                {navigation.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      cn(
                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                        isActive
                          ? "bg-indigo-600 text-white shadow-lg"
                          : "text-slate-300 hover:bg-slate-800 hover:text-white"
                      )
                    }
                  >
                    <item.icon className="h-5 w-5 flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                ))}
                
                {/* Mobile User Profile */}
                <div className="pt-4 mt-4 border-t border-slate-700">
                  <div className="px-4 py-2">
                    <p className="font-medium text-sm text-slate-300 mb-3">{investor}</p>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-400 hover:bg-red-900/20 hover:text-red-300"
                    >
                      <LogOut className="h-4 w-4 flex-shrink-0" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </nav>
            </div>
          </>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex w-64 bg-slate-900 text-white flex-col h-screen fixed left-0 top-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-700 flex-shrink-0">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <Rocket className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold">UnstopGrow</h1>
            </div>
          </div>
        </div>

        {/* Navigation - Scrollable */}
        <nav className="flex-1 min-h-0 p-4 space-y-2 overflow-y-auto">
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

        {/* User Profile - Fixed at bottom */}
        <div className="p-4 border-t border-slate-700 flex-shrink-0">
          <div className="flex items-center justify-start space-x-3">
            <div className="w-full">
              <p className="font-medium text-sm mb-2 truncate">{investor}</p>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-400 hover:bg-red-900/20 hover:text-red-300"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
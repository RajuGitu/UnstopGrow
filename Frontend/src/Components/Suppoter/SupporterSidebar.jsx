// SupporterSidebar.jsx
import { NavLink, useNavigate } from "react-router-dom";
import { Home, LogOut, FileText, Users, Heart, Image, Settings, Rocket, Menu, X } from "lucide-react";
import { cn } from "../../libs/utils";
import { useAuth } from "../../context/AuthContext";
import axiosInstance from "../../../utils/axiosInstance";
import { useState } from "react";

const navigation = [
    { name: "Dashboard", href: "/supporter/dashboard", icon: Home },
    { name: "Explore Pitch", href: "/supporter/explore-pitch", icon: FileText },
    { name: "Explore Post", href: "/supporter/explore-post", icon: Image },
    { name: "Followings", href: "/supporter/followings", icon: Users },
    { name: "Liked Posts", href: "/supporter/liked-content", icon: Heart },
    { name: "Profile", href: '/supporter/profile', icon: Settings },
];

export const SupporterSidebar = () => {
    const navigate = useNavigate();
    const { supporter } = useAuth();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            await axiosInstance.post("/supporter/logout");
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

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const closeMobileMenu = () => {
        setIsMobileMenuOpen(false);
    };

    return (
        <>
            {/* Mobile Header */}
            <div className="lg:hidden bg-slate-800 text-white p-4 flex items-center justify-between border-b border-slate-700">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Rocket className="h-4 w-4 text-white" />
                    </div>
                    <h1 className="text-lg font-bold">UnstopGrow</h1>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileMenu} />
            )}

            {/* Mobile Sidebar */}
            <div className={cn(
                "lg:hidden fixed top-0 left-0 z-50 w-64 h-full bg-slate-800 text-white transform transition-transform duration-300 ease-in-out",
                isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                <div className="flex flex-col h-full">
                    {/* Mobile Logo */}
                    <div className="p-6 border-b border-slate-700">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                                    <Rocket className="h-6 w-6 text-white" />
                                </div>
                                <h1 className="text-xl font-bold">UnstopGrow</h1>
                            </div>
                            <button
                                onClick={closeMobileMenu}
                                className="p-2 rounded-lg hover:bg-slate-700 transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <nav className="flex-1 p-4 space-y-2">
                        {navigation.map((item) => (
                            <NavLink
                                key={item.name}
                                to={item.href}
                                onClick={closeMobileMenu}
                                className={({ isActive }) =>
                                    cn(
                                        "flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200",
                                        isActive
                                            ? "bg-indigo-600 text-white shadow-lg"
                                            : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                    )
                                }
                            >
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.name}</span>
                            </NavLink>
                        ))}
                    </nav>

                    {/* Mobile User Profile */}
                    <div className="p-4 border-t border-slate-700">
                        <div className="flex items-center justify-start space-x-3">
                            <div className="w-full">
                                <p className="font-medium mb-2">{supporter.username}</p>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-400 hover:bg-red-900/20 hover:text-red-300"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:flex lg:w-64 bg-slate-800 text-white flex-col">
                {/* Desktop Logo */}
                <div className="p-6 border-b border-slate-700">
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <Rocket className="h-6 w-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold">UnstopGrow</h1>
                        </div>
                    </div>
                </div>

                {/* Desktop Navigation */}
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
                                        : "text-slate-300 hover:bg-slate-700 hover:text-white"
                                )
                            }
                        >
                            <item.icon className="h-5 w-5" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Desktop User Profile */}
                <div className="p-4 border-t border-slate-700">
                    <div className="flex items-center justify-start space-x-3">
                        <div>
                            <p className="font-medium">{supporter.username}</p>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-400 hover:bg-red-900/20 hover:text-red-300"
                            >
                                <LogOut className="h-5 w-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
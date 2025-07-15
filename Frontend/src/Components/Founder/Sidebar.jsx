import {
    Home,
    PenTool,
    Presentation,
    GitMerge,
    Star,
    Settings,
    Rocket,
    LogOut,
    Menu,
    X
} from 'lucide-react';

import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axiosInstance from "../../../utils/axiosInstance"

const Sidebar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/founder/dashboard' },
        { icon: PenTool, label: 'Post Update', href: '/founder/updates' },
        { icon: Presentation, label: 'Pitch Deck', href: '/founder/pitch' },
        { icon: GitMerge, label: 'Merge Requests', href: '/founder/merge' },
        { icon: Star, label: 'Investor Interest', href: '/founder/interests' },
        { icon: Settings, label: 'Settings', href: '/founder/settings' },
    ];

    const navigate = useNavigate();
    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            return;
        }
        try {
            await axiosInstance.post("/founder/logout");
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
            <div className="lg:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                        <Rocket className="h-5 w-5 text-white" />
                    </div>
                    <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        UnstopGrow
                    </h1>
                </div>
                <button
                    onClick={toggleMobileMenu}
                    className="p-2 rounded-lg hover:bg-slate-100 transition-colors"
                >
                    {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50" onClick={closeMobileMenu}>
                    <div className="fixed inset-y-0 left-0 w-64 bg-white shadow-lg" onClick={(e) => e.stopPropagation()}>
                        <div className="flex h-full flex-col">
                            {/* Mobile Menu Header */}
                            <div className="flex items-center justify-between p-4 border-b border-slate-200">
                                <div className="flex items-center space-x-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                        <Rocket className="h-5 w-5 text-white" />
                                    </div>
                                    <h1 className="text-lg font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        UnstopGrow
                                    </h1>
                                </div>
                                <button
                                    onClick={closeMobileMenu}
                                    className="p-1 rounded-lg hover:bg-slate-100 transition-colors"
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            {/* Mobile Menu Items */}
                            <div className="flex-1 overflow-auto p-4">
                                <ul className="flex flex-col gap-1">
                                    {menuItems.map((item, index) => {
                                        const IconComponent = item.icon;
                                        return (
                                            <li key={index}>
                                                <NavLink
                                                    to={item.href}
                                                    onClick={closeMobileMenu}
                                                    className={({ isActive }) =>
                                                        `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 ${isActive
                                                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                                            : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                                                        }`
                                                    }
                                                >
                                                    <IconComponent className="h-5 w-5" />
                                                    <span>{item.label}</span>
                                                </NavLink>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>

                            {/* Mobile Logout Button */}
                            <div className="p-4 border-t border-slate-200">
                                <button
                                    onClick={() => {
                                        handleLogout();
                                        closeMobileMenu();
                                    }}
                                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition-all duration-200 w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                                >
                                    <LogOut className="h-5 w-5" />
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Desktop Sidebar */}
            <div className="group peer hidden lg:block text-gray-700" data-state="expanded">
                {/* Sidebar backdrop/spacer */}
                <div className="duration-200 relative h-screen w-64 bg-transparent transition-[width] ease-linear"></div>

                {/* Main Sidebar */}
                <div className="duration-200 fixed inset-y-0 z-10 hidden h-screen w-1/5 transition-[left,right,width] ease-linear md:flex left-0 border-r border-slate-200 bg-white/80 backdrop-blur-sm">
                    <div className="flex h-full w-full flex-col bg-white">

                        {/* Header */}
                        <div className="flex flex-col gap-2 p-6 border-b border-slate-200">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <Rocket className="h-6 w-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                        UnstopGrow
                                    </h1>
                                </div>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-4">
                            <div className="relative flex w-full min-w-0 flex-col p-2">

                                {/* Menu Items */}
                                <div className="w-full text-sm">

                                    <ul className="flex flex-col gap-1">
                                        {menuItems.map((item, index) => {
                                            const IconComponent = item.icon;
                                            return (
                                                <li key={index}>
                                                    <NavLink
                                                        to={item.href}
                                                        className={({ isActive }) =>
                                                            `flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${isActive
                                                                ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg'
                                                                : 'text-slate-600 hover:bg-slate-100 hover:text-indigo-600'
                                                            }`
                                                        }
                                                    >
                                                        <IconComponent className="h-5 w-5" />
                                                        <span>{item.label}</span>
                                                    </NavLink>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button at Bottom */}
                        <div className="p-4 border-t border-slate-200 mt-auto">
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 w-full text-red-600 hover:bg-red-50 hover:text-red-700"
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

export default Sidebar;
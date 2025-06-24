import {
    Home,
    Search,
    Bookmark,
    Mail,
    Settings,
    Rocket
} from 'lucide-react';

import { NavLink } from 'react-router-dom';


const Sidebar = () => {
    const menuItems = [
        { icon: Home, label: 'Dashboard', href: '/investor/dashboard' },
        { icon: Search, label: 'Discover Startup', href: '/investor/updates' },
        { icon: Bookmark, label: 'Saved Startups', href: '/investor/pitch' },
        { icon: Mail, label: 'Contact Requests', href: '/investor/merge' },
        { icon: Settings, label: 'Settings', href: '/investor/settings' },
    ];


    return (
        <div className="group peer hidden md:block text-gray-700" data-state="expanded">
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
                                <p className="text-xs text-slate-500 -mt-1">
                                    Investor Panel
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex min-h-0 flex-1 flex-col gap-2 overflow-auto p-4">
                        <div className="relative flex w-full min-w-0 flex-col p-2">

                            {/* Group Label */}
                            <div className="duration-200 flex h-8 shrink-0 items-center rounded-md px-2 text-xs text-slate-600 font-medium mb-2">
                                Main Navigation
                            </div>

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
                </div>
            </div>
        </div >
    );
};

export default Sidebar;
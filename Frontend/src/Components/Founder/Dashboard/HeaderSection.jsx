import { Eye, TrendingUp } from 'lucide-react';
import { useAuth } from '../../../context/AuthContext';
import { Link } from 'react-router-dom';

const HeaderSection = () => {
    const { founder } = useAuth();

    return (
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start space-y-4 lg:space-y-0">
            <div className="flex-1 min-w-0">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent leading-tight">
                    Welcome back, {founder.ownerName}! 👋
                </h1>
                <p className="text-slate-600 mt-2 text-sm md:text-base">
                    Here's what's happening with your startup today.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 lg:flex-shrink-0">
                <Link to="/founder/search" className="w-full sm:w-auto">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-indigo-200 text-indigo-600 hover:bg-indigo-50 h-10 px-4 py-2 w-full sm:w-auto transition-colors">
                        <Eye className="h-4 w-4" />
                        <span className="hidden sm:inline">View Public Profile</span>
                        <span className="sm:hidden">Public Profile</span>
                    </button>
                </Link>
                <Link to="/founder/all-pitch" className="w-full sm:w-auto">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white h-10 px-4 py-2 w-full sm:w-auto transition-colors">
                        <TrendingUp className="h-4 w-4" />
                        <span>Post Update</span>
                    </button>
                </Link>
            </div>
        </div>
    );
};

export default HeaderSection;
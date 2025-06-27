import { Eye, TrendingUp } from 'lucide-react';

const HeaderSection = () => {
    return (
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, Alex! 👋
                </h1>
                <p className="text-slate-600 mt-2">
                    Here's what's happening with your startup today.
                </p>
            </div>
            <div className="flex space-x-3">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium border border-indigo-200 text-indigo-600 hover:bg-indigo-50 h-10 px-4 py-2">
                    <Eye className="h-4 w-4 mr-2" />
                    View Public Profile
                </button>
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white h-10 px-4 py-2">
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Post Update
                </button>
            </div>
        </div>
    );
};

export default HeaderSection;

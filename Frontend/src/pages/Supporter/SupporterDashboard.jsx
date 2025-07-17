// SupporterDashboard.js
import SupporterHeader from "../../Components/Suppoter/Dashboard/SupporterHeader";
import SupporterKeyMetrics from "../../Components/Suppoter/Dashboard/SupporterKeyMetrics";
import TrendingStartup from "../../Components/Suppoter/Dashboard/TrendingStartup";

const SupporterDashboard = () => {
    return (
        <div className="flex-1 overflow-auto">
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <SupporterHeader />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <SupporterKeyMetrics />
                        </div>
                        <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6">
                            <TrendingStartup />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SupporterDashboard;
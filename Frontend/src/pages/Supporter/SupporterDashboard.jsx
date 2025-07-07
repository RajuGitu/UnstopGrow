import SupporterHeader from "../../Components/Suppoter/Dashboard/SupporterHeader";
import SupporterKeyMetrics from "../../Components/Suppoter/Dashboard/SupporterKeyMetrics";
import TrendingStartup from "../../Components/Suppoter/Dashboard/TrendingStartup";
const SupporterDashboard = () => {
    return (
        <>
            <div className="flex-1 p-6 overflow-auto">
                <div className="space-y-8 p-5 max-h-screen bg-white">
                    <SupporterHeader />
                    <SupporterKeyMetrics />
                    <TrendingStartup/>
                </div>
            </div>
        </>
    )
}
export default SupporterDashboard;
import ProfileStatusCard from "../../Components/Founder/Settings/ProfileStatusCard";
import SettingsForm from "../../Components/Founder/Settings/SettingsForm";
import StartupLogoCard from "../../Components/Founder/Settings/StartupLogoCard";

const FounderSettings = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto py-6 sm:py-8">
                <div className="space-y-6 sm:space-y-8">
                    {/* Header Section */}
                    <div className="text-center sm:text-left">
                        <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Settings ⚙️
                        </h1>
                        <p className="text-slate-600 mt-2 text-sm sm:text-base">
                            Manage your startup profile and account preferences.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                        <div className="xl:col-span-2 order-2 xl:order-1">
                            <div className="space-y-6">
                                <SettingsForm />
                            </div>
                        </div>

                        <div className="order-1 xl:order-2">
                            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4 sm:gap-6">
                                <ProfileStatusCard />
                                <StartupLogoCard />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FounderSettings;
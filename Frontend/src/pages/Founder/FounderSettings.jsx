import ProfileStatusCard from "../../Components/Founder/Settings/ProfileStatusCard";
import SettingsForm from "../../Components/Founder/Settings/SettingsForm";
import StartupLogoCard from "../../Components/Founder/Settings/StartupLogoCard";
import VerificationStatusCard from "../../Components/Founder/Settings/VerificationStatusCard";

const FounderSettings = () => {
    return (
        <>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Settings ⚙️
                    </h1>
                    <p className="text-slate-600 mt-2">Manage your startup profile and account preferences.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <SettingsForm />
                    </div>
                    <div className="space-y-6">
                        <VerificationStatusCard />
                        <ProfileStatusCard />
                        <StartupLogoCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FounderSettings;
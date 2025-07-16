import SupporterProfileCard from "../../Components/Suppoter/Profile/SupporterProfileCard";

const SupporterProfile = () => {
    return (
        <>
            <div className="p-4 sm:p-6 space-y-4 sm:space-y-6 w-full max-w-4xl mx-auto">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-sm sm:text-base text-gray-600">Manage your profile and preferences</p>
                </div>
                <SupporterProfileCard />
            </div>
        </>
    );
};

export default SupporterProfile;
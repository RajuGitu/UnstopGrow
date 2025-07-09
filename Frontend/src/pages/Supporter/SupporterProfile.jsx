import SupporterProfileCard from "../../Components/Suppoter/Profile/SupporterProfileCard";

const SupporterProfile = () => {
    return (
        <>
            <div className="p-6 space-y-6 max-w-4xl">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                    <p className="text-gray-600">Manage your profile and preferences</p>
                </div>
                <SupporterProfileCard />
            </div>
        </>
    );
};

export default SupporterProfile;
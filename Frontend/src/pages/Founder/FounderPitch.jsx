// FounderPitch.js
import ExpandPitch from "../../Components/Founder/Pitch/ExpandPitch";
import PitchForm from "../../Components/Founder/Pitch/PitchForm";
import PitchTips from "../../Components/Founder/Pitch/PitchTips";

const FounderPitch = () => {
    return (
        <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-6">
            <div className="max-w-7xl mx-auto space-y-6 sm:space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Pitch Deck Builder 🎯
                        </h1>
                        <p className="text-slate-600 mt-2 text-sm sm:text-base">
                            Create a compelling pitch for investors and partners.
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
                    <div className="xl:col-span-2 order-2 xl:order-1">
                        <PitchForm />
                    </div>
                    <div className="order-1 xl:order-2">
                        <PitchTips />
                    </div>
                </div>

                <div className="order-3">
                    <ExpandPitch />
                </div>
            </div>
        </div>
    );
};

export default FounderPitch;
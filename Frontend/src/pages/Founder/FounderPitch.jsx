import PitchForm from "../../Components/Founder/Pitch/PitchForm";
import PitchTips from "../../Components/Founder/Pitch/PitchTips";

const FounderPitch = () => {
    return (
        <>
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            Pitch Deck Builder 🎯
                        </h1>
                        <p className="text-slate-600 mt-2">Create a compelling pitch for investors and partners.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <PitchForm />
                    </div>
                    <div className="space-y-6">
                        <PitchTips></PitchTips>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FounderPitch;
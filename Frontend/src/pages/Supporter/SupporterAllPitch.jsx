import AllPitchList from "../../Components/Suppoter/AllPitch/AllPitchList";

const SupporterAllPitch = () => {
    return (
        <>
            <div className="flex-1 overflow-auto max-h-screen">
                <div className="space-y-8 p-2 bg-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <AllPitchList />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupporterAllPitch;
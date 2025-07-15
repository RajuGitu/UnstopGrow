import ActiveRequestsCard from "../../Components/Founder/Merge Request/ActiveRequestsCard";
import ExpandNetworkCard from "../../Components/Founder/Merge Request/ExpandNetworkCard";
import RequestSent from "../../Components/Founder/Merge Request/RequestSent";

const FounderMerge = () => {
    return (
        <>
            <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Merge & Collaborate 🤝
                    </h1>
                    <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto sm:mx-0">
                        Find synergistic startups for partnerships and mergers.
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
                    <div className="md:col-span-2 xl:col-span-3">
                        <RequestSent />
                    </div>
                    <div className="md:col-span-2 xl:col-span-3">
                        <ActiveRequestsCard />
                    </div>
                    <div className="md:col-span-2 xl:col-span-3">
                        <ExpandNetworkCard />
                    </div>
                </div>
            </div>
        </>
    )
}

export default FounderMerge;
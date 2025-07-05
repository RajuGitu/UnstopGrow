import ActiveRequestsCard from "../../Components/Founder/Merge Request/ActiveRequestsCard";
import ExpandNetworkCard from "../../Components/Founder/Merge Request/ExpandNetworkCard";
import RequestSent from "../../Components/Founder/Merge Request/RequestSent";

const FounderMerge = () => {
    return (
        <>
            <div className="space-y-8">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Merge & Collaborate 🤝
                    </h1>
                    <p className="text-slate-600 mt-2">Find synergistic startups for partnerships and mergers.</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
                    <RequestSent />
                    <ActiveRequestsCard />
                    <ExpandNetworkCard />
                </div>
            </div>
        </>
    )
}

export default FounderMerge;
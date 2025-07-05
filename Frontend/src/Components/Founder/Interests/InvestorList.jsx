import InvestorCard from "./InvestorCard";   // make sure path is correct
import { Star } from "lucide-react";
import { Badge } from "../../UI/Badge";
import { CardHeader } from "../../UI/Card";
import { useInterest } from "../../../context/InterestContext";
import { useEffect } from "react";

const LoadingSpinner = () => (
    <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900"></div>
    </div>
);
export default function InvestorList() {
    const { intereseted, loading,getAllInterestedFounder } = useInterest();
    useEffect(() => {
        getAllInterestedFounder()
    }, [])

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-4">
                <CardHeader>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>Investor Pipeline</span>
                    </h3>
                </CardHeader>
                <LoadingSpinner />
            </div>
        );
    }

    if (intereseted.length === 0) {
        return (
            <div className="max-w-6xl mx-auto p-4">
                <CardHeader>
                    <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>Investor Pipeline</span>
                    </h3>
                </CardHeader>
                <p className="text-center text-slate-500 py-8">
                    No investors found.
                </p>
            </div>
        );
    }

    return (
        <>
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span>Investor Pipeline</span>
                    </div>
                    <Badge variant="outline">{intereseted.length}</Badge>
                </h3>
            </CardHeader>

            <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 mx-8">
                {intereseted.map((investor, idx) =>
                (
                    <InvestorCard key={investor.investorId || idx} investor={investor} />
                )
                )}
            </div>
        </>
    );
}

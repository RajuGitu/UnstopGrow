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
    const { intereseted, loading, getAllInterestedFounder } = useInterest();

    useEffect(() => {
        getAllInterestedFounder()
    }, [])

    if (loading) {
        return (
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
                <CardHeader className="px-0 sm:px-6">
                    <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <span>Investor Pipeline</span>
                    </h3>
                </CardHeader>
                <LoadingSpinner />
            </div>
        );
    }

    if (intereseted.length === 0) {
        return (
            <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
                <CardHeader className="px-0 sm:px-6">
                    <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <span>Investor Pipeline</span>
                    </h3>
                </CardHeader>
                <p className="text-center text-slate-500 py-8 text-sm sm:text-base">
                    No investors found.
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-7xl mx-auto p-4 sm:p-6">
            <CardHeader className="flex flex-col space-y-1.5 px-0 sm:px-6 pb-4 sm:pb-6">
                <h3 className="text-xl sm:text-2xl font-semibold leading-none tracking-tight flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                        <Star className="h-5 w-5 text-yellow-500 flex-shrink-0" />
                        <span>Investor Pipeline</span>
                    </div>
                    <Badge variant="outline" className="text-xs sm:text-sm">
                        {intereseted.length}
                    </Badge>
                </h3>
            </CardHeader>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
                {intereseted.map((investor, idx) => (
                    <InvestorCard key={investor.investorId || idx} investor={investor} />
                ))}
            </div>
        </div>
    );
}
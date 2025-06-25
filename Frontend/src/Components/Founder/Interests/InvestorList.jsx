import InvestorCard from "./InvestorCard";   // make sure path is correct
import { Star } from "lucide-react";
import { Badge } from "../../UI/Badge";
import { CardHeader } from "../../UI/Card";

const investors = [
    {
        initials: "SJ",
        name: "Sarah Johnson",
        firm: "TechVentures Capital",
        lastRound: "$500K Series A",
        status: "Cold",
        growth: 85,
        tags: ["AI/ML", "SaaS"],
        lastContact: "2 days ago",
    },
    {
        initials: "RM",
        name: "Rahul Mehta",
        firm: "GreenCharge Fund",
        lastRound: "$250K Seed",
        status: "Warm",
        growth: 47,
        tags: ["Clean Energy", "Hardware"],
        lastContact: "1 week ago",
    },
    {
        initials: "RM",
        name: "Rahul Mehta",
        firm: "GreenCharge Fund",
        lastRound: "$250K Seed",
        status: "Warm",
        growth: 47,
        tags: ["Clean Energy", "Hardware"],
        lastContact: "1 week ago",
    },
    {
        initials: "RM",
        name: "Rahul Mehta",
        firm: "GreenCharge Fund",
        lastRound: "$250K Seed",
        status: "Hot",
        growth: 47,
        tags: ["Clean Energy", "Hardware"],
        lastContact: "1 week ago",
    },
    // …add more objects or fetch from backend
];

export default function InvestorList() {
    if (investors.length === 0) {
        return (
            <p className="text-center text-slate-500">
                No investors found.
            </p>
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
                    <Badge variant="outline">{investors.length}</Badge>
                </h3>
            </CardHeader>

            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 m-8">
                {investors.map((investor, idx) => (
                    <InvestorCard key={idx} investor={investor} />
                ))}
            </div>
        </>
    );
}

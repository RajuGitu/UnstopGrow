import FounderResultCard from "./FounderResultCard";

export default function FounderCardList() {

    const founders = [
        {
            name: "Sarah Chen",
            initials: "SC",
            company: "TechFlow AI",
            mergeStatus: "Ready to Merge",
            growth: 85,
            domain: "AI & Machine Learning",
            description:
                "Building next-gen AI automation tools for enterprise workflows.",
            location: "San Francisco, CA",
            teamSize: 12,
            tags: ["AI", "SaaS", "Enterprise", "Automation"],
            mergeInterests: [
                "Complementary Technology",
                "Market Expansion",
                "Talent Acquisition",
            ],
        },
        {
            name: "Rahul Mehta",
            initials: "RM",
            company: "GreenCharge",
            mergeStatus: "Not Ready",
            growth: 47,
            domain: "Clean Energy",
            description: "Affordable solar solutions for small urban communities.",
            location: "Bangalore, India",
            teamSize: 6,
            tags: ["Energy", "Sustainability", "Renewables"],
            mergeInterests: ["Hardware Integration", "Funding", "Partnerships"],
        },
        {
            name: "Lisa Park",
            initials: "LP",
            company: "EduTech Pro",
            mergeStatus: "Reviewing",
            growth: 63,
            domain: "EdTech",
            description:
                "AI-powered learning platform that personalizes content for students.",
            location: "Seoul, South Korea",
            teamSize: 18,
            tags: ["AI", "Education", "B2B", "Platform"],
            mergeInterests: ["Content Licensing", "Global Expansion"],
        },
    ];
    if (!founders || founders.length === 0) {
        return <p className="text-center text-slate-500">No founders found.</p>;
    }
    return (
        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
            {founders.map((founder, idx) => (
                <FounderResultCard key={idx} founder={founder} />
            ))}
        </div>
    );
}

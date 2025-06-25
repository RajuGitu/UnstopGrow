import { Star } from "lucide-react";

const investorInterests = [
  {
    name: "TechVentures Capital",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face",
    amount: "$500K interest",
    badge: "Hot",
    badgeColor: "bg-red-500 text-white",
  },
  {
    name: "Innovation Fund",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    amount: "$250K interest",
    badge: "Warm",
    badgeColor: "bg-orange-500 text-white",
  },
  {
    name: "Startup Accelerator",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
    amount: "$150K interest",
    badge: "Cold",
    badgeColor: "bg-slate-300 text-slate-900",
  },
];

const InvestorInterest = () => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Star className="h-5 w-5 text-yellow-500" />
          <span className="text-2xl font-semibold">Active Investor Interest</span>
        </div>
        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full border text-foreground">
          {investorInterests.length} active
        </span>
      </div>

      {/* List */}
      <div className="space-y-4">
        {investorInterests.map((investor, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <img
                src={investor.image}
                alt={investor.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="font-medium text-slate-900">{investor.name}</p>
                <p className="text-sm text-slate-500">{investor.amount}</p>
              </div>
            </div>
            <span
              className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${investor.badgeColor}`}
            >
              {investor.badge}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorInterest;

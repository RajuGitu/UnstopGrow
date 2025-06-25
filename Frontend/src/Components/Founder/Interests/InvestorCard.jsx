import { Calendar } from "lucide-react";

// Simple Avatar components (since you're using them)
const Avatar = ({ className, children }) => (
    <div className={`relative inline-flex items-center justify-center rounded-full ${className}`}>
        {children}
    </div>
);

const AvatarFallback = ({ children }) => (
    <span className="bg-slate-200 text-slate-700 font-medium text-sm w-full h-full flex items-center justify-center rounded-full">
        {children}
    </span>
);

// Simple Button component
const Button = ({ variant = "default", className, children, ...props }) => {
    const variants = {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        outline: "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        destructive: "bg-red-500 text-white hover:bg-red-600",
    };

    return (
        <button
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${variants[variant]} ${className || ''}`}
            {...props}
        >
            {children}
        </button>
    );
};
// Fixed Badge component
const Badge = ({ className, variant = "default", children, ...props }) => {
    const variantStyles = {
        default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        secondary: "border-transparent bg-slate-200 text-slate-800 hover:bg-slate-300",
        destructive: "border-transparent bg-red-500 text-white hover:bg-red-600",
        outline: "text-slate-900 border border-slate-200 hover:bg-slate-50",
        success: "border-transparent bg-green-100 text-green-800",
    };

    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";
    const variantClasses = variantStyles[variant] || variantStyles.default;

    return (
        <div className={`${baseClasses} ${variantClasses} ${className || ''}`} {...props}>
            {children}
        </div>
    );
};
/* map status → badge variant */
const statusVariant = {
    Hot: "destructive",  // red badge
    Warm: "secondary",   // gray badge
    Cold: "outline",     // outline badge
};

export default function InvestorCard({ investor }) {
    return (
        <div className="p-4 bg-slate-50 rounded-lg">
            {/* ───── top row ───── */}
            <div className="flex items-start justify-between">
                {/* left side */}
                <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                        <AvatarFallback>{investor.initials}</AvatarFallback>
                    </Avatar>

                    <div>
                        <h3 className="font-semibold text-slate-900">{investor.name}</h3>
                        <p className="text-slate-600">{investor.firm}</p>
                        <p className="text-sm text-green-600 font-medium">
                            {investor.lastRound}
                        </p>

                        <div className="flex items-center space-x-2 mt-2">
                            {investor.tags.map((tag) => (
                                <Badge key={tag} className="text-xs" variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="text-right">
                    <Badge variant={statusVariant[investor.status]}>
                        {investor.status}
                    </Badge>

                    <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {investor.lastContact}
                    </p>
                </div>
            </div>

            {/* ───── action buttons ───── */}
            <div className="flex justify-end space-x-2 mt-4">
                <Button variant="outline">Add Note</Button>
                <Button variant="destructive">Schedule Call</Button>
            </div>
        </div>
    );
}
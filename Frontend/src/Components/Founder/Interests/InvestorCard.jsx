import { Calendar, Mail, Linkedin } from "lucide-react";

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

const Badge = ({ className, variant = "default", children, ...props }) => {
    const variantStyles = {
        default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        secondary: "border-transparent bg-slate-200 text-slate-800 hover:bg-slate-300",
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

const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";

export default function InvestorCard({ investor }) {
    // Check if investor data exists
    if (!investor) {
        return (
            <div className="p-4 bg-white rounded-lg border shadow-sm">
                <p className="text-slate-500 text-center">No investor data available</p>
            </div>
        );
    }

    const domain = investor.domain || {};
    const profile = investor.profile || {};

    const makeUrl = (imagePath) => {
        if (!imagePath) return imgPlaceholder;

        const rel = imagePath.split("uploads")[1];
        return rel
            ? `http://localhost:5000/uploads${rel.replace(/\\/g, "/")}`
            : imgPlaceholder;
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'Date not available';

        try {
            const date = new Date(dateString);
            return date.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
            });
        } catch (error) {
            return 'Invalid date';
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg border m-2 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12 flex-shrink-0">
                        <AvatarFallback>
                            {profile.image ? (
                                <img
                                    src={makeUrl(profile.image)}
                                    alt={profile.name || 'Investor'}
                                    className="w-full h-full object-cover rounded-full"
                                    onError={(e) => {
                                        e.target.src = imgPlaceholder;
                                    }}
                                />
                            ) : (
                                <div className="w-full h-full bg-slate-300 rounded-full flex items-center justify-center">
                                    <span className="text-slate-600 font-medium">
                                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'I'}
                                    </span>
                                </div>
                            )}
                        </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-slate-900 truncate">
                            {profile.name || 'Unknown Investor'}
                        </h3>
                        <p className="text-slate-600 truncate">
                            {profile.company || 'Company not specified'}
                        </p>
                        {profile.bio && (
                            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
                                {profile.bio}
                            </p>
                        )}

                        {/* Interests/Tags */}
                        {domain.interests && domain.interests.length > 0 && (
                            <div className="flex items-center flex-wrap gap-1 mt-2">
                                {domain.interests.slice(0, 3).map((interest, idx) => (
                                    <Badge key={idx} className="text-xs" variant="secondary">
                                        {interest}
                                    </Badge>
                                ))}
                                {domain.interests.length > 3 && (
                                    <Badge className="text-xs" variant="outline">
                                        +{domain.interests.length - 3} more
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="flex items-center space-x-4 mt-3">
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Mail className="h-4 w-4 mr-1" />
                                    Email
                                </a>
                            )}
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Linkedin className="h-4 w-4 mr-1" />
                                    LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                <div className="text-right flex-shrink-0">
                    <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatDate(profile.createdAt)}
                    </p>
                </div>
            </div>
        </div>
    );
}
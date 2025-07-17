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
                <p className="text-slate-500 text-center text-sm">No investor data available</p>
            </div>
        );
    }

    const domain = investor.domain || {};
    const profile = investor.profile || {};

    const makeUrl = (imagePath) => {
        if (!imagePath) return imgPlaceholder;
        const parsed = JSON.parse(imagePath);
        return parsed.url;
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
        <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-300 shadow-sm hover:shadow-md transition-shadow w-full">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                {/* Main Content */}
                <div className="flex items-start space-x-3 sm:space-x-4 flex-1 min-w-0">
                    {/* Avatar */}
                    <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
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
                                    <span className="text-slate-600 font-medium text-sm">
                                        {profile.name ? profile.name.charAt(0).toUpperCase() : 'I'}
                                    </span>
                                </div>
                            )}
                        </AvatarFallback>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                        {/* Name and Company */}
                        <div className="mb-2">
                            <h3 className="font-semibold text-slate-900 text-sm sm:text-base truncate">
                                {profile.name || 'Unknown Investor'}
                            </h3>
                            <p className="text-slate-600 text-xs sm:text-sm truncate">
                                {profile.company || 'Company not specified'}
                            </p>
                        </div>

                        {/* Bio */}
                        {profile.bio && (
                            <p className="text-xs sm:text-sm text-slate-500 mb-2 line-clamp-2 leading-relaxed">
                                {profile.bio}
                            </p>
                        )}

                        {/* Interests/Tags */}
                        {domain.interests && domain.interests.length > 0 && (
                            <div className="flex items-center flex-wrap gap-1 mb-3">
                                {domain.interests.slice(0, 2).map((interest, idx) => (
                                    <Badge key={idx} className="text-xs px-2 py-0.5" variant="secondary">
                                        {interest}
                                    </Badge>
                                ))}
                                {domain.interests.length > 2 && (
                                    <Badge className="text-xs px-2 py-0.5" variant="outline">
                                        +{domain.interests.length - 2}
                                    </Badge>
                                )}
                            </div>
                        )}

                        {/* Contact Info */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Mail className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">Email</span>
                                </a>
                            )}
                            {profile.linkedin && (
                                <a
                                    href={profile.linkedin.startsWith('http') ? profile.linkedin : `https://${profile.linkedin}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center text-xs sm:text-sm text-blue-600 hover:text-blue-800 transition-colors"
                                >
                                    <Linkedin className="h-3 w-3 sm:h-4 sm:w-4 mr-1 flex-shrink-0" />
                                    <span className="truncate">LinkedIn</span>
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Date - Mobile: Below content, Desktop: Top right */}
                <div className="flex justify-end sm:justify-start sm:flex-shrink-0 sm:mt-0 mt-2">
                    <p className="text-xs text-slate-500 flex items-center">
                        <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
                        <span className="whitespace-nowrap">
                            {formatDate(profile.createdAt)}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
}
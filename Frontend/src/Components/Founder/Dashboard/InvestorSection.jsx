import { Star, Mail, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { useInterest } from "../../../context/InterestContext";
import { Link } from "react-router-dom";
import { Button } from "../../UI/Button";

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

const imgPlaceholder = "";

const InvestorInterest = () => {
  const { intereseted } = useInterest();
  const [showAll, setShowAll] = useState(false);

  const makeUrl = (imagePath) => {
    if (!imagePath) return imgPlaceholder;
    if (!imagePath) return null;
    const parsed = JSON.parse(imagePath);
    return parsed.url;
  };

  const displayedInvestors = showAll
    ? intereseted
    : intereseted?.slice(0, 3) || [];

  const hasMoreInvestors = intereseted && intereseted.length > 3;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-sm p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 space-y-3 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <Star className="h-4 w-4 md:h-5 md:w-5 text-yellow-500" />
          <span className="text-lg md:text-2xl font-semibold">Active Investor Interest</span>
        </div>
        <Link to="/founder/interests">
          <Button variant="outline" size="sm" className="w-full sm:w-auto">
            View All
          </Button>
        </Link>
      </div>

      {/* List */}
      <div className="space-y-3 md:space-y-4">
        {!intereseted || intereseted.length === 0 ? (
          <div className="text-center py-6 md:py-8 text-slate-500">
            <Star className="h-10 w-10 md:h-12 md:w-12 mx-auto mb-3 md:mb-4 text-slate-300" />
            <p className="text-sm md:text-base">No active investor interest yet</p>
          </div>
        ) : (
          <>
            {displayedInvestors.map((investor, index) => {
              const domain = investor?.domain || {};
              const profile = investor?.profile || {};

              return (
                <div
                  key={investor?.investorId || index}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 md:p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors space-y-3 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10 md:h-12 md:w-12 flex-shrink-0">
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
                            <span className="text-slate-600 font-medium text-sm md:text-base">
                              {profile.name ? profile.name.charAt(0).toUpperCase() : 'I'}
                            </span>
                          </div>
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <h3 className="font-semibold text-slate-900 text-sm md:text-base truncate">
                        {profile.name || 'Unknown Investor'}
                      </h3>
                      <p className="text-slate-600 text-xs md:text-sm truncate">
                        {profile.company || 'Company not specified'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    {/* Interests */}
                    {domain.interests && domain.interests.length > 0 && (
                      <div className="flex items-center space-x-1 flex-wrap">
                        {domain.interests.slice(0, 2).map((interest, idx) => (
                          <Badge key={idx} className="text-xs mb-1" variant="secondary">
                            {interest}
                          </Badge>
                        ))}
                        {domain.interests.length > 2 && (
                          <Badge className="text-xs mb-1" variant="outline">
                            +{domain.interests.length - 2}
                          </Badge>
                        )}
                      </div>
                    )}

                    {/* Email */}
                    {profile.email && (
                      <a
                        href={`mailto:${profile.email}`}
                        className="flex items-center text-xs md:text-sm text-blue-600 hover:text-blue-800 transition-colors self-start sm:self-center"
                      >
                        <Mail className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                        <span className="hidden sm:inline">Email</span>
                        <span className="sm:hidden">Contact</span>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Read More / Show Less Button */}
            {hasMoreInvestors && (
              <div className="flex justify-center pt-2">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center space-x-1 text-xs md:text-sm text-blue-600 hover:text-blue-800 transition-colors font-medium"
                >
                  <span>
                    {showAll
                      ? `Show Less`
                      : `Read More (${intereseted.length - 3} more)`
                    }
                  </span>
                  {showAll ? (
                    <ChevronUp className="h-3 w-3 md:h-4 md:w-4" />
                  ) : (
                    <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default InvestorInterest;
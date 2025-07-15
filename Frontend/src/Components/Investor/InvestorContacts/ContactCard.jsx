import { Avatar, AvatarFallback } from "../../UI/Avatar";
import { Button } from "../../UI/Button";
import {
  Building,
  MapPin,
  Globe,
  Mail,
  Linkedin,
  Github,
  Twitter,
  MessageSquare,
  Trophy,
  Star,
  ExternalLink,
  Sparkles,
} from "lucide-react";

/**
 * Startup Contact Card for Interested Startups
 */
const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";
const ContactCard = ({ startup }) => {
  /* Helpers -------------------------------------------------------------- */
  const handleVisitWebsite = () => {
    if (startup.website) {
      window.open(startup.website, "_blank");
    }
  };

  const handleSocialClick = (url) => {
    if (
      url &&
      url !== "No LinkedIn provided" &&
      url !== "No GitHub provided" &&
      url !== "No Twitter provided"
    ) {
      window.open(url, "_blank");
    }
  };

  const handleEmailClick = () => {
    if (startup.email && startup.email !== "No email provided") {
      const subject = encodeURIComponent(
        `Investment Interest in ${startup.companyName}`
      );
      const body = encodeURIComponent(`Dear ${startup.companyName} Team,

I hope this email finds you well. I am an investor who has reviewed your startup profile and I'm impressed with your vision and potential.

I would like to explore potential investment opportunities and discuss how I can support your growth journey. Your work in ${startup.domain} particularly caught my attention.

I would appreciate the opportunity to schedule a brief call to learn more about:
- Your current funding needs
- Your growth strategy and roadmap
- How I can add value beyond capital

Please let me know a convenient time for you to connect.

Best regards,
[Your Name]
[Your Investment Firm]`);

      // Open Gmail compose directly
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${startup.email}&su=${subject}&body=${body}`;
      window.open(gmailUrl, "_blank");
    }
  };

  const makeUrl = (imagePath) => {
    if (!imagePath) return imgPlaceholder;

    const rel = imagePath.split("uploads")[1];
    return rel
      ? `https://unstopgrowb.onrender.com/uploads${rel.replace(/\\/g, "/")}`
      : imgPlaceholder;
  };

  /* Render --------------------------------------------------------------- */
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        {/* ── left column ── */}
        <div className="flex-1">
          {/* Company Header */}
          <div className="flex items-center space-x-3 mb-3">
            <div className="relative">
              <Avatar className="h-10 w-10 flex-shrink-0">
                <AvatarFallback>
                  {startup.companyLogo ? (
                    <img
                      src={makeUrl(startup.companyLogo)}
                      alt={startup.companyName || "Founder"}
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        e.target.src = imgPlaceholder;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-600 font-medium text-sm">
                        {startup.companyName
                          ? startup.companyName.charAt(0).toUpperCase()
                          : "I"}
                      </span>
                    </div>
                  )}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg text-gray-900 mb-1">
                {startup.companyName}
              </h3>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
                  {startup.domain}
                </span>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>{startup.location}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="mb-3">
            <p className="text-gray-700 text-sm bg-gray-50 p-3 rounded border-l-4 border-gray-300">
              {startup.tagline}
            </p>
          </div>

          {/* Achievements */}
          {startup.achievements && (
            <div className="mb-3">
              <div className="flex items-center space-x-2 mb-2">
                <Trophy className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-800">
                  Achievements
                </span>
              </div>
              <div className="bg-gray-50 border border-gray-200 p-3 rounded text-sm">
                <p className="text-gray-700">{startup.achievements}</p>
              </div>
            </div>
          )}

          {/* Contact Information */}
          <div className="space-y-2">
            <div className="flex items-center space-x-2 text-sm text-gray-700">
              <Mail className="w-4 h-4 text-gray-500" />
              <span>{startup.email}</span>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-2 flex-wrap">
              {startup.website && (
                <button
                  onClick={handleVisitWebsite}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <Globe className="w-3 h-3" />
                  <span>Website</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              )}

              {startup.linkedIn &&
                startup.linkedIn !== "No LinkedIn provided" && (
                  <button
                    onClick={() => handleSocialClick(startup.linkedIn)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm"
                  >
                    <Linkedin className="w-3 h-3" />
                    <span>LinkedIn</span>
                  </button>
                )}

              {startup.gitHub && startup.gitHub !== "No GitHub provided" && (
                <button
                  onClick={() => handleSocialClick(startup.gitHub)}
                  className="flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors text-sm"
                >
                  <Github className="w-3 h-3" />
                  <span>GitHub</span>
                </button>
              )}

              {startup.twitter &&
                startup.twitter !== "No Twitter provided" && (
                  <button
                    onClick={() => handleSocialClick(startup.twitter)}
                    className="flex items-center space-x-1 px-3 py-1 bg-blue-50 text-blue-700 rounded hover:bg-blue-100 transition-colors text-sm"
                  >
                    <Twitter className="w-3 h-3" />
                    <span>Twitter</span>
                  </button>
                )}
            </div>
          </div>
        </div>

        {/* ── right column (action) ── */}
        <div className="flex flex-col space-y-3 ml-6">
          <div className="flex items-center space-x-1 justify-center mb-1">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-xs font-medium text-gray-600">
              Interested Startup
            </span>
          </div>

          <Button
            onClick={handleEmailClick}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-colors"
            disabled={!startup.email || startup.email === "No email provided"}
          >
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>Send Email</span>
            </div>
          </Button>

          <div className="text-center">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-green-50 border border-green-200 rounded-full text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-green-700 font-medium">
                Ready to Connect
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
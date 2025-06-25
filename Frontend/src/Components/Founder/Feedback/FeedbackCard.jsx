import { Calendar, Lightbulb, ThumbsUp, AlertCircle } from "lucide-react";

// Simple Avatar components
const Avatar = ({ className, children }) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {children}
  </div>
);

const AvatarImage = ({ src, alt }) => (
  <img className="aspect-square h-full w-full" src={src} alt={alt} />
);

const AvatarFallback = ({ children }) => (
  <span className="flex h-full w-full items-center justify-center rounded-full bg-slate-200 text-slate-700 font-medium text-sm">
    {children}
  </span>
);

// Simple Button component
const Button = ({ variant = "outline", className, children, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3";
  
  const variants = {
    outline: "border border-slate-300 bg-white hover:bg-slate-50 hover:text-slate-900",
    default: "bg-slate-900 text-white hover:bg-slate-800",
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${className || ''}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Simple Badge component
const Badge = ({ variant = "default", className, children, ...props }) => {
  const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
    suggestion: "border-transparent bg-blue-500 text-white hover:bg-blue-600",
    praise: "border-transparent bg-green-500 text-white hover:bg-green-600", 
    issue: "border-transparent bg-red-500 text-white hover:bg-red-600",
  };
  
  return (
    <div className={`${baseClasses} ${variants[variant]} ${className || ''}`} {...props}>
      {children}
    </div>
  );
};

// Feedback type configuration
const feedbackTypeConfig = {
  suggestion: {
    icon: Lightbulb,
    variant: "suggestion",
    label: "Suggestion",
    bgColor: "bg-blue-50 border-blue-200"
  },
  praise: {
    icon: ThumbsUp,
    variant: "praise", 
    label: "Praise",
    bgColor: "bg-slate-50"
  },
  issue: {
    icon: AlertCircle,
    variant: "issue",
    label: "Issue", 
    bgColor: "bg-slate-50"
  }
};

export default function FeedbackCard({ feedback }) {
  const typeConfig = feedbackTypeConfig[feedback.type] || feedbackTypeConfig.suggestion;
  const IconComponent = typeConfig.icon;

  return (
    <div className={`p-4 rounded-lg ${typeConfig.bgColor}`}>
      <div className="flex items-start space-x-4">
        <Avatar className="h-10 w-10">
          {feedback.avatar ? (
            <AvatarImage src={feedback.avatar} alt={feedback.name} />
          ) : (
            <AvatarFallback>{feedback.initials}</AvatarFallback>
          )}
        </Avatar>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-slate-900">{feedback.name}</h3>
              
              <Badge variant={typeConfig.variant}>
                <IconComponent className="h-4 w-4" />
                <span className="ml-1">{typeConfig.label}</span>
              </Badge>
              
              {feedback.isNew && (
                <Badge variant="default">New</Badge>
              )}
            </div>

            <div className="flex items-center text-xs text-slate-500">
              <Calendar className="h-3 w-3 mr-1" />
              {feedback.timeAgo}
            </div>
          </div>

          <p className="text-slate-700 mb-3">{feedback.message}</p>

          <div className="flex space-x-2">
            <Button variant="outline">Reply</Button>
            <Button variant="outline">Mark as Addressed</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
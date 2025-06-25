import { MessageSquare } from "lucide-react";
import FeedbackCard from "./FeedbackCard"; // Adjust import path as needed  

// Simple Badge component
const Badge = ({ variant = "default", className, children, ...props }) => {
    const baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors";

    const variants = {
        default: "border-transparent bg-slate-900 text-white hover:bg-slate-800",
        secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-200",
    };

    return (
        <div className={`${baseClasses} ${variants[variant]} ${className || ''}`} {...props}>
            {children}
        </div>
    );
};

// Sample feedback data based on your HTML
const feedback = [
    {
        id: 1,
        name: "Priya Sharma",
        initials: "PS",
        avatar: null,
        type: "suggestion",
        message: "Your AI analytics feature could benefit from real-time data streaming. This would make it more competitive.",
        timeAgo: "2 hours ago",
        isNew: true
    },
    {
        id: 2,
        name: "Rahul Kumar",
        initials: "RK",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face",
        type: "praise",
        message: "Absolutely love the user interface! Clean, intuitive, and modern. Great work on the design.",
        timeAgo: "1 day ago",
        isNew: false
    },
    {
        id: 3,
        name: "Anjali Patel",
        initials: "AP",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face",
        type: "issue",
        message: "Experiencing some lag in the dashboard when loading large datasets. Might need optimization.",
        timeAgo: "3 days ago",
        isNew: false
    }
];

const FeedbackList = () => {
    const newFeedbackCount = feedback.filter(item => item.isNew).length;

    return (
        <>
            <div className="flex flex-col space-y-1.5 p-6">
                <h3 className="text-2xl font-semibold leading-none tracking-tight flex items-center justify-between">
                    {/* Left Section with Icon and Label */}
                    <div className="flex items-center space-x-2">
                        <MessageSquare className="h-5 w-5 text-indigo-600" />
                        <span>Recent Feedback</span>
                    </div>

                    {/* Right Badge */}
                    {newFeedbackCount > 0 && (
                        <Badge>{newFeedbackCount} new</Badge>
                    )}
                </h3>
            </div>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2 m-8">
                {feedback.map((feedbackItem) => (
                    <FeedbackCard key={feedbackItem.id} feedback={feedbackItem} />
                ))}
            </div>
        </>
    );
};

export default FeedbackList;
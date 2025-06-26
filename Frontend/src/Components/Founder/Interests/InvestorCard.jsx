import { useState } from "react";
import { Calendar, Plus, X } from "lucide-react";

// Simple Avatar components
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
const Button = ({ variant = "default", className, children, isActive = false, ...props }) => {
    const variants = {
        default: "bg-slate-900 text-white hover:bg-slate-800",
        outline: isActive
            ? "border border-slate-400 bg-slate-100 text-slate-900"
            : "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50",
        destructive: isActive
            ? "bg-red-600 text-white"
            : "bg-red-500 text-white hover:bg-red-600",
        success: isActive
            ? "bg-green-600 text-white"
            : "bg-green-500 text-white hover:bg-green-600",
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

// Badge component
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

export default function InvestorCard({ investor, onAddNote, initialStatus = null }) {
    const [showNoteInput, setShowNoteInput] = useState(false);
    const [noteText, setNoteText] = useState('');
    const [notes, setNotes] = useState(investor.notes || []);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);

    const handleStatusChange = async (newStatus) => {
        if (isLoading) return;

        setIsLoading(true);
        try {
            // Toggle logic: if clicking the same status, deselect it
            const finalStatus = selectedStatus === newStatus ? null : newStatus;

            // Update local state immediately for better UX
            setSelectedStatus(finalStatus);

            // You can add API call here if needed
            // await updateInvestorStatus(investor.id, finalStatus);

        } catch (error) {
            // Revert state if API call fails
            setSelectedStatus(selectedStatus);
            console.error('Failed to update investor status:', error);
            alert('Failed to update status. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddNote = async () => {
        if (!noteText.trim()) return;

        setIsLoading(true);
        try {
            const newNote = {
                id: Date.now(),
                text: noteText.trim(),
                timestamp: new Date().toLocaleDateString()
            };

            // Add note to local state
            setNotes(prev => [...prev, newNote]);

            // Call parent callback if provided
            if (onAddNote) {
                onAddNote(investor.id, newNote);
            }

            // Reset form
            setNoteText('');
            setShowNoteInput(false);
        } catch (error) {
            console.error('Failed to add note:', error);
            alert('Failed to add note. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleCancelNote = () => {
        setNoteText('');
        setShowNoteInput(false);
    };

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
                            {investor.tags && investor.tags.map((tag) => (
                                <Badge key={tag} className="text-xs" variant="secondary">
                                    {tag}
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {/* right side */}
                <div className="text-right">
                    <p className="text-xs text-slate-500 mt-2 flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {investor.lastContact}
                    </p>
                </div>
            </div>

            {/* ───── status indicator ───── */}
            {selectedStatus && (
                <div className="mt-3 px-3 py-2 bg-white rounded-md border-l-4 border-l-blue-500">
                    <p className="text-sm font-medium text-slate-700">
                        Status: <span className="capitalize text-blue-600">{selectedStatus}</span>
                    </p>
                </div>
            )}

            {/* ───── existing notes ───── */}
            {notes.length > 0 && (
                <div className="mt-4 space-y-2">
                    <h4 className="text-sm font-medium text-slate-700">Notes:</h4>
                    {notes.map((note) => (
                        <div key={note.id} className="bg-white p-3 rounded-md border-l-4 border-l-blue-500">
                            <p className="text-sm text-slate-700">{note.text}</p>
                            <p className="text-xs text-slate-500 mt-1">{note.timestamp}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* ───── add note form ───── */}
            {showNoteInput && (
                <div className="mt-4 p-3 bg-white rounded-md border">
                    <textarea
                        value={noteText}
                        onChange={(e) => setNoteText(e.target.value)}
                        placeholder="Add a note about this investor..."
                        className="w-full p-2 border border-slate-300 rounded-md text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        rows={3}
                        disabled={isLoading}
                    />
                    <div className="flex justify-end space-x-2 mt-2">
                        <Button
                            variant="outline"
                            onClick={handleCancelNote}
                            disabled={isLoading}
                        >
                            <X className="h-4 w-4 mr-1" />
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={handleAddNote}
                            disabled={isLoading || !noteText.trim()}
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            {isLoading ? 'Adding...' : 'Add Note'}
                        </Button>
                    </div>
                </div>
            )}

            {/* ───── action buttons ───── */}
            <div className="flex justify-end space-x-2 mt-4">
                <Button
                    variant="outline"
                    onClick={() => setShowNoteInput(true)}
                    disabled={showNoteInput || isLoading}
                >
                    <Plus className="h-4 w-4 mr-1" />
                    Add Note
                </Button>
                <Button
                    variant="success"
                    isActive={selectedStatus === 'accepted'}
                    onClick={() => handleStatusChange('accepted')}
                    disabled={isLoading}
                >
                    {selectedStatus === 'accepted' ? 'Accepted ✓' : 'Accept'}
                </Button>
                <Button
                    variant="destructive"
                    isActive={selectedStatus === 'rejected'}
                    onClick={() => handleStatusChange('rejected')}
                    disabled={isLoading}
                >
                    {selectedStatus === 'rejected' ? 'Rejected ✗' : 'Reject'}
                </Button>
            </div>

            {isLoading && (
                <div className="mt-2 text-center">
                    <p className="text-xs text-slate-500">Updating status...</p>
                </div>
            )}
        </div>
    );
}

import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "../../Components/UI/Dialog";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";
import { Textarea } from "../../Components/UI/Textarea";
import { toast } from "sonner";
import axiosInstance from "../../../utils/axiosInstance";

export const FounderExpressInterest = ({ isOpen, onClose, startup }) => {
    const [formData, setFormData] = useState({
        name: "John Doe",
        email: "john.doe@email.com",
        message: "Tell them why you're interested in their startup...",
    });
    const [loading, setLoading] = useState(false);
    const [message, showMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        if (!token) return;

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            showMessage("Invalid email format"); return;
        }
        if (/\d/.test(formData.name.trim())) {
            showMessage("Name should not contain numbers"); return;
        }
        showMessage("");

        const requestData = {
            name: formData.name,
            email: formData.email,
            message: formData.message,
            startUpId: startup.startupId || startup.startupId
        };

        try {
            setLoading(true);
            await axiosInstance.post("/founder/mergeRequest", requestData, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            }
            );
            toast.success(`Interest request sent to ${startup.startUpName}!`);
            onClose();
            setFormData({ name: "", email: "", message: "" });
        } catch (err) {
            console.error("Express‑interest error:", err);
            toast.error("Failed to send request – please try again.");
            showMessage(`${err.response.data.error}`);
        } finally {
            setLoading(false);
        }
    };

    if (!startup) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="w-[95vw] max-w-md sm:max-w-lg mx-auto border-gray-300 max-h-[90vh] overflow-y-auto">
                <DialogHeader className="space-y-3 pb-4">
                    <DialogTitle className="text-lg sm:text-xl leading-tight pr-8">
                        Express Interest in {startup.startUpName}
                    </DialogTitle>
                    <DialogDescription className="text-sm sm:text-base text-gray-600 leading-relaxed">
                        Send a message to {startup.startUpName} expressing your interest
                        in their startup.
                    </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                    {message && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-3">
                            <p className="text-sm text-red-600">{message}</p>
                        </div>
                    )}

                    {/* Name and Email Grid - Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                                Your Name
                            </Label>
                            <Input
                                id="name"
                                placeholder={formData.name}
                                onChange={(e) =>
                                    setFormData({ ...formData, name: e.target.value })
                                }
                                required
                                className="border-gray-400 h-10 sm:h-11 text-sm sm:text-base"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                Email
                            </Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={formData.email}
                                onChange={(e) =>
                                    setFormData({ ...formData, email: e.target.value })
                                }
                                required
                                className="border-gray-400 h-10 sm:h-11 text-sm sm:text-base"
                            />
                        </div>
                    </div>

                    {/* Message Field */}
                    <div className="space-y-2">
                        <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                            Message (Optional)
                        </Label>
                        <Textarea
                            id="message"
                            placeholder={formData.message}
                            onChange={(e) =>
                                setFormData({ ...formData, message: e.target.value })
                            }
                            rows={4}
                            className="border-gray-400 text-sm sm:text-base resize-none min-h-[100px]"
                        />
                    </div>

                    {/* Action Buttons - Stack on mobile */}
                    <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3 pt-4">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onClose}
                            className="border-gray-400 h-10 sm:h-11 text-sm sm:text-base order-2 sm:order-1"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={loading}
                            className={`h-10 sm:h-11 text-sm sm:text-base font-semibold rounded-lg shadow-sm transition-all duration-200 order-1 sm:order-2 ${loading
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700"
                                } text-white`}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
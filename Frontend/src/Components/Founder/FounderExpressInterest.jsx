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
        <>

            <Dialog open={isOpen} onOpenChange={onClose}>
                <DialogContent className="sm:max-w-md border-gray-300">
                    <DialogHeader>
                        <DialogTitle >Express Interest in {startup.startUpName}</DialogTitle>
                        <DialogDescription>
                            Send a message to {startup.startUpName} expressing your interest
                            in their startup.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {message && (
                            <p className="text-xs text-red-500 -mt-1">{message}</p>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="name">Your Name</Label>
                                <Input
                                    id="name"
                                    placeholder={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                    required
                                    className="border-gray-400"
                                />
                            </div>
                            <div>
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                    className="border-gray-400"
                                />
                            </div>
                        </div>

                        <div>
                            <Label htmlFor="message">Message (Optional)</Label>
                            <Textarea
                                id="message"
                                placeholder={formData.message}
                                onChange={(e) =>
                                    setFormData({ ...formData, message: e.target.value })
                                }
                                rows={4}
                                className="border-gray-400"
                            />
                        </div>

                        <div className="flex justify-end space-x-2">
                            <Button type="button" variant="outline" onClick={onClose} className="border-gray-400">
                                Cancel
                            </Button>
                            <Button type="submit"
                                disabled={loading}
                                className={`flex-1 ${loading
                                    ? "bg-purple-400 cursor-not-allowed"
                                    : "bg-purple-600 hover:bg-purple-700"
                                    } text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200`}>
                                {loading ? "Submitting..." : "Submit"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

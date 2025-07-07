import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Shield, Loader2 } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";

const InvestorSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");

    // Password strength validation
    const validatePassword = (password) => {
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/(?=.*[@$!%*?&])/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    };

    const handleChangePassword = async () => {
        // Clear previous error
        setError("");

        // Validation checks
        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setError("All fields are required");
            return;
        }

        if (currentPassword === newPassword) {
            setError("New password must be different from current password");
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setError("New passwords do not match");
            return;
        }

        // Check password strength
        const passwordError = validatePassword(newPassword);
        if (passwordError) {
            setError(passwordError);
            return;
        }

        setIsLoading(true);

        try {
            const token = localStorage.getItem("token");

            const res = await axiosInstance.post(
                "/investor/changePassword",
                { currentPassword, newPassword },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success(res.data.message || "Password updated successfully");

            // Clear form
            setCurrentPassword("");
            setNewPassword("");
            setConfirmNewPassword("");
            setError("");
        } catch (error) {
            console.error("Password change error:", error);
            const errorMessage = error.response?.data?.error || error.response?.data?.message || "Password change failed";

            // Set error state with timeout
            setError(errorMessage);
            setTimeout(() => {
                setError("");
            }, 5000); // Clear error after 5 seconds

            // Also show toast for user feedback
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    // Clear error when user starts typing
    const handleInputChange = (setter) => (e) => {
        if (error) setError("");
        setter(e.target.value);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-4">
                    <div>
                        <h4 className="font-medium mb-2">Change Password</h4>
                        <div className="space-y-2">
                            <Input
                                type="password"
                                placeholder="Current password"
                                value={currentPassword}
                                onChange={handleInputChange(setCurrentPassword)}
                                disabled={isLoading}
                            />
                            <Input
                                type="password"
                                placeholder="New password"
                                value={newPassword}
                                onChange={handleInputChange(setNewPassword)}
                                disabled={isLoading}
                            />
                            <Input
                                type="password"
                                placeholder="Confirm new password"
                                value={confirmNewPassword}
                                onChange={handleInputChange(setConfirmNewPassword)}
                                disabled={isLoading}
                            />

                            {/* Error message display */}
                            {error && (
                                <div className="text-red-500 text-sm mt-2 p-2 bg-red-50 border border-red-200 rounded">
                                    {error}
                                </div>
                            )}

                            <Button
                                onClick={handleChangePassword}
                                className="bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                disabled={isLoading || !currentPassword || !newPassword || !confirmNewPassword}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Password"
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Password requirements */}
                    <div className="text-sm text-gray-600 mt-4">
                        <p className="font-medium mb-1">Password Requirements:</p>
                        <ul className="list-disc list-inside space-y-1 text-xs">
                            <li>At least 8 characters long</li>
                            <li>Contains uppercase and lowercase letters</li>
                            <li>Contains at least one number</li>
                            <li>Contains at least one special character (@$!%*?&)</li>
                        </ul>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InvestorSecurity;
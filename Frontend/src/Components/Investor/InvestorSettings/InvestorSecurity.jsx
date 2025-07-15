import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Shield, Loader2, Eye, EyeOff, Lock, CheckCircle, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";

const InvestorSecurity = () => {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false
    });

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

    // Get password strength requirements status
    const getPasswordRequirements = (password) => {
        return [
            { text: "At least 8 characters", met: password.length >= 8 },
            { text: "Uppercase letter", met: /(?=.*[A-Z])/.test(password) },
            { text: "Lowercase letter", met: /(?=.*[a-z])/.test(password) },
            { text: "Number", met: /(?=.*\d)/.test(password) },
            { text: "Special character", met: /(?=.*[@$!%*?&])/.test(password) }
        ];
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

    // Toggle password visibility
    const togglePasswordVisibility = (field) => {
        setShowPasswords(prev => ({
            ...prev,
            [field]: !prev[field]
        }));
    };

    const requirements = getPasswordRequirements(newPassword);

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <Shield className="w-5 h-5" />
                    <span>Account Security</span>
                </CardTitle>
            </CardHeader>
            
            <CardContent className="p-4 sm:p-6 space-y-6">
                <div className="space-y-6">
                    {/* Header Section */}
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                        <Lock className="w-5 h-5 text-blue-600 flex-shrink-0" />
                        <div>
                            <h4 className="font-medium text-blue-900">Change Password</h4>
                            <p className="text-sm text-blue-700">
                                Keep your account secure with a strong password
                            </p>
                        </div>
                    </div>

                    {/* Password Form */}
                    <div className="space-y-4">
                        {/* Current Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Current Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPasswords.current ? "text" : "password"}
                                    placeholder="Enter your current password"
                                    value={currentPassword}
                                    onChange={handleInputChange(setCurrentPassword)}
                                    disabled={isLoading}
                                    className="border-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('current')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.current ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* New Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                New Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPasswords.new ? "text" : "password"}
                                    placeholder="Enter your new password"
                                    value={newPassword}
                                    onChange={handleInputChange(setNewPassword)}
                                    disabled={isLoading}
                                    className="border-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('new')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.new ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Confirm New Password */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700">
                                Confirm New Password
                            </label>
                            <div className="relative">
                                <Input
                                    type={showPasswords.confirm ? "text" : "password"}
                                    placeholder="Confirm your new password"
                                    value={confirmNewPassword}
                                    onChange={handleInputChange(setConfirmNewPassword)}
                                    disabled={isLoading}
                                    className="border-gray-300 pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => togglePasswordVisibility('confirm')}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                >
                                    {showPasswords.confirm ? (
                                        <EyeOff className="w-4 h-4" />
                                    ) : (
                                        <Eye className="w-4 h-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="flex items-start gap-2 text-red-600 text-sm p-3 bg-red-50 border border-red-200 rounded-lg">
                                <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                                <span>{error}</span>
                            </div>
                        )}

                        {/* Password Requirements */}
                        {newPassword && (
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium text-gray-700 mb-3">
                                    Password Requirements:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                    {requirements.map((req, index) => (
                                        <div key={index} className="flex items-center gap-2 text-sm">
                                            {req.met ? (
                                                <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                                            ) : (
                                                <AlertCircle className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                            )}
                                            <span className={req.met ? "text-green-700" : "text-gray-600"}>
                                                {req.text}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <Button
                                onClick={handleChangePassword}
                                className="bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed w-full sm:w-auto transition-colors"
                                disabled={isLoading || !currentPassword || !newPassword || !confirmNewPassword}
                            >
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Updating Password...
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-4 h-4 mr-2" />
                                        Update Password
                                    </>
                                )}
                            </Button>
                        </div>
                    </div>

                    {/* Security Tips */}
                    <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                        <div className="flex items-start gap-2">
                            <Shield className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                            <div>
                                <h5 className="text-sm font-medium text-yellow-800 mb-1">
                                    Security Tips
                                </h5>
                                <ul className="text-xs text-yellow-700 space-y-1">
                                    <li>• Use a unique password that you don't use elsewhere</li>
                                    <li>• Consider using a password manager for better security</li>
                                    <li>• Never share your password with anyone</li>
                                    <li>• Update your password regularly</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default InvestorSecurity;
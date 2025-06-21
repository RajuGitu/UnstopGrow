import { useState } from "react";
import axiosInstance from "../../utils/axiosInstance"; // adjust as needed
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { Link } from "react-router-dom";

const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [answer, setAnswer] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("Select Role");
    const [message, setMessage] = useState("");
    const roles = ['Founder', 'Investor', 'Supporter'];
    const [loading, setLoading] = useState(false);

    const isStrongPassword = (newPassword) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return pattern.test(newPassword);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (selectedRole === "Select Role" || !email || !newPassword || !answer) {
            alert("Invalid email format or password");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Invalid email format");
            return;
        }

        if (!isStrongPassword(newPassword)) {
            setMessage("Password must be 8+ characters, include uppercase, number, and symbol");
            return;
        }
        const role = selectedRole.toLowerCase();
        try {
            setLoading(true);
            let endpoint = "";
            switch (role) {
                case "founder":
                    endpoint = "/founder/forgot-password";
                    break;
                case "investor":
                    endpoint = "/investor/forgot-password";
                    break;
                case "supporter":
                    endpoint = "/supporter/forgot-password";
                    break;
                default:
                    throw new Error("Invalid role selected");
            }
            const res = await axiosInstance.post(endpoint, { email, answer, newPassword }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });
            setMessage("Password reset successful! Please login.");
            setLoading(false);
        } catch (err) {
            setMessage(err.response?.data?.error || "Something went wrong");
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-2xl shadow-md w-full max-w-md">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
                    Reset Your Password
                </h2>
                <Menu as="div" className="relative inline-block text-left w-full">
                    <div>
                        <MenuButton className="inline-flex w-full justify-between items-center rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            {selectedRole}
                            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-purple-500" />
                        </MenuButton>
                    </div>

                    <MenuItems className="absolute mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/10 focus:outline-none z-10">
                        <div className="py-1">
                            {roles.map((role) => (
                                <MenuItem key={role}>
                                    {({ active }) => (
                                        <button
                                            onClick={() => setSelectedRole(role)}
                                            className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-700'
                                                }`}
                                        >
                                            {role}
                                        </button>
                                    )}
                                </MenuItem>
                            ))}
                        </div>
                    </MenuItems>
                </Menu>

                {message && (
                    <p className={`text-center mb-4 ${message.includes("success") ? "text-green-600" : "text-red-600"}`}>
                        {message}
                    </p>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">Friends Name</label>
                        <input
                            type="text"
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Friends Name"
                            required
                        />
                    </div>

                    <div className="flex flex-col">
                        <label className="mb-1 text-gray-700">New Password:</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your new password"
                            required
                        />
                    </div>
                    {selectedRole !== "Select Role" && (
                        <button type="submit" disabled={loading} className={`... ${loading ? 'bg-purple-400  cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'}text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200 `}>
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </button>
                    )}

                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Login
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ForgetPassword;

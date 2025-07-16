import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axiosInstance from '../../utils/axiosInstance';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [selectedRole, setSelectedRole] = useState("Select Role");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const roles = ['Founder', 'Investor', 'Supporter'];

    // Demo credentials
    const demoCredentials = {
        Founder: {
            email: "aarav@ecowave.com",
            password: "Hashedpassword1@"
        },
        Investor: {
            email: "simranyelave064@gmail.com",
            password: "Simran123@"
        },
        Supporter: {
            email: "rajg05457@gmail.com",
            password: "Rajg05457@"
        }
    };

    const handleDemoLogin = (role) => {
        setSelectedRole(role);
        setEmail(demoCredentials[role].email);
        setPassword(demoCredentials[role].password);
        setMessage("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Clear previous messages
        setMessage("");

        // Validation
        if (selectedRole === "Select Role" || !email || !password) {
            setMessage("Please select a role and fill in all fields");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setMessage("Invalid email format");
            return;
        }

        const role = selectedRole.toLowerCase();

        try {
            setLoading(true);

            // Determine endpoint
            let endpoint = "";
            switch (role) {
                case "founder":
                    endpoint = "/founder/login";
                    break;
                case "investor":
                    endpoint = "/investor/login";
                    break;
                case "supporter":
                    endpoint = "/supporter/login";
                    break;
                default:
                    throw new Error("Invalid role selected");
            }

            console.log(`Attempting login for ${role} at endpoint: ${endpoint}`);

            const res = await axiosInstance.post(endpoint, { email, password }, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true
            });

            console.log("Login response:", res.data);

            // Check if response contains required data
            if (!res.data.token || !res.data.userId) {
                throw new Error("Invalid response from server");
            }

            const { token, userId } = res.data;

            // Store authentication data
            localStorage.setItem("token", token);
            localStorage.setItem("authUser", userId);

            console.log("Authentication data stored, navigating to dashboard...");

            // Navigate to appropriate dashboard
            switch (role) {
                case "founder":
                    navigate("/founder", { replace: true });
                    break;
                case "investor":
                    navigate("/investor", { replace: true });
                    break;
                case "supporter":
                    navigate("/supporter", { replace: true });
                    break;
            }

            setMessage(`${selectedRole} logged in successfully`);

        } catch (error) {
            console.error(`${role} login failed:`, error);

            // Better error handling
            if (error.response?.data?.message) {
                setMessage(error.response.data.message);
            } else if (error.response?.data?.error) {
                setMessage(error.response.data.error);
            } else if (error.message) {
                setMessage(error.message);
            } else {
                setMessage("Login failed. Please try again.");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100 p-4">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center space-y-6">
                <form onSubmit={handleSubmit} className="w-full space-y-4">
                    {/* Heading */}
                    <h2 className="text-2xl font-bold text-purple-700 text-center">Login</h2>

                    {/* Demo Credentials Section */}
                    <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-purple-200">
                        <h3 className="text-sm font-semibold text-purple-800 mb-3 text-center">
                            🚀 Experience UnstopGrow - Try Demo
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            {roles.map((role) => (
                                <button
                                    key={role}
                                    type="button"
                                    onClick={() => handleDemoLogin(role)}
                                    className="bg-white hover:bg-purple-50 text-purple-700 font-medium py-2 px-3 rounded-md shadow-sm border border-purple-200 hover:border-purple-300 transition-all duration-200 text-xs sm:text-sm"
                                >
                                    {role}
                                </button>
                            ))}
                        </div>
                        <p className="text-xs text-purple-600 mt-2 text-center">
                            Click any role to auto-fill demo credentials
                        </p>
                    </div>

                    {/* Message Display */}
                    {message && (
                        <div className={`p-3 rounded-md ${message.includes('successfully')
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            {message}
                        </div>
                    )}

                    {/* Dropdown */}
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
                                                type="button"
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

                    {/* Email */}
                    <div className="w-full">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@example.com"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                        />
                    </div>

                    {/* Password */}
                    <div className="w-full">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            className="w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                        />
                    </div>

                    {/* Submit Button */}
                    {selectedRole !== "Select Role" && (
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-2 w-full ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                                } text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200`}
                        >
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    )}

                </form>
                <div className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/forgot-password" className="text-blue-600 hover:underline">
                        Forgot Password?
                    </Link>
                    <span className="mx-2">|</span>
                    <Link to="/signup" className="text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
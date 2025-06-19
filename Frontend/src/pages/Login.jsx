import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

const Login = () => {
    const [selectedRole, setSelectedRole] = useState("Select Role");

    const roles = ['Founder', 'Investor', 'Supporter'];

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-100 to-blue-100">
            <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center space-y-6">

                {/* Heading */}
                <h2 className="text-2xl font-bold text-purple-700">Login</h2>

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
                        id="email"
                        placeholder="you@example.com"
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
                        id="password"
                        placeholder="••••••••"
                        className="w-full rounded-md border border-gray-300 p-2 focus:ring-purple-500 focus:border-purple-500 shadow-sm"
                    />
                </div>

                {/* Submit Button */}
                <button className="mt-2 w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200">
                    Submit
                </button>
            </div>
        </div>
    );
};

export default Login;

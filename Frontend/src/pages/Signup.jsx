import { useState } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Link } from 'react-router-dom';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import axiosInstance from '../../utils/axiosInstance';

const Signup = () => {
    const [selectedRole, setSelectedRole] = useState("Select Role");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const role = selectedRole.toLowerCase();
        const data = formData[role];

        const form = new FormData();
        for (const key in data) {
            if (key === "file" && data[key]) {
                form.append("file", data[key]);
            } else {
                form.append(key, data[key]);
            }
        }
        if (!isStrongPassword(data.password)) {
            alert("Password must be 8+ characters, include uppercase, number, and symbol");
            return;
        }
        if (data.password !== data.confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            alert("Invalid email format");
            return;
        }
        if ((role === "founder" || role === "investor") && !/^\d{12}$/.test(data.aadhaar)) {
            alert("Aadhaar must be exactly 12 digits");
            return;
        }
        if ((role === "founder" || role === "investor") && !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pancard.toUpperCase())) {
            alert("Invalid PAN format");
            return;
        }
        if ((role === "founder" || role === "investor") && !data.file) {
            alert("Please upload a PDF document (max 5MB)");
            return;
        }

        try {
            setLoading(true);
            let endpoint = "";
            switch (role) {
                case "founder":
                    endpoint = "/founder/register";
                    break;
                case "investor":
                    endpoint = "/investor/register";
                    break;
                case "supporter":
                    endpoint = "/supporter/register";
                    break;
                default:
                    throw new Error("Invalid role selected");
            }

            const res = await axiosInstance.post(endpoint, form, {
                headers: { "Content-Type": "multipart/form-data" },
                withCredentials: true
            });

            alert(`${role} registered successfully`);
            console.log(res.data);
            setLoading(false);
        } catch (error) {
            console.error(`${role} registration failed:`, error.response?.data || error.message);
            alert("Error during registration");
            setLoading(false);
        }
    };

    const [formData, setFormData] = useState({
        founder: {
            companyName: "",
            ownerName: "",
            email: "",
            password: "",
            confirmPassword: "",
            aadhaar: "",
            pancard: "",
            linkedin: "",
            proof: "",
            answer: "",
            file: null,
        },
        investor: {
            investorName: "",
            email: "",
            password: "",
            confirmPassword: "",
            pastInvestment: "",
            linkedin: "",
            aadhaar: "",
            pancard: "",
            answer: "",
            file: null,
        },
        supporter: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            answer: "",
        },
    });

    const isStrongPassword = (password) => {
        const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
        return pattern.test(password);
    };

    const handleChange = (role, field, value) => {
        setFormData((prev) => ({
            ...prev,
            [role]: {
                ...prev[role],
                [field]: value,
            },
        }));
    };

    const handleFileChange = (role, file) => {
        if (file && file.size <= 5 * 1024 * 1024 && file.type === "application/pdf") {
            handleChange(role, "file", file);
        } else {
            alert("Please upload a valid PDF file less than 5 MB");
        }
    };

    const roles = ["Founder", "Investor", "Supporter"];

    const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500";
    const labelClass = "block mb-1 text-sm font-medium text-gray-700";

    const renderInput = (label, type, value, onChange, required = true) => (
        <div className="w-full">
            <label className={labelClass}>{label}</label>
            <input type={type} value={value} onChange={onChange} required={required} className={inputClass} />
        </div>
    );

    const renderFounderFields = () => {
        const f = formData.founder;
        return (
            <>
                {renderInput("Company Name", "text", f.companyName, (e) => handleChange("founder", "companyName", e.target.value))}
                {renderInput("Owner Name", "text", f.ownerName, (e) => handleChange("founder", "ownerName", e.target.value))}

                {/\d/.test(f.ownerName) && f.ownerName && (
                    <p className="text-xs text-red-500">Name should not contain numbers</p>
                )}

                {renderInput("Email", "email", f.email, (e) => handleChange("founder", "email", e.target.value))}
                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) && f.email && (
                    <p className="text-xs text-red-500">Please enter a valid email</p>
                )}

                {renderInput("Password", "password", f.password, (e) => handleChange("founder", "password", e.target.value))}
                {!isStrongPassword(f.password) && f.password && (
                    <p className="text-xs text-red-500 -mt-2">
                        Password must include uppercase, number, symbol & be 8+ chars.
                    </p>
                )}

                {renderInput("Confirm Password", "password", f.confirmPassword, (e) => handleChange("founder", "confirmPassword", e.target.value))}
                {f.password !== f.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                )}

                {renderInput("Aadhaar Card", "text", f.aadhaar, (e) => handleChange("founder", "aadhaar", e.target.value))}
                {!/^\d{12}$/.test(f.aadhaar) && f.aadhaar && (
                    <p className="text-xs text-red-500">Aadhaar must be exactly 12 digits</p>
                )}

                {renderInput("PAN Card", "text", f.pancard, (e) => handleChange("founder", "pancard", e.target.value))}
                {!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(f.pancard.toUpperCase()) && f.pancard && (
                    <p className="text-xs text-red-500">Invalid PAN format (e.g., ABCDE1234F)</p>
                )}

                {renderInput("LinkedIn or Other Profile", "url", f.linkedin, (e) => handleChange("founder", "linkedin", e.target.value))}
                {renderInput("Write Your Friends Name", "text", f.answer, (e) => handleChange("founder", "answer", e.target.value))}
                {renderInput("Startup Proof Description", "text", f.proof, (e) => handleChange("founder", "proof", e.target.value))}

                <div className="w-full">
                    <label className={labelClass}>Upload PDF Document (max 5 MB)</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        className={inputClass}
                        onChange={(e) => handleFileChange("founder", e.target.files[0])}
                    />
                </div>

            </>
        );
    };

    const renderInvestorFields = () => {
        const i = formData.investor;
        return (
            <>
                {renderInput("Investor Name", "text", i.investorName, (e) =>
                    handleChange("investor", "investorName", e.target.value)
                )}
                {/[\d]/.test(i.investorName) && i.investorName && (
                    <p className="text-xs text-red-500">Name should not contain numbers</p>
                )}

                {renderInput("Email", "email", i.email, (e) =>
                    handleChange("investor", "email", e.target.value)
                )}
                {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email) && i.email && (
                    <p className="text-xs text-red-500">Please enter a valid email</p>
                )}

                {renderInput("Password", "password", i.password, (e) =>
                    handleChange("investor", "password", e.target.value)
                )}
                {!isStrongPassword(i.password) && i.password && (
                    <p className="text-xs text-red-500 -mt-2">
                        Password must include uppercase, number, symbol & be 8+ chars.
                    </p>
                )}

                {renderInput("Confirm Password", "password", i.confirmPassword, (e) =>
                    handleChange("investor", "confirmPassword", e.target.value)
                )}
                {i.password !== i.confirmPassword && (
                    <p className="text-xs text-red-500">Passwords do not match</p>
                )}

                {renderInput("Past Investments", "text", i.pastInvestment, (e) =>
                    handleChange("investor", "pastInvestment", e.target.value)
                )}

                {renderInput("LinkedIn or Other Profile", "url", i.linkedin, (e) =>
                    handleChange("investor", "linkedin", e.target.value)
                )}

                {renderInput("Aadhaar Card", "text", i.aadhaar, (e) =>
                    handleChange("investor", "aadhaar", e.target.value)
                )}
                {!/^\d{12}$/.test(i.aadhaar) && i.aadhaar && (
                    <p className="text-xs text-red-500">Aadhaar must be exactly 12 digits</p>
                )}

                {renderInput("PAN Card", "text", i.pancard, (e) =>
                    handleChange("investor", "pancard", e.target.value)
                )}
                {!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(i.pancard.toUpperCase()) && i.pancard && (
                    <p className="text-xs text-red-500">Invalid PAN format (e.g., ABCDE1234F)</p>
                )}
                {renderInput("Write Your Friends Name", "text", i.answer, (e) => handleChange("investor", "answer", e.target.value))}
                <div className="w-full">
                    <label className={labelClass}>Upload PDF Document (max 5 MB)</label>
                    <input
                        type="file"
                        accept="application/pdf"
                        className={inputClass}
                        onChange={(e) => handleFileChange("investor", e.target.files[0])}
                    />
                </div>
            </>
        );
    };

    const renderSupporterFields = () => {
        const s = formData.supporter;
        return (
            <>
                {renderInput("Username", "text", s.username, (e) => handleChange("supporter", "username", e.target.value))}
                {renderInput("Email", "email", s.email, (e) => handleChange("supporter", "email", e.target.value))}
                {renderInput("Password", "password", s.password, (e) => handleChange("supporter", "password", e.target.value))}
                {!isStrongPassword(s.password) && s.password && (
                    <p className="text-xs text-red-500 -mt-2">
                        Password must include uppercase, number, symbol & be 8+ chars.
                    </p>
                )}
                {renderInput("Confirm Password", "password", s.confirmPassword, (e) => handleChange("supporter", "confirmPassword", e.target.value))}
                {renderInput("Write Your Friends Name", "text", s.answer, (e) => handleChange("supporter", "answer", e.target.value))}
                {s.password !== s.confirmPassword && <p className="text-xs text-red-500">Passwords do not match</p>}
            </>
        );
    };

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left - Form */}
            <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-12">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4">
                    <h2 className="text-2xl font-bold text-center text-purple-700">Signup</h2>

                    {/* Role Dropdown */}
                    <Menu as="div" className="relative inline-block w-full">
                        <MenuButton className="inline-flex w-full justify-between items-center rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500">
                            {selectedRole}
                            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-purple-500" />
                        </MenuButton>
                        <MenuItems className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/10">
                            <div className="py-1">
                                {roles.map((role) => (
                                    <MenuItem key={role}>
                                        {({ active }) => (
                                            <button
                                                type="button"
                                                onClick={() => setSelectedRole(role)}
                                                className={`w-full text-left px-4 py-2 text-sm ${active ? 'bg-purple-100 text-purple-900' : 'text-gray-700'}`}
                                            >
                                                {role}
                                            </button>
                                        )}
                                    </MenuItem>
                                ))}
                            </div>
                        </MenuItems>
                    </Menu>

                    {/* Form Fields */}
                    {selectedRole === "Founder" && renderFounderFields()}
                    {selectedRole === "Investor" && renderInvestorFields()}
                    {selectedRole === "Supporter" && renderSupporterFields()}

                    {/* Submit */}
                    {selectedRole !== "Select Role" && (
                        <button
                            type="submit"
                            disabled={loading}
                            className={`mt-2 w-full ${loading ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
                                } text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200`}
                        >
                            {loading ? 'Submitting...' : 'Submit'}
                        </button>
                    )}
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    <Link to="/login" className="text-blue-600 hover:underline">
                        Already have an account? Login
                    </Link>
                </div>
            </div>

            {/* Right - Image */}
            <div className="md:flex md:w-1/2 items-center justify-center p-3 bg-gradient-to-br from-white to-gray-100">
                <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-lg max-w-[90%] h-[90%]">
                    <img
                        src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                        alt="Side visual"
                        className="object-cover w-full h-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default Signup;
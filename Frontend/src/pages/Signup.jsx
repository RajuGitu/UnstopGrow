import { useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { X, Check, Upload, AlertCircle } from "lucide-react";
import axiosInstance from "../../utils/axiosInstance";

const Signup = () => {
  const [selectedRole, setSelectedRole] = useState("Select Role");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'error' or 'success'

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);

  const showMessage = (msg, type = "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 5000);
  };

  const resetForm = () => {
    setFormData(initialFormData);
    setSelectedRole("Select Role");
    setMessage("");
    setMessageType("");
  };

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

    // Validation
    if (!isStrongPassword(data.password)) {
      showMessage("Password must be 8+ characters, include uppercase, number, and symbol");
      return;
    }
    if (data.password !== data.confirmPassword) {
      showMessage("Passwords do not match");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      showMessage("Invalid email format");
      return;
    }
    if (
      (role === "founder" || role === "investor") &&
      !/^\d{12}$/.test(data.aadhaar)
    ) {
      showMessage("Aadhaar must be exactly 12 digits");
      return;
    }
    if (
      (role === "founder" || role === "investor") &&
      !/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pancard.toUpperCase())
    ) {
      showMessage("Invalid PAN format");
      return;
    }
    if ((role === "founder" || role === "investor") && !data.file) {
      showMessage("Please upload a PDF document (max 5MB)");
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
        withCredentials: true,
      });

      localStorage.setItem("authUser", res.data.userId);
      localStorage.setItem("token", res.data.token);

      showMessage("Registration successful! Redirecting...", "success");
      
      setTimeout(() => {
        switch (role) {
          case "founder":
            navigate("/founder/dashboard");
            break;
          case "investor":
            navigate("/investor/dashboard");
            break;
          case "supporter":
            navigate("/supporter");
            break;
        }
      }, 1500);

    } catch (error) {
      const res = error.response;
      if (res?.status === 409) {
        showMessage(res.data.error);
        return;
      }
      console.error(`${role} registration failed:`, error.response?.data || error.message);
      showMessage(error.response?.data?.error || "Error during registration");
    } finally {
      setLoading(false);
    }
  };

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
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      showMessage("File size must be less than 5MB");
      return;
    }
    
    if (file.type !== "application/pdf") {
      showMessage("Please upload a valid PDF file");
      return;
    }
    
    handleChange(role, "file", file);
  };

  const removeFile = (role) => {
    handleChange(role, "file", null);
  };

  const roles = ["Founder", "Investor", "Supporter"];

  const inputClass = "w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all";
  const labelClass = "block mb-1 text-sm font-medium text-gray-700";

  const renderInput = (label, type, value, onChange, required = true) => (
    <div className="w-full">
      <label className={labelClass}>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        className={inputClass}
      />
    </div>
  );

  const renderFileUpload = (role, currentFile) => (
    <div className="w-full">
      <label className={labelClass}>Upload PDF Document (max 5 MB)</label>
      
      {!currentFile ? (
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            accept="application/pdf"
            id={`file-${role}`}
            className="hidden"
            onChange={(e) => handleFileChange(role, e.target.files[0])}
          />
          <label htmlFor={`file-${role}`} className="cursor-pointer">
            <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-600">Click to upload PDF</p>
            <p className="text-xs text-gray-500">Max 5MB</p>
          </label>
        </div>
      ) : (
        <div className="border-2 border-green-300 bg-green-50 rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-1 bg-green-100 rounded-full">
                <Check className="h-3 w-3 text-green-600" />
              </div>
              <div>
                <p className="text-xs font-medium text-green-800">
                  {currentFile.name}
                </p>
                <p className="text-xs text-green-600">
                  {(currentFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => removeFile(role)}
              className="p-1 hover:bg-red-100 rounded-full transition-colors"
              title="Remove file"
            >
              <X className="h-3 w-3 text-red-500" />
            </button>
          </div>
        </div>
      )}
    </div>
  );

  const renderFounderFields = () => {
    const f = formData.founder;
    return (
      <>
        {renderInput("Company Name", "text", f.companyName, (e) =>
          handleChange("founder", "companyName", e.target.value)
        )}
        {renderInput("Owner Name", "text", f.ownerName, (e) =>
          handleChange("founder", "ownerName", e.target.value)
        )}
        {/\d/.test(f.ownerName) && f.ownerName && (
          <p className="text-xs text-red-500 -mt-1">Name should not contain numbers</p>
        )}

        {renderInput("Email", "email", f.email, (e) =>
          handleChange("founder", "email", e.target.value)
        )}
        {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email) && f.email && (
          <p className="text-xs text-red-500 -mt-1">Please enter a valid email</p>
        )}

        {renderInput("Password", "password", f.password, (e) =>
          handleChange("founder", "password", e.target.value)
        )}
        {!isStrongPassword(f.password) && f.password && (
          <p className="text-xs text-red-500 -mt-1">
            Password must include uppercase, number, symbol & be 8+ chars.
          </p>
        )}

        {renderInput("Confirm Password", "password", f.confirmPassword, (e) =>
          handleChange("founder", "confirmPassword", e.target.value)
        )}
        {f.password !== f.confirmPassword && f.confirmPassword && (
          <p className="text-xs text-red-500 -mt-1">Passwords do not match</p>
        )}

        {renderInput("Aadhaar Card", "text", f.aadhaar, (e) =>
          handleChange("founder", "aadhaar", e.target.value)
        )}
        {!/^\d{12}$/.test(f.aadhaar) && f.aadhaar && (
          <p className="text-xs text-red-500 -mt-1">Aadhaar must be exactly 12 digits</p>
        )}

        {renderInput("PAN Card", "text", f.pancard, (e) =>
          handleChange("founder", "pancard", e.target.value)
        )}
        {!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(f.pancard.toUpperCase()) && f.pancard && (
          <p className="text-xs text-red-500 -mt-1">Invalid PAN format (e.g., ABCDE1234F)</p>
        )}

        {renderInput("LinkedIn or Other Profile", "url", f.linkedin, (e) =>
          handleChange("founder", "linkedin", e.target.value)
        )}
        {renderInput("Write Your Friends Name", "text", f.answer, (e) =>
          handleChange("founder", "answer", e.target.value)
        )}
        {renderInput("Startup Proof Description", "text", f.proof, (e) =>
          handleChange("founder", "proof", e.target.value)
        )}

        {renderFileUpload("founder", f.file)}
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
          <p className="text-xs text-red-500 -mt-1">Name should not contain numbers</p>
        )}

        {renderInput("Email", "email", i.email, (e) =>
          handleChange("investor", "email", e.target.value)
        )}
        {!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(i.email) && i.email && (
          <p className="text-xs text-red-500 -mt-1">Please enter a valid email</p>
        )}

        {renderInput("Password", "password", i.password, (e) =>
          handleChange("investor", "password", e.target.value)
        )}
        {!isStrongPassword(i.password) && i.password && (
          <p className="text-xs text-red-500 -mt-1">
            Password must include uppercase, number, symbol & be 8+ chars.
          </p>
        )}

        {renderInput("Confirm Password", "password", i.confirmPassword, (e) =>
          handleChange("investor", "confirmPassword", e.target.value)
        )}
        {i.password !== i.confirmPassword && i.confirmPassword && (
          <p className="text-xs text-red-500 -mt-1">Passwords do not match</p>
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
          <p className="text-xs text-red-500 -mt-1">Aadhaar must be exactly 12 digits</p>
        )}

        {renderInput("PAN Card", "text", i.pancard, (e) =>
          handleChange("investor", "pancard", e.target.value)
        )}
        {!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(i.pancard.toUpperCase()) && i.pancard && (
          <p className="text-xs text-red-500 -mt-1">Invalid PAN format (e.g., ABCDE1234F)</p>
        )}

        {renderInput("Write Your Friends Name", "text", i.answer, (e) =>
          handleChange("investor", "answer", e.target.value)
        )}

        {renderFileUpload("investor", i.file)}
      </>
    );
  };

  const renderSupporterFields = () => {
    const s = formData.supporter;
    return (
      <>
        {renderInput("Username", "text", s.username, (e) =>
          handleChange("supporter", "username", e.target.value)
        )}
        {renderInput("Email", "email", s.email, (e) =>
          handleChange("supporter", "email", e.target.value)
        )}
        {renderInput("Password", "password", s.password, (e) =>
          handleChange("supporter", "password", e.target.value)
        )}
        {!isStrongPassword(s.password) && s.password && (
          <p className="text-xs text-red-500 -mt-1">
            Password must include uppercase, number, symbol & be 8+ chars.
          </p>
        )}
        {renderInput("Confirm Password", "password", s.confirmPassword, (e) =>
          handleChange("supporter", "confirmPassword", e.target.value)
        )}
        {s.password !== s.confirmPassword && s.confirmPassword && (
          <p className="text-xs text-red-500 -mt-1">Passwords do not match</p>
        )}
        {renderInput("Write Your Friends Name", "text", s.answer, (e) =>
          handleChange("supporter", "answer", e.target.value)
        )}
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center justify-center bg-gradient-to-r from-purple-100 to-blue-100 px-6 py-12">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md space-y-4 max-h-[90vh] overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-center text-purple-700">
            Signup
          </h2>

          {/* Role Dropdown */}
          <Menu as="div" className="relative inline-block w-full">
            <MenuButton className="inline-flex w-full justify-between items-center rounded-lg bg-purple-100 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all">
              {selectedRole}
              <ChevronDownIcon
                aria-hidden="true"
                className="ml-2 h-5 w-5 text-purple-500"
              />
            </MenuButton>
            <MenuItems className="absolute z-10 mt-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black/10">
              <div className="py-1">
                {roles.map((role) => (
                  <MenuItem key={role}>
                    {({ active }) => (
                      <button
                        type="button"
                        onClick={() => setSelectedRole(role)}
                        className={`w-full text-left px-4 py-2 text-sm transition-colors ${
                          active
                            ? "bg-purple-100 text-purple-900"
                            : "text-gray-700"
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

          {/* Message Display */}
          {message && (
            <div className={`flex items-start space-x-2 p-3 rounded-lg text-sm ${
              messageType === "success" 
                ? "bg-green-50 text-green-700 border border-green-200" 
                : "bg-red-50 text-red-700 border border-red-200"
            }`}>
              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}

          {/* Form Fields */}
          {selectedRole === "Founder" && renderFounderFields()}
          {selectedRole === "Investor" && renderInvestorFields()}
          {selectedRole === "Supporter" && renderSupporterFields()}

          {/* Submit */}
          {selectedRole !== "Select Role" && (
            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={loading}
                className={`flex-1 ${
                  loading
                    ? "bg-purple-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                } text-white font-semibold py-2 rounded-lg shadow-sm transition-all duration-200`}
              >
                {loading ? "Submitting..." : "Submit"}
              </button>
              
              <button
                type="button"
                onClick={resetForm}
                disabled={loading}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-all duration-200 disabled:opacity-50"
              >
                Reset
              </button>
            </div>
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
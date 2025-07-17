import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, X } from "lucide-react";

// Mock toast for demo purposes
const toast = {
    error: (message) => console.error('Error:', message),
    success: (message) => console.log('Success:', message),
    info: (message) => console.log('Info:', message)
};

// Mock axios instance for demo
const axiosInstance = {
    get: async (url, config) => {
        // Simulate API response
        return {
            data: {
                success: true,
                data: {
                    username: "john_doe",
                    email: "john@example.com",
                    location: "New York, USA",
                    image: ""
                }
            }
        };
    },
    put: async (url, data, config) => {
        // Simulate successful update
        return { data: { success: true } };
    },
    delete: async (url, config) => {
        return { data: { success: true } };
    }
};

const SupporterProfileCard = () => {
    const [profile, setProfile] = useState({
        username: "",
        email: "",
        location: "",
        image: "",
    });

    // Store original profile data for comparison
    const [originalProfile, setOriginalProfile] = useState({
        username: "",
        email: "",
        location: "",
        image: "",
    });

    const [imageFile, setImageFile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const fileInputRef = useRef(null);

    const getImageURL = (imagePath) => {
        if (!imagePath) return null;
        try {
            const parsed = JSON.parse(imagePath);
            return parsed.url;
        } catch (error) {
            console.error('Error parsing image path:', error);
            return null;
        }
    };

    const removeImage = () => {
        if (imageFile?.preview) {
            URL.revokeObjectURL(imageFile.preview);
        }
        setImageFile(null);
        
        // If there was an original image, mark it for deletion
        if (originalProfile.image) {
            setProfile(prev => ({
                ...prev,
                image: ""
            }));
        }
    };

    const fetchProfile = async () => {
        try {
            // Mock token check
            const token = "mock-token";
            if (!token) {
                toast.error("No authentication token found");
                return;
            }

            const res = await axiosInstance.get("/supporter/supporterProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success && res.data.data) {
                const data = Array.isArray(res.data.data) ? res.data.data[0] : res.data.data;
                const profileData = {
                    username: data?.username || "",
                    email: data?.email || "",
                    location: data?.location || "",
                    image: data?.image || "",
                };

                setProfile(profileData);
                setOriginalProfile(profileData);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
            toast.error("Failed to load profile info");
        } finally {
            setLoading(false);
        }
    };

    // Check if profile has changed
    const hasProfileChanged = () => {
        const fieldsChanged = profile.username !== originalProfile.username ||
            profile.location !== originalProfile.location;

        const imageChanged = imageFile !== null; // New image selected
        const imageDeleted = profile.image !== originalProfile.image; // Existing image removed

        return fieldsChanged || imageChanged || imageDeleted;
    };

    // Validate form data
    const validateProfile = () => {
        if (!profile.username.trim()) {
            toast.error("Username is required");
            return false;
        }

        if (!profile.email.trim()) {
            toast.error("Email is required");
            return false;
        }

        // Basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(profile.email)) {
            toast.error("Please enter a valid email address");
            return false;
        }

        // Check image file size (2MB limit)
        if (imageFile?.file && imageFile.file.size > 2 * 1024 * 1024) {
            toast.error("Image size should be less than 2MB");
            return false;
        }

        return true;
    };

    const handleSaveProfile = async () => {
        // Check if there are any changes
        if (!hasProfileChanged()) {
            toast.info("No changes detected");
            return;
        }

        // Validate the form
        if (!validateProfile()) {
            return;
        }

        setSaving(true);
        try {
            const token = "mock-token";
            if (!token) {
                toast.error("No authentication token found");
                return;
            }

            const formData = new FormData();
            formData.append("username", profile.username.trim());
            formData.append("location", profile.location.trim());

            // If there's a new image file, add it to form data
            if (imageFile?.file) {
                formData.append("image", imageFile.file);
            }

            const res = await axiosInstance.put("/supporter/supporterProfile", formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            if (res.data.success) {
                toast.success("Profile updated successfully!");
                
                // Clear the temporary image file since it's now saved
                if (imageFile?.preview) {
                    URL.revokeObjectURL(imageFile.preview);
                }
                setImageFile(null);
                
                // Refresh profile data from server
                await fetchProfile(); 
            } else {
                toast.error(res.data.message || "Profile update failed");
            }
        } catch (error) {
            console.error("Profile update failed:", error);
            if (error.response?.data?.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("Profile update failed");
            }
        } finally {
            setSaving(false);
        }
    };

    const deleteExistingImage = async () => {
        try {
            const token = "mock-token";
            if (!token) {
                toast.error("No authentication token found");
                return false;
            }

            const res = await axiosInstance.delete("/supporter/supporterProfile", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (res.data.success) {
                return true;
            } else {
                toast.error(res.data.message || "Failed to delete existing image");
                return false;
            }
        } catch (error) {
            console.error("Error deleting existing image:", error);
            toast.error("Failed to delete existing image");
            return false;
        }
    };

    const handleImageUpload = async (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith("image/")) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (2MB limit)
        if (file.size > 2 * 1024 * 1024) {
            toast.error("Image size should be less than 2MB");
            return;
        }

        // Clean up previous preview
        if (imageFile?.preview) {
            URL.revokeObjectURL(imageFile.preview);
        }

        // Create new preview
        const preview = URL.createObjectURL(file);
        setImageFile({ file, preview });

        // Clear the existing profile image to show the new preview
        setProfile(prev => ({
            ...prev,
            image: ""
        }));

        toast.success("New image selected successfully");
        
        // Reset the file input to allow selecting the same file again
        e.target.value = '';
    };

    const handleInputChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageError = (e) => {
        e.target.style.display = 'none';
        const fallback = e.target.nextElementSibling;
        if (fallback) {
            fallback.style.display = 'flex';
        }
    };

    useEffect(() => {
        fetchProfile();

        // Cleanup function to revoke object URLs on unmount
        return () => {
            if (imageFile?.preview) {
                URL.revokeObjectURL(imageFile.preview);
            }
        };
    }, []);

    // Cleanup effect for imageFile changes
    useEffect(() => {
        return () => {
            if (imageFile?.preview) {
                URL.revokeObjectURL(imageFile.preview);
            }
        };
    }, [imageFile]);

    if (loading) {
        return (
            <Card className="w-full max-w-4xl mx-auto">
                <CardContent className="p-4 sm:p-6 text-center text-gray-500">
                    Loading profile...
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-4xl mx-auto">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Supporter Profile</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Profile Image Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0 relative">
                        {imageFile?.preview ? (
                            <div className="relative">
                                <img
                                    src={imageFile.preview}
                                    alt="Profile preview"
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                                    title="Remove image"
                                    aria-label="Remove image"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : profile.image ? (
                            <div className="relative">
                                <img
                                    src={getImageURL(profile.image)}
                                    alt="Profile"
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-gray-200"
                                    onError={handleImageError}
                                />
                                {/* Fallback avatar - hidden by default, shown on image error */}
                                <div 
                                    className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold absolute top-0 left-0"
                                    style={{ display: 'none' }}
                                >
                                    {profile.username ? profile.username.slice(0, 2).toUpperCase() : "??"}
                                </div>
                            </div>
                        ) : (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
                                {profile.username ? profile.username.slice(0, 2).toUpperCase() : "??"}
                            </div>
                        )}
                    </div>

                    <div className="text-center sm:text-left">
                        <input
                            type="file"
                            accept="image/*"
                            ref={fileInputRef}
                            onChange={handleImageUpload}
                            className="hidden"
                            aria-label="Upload profile image"
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={saving}
                            className="border-gray-300 text-sm hover:bg-gray-50"
                        >
                            {profile.image || imageFile ? "Change Avatar" : "Upload Avatar"}
                        </Button>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        {imageFile?.file && (
                            <p className="text-xs sm:text-sm text-green-600 mt-1 max-w-xs truncate">
                                Selected: {imageFile.file.name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="username" className="text-sm sm:text-base font-medium">
                            Username <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="username"
                            type="text"
                            value={profile.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            placeholder="Enter your username"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                            disabled={saving}
                            required
                            maxLength={50}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm sm:text-base font-medium">
                            Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="example@gmail.com"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                            disabled={saving}
                            required
                            maxLength={100}
                        />
                    </div>

                    <div className="lg:col-span-2 space-y-2">
                        <Label htmlFor="location" className="text-sm sm:text-base font-medium">
                            Location
                        </Label>
                        <Input
                            id="location"
                            type="text"
                            value={profile.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="Your city or country"
                            className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 text-sm sm:text-base"
                            disabled={saving}
                            maxLength={100}
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-4 border-t border-gray-200">
                    <Button
                        onClick={handleSaveProfile}
                        className="bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors w-full sm:w-auto text-sm sm:text-base py-2 px-6"
                        disabled={saving || !hasProfileChanged()}
                        type="button"
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </Button>

                    {/* Change indicator */}
                    {hasProfileChanged() && (
                        <p className="text-xs sm:text-sm text-amber-600 text-center sm:text-left flex items-center gap-1">
                            <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
                            You have unsaved changes
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SupporterProfileCard;
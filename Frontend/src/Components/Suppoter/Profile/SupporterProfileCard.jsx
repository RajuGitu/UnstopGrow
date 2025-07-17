import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Label } from "../../UI/Label";
import { User, X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";

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
    const fileInputRef = useRef();

    const getImageURL = (imagePath) => {
        if (!imagePath) return null;
        const parsed = JSON.parse(imagePath);
        return parsed.url;
    };

    const removeImage = () => {
        if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);
        setImageFile(null);
    };

    const fetchProfile = async () => {
        try {
            const token = localStorage.getItem("token");
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
                setOriginalProfile(profileData); // Store original for comparison
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

        const imageChanged = imageFile !== null;
        const imageDeleted = profile.image !== originalProfile.image;

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
            const token = localStorage.getItem("token");
            if (!token) {
                toast.error("No authentication token found");
                return;
            }

            const formData = new FormData();
            formData.append("username", profile.username.trim());
            formData.append("location", profile.location.trim());

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
                await fetchProfile(); // Refresh profile data
                removeImage(); // Clear image preview
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
            const token = localStorage.getItem("token");
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
        const file = e.target.files[0];
        if (file) {
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

            // If there's an existing image, delete it from backend first
            if (profile.image) {
                toast.info("Removing existing image...");
                const deleteSuccess = await deleteExistingImage();
                if (!deleteSuccess) {
                    return; // Stop if deletion failed
                }

                // Update profile state to remove the existing image
                setProfile(prev => ({
                    ...prev,
                    image: ""
                }));
            }

            // Clean up previous preview
            if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);

            const preview = URL.createObjectURL(file);
            setImageFile({ file, preview });

            toast.success("New image selected successfully");
        }
    };

    const handleInputChange = (field, value) => {
        setProfile(prev => ({
            ...prev,
            [field]: value
        }));
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

    if (loading) {
        return (
            <Card className="w-full max-w-none">
                <CardContent className="p-4 sm:p-6 text-center text-gray-500">
                    Loading profile...
                </CardContent>
            </Card>
        );
    }

    return (
        <Card className="w-full max-w-none">
            <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
                    <User className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Supporter Profile</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-4 sm:p-6 space-y-4 sm:space-y-6">
                {/* Profile Image Section */}
                <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-3 sm:space-y-0 sm:space-x-4">
                    <div className="flex-shrink-0">
                        {imageFile?.preview ? (
                            <div className="relative">
                                <img
                                    src={imageFile.preview}
                                    alt="Preview"
                                    className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
                                />
                                <button
                                    onClick={removeImage}
                                    className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                                    title="Remove image"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </div>
                        ) : profile.image ? (
                            <img
                                src={getImageURL(profile.image)}
                                alt="Profile"
                                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    e.target.nextSibling.style.display = 'flex';
                                }}
                            />
                        ) : null}

                        {/* Fallback avatar */}
                        {!imageFile?.preview && !profile.image && (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-indigo-500 rounded-full flex items-center justify-center text-white text-lg sm:text-2xl font-bold">
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
                        />
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={saving}
                            className="border-gray-300 text-sm"
                        >
                            {profile.image ? "Replace Avatar" : "Change Avatar"}
                        </Button>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        {imageFile?.file && (
                            <p className="text-xs sm:text-sm text-green-600 mt-1 break-all">
                                Selected: {imageFile.file.name}
                            </p>
                        )}
                    </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div>
                        <Label htmlFor="username" className="text-sm sm:text-base">Username *</Label>
                        <Input
                            id="username"
                            value={profile.username}
                            onChange={(e) => handleInputChange("username", e.target.value)}
                            placeholder="Your name"
                            className="border-gray-300 mt-1 text-sm sm:text-base"
                            disabled={saving}
                            required
                        />
                    </div>

                    <div>
                        <Label htmlFor="email" className="text-sm sm:text-base">Email *</Label>
                        <Input
                            id="email"
                            type="email"
                            value={profile.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="example@gmail.com"
                            className="border-gray-300 mt-1 text-sm sm:text-base"
                            disabled={saving}
                            required
                        />
                    </div>

                    <div className="lg:col-span-2">
                        <Label htmlFor="location" className="text-sm sm:text-base">Location</Label>
                        <Input
                            id="location"
                            value={profile.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="Your city or country"
                            className="border-gray-300 mt-1 text-sm sm:text-base"
                            disabled={saving}
                        />
                    </div>
                </div>

                {/* Save Button */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <Button
                        onClick={handleSaveProfile}
                        className="bg-gray-900 text-white hover:bg-gray-800 transition-colors w-full sm:w-auto text-sm sm:text-base"
                        disabled={saving || !hasProfileChanged()}
                    >
                        {saving ? "Saving..." : "Save Profile"}
                    </Button>

                    {/* Change indicator */}
                    {hasProfileChanged() && (
                        <p className="text-xs sm:text-sm text-amber-600 text-center sm:text-left">
                            * You have unsaved changes
                        </p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default SupporterProfileCard;
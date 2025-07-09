import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Label } from "../../UI/Label";
import { User, X } from "lucide-react";
import { toast } from "sonner";
import axiosInstance from "../../../../utils/axiosInstance";

const InvestorProfile = () => {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    company: "",
    bio: "",
    linkedin: "",
    image: "",
  });

  const [imageFile, setImageFile] = useState(null); // { file, preview }
  const [loading, setLoading] = useState(true);

  const fileInputRef = useRef();

  const getImageURL = (imagePath) => {
    if (!imagePath) return null;
    const relativePath = imagePath?.split("uploads")[1];
    return relativePath
      ? `http://localhost:5000/uploads${relativePath.replace(/\\/g, "/")}`
      : "https://via.placeholder.com/150";
  };

  const removeImage = () => {
    if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);
    setImageFile(null);
  };

  const deleteExistingProfileImage = async () => {
    try {
      const token = localStorage.getItem("token");
      await axiosInstance.delete("/investor/investorProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Previous profile image deleted");
    } catch (error) {
      console.error("Delete image error:", error);
      toast.error("Failed to delete previous image");
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axiosInstance.get("/investor/investorProfile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.data.success && res.data.data) {
        const profileData = Array.isArray(res.data.data)
          ? res.data.data[0]
          : res.data.data;

        setProfile({
          name: profileData?.name || "",
          email: profileData?.email || "",
          company: profileData?.company || "",
          bio: profileData?.bio || "",
          linkedin: profileData?.linkedin || "",
          image: profileData?.image || "",
        });
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      toast.error("Failed to load profile info");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleSaveProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      if (imageFile?.file && profile.image) {
        await deleteExistingProfileImage();
      }

      const formData = new FormData();
      formData.append("company", profile.company);
      formData.append("bio", profile.bio);
      formData.append("linkedin", profile.linkedin);

      if (imageFile?.file) {
        formData.append("image", imageFile.file);
      }

      const res = await axiosInstance.put("/investor/investorProfile", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Profile updated successfully!");
      await fetchProfile();
      removeImage();
    } catch (error) {
      console.error("Profile update failed:", error);
      toast.error("Profile update failed");
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (imageFile?.preview) URL.revokeObjectURL(imageFile.preview);
      const preview = URL.createObjectURL(file);
      setImageFile({ file, preview });
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-gray-500">Loading profile...</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5" />
          <span>Profile Information</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          {imageFile?.preview ? (
            <div className="relative">
              <img
                src={imageFile.preview}
                alt="Preview"
                className="w-20 h-20 rounded-full object-cover border"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : profile.image ? (
            <img
              src={getImageURL(profile.image)}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover border"
            />
          ) : (
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {profile.name ? profile.name.slice(0, 2).toUpperCase() : "??"}
            </div>
          )}

          <div>
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
              className="border-gray-300"
            >
              Change Avatar
            </Button>
            <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
            {imageFile?.file && (
              <p className="text-sm text-green-600 mt-1">Selected: {imageFile.file.name}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={profile.name}
              disabled
              className="bg-gray-100 border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">Name cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              value={profile.email}
              disabled
              className="bg-gray-100 border-gray-300"
            />
            <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
          </div>

          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={profile.company}
              onChange={(e) => setProfile({ ...profile, company: e.target.value })}
              className="border-gray-300"
              placeholder="Enter company name"
            />
          </div>

          <div>
            <Label htmlFor="linkedin">LinkedIn</Label>
            <Input
              id="linkedin"
              value={profile.linkedin}
              onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
              placeholder="https://linkedin.com/in/..."
              className="border-gray-300"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="bio">Bio</Label>
          <textarea
            id="bio"
            rows={3}
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            placeholder="Tell us about yourself..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <Button onClick={handleSaveProfile} className="bg-gray-900 text-white">
          Save Profile
        </Button>

        <div className="text-sm text-gray-500">
          <p>Only Company, LinkedIn, Bio, and Avatar can be updated.</p>
          <p>To change Name or Email, contact support.</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestorProfile;

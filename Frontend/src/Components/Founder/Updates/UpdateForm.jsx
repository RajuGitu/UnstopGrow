// UpdateForm.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Badge } from "../../UI/Badge";
import { PenTool, Send, Upload, X, Image, Plus } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";
import { usePitchPost } from "../../../context/PitchPostContext";

const availableTags = [
  "#growth",
  "#milestone",
  "#funding",
  "#product",
  "#team",
  "#launch",
  "#update",
  "#achievement",
  "#partnership",
  "#innovation",
];

const UpdateForm = () => {
  const [title, setTitle] = useState("");
  const [descriptions, setDescriptions] = useState(""); // Match schema field name
  const [selectedTags, setSelectedTags] = useState([]);
  const [customTag, setCustomTag] = useState("");
  const [selectedImage, setSelectedImage] = useState(null); // Single image to match schema
  const [loading, setLoading] = useState(false);
  const { getAllPost } = usePitchPost();

  const handleTagToggle = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleCustomTagAdd = () => {
    if (!customTag.trim()) return;

    // Format the custom tag
    let formattedTag = customTag.trim();
    if (!formattedTag.startsWith("#")) {
      formattedTag = "#" + formattedTag;
    }

    // Convert to lowercase for consistency
    formattedTag = formattedTag.toLowerCase();

    // Check if tag already exists (in selected tags or available tags)
    const allTags = [...availableTags, ...selectedTags];
    if (allTags.includes(formattedTag)) {
      alert("This tag already exists!");
      return;
    }

    // Add to selected tags
    setSelectedTags((prev) => [...prev, formattedTag]);
    setCustomTag("");
  };

  const handleCustomTagKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleCustomTagAdd();
    }
  };

  const removeTag = (tagToRemove) => {
    setSelectedTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0]; // Only take first file

    if (file && file.type.startsWith("image/")) {
      // Clean up previous image URL if it exists
      if (selectedImage) {
        URL.revokeObjectURL(selectedImage.preview);
      }

      setSelectedImage({
        file,
        preview: URL.createObjectURL(file),
        id: Math.random().toString(36).substr(2, 9),
      });
    }
  };

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview);
      setSelectedImage(null);
    }
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    if (!title || !descriptions || !selectedImage) {
      alert("Please fill in all required fields and add an image");
      return;
    }

    // Create FormData for file upload
    const formData = new FormData();
    formData.append("title", title);
    formData.append("descriptions", descriptions);
    formData.append("media", selectedImage.file); // This field name should match your multer config
    formData.append("tags", JSON.stringify(selectedTags));

    // Debug FormData contents
    console.log("FormData contents:");
    for (let [key, value] of formData.entries()) {
      console.log(key, value);
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const endpoint = "/founder/updateForm";

      const res = await axiosInstance.post(endpoint, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });

      setLoading(false);

      if (res.status === 201) {
        // Clean up and reset form
        if (selectedImage) {
          URL.revokeObjectURL(selectedImage.preview);
        }

        setTitle("");
        setDescriptions("");
        setSelectedTags([]);
        setSelectedImage(null);
        getAllPost();

        alert("Update published successfully!");
      } else {
        alert("Failed to publish update");
      }
    } catch (error) {
      setLoading(false);
      console.error("Error publishing update:", error);

      // More detailed error handling
      if (error.response) {
        console.error("Response data:", error.response.data);
        alert(
          `Error: ${error.response.data.error || "Failed to publish update"}`
        );
      } else {
        alert("Network error - please try again");
      }
    }
  };

  return (
    <Card className="bg-white/80 backdrop-blur-sm w-full">
      <CardHeader className="px-4 sm:px-6">
        <CardTitle className="flex items-center space-x-2 text-lg sm:text-xl">
          <PenTool className="h-4 w-4 sm:h-5 sm:w-5 text-indigo-600" />
          <span>Create New Update</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6">
        {/* Title Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Update Title *
          </label>
          <Input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Share an exciting milestone..."
            className="text-base sm:text-lg font-medium border-gray-300 w-full"
            maxLength={80}
          />
          <p className="text-xs text-slate-500 mt-1">
            {title.length}/80 characters
          </p>
        </div>

        {/* Description Input */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Description *
          </label>
          <textarea
            value={descriptions}
            onChange={(e) => setDescriptions(e.target.value)}
            placeholder="Tell your story in detail..."
            className="w-full h-24 sm:h-32 p-3 border border-slate-300 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm sm:text-base"
            maxLength={500}
          />
          <p className="text-xs text-slate-500 mt-1">
            {descriptions.length}/500 characters
          </p>
        </div>

        {/* Single Image Upload */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Add Image *
          </label>

          {!selectedImage ? (
            <label className="cursor-pointer block">
              <div className="flex flex-col items-center justify-center w-full h-24 sm:h-32 border-2 border-dashed border-slate-300 rounded-lg hover:border-indigo-400 hover:bg-indigo-50 transition-colors">
                <Upload className="h-6 w-6 sm:h-8 sm:w-8 text-slate-400 mb-2" />
                <span className="text-xs sm:text-sm text-slate-600 text-center px-2">
                  Click to upload image
                </span>
                <span className="text-xs text-slate-500 mt-1">
                  JPG, PNG up to 10MB
                </span>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
            </label>
          ) : (
            <div className="relative w-full max-w-sm sm:max-w-md">
              <img
                src={selectedImage.preview}
                alt="Preview"
                className="w-full h-32 sm:h-48 object-cover rounded-lg border border-slate-200"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 sm:p-2 hover:bg-red-600 transition-colors"
              >
                <X className="h-3 w-3 sm:h-4 sm:w-4" />
              </button>
            </div>
          )}
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Add Tags
          </label>

          {/* Custom Tag Input */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-2 mb-3">
            <Input
              value={customTag}
              onChange={(e) => setCustomTag(e.target.value)}
              onKeyPress={handleCustomTagKeyPress}
              placeholder="Enter custom tag (e.g., success, breakthrough)"
              className="flex-1 border-gray-300 text-sm sm:text-base"
              maxLength={20}
            />
            <Button
              type="button"
              onClick={handleCustomTagAdd}
              disabled={!customTag.trim()}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 w-full sm:w-auto"
            >
              <Plus className="h-4 w-4 mr-0 sm:mr-1" />
              <span className="sm:inline">Add</span>
            </Button>
          </div>

          {/* Predefined Tags */}
          <div className="mb-3">
            <p className="text-xs text-slate-600 mb-2">Suggested tags:</p>
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {availableTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={selectedTags.includes(tag) ? "default" : "outline"}
                  className={`cursor-pointer transition-all text-xs sm:text-sm px-2 py-1 ${selectedTags.includes(tag)
                    ? "bg-indigo-500 text-white"
                    : "hover:bg-indigo-50"
                    }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Selected Tags */}
          {selectedTags.length > 0 && (
            <div>
              <p className="text-xs text-slate-600 mb-2">Selected tags:</p>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {selectedTags.map((tag) => (
                  <Badge
                    key={tag}
                    className="bg-indigo-500 text-white relative pr-6 sm:pr-8 text-xs sm:text-sm"
                  >
                    {tag}
                    <button
                      onClick={() => removeTag(tag)}
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 hover:bg-indigo-600 rounded-full p-0.5"
                    >
                      <X className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Publish Button */}
        <div className="flex justify-end pt-4 border-t">
          <Button
            onClick={handlePublish}
            className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white w-full sm:w-auto"
            disabled={loading || !title || !descriptions || !selectedImage}
          >
            <Send className="h-4 w-4 mr-2" />
            {loading ? "Publishing..." : "Publish Update"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpdateForm;
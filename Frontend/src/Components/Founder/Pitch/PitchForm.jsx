import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { FileText, Video, Youtube, Upload, X, Check } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

const BLANK_FORM = {
  title: "",
  tagline: "",
  youtube: "",
  problem: "",
  solution: "",
  market: "",
  traction: "",
  funding: "",   // string
  team: "",
  raised: "",    // string
  activeUser: "",
};

const PitchForm = () => {
  const [formData, setFormData] = useState(BLANK_FORM);
  const [pdfFile, setPdfFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const removePdfFile = () => {
    setPdfFile(null);
    // Reset the file input
    const fileInput = document.getElementById('pdf-upload');
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const resetForm = () => {
    setFormData(BLANK_FORM);
    setPdfFile(null);
    // Reset all form inputs
    const form = document.querySelector('form') || document;
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      if (input.type === 'file') {
        input.value = '';
      } else {
        input.value = '';
      }
    });
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "title",
      "tagline",
      "youtube",
      "problem",
      "solution",
      "market",
      "traction",
      "funding",
      "team",
      "raised",
      "activeUser",
    ];

    for (const field of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        alert(`Please fill out the ${field} field.`);
        return;
      }
    }

    if (!pdfFile) {
      alert("Please upload a pitch deck PDF.");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      const data = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      data.append("pitch", pdfFile);

      const res = await axiosInstance.post("/founder/pitchForm", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });

      // Reset form after successful submission
      resetForm();
      alert("Pitch uploaded successfully!");
    } catch (err) {
      console.log("Upload error", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderTextInput = (key, label, placeholder) => (
    <div key={key}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <Input
        name={key}
        value={formData[key]}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="border-gray-300"
      />
    </div>
  );

  const renderTextarea = (key, label, placeholder) => (
    <div key={key}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <textarea
        name={key}
        rows={3}
        value={formData[key]}
        placeholder={placeholder}
        onChange={handleInputChange}
        className="flex min-h-[80px] w-full rounded-md border border-gray-300 border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Basic Info */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Basic Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTextInput(
            "title",
            "Startup Title",
            "Your startup name or title"
          )}
          {renderTextInput(
            "tagline",
            "Tagline",
            "One-line description of what you do"
          )}
        </CardContent>
      </Card>

      {/* Media */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl flex items-center">
            <Video className="h-5 w-5 mr-2" />
            Pitch Media
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* PDF Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              <FileText className="h-4 w-4 inline mr-1" />
              Pitch Deck PDF
            </label>

            {!pdfFile ? (
              <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  id="pdf-upload"
                  className="hidden"
                  onChange={handlePdfChange}
                />
                <label htmlFor="pdf-upload" className="cursor-pointer">
                  <FileText className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                  <p className="text-slate-600">
                    Click to upload your pitch deck PDF
                  </p>
                  <p className="text-sm text-slate-500">
                    Supports PDF files up to 10MB
                  </p>
                </label>
              </div>
            ) : (
              <div className="border-2 border-green-300 bg-green-50 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Check className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-green-800">
                        {pdfFile.name}
                      </p>
                      <p className="text-xs text-green-600">
                        {(pdfFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removePdfFile}
                    className="p-1 hover:bg-red-100 rounded-full transition-colors"
                    title="Remove file"
                  >
                    <X className="h-4 w-4 text-red-500" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* YouTube URL */}
          {renderTextInput(
            "youtube",
            "YouTube Pitch Video URL",
            "https://www.youtube.com/watch?v=..."
          )}
        </CardContent>
      </Card>

      {/* Problem & Solution */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Problem & Solution</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTextarea(
            "problem",
            "Problem Statement",
            "What problem are you solving?"
          )}
          {renderTextarea(
            "solution",
            "Your Solution",
            "How does your product solve it?"
          )}
        </CardContent>
      </Card>

      {/* Market & Traction */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Market & Traction</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTextarea(
            "market",
            "Market Opportunity",
            "Market size, growth, and audience"
          )}
          {renderTextarea(
            "traction",
            "Traction & Metrics",
            "Users, revenue, achievements"
          )}
        </CardContent>
      </Card>

      {/* Funding & Team */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Funding & Team</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTextarea(
            "funding",
            "Funding Requirements",
            "How much do you need? Use of funds?"
          )}
          {renderTextarea(
            "team",
            "Team",
            "Key team members and their experience"
          )}
        </CardContent>
      </Card>

      {/* Metrics */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Business Metrics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {renderTextInput("raised", "Already Raised", "e.g. 50 lakhs")}
          {renderTextInput("activeUser", "Active Users", "e.g. 5000")}
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white disabled:opacity-50"
        >
          <Upload className="h-4 w-4 mr-2" />
          {isSubmitting ? "Publishing..." : "Publish Pitch"}
        </Button>

        <Button
          onClick={resetForm}
          variant="outline"
          disabled={isSubmitting}
          className="px-6 border-gray-300"
        >
          Clear Form
        </Button>
      </div>
    </div>
  );
};

export default PitchForm;
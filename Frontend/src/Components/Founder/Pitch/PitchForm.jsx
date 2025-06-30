import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { FileText, Video, Youtube, Upload } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

const PitchForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    tagline: "",
    youtube: "",
    problem: "",
    solution: "",
    market: "",
    funding: "",
    team: "",
    raised: "",
    activeUser: "",
  });

  const [pdfFile, setPdfFile] = useState(null);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePdfChange = (e) => {
    setPdfFile(e.target.files[0]);
  };

  const handleSubmit = async () => {
    const requiredFields = [
      "title",
      "tagline",
      "youtube",
      "problem",
      "solution",
      "market",
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

      console.log("Pitch uploaded successfully", res.data);
      alert("Pitch uploaded successfully!");
    } catch (err) {
      console.error("Upload error", err);
      alert("Something went wrong. Please try again.");
    }
  };

  const renderTextInput = (key, label, placeholder) => (
    <div key={key}>
      <label className="block text-sm font-medium text-slate-700 mb-2">
        {label}
      </label>
      <Input
        name={key}
        placeholder={placeholder}
        onChange={handleInputChange}
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
        placeholder={placeholder}
        onChange={handleInputChange}
        className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      />
    </div>
  );

  return (
    <>
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
      <Button
        onClick={handleSubmit}
        className="mt-6 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white"
      >
        <Upload className="h-4 w-4 mr-2" />
        Publish Pitch
      </Button>
    </>
  );
};

export default PitchForm;

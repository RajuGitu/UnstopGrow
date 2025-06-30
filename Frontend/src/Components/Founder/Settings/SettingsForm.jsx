import { useState } from "react";
import axios from "axios";
import { Card, CardHeader, CardTitle, CardContent, } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Textarea } from "../../UI/Textarea";
import { Switch } from "../../UI/Switch";
import { Button } from "../../UI/Button";
import { Building, MapPin, Target, Award, Globe, Upload, Loader2, } from "lucide-react";
const MAX_BIO = 250;
const MAX_ACH = 500;

export default function SettingsForm() {
    const [form, setForm] = useState({
        startUpName: "TechFlow AI",
        bio: "Building the future of AI-powered analytics for businesses",
        location: "San Francisco, CA",
        domain: "AI & Machine Learning",
        website: "https://techflow.ai",
        email: "alex@techflow.ai",
        achievements: "Raised $2M Series A, 85% YoY growth, Featured in TechCrunch",
        readytomerge: true,
        socials: {
            twitter: "",
            linkedin: "",
            github: "",
        },
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) =>
        setForm((prev) => ({ ...prev, [key]: value }));

    const handleSocialChange = (key, value) =>
        setForm((prev) => ({
            ...prev,
            socials: { ...prev.socials, [key]: value },
        }));

    const handleSubmit = async () => {
        if (loading) return;
        try {
            setLoading(true);
            const token = localStorage.getItem("token");
            await axios.post(
                "http://localhost:5000/founder/profile",
                form,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            alert("Profile updated successfully!");
        } catch (err) {
            console.error("Update failed:", err);
            alert("Could not save changes. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    /* ────────── UI ────────── */
    return (
        <>
            {/* ───────── Startup Profile ───────── */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Building className="h-5 w-5 text-indigo-600" />
                        <span>Startup Profile</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Startup Name</label>
                        <Input
                            value={form.startupName}
                            onChange={(e) => handleChange("startupName", e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Bio</label>
                        <Textarea
                            value={form.bio}
                            maxLength={MAX_BIO}
                            onChange={(e) => handleChange("bio", e.target.value)}
                            className="h-24 resize-none"
                            required
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            {form.bio.length}/{MAX_BIO} characters
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <MapPin className="inline h-4 w-4 mr-1" />
                                Location
                            </label>
                            <Input
                                value={form.location}
                                onChange={(e) => handleChange("location", e.target.value)}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <Target className="inline h-4 w-4 mr-1" />
                                Domain
                            </label>
                            <select
                                value={form.domain}
                                onChange={(e) => handleChange("domain", e.target.value)}
                                className="w-full h-10 px-3 py-2 border rounded-lg"
                            >
                                {[
                                    "AI & Machine Learning",
                                    "Clean Energy",
                                    "HealthTech",
                                    "Data Analytics",
                                    "EdTech",
                                    "FinTech",
                                    "E-commerce",
                                    "Cybersecurity",
                                    "IoT",
                                    "Blockchain",
                                ].map((d) => (
                                    <option key={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Website URL</label>
                        <Input
                            type="url"
                            value={form.website}
                            onChange={(e) => handleChange("website", e.target.value)}
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Contact Email</label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                            required
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ───────── Achievements & Merge ───────── */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>Achievements &amp; Merge Status</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Top Achievements</label>
                        <Textarea
                            value={form.achievements}
                            maxLength={MAX_ACH}
                            onChange={(e) => handleChange("achievements", e.target.value)}
                            className="h-32 resize-none"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            {form.achievements.length}/{MAX_ACH} characters
                        </p>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                            <h4 className="font-medium">Ready to Merge</h4>
                            <p className="text-sm text-slate-600">
                                Show your startup as open to merger opportunities
                            </p>
                        </div>
                        <Switch
                            checked={form.readytomerge}
                            onCheckedChange={(v) => handleChange("readytomerge", v)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* ───────── Social Links ───────── */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <span>Social Links</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {[
                        ["twitter", "Twitter/X", "https://twitter.com/yourstartup"],
                        ["linkedin", "LinkedIn", "https://linkedin.com/company/yourstartup"],
                        ["github", "GitHub", "https://github.com/yourstartup"],
                    ].map(([key, label, placeholder]) => (
                        <div key={key}>
                            <label className="block text-sm font-medium mb-2">{label}</label>
                            <Input
                                type="url"
                                value={form.socials[key]}
                                placeholder={placeholder}
                                onChange={(e) => handleSocialChange(key, e.target.value)}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* ───────── Save Button ───────── */}
            <Button
                onClick={handleSubmit}
                disabled={loading}
                className="mt-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50"
            >
                {loading ? (
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                    <Upload className="h-4 w-4 mr-2" />
                )}
                {loading ? "Saving..." : "Save Changes"}
            </Button>
        </>
    );
}

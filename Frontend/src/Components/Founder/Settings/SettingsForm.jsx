import { useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Textarea } from "../../UI/Textarea";
import { Switch } from "../../UI/Switch";
import { Button } from "../../UI/Button";
import { Building, MapPin, Target, Award, Globe, Upload, Loader2 } from "lucide-react";
import { useProfile } from "../../../context/ProfileContext";

export default function SettingsForm() {
    const {
        // State
        form,
        lockedFields,
        loading,
        fetchLoading,
        errors,
        saveStatus,
        MAX_BIO,
        MAX_ACH,

        // Actions
        fetchProfile,
        saveProfile,
        updateForm,
        updateSocial,
    } = useProfile();

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile]);

    // Show loading spinner while fetching profile
    if (fetchLoading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                    <p className="text-gray-600">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Error Display */}
            {errors.fetch && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800">{errors.fetch}</p>
                        </div>
                    </div>
                </div>
            )}

            {/* Success/Error Status */}
            {saveStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-green-800">Profile updated successfully!</p>
                        </div>
                    </div>
                </div>
            )}

            {saveStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <div className="flex items-center">
                        <div className="flex-shrink-0">
                            <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="ml-3">
                            <p className="text-sm text-red-800">
                                {errors.save || "Failed to save changes. Please try again."}
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Startup Profile */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Building className="h-5 w-5 text-indigo-600" />
                        <span>Startup Profile</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            <Building className="inline h-4 w-4 mr-1" />
                            Startup Name
                        </label>
                        <Input
                            value={form.startUpName}
                            onChange={(e) => updateForm("startUpName", e.target.value)}
                            required
                            disabled={lockedFields.startUpName}
                            className={`${errors.startUpName ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.startUpName ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                        {lockedFields.startUpName && (
                            <p className="text-xs text-gray-500 mt-1">✓ This field cannot be changed once set</p>
                        )}
                        {errors.startUpName && (
                            <p className="text-xs text-red-600 mt-1">{errors.startUpName}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Bio
                        </label>
                        <Textarea
                            value={form.bio}
                            maxLength={MAX_BIO}
                            onChange={(e) => updateForm("bio", e.target.value)}
                            className={`h-24 resize-none ${errors.bio ? "border-red-500 focus:ring-red-500" : ""}`}
                            required
                        />
                        {errors.bio && (
                            <p className="text-xs text-red-600 mt-1">{errors.bio}</p>
                        )}
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
                                onChange={(e) => updateForm("location", e.target.value)}
                                required
                                disabled={lockedFields.location}
                                className={`${errors.location ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.location ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            />
                            {lockedFields.location && (
                                <p className="text-xs text-gray-500 mt-1">✓ This field cannot be changed once set</p>
                            )}
                            {errors.location && (
                                <p className="text-xs text-red-600 mt-1">{errors.location}</p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">
                                <Target className="inline h-4 w-4 mr-1" />
                                Domain
                            </label>
                            <Input
                                value={form.domain}
                                onChange={(e) => updateForm("domain", e.target.value)}
                                placeholder="e.g., AI & Machine Learning, FinTech, HealthTech"
                                required
                                className={`${errors.domain ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.domain ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            />
                            {errors.domain && (
                                <p className="text-xs text-red-600 mt-1">{errors.domain}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            <Globe className="inline h-4 w-4 mr-1" />
                            Website URL
                        </label>
                        <Input
                            type="url"
                            value={form.website}
                            onChange={(e) => updateForm("website", e.target.value)}
                            disabled={lockedFields.website}
                            className={`${errors.website ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.website ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                        {lockedFields.website && (
                            <p className="text-xs text-gray-500 mt-1">✓ This field cannot be changed once set</p>
                        )}
                        {errors.website && (
                            <p className="text-xs text-red-600 mt-1">{errors.website}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Contact Email
                        </label>
                        <Input
                            type="email"
                            value={form.email}
                            onChange={(e) => updateForm("email", e.target.value)}
                            required
                            disabled={lockedFields.email}
                            className={`${errors.email ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.email ? "bg-gray-100 cursor-not-allowed" : ""}`}
                        />
                        {lockedFields.email && (
                            <p className="text-xs text-gray-500 mt-1">✓ This field cannot be changed once set</p>
                        )}
                        {errors.email && (
                            <p className="text-xs text-red-600 mt-1">{errors.email}</p>
                        )}
                    </div>
                </CardContent>
            </Card>

            {/* Achievements & Merge Status */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>Achievements & Merge Status</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Top Achievements
                        </label>
                        <Textarea
                            value={form.achievements}
                            maxLength={MAX_ACH}
                            onChange={(e) => updateForm("achievements", e.target.value)}
                            className={`h-32 resize-none ${errors.achievements ? "border-red-500 focus:ring-red-500" : ""}`}
                        />
                        {errors.achievements && (
                            <p className="text-xs text-red-600 mt-1">{errors.achievements}</p>
                        )}
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
                            onCheckedChange={(v) => updateForm("readytomerge", v)}
                        />
                    </div>
                </CardContent>
            </Card>

            {/* Social Links */}
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
                            <label className="block text-sm font-medium mb-2">
                                {label}
                            </label>
                            <Input
                                type="url"
                                value={form.socials[key]}
                                placeholder={placeholder}
                                onChange={(e) => updateSocial(key, e.target.value)}
                                disabled={lockedFields.socials[key]}
                                className={`${errors[`socials.${key}`] ? "border-red-500 focus:ring-red-500" : ""} ${lockedFields.socials[key] ? "bg-gray-100 cursor-not-allowed" : ""}`}
                            />
                            {lockedFields.socials[key] && (
                                <p className="text-xs text-gray-500 mt-1">✓ This field cannot be changed once set</p>
                            )}
                            {errors[`socials.${key}`] && (
                                <p className="text-xs text-red-600 mt-1">{errors[`socials.${key}`]}</p>
                            )}
                        </div>
                    ))}
                </CardContent>
            </Card>

            {/* Save Button */}
            <div className="flex items-center justify-between">
                <Button
                    onClick={saveProfile}
                    disabled={loading || fetchLoading}
                    className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 transition-all duration-200 px-8 py-2"
                >
                    {loading ? (
                        <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Saving Changes...
                        </>
                    ) : (
                        <>
                            <Upload className="h-4 w-4 mr-2" />
                            Save Changes
                        </>
                    )}
                </Button>

                {loading && (
                    <div className="flex items-center text-sm text-gray-500">
                        <div className="animate-pulse">Please wait while we save your changes...</div>
                    </div>
                )}
            </div>
        </div>
    );
}
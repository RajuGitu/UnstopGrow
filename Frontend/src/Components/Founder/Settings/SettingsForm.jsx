import { Input } from "../../UI/Input";
import { Textarea } from "../../UI/Textarea";
import { Button } from "../../UI/Button";
import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { MapPin, Target, Building, Award, Globe, Upload } from "lucide-react";
import { Switch } from "../../UI/Switch";
import { useState } from "react";

const SettingsForm = () => {
    const [mergeReady, setMergeReady] = useState(true);

    return (
        <>
            <Card className="bg-white/80 backdrop-blur-sm rounded-lg border text-card-foreground shadow-sm">
                <CardHeader className="flex flex-col space-y-1.5 p-6">
                    <CardTitle className="flex items-center space-x-2 text-2xl font-semibold leading-none tracking-tight">
                        <Building className="h-5 w-5 text-indigo-600" />
                        <span>Startup Profile</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Startup Name</label>
                        <Input placeholder="Your startup name" defaultValue="TechFlow AI" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Bio</label>
                        <Textarea
                            className="h-24 resize-none"
                            placeholder="Tell people about your startup..."
                            defaultValue="Building the future of AI-powered analytics for businesses"
                            maxLength={250}
                        />
                        <p className="text-xs text-slate-500 mt-1">58/250 characters</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <MapPin className="h-4 w-4 inline mr-1" />
                                Location
                            </label>
                            <Input placeholder="City, Country" defaultValue="San Francisco, CA" />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                <Target className="h-4 w-4 inline mr-1" />
                                Domain
                            </label>
                            <select
                                className="w-full h-10 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                                defaultValue="AI & Machine Learning"
                            >
                                <option>AI & Machine Learning</option>
                                <option>Clean Energy</option>
                                <option>HealthTech</option>
                                <option>Data Analytics</option>
                                <option>EdTech</option>
                                <option>FinTech</option>
                                <option>E-commerce</option>
                                <option>Cybersecurity</option>
                                <option>IoT</option>
                                <option>Blockchain</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Website URL</label>
                        <Input placeholder="https://yourwebsite.com" defaultValue="https://techflow.ai" />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Contact Email</label>
                        <Input type="email" placeholder="contact@yourwebsite.com" defaultValue="alex@techflow.ai" />
                    </div>
                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2 text-2xl">
                        <Award className="h-5 w-5 text-yellow-600" />
                        <span>Achievements &amp; Merge Status</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Achievements */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Top Achievements
                        </label>
                        <Textarea
                            className="h-32 resize-none"
                            maxLength={500}
                            placeholder="List your key achievements, milestones, funding rounds, press coverage..."
                            defaultValue="Raised $2M Series A, 85% YoY growth, Featured in TechCrunch"
                        />
                        <p className="text-xs text-slate-500 mt-1">59/500 characters</p>
                    </div>

                    {/* Ready to Merge Toggle */}
                    <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                        <div>
                            <h4 className="font-medium text-slate-900">Ready to Merge</h4>
                            <p className="text-sm text-slate-600">
                                Show your startup as open to merger opportunities
                            </p>
                        </div>

                        <Switch
                            checked={mergeReady}
                            onCheckedChange={setMergeReady}
                        />
                    </div>

                    {/* Helper Note */}
                    {mergeReady && (
                        <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                            <p className="text-sm text-green-700">
                                ✓ Your startup will appear in merger searches and be visible to potential partners
                            </p>
                        </div>
                    )}
                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader className="flex flex-col space-y-1.5 p-6">
                    <CardTitle className="flex items-center space-x-2 text-2xl font-semibold leading-none tracking-tight">
                        <Globe className="h-5 w-5 text-blue-600" />
                        <span>Social Links</span>
                    </CardTitle>
                </CardHeader>

                <CardContent className="p-6 pt-0 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Twitter/X
                        </label>
                        <Input
                            type="url"
                            placeholder="https://twitter.com/yourstartup"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            LinkedIn
                        </label>
                        <Input
                            type="url"
                            placeholder="https://linkedin.com/company/yourstartup"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            GitHub
                        </label>
                        <Input
                            type="url"
                            placeholder="https://github.com/yourstartup"
                        />
                    </div>
                </CardContent>
            </Card>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Save Changes
            </Button>
        </>
    );
};

export default SettingsForm;

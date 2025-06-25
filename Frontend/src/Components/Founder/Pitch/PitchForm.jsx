import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { FileText, Video, Youtube } from "lucide-react";
import { Upload } from "lucide-react";

const PitchForm = () => {
    const fields = [
        {
            key: "title",
            label: "Startup Title",
            placeholder: "Your startup name or title",
            defaultValue: "Revolutionary AI-Powered SaaS Platform",
        },
        {
            key: "tagline",
            label: "Tagline",
            placeholder: "One-line description of what you do",
            defaultValue: "Transforming how businesses automate their workflows",
        },
    ];
    const one = [
        {
            key: "problem",
            label: "Problem Statement",
            placeholder: "What problem are you solving? Why is it important?",
        },
        {
            key: "solution",
            label: "Your Solution",
            placeholder: "How does your product solve this problem?",
        },
    ];
    const two = [
        {
            key: "market",
            label: "Market Opportunity",
            placeholder: "Market Size growth potential,target audience",
        },
        {
            key: "traction",
            label: "Traction & Metrics",
            placeholder: "User, revenue, growth metrics, key achievments",
        },
    ];
    const three = [
        {
            key: "funding",
            label: "funding Requirements",
            placeholder: "How much do u need and what will you use it for?",
        },
        {
            key: "team",
            label: "Team",
            placeholder: "key team members, their experience and expertise",
        },
    ];

    return (
        <>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Basic Information</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {fields.map(({ key, label, placeholder, defaultValue }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">{label}</label>
                            <Input
                                name={key}
                                placeholder={placeholder}
                                defaultValue={defaultValue}
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                        <Video className="h-5 w-5 mr-2" />
                        Pitch Media
                    </CardTitle>
                </CardHeader>

                <CardContent className="space-y-6">

                    {/* Pitch Deck PDF Upload */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <FileText className="h-4 w-4 inline mr-1" />
                            Pitch Deck PDF
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                            <input type="file" accept=".pdf" id="pdf-upload" className="hidden" />
                            <label htmlFor="pdf-upload" className="cursor-pointer">
                                <FileText className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                <div>
                                    <p className="text-slate-600">Click to upload your pitch deck PDF</p>
                                    <p className="text-sm text-slate-500">Supports PDF files up to 10MB</p>
                                </div>
                            </label>
                        </div>
                    </div>

                    {/* YouTube Pitch Video URL */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Youtube className="h-4 w-4 inline mr-1 text-red-600" />
                            YouTube Pitch Video URL
                        </label>
                        <Input
                            placeholder="https://www.youtube.com/watch?v=..."
                            className="w-full"
                        />
                        <p className="text-xs text-slate-500 mt-1">
                            Share your pitch video from YouTube
                        </p>
                    </div>

                    {/* Upload Video File */}
                    <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            <Video className="h-4 w-4 inline mr-1" />
                            Upload Video File
                        </label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-slate-400 transition-colors">
                            <input type="file" accept="video/*" id="video-upload" className="hidden" />
                            <label htmlFor="video-upload" className="cursor-pointer">
                                <Video className="h-8 w-8 mx-auto mb-2 text-slate-400" />
                                <div>
                                    <p className="text-slate-600">Click to upload your pitch video</p>
                                    <p className="text-sm text-slate-500">Supports MP4, MOV, AVI files up to 100MB</p>
                                </div>
                            </label>
                        </div>
                    </div>

                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Problem &amp; Solution</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {one.map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {label}
                            </label>
                            <textarea
                                rows={3}
                                placeholder={placeholder}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Market &amp; Traction</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {two.map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {label}
                            </label>
                            <textarea
                                rows={3}
                                placeholder={placeholder}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Funding &amp; Team</CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                    {three.map(({ key, label, placeholder }) => (
                        <div key={key}>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                {label}
                            </label>
                            <textarea
                                rows={3}
                                placeholder={placeholder}
                                className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            />
                        </div>
                    ))}
                </CardContent>
            </Card>
            <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                <Upload className="h-4 w-4 mr-2" />
                Publish Pitch
            </Button>
        </>
    );
};

export default PitchForm;

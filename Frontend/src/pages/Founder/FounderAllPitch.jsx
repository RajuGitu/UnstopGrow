import { useEffect, useState } from "react";
import { usePitchPost } from "../../context/PitchPostContext";
import {
    Loader2,
    Search,
    Filter,
    Trash2,
    Users,
    TrendingUp,
    DollarSign,
    Target,
    Calendar,
    FileText,
    Youtube,
    Building,
    Heart
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Input } from "../../Components/UI/Input";
import { Button } from "../../Components/UI/Button";
import { Badge } from "../../Components/UI/Badge";
import axiosInstance from "../../../utils/axiosInstance";

const FounderAllPitch = () => {
    const { pitch, getAllPitches, loading } = usePitchPost();
    const [search, setSearch] = useState("");
    const [filteredPitches, setFilteredPitches] = useState([]);

    useEffect(() => {
        getAllPitches();
    }, [getAllPitches]);

    useEffect(() => {
        if (pitch) {
            const filtered = pitch.filter(p =>
                p.title?.toLowerCase().includes(search.toLowerCase()) ||
                p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
                p.problem?.toLowerCase().includes(search.toLowerCase()) ||
                p.solution?.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPitches(filtered);
        }
    }, [pitch, search]);

    const handleDelete = async (pitchId) => {
        const token = localStorage.getItem("token");
        try {
            await axiosInstance.delete(`/founder/deletePitch/${pitchId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            getAllPitches();
        } catch (error) {
            console.error("Error deleting pitch:", error);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getPdfUrl = (pdfData) => {
        if (!pdfData) return null;

        try {
            const parsedData = JSON.parse(pdfData);
            return parsedData.url || null;
        } catch (error) {
            console.error("Error parsing PDF data:", error);

            // Fallback for old format
            if (typeof pdfData === 'string') {
                const rel = pdfData.split("uploads")[1];
                return rel
                    ? `https://unstopgrowb.onrender.com/uploads${rel.replace(/\\/g, "/")}`
                    : null;
            }

            return null;
        }
    };

    const getPdfFileName = (pdfData) => {
        if (!pdfData) return "PDF";

        try {
            const parsedData = JSON.parse(pdfData);
            return parsedData.originalName || "PDF";


            // // If pdfData is already an object, get the original name
            // if (typeof pdfData === 'object' && pdfData.originalName) {
            //     return pdfData.originalName;
            // }
        } catch (error) {
            return "PDF";
        }
    };

    const formatFileSize = (bytes) => {
        if (!bytes) return "";

        const sizes = ['Bytes', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        return `${Math.round(bytes / Math.pow(1024, i) * 100) / 100} ${sizes[i]}`;
    };

    const getPdfSize = (pdfData) => {
        if (!pdfData) return "";

        try {
            const parsedData = JSON.parse(pdfData);
            return parsedData.size ? formatFileSize(parsedData.size) : "";


        } catch (error) {
            return "";
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                    <p className="text-gray-600">Loading pitches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4 md:space-y-6 h-screen overflow-y-auto p-4 md:p-6">
            {/* Search Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 md:p-6">
                    <div className="flex flex-col sm:flex-row gap-3 md:gap-4 items-stretch sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search pitches by title, tagline, problem, or solution..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 text-sm md:text-base"
                            />
                        </div>
                        <Button variant="outline" className="flex items-center justify-center gap-2 whitespace-nowrap">
                            <Filter className="h-4 w-4" />
                            <span className="hidden sm:inline">Filter</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    All Pitches
                </h2>
                <Badge variant="outline" className="text-sm self-start sm:self-center">
                    {filteredPitches.length} pitches found
                </Badge>
            </div>

            {/* Pitch Cards Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
                {filteredPitches.length > 0 ? (
                    filteredPitches.map((pitchItem) => {
                        const pdfUrl = getPdfUrl(pitchItem.pdf);
                        const pdfFileName = getPdfFileName(pitchItem.pdf);
                        const pdfSize = getPdfSize(pitchItem.pdf);

                        return (
                            <Card key={pitchItem._id} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-3 p-4 md:p-6">
                                    <div className="flex items-start justify-between gap-3">
                                        <div className="flex-1 min-w-0">
                                            <CardTitle className="text-lg md:text-xl font-bold text-slate-900 mb-2 line-clamp-2">
                                                {pitchItem.title}
                                            </CardTitle>
                                            <p className="text-sm text-indigo-600 font-medium mb-3 line-clamp-2">
                                                {pitchItem.tagline}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {/* Likes Display */}
                                            <div className="flex items-center gap-1 text-red-500 bg-red-50 px-2 py-1 rounded-full">
                                                <Heart className="h-3 w-3 fill-current" />
                                                <span className="text-xs font-medium">
                                                    {pitchItem.likes ? pitchItem.likes.length : 0}
                                                </span>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleDelete(pitchItem._id)}
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </CardHeader>

                                <CardContent className="space-y-4 p-4 md:p-6 pt-0">
                                    {/* Problem & Solution */}
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Target className="h-4 w-4 text-red-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-slate-700">Problem</span>
                                            </div>
                                            <p className="text-sm text-slate-600 pl-6 line-clamp-3">{pitchItem.problem}</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Building className="h-4 w-4 text-green-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-slate-700">Solution</span>
                                            </div>
                                            <p className="text-sm text-slate-600 pl-6 line-clamp-3">{pitchItem.solution}</p>
                                        </div>
                                    </div>

                                    {/* Key Metrics */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 pt-3 border-t border-slate-200">
                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                                                <span className="text-xs font-medium text-slate-700">Funding</span>
                                            </div>
                                            <p className="text-sm text-slate-900 font-medium truncate">{pitchItem.funding}</p>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center gap-2">
                                                <TrendingUp className="h-4 w-4 text-blue-600 flex-shrink-0" />
                                                <span className="text-xs font-medium text-slate-700">Raised</span>
                                            </div>
                                            <p className="text-sm text-slate-900 font-medium truncate">{pitchItem.raised}</p>
                                        </div>
                                    </div>

                                    {/* Market & Traction */}
                                    <div className="space-y-3">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Users className="h-4 w-4 text-purple-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-slate-700">Market</span>
                                            </div>
                                            <p className="text-sm text-slate-600 pl-6 line-clamp-2">{pitchItem.market}</p>
                                        </div>

                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="h-4 w-4 text-orange-500 flex-shrink-0" />
                                                <span className="text-sm font-medium text-slate-700">Traction</span>
                                            </div>
                                            <p className="text-sm text-slate-600 pl-6 line-clamp-2">{pitchItem.traction}</p>
                                        </div>
                                    </div>

                                    {/* Team & Active Users */}
                                    <div className="grid grid-cols-1 gap-3">
                                        <div>
                                            <span className="text-sm font-medium text-slate-700">Team: </span>
                                            <span className="text-sm text-slate-600 break-words">{pitchItem.team}</span>
                                        </div>
                                        <div>
                                            <span className="text-sm font-medium text-slate-700">Active Users: </span>
                                            <span className="text-sm text-slate-600">{pitchItem.activeUser}</span>
                                        </div>
                                    </div>

                                    {/* Links and Date */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-3 border-t border-slate-200">
                                        <div className="flex items-center gap-3 flex-wrap">
                                            {pitchItem.youtube && (
                                                <a
                                                    href={pitchItem.youtube}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                                                >
                                                    <Youtube className="h-4 w-4 flex-shrink-0" />
                                                    <span className="text-xs">Video</span>
                                                </a>
                                            )}
                                            {pdfUrl && (
                                                <a
                                                    href={pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors group"
                                                    title={`${pdfFileName}${pdfSize ? ` (${pdfSize})` : ''}`}
                                                >
                                                    <FileText className="h-4 w-4 flex-shrink-0" />
                                                    <span className="text-xs">
                                                        {pdfFileName.length > 15
                                                            ? `${pdfFileName.substring(0, 15)}...`
                                                            : pdfFileName}
                                                    </span>
                                                    {pdfSize && (
                                                        <span className="text-xs text-slate-500 ml-1">
                                                            ({pdfSize})
                                                        </span>
                                                    )}
                                                </a>
                                            )}
                                        </div>

                                        <div className="flex items-center gap-1 text-slate-500">
                                            <Calendar className="h-3 w-3 flex-shrink-0" />
                                            <span className="text-xs whitespace-nowrap">{formatDate(pitchItem.createdAt)}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })
                ) : (
                    <div className="col-span-full text-center py-12">
                        <div className="text-slate-400 mb-4">
                            <Building className="h-12 w-12 mx-auto mb-4" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900 mb-2">No pitches found</h3>
                        <p className="text-slate-600">
                            {search ? "Try adjusting your search terms" : "No pitches available yet"}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FounderAllPitch;
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
    Building
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

    const makePdfUrl = (pdfPath) => {
        if (!pdfPath) return null;
        const normalizedPath = pdfPath.replace(/\\/g, "/");
        const uploadsIndex = normalizedPath.indexOf("uploads/");
        if (uploadsIndex === -1) return null;
        const relativePath = normalizedPath.substring(uploadsIndex);
        return `http://localhost:5000/${relativePath}`;
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
        <div className="space-y-6">
            {/* Search Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-6">
                    <div className="flex gap-4 items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search pitches by title, tagline, problem, or solution..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Button variant="outline" className="flex items-center gap-2">
                            <Filter className="h-4 w-4" />
                            <span>Filter</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    All Pitches
                </h2>
                <Badge variant="outline" className="text-sm">
                    {filteredPitches.length} pitches found
                </Badge>
            </div>

            {/* Pitch Cards Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredPitches.length > 0 ? (
                    filteredPitches.map((pitchItem) => (
                        <Card key={pitchItem._id} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow duration-300">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-xl font-bold text-slate-900 mb-2">
                                            {pitchItem.title}
                                        </CardTitle>
                                        <p className="text-sm text-indigo-600 font-medium mb-3">
                                            {pitchItem.tagline}
                                        </p>
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
                            </CardHeader>

                            <CardContent className="space-y-4">
                                {/* Problem & Solution */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Target className="h-4 w-4 text-red-500" />
                                            <span className="text-sm font-medium text-slate-700">Problem</span>
                                        </div>
                                        <p className="text-sm text-slate-600 pl-6">{pitchItem.problem}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Building className="h-4 w-4 text-green-500" />
                                            <span className="text-sm font-medium text-slate-700">Solution</span>
                                        </div>
                                        <p className="text-sm text-slate-600 pl-6">{pitchItem.solution}</p>
                                    </div>
                                </div>

                                {/* Key Metrics */}
                                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-200">
                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <DollarSign className="h-4 w-4 text-green-600" />
                                            <span className="text-xs font-medium text-slate-700">Funding</span>
                                        </div>
                                        <p className="text-sm text-slate-900 font-medium">{pitchItem.funding}</p>
                                    </div>

                                    <div className="space-y-2">
                                        <div className="flex items-center gap-2">
                                            <TrendingUp className="h-4 w-4 text-blue-600" />
                                            <span className="text-xs font-medium text-slate-700">Raised</span>
                                        </div>
                                        <p className="text-sm text-slate-900 font-medium">{pitchItem.raised}</p>
                                    </div>
                                </div>

                                {/* Market & Traction */}
                                <div className="space-y-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <Users className="h-4 w-4 text-purple-500" />
                                            <span className="text-sm font-medium text-slate-700">Market</span>
                                        </div>
                                        <p className="text-sm text-slate-600 pl-6">{pitchItem.market}</p>
                                    </div>

                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <TrendingUp className="h-4 w-4 text-orange-500" />
                                            <span className="text-sm font-medium text-slate-700">Traction</span>
                                        </div>
                                        <p className="text-sm text-slate-600 pl-6">{pitchItem.traction}</p>
                                    </div>
                                </div>

                                {/* Team & Active Users */}
                                <div className="grid grid-cols-1 gap-3">
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">Team: </span>
                                        <span className="text-sm text-slate-600">{pitchItem.team}</span>
                                    </div>
                                    <div>
                                        <span className="text-sm font-medium text-slate-700">Active Users: </span>
                                        <span className="text-sm text-slate-600">{pitchItem.activeUser}</span>
                                    </div>
                                </div>

                                {/* Links and Date */}
                                <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                                    <div className="flex items-center gap-3">
                                        {pitchItem.youtube && (
                                            <a
                                                href={pitchItem.youtube}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                                            >
                                                <Youtube className="h-4 w-4" />
                                                <span className="text-xs">Video</span>
                                            </a>
                                        )}
                                        {pitchItem.pdf && (
                                            <a
                                                href={makePdfUrl(pitchItem.pdf)}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors"
                                            >
                                                <FileText className="h-4 w-4" />
                                                <span className="text-xs">PDF</span>
                                            </a>
                                        )}
                                    </div>

                                    <div className="flex items-center gap-1 text-slate-500">
                                        <Calendar className="h-3 w-3" />
                                        <span className="text-xs">{formatDate(pitchItem.createdAt)}</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))
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
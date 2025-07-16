import { useEffect, useState } from "react";
import { useSupporterPitch } from "../../../context/SupporterpitchContext";
import {
    Loader2,
    Search,
    Filter,
    Building
} from "lucide-react";
import { Card, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Badge } from "../../UI/Badge";
import PitchCard from "./PitchCard";

const AllPitchList = () => {
    const { getAllPitchesSupporter, allpitches, loading } = useSupporterPitch();
    const [search, setSearch] = useState("");
    const [filteredPitches, setFilteredPitches] = useState([]);
    const [pitchLikes, setPitchLikes] = useState({});

    useEffect(() => {
        getAllPitchesSupporter();
    }, []);

    useEffect(() => {
        if (allpitches) {
            const filtered = allpitches.filter(p =>
                p.title?.toLowerCase().includes(search.toLowerCase()) ||
                p.tagline?.toLowerCase().includes(search.toLowerCase()) ||
                p.problem?.toLowerCase().includes(search.toLowerCase()) ||
                p.solution?.toLowerCase().includes(search.toLowerCase()) ||
                p.companyName?.toLowerCase().includes(search.toLowerCase()) ||
                p.ownerName?.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredPitches(filtered);

            const likesCount = {};
            filtered.forEach(pitch => {
                likesCount[pitch._id] = pitch.likes ? pitch.likes.length : 0;
            });
            setPitchLikes(likesCount);
        }
    }, [allpitches, search]);

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
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">
            {/* Search Section */}
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="">
                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search pitches by title, tagline, problem, or solution..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 border-gray-300 text-sm"
                            />
                        </div>
                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-gray-300 w-full sm:w-auto justify-center"
                        >
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-500">Filter</span>
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Explore Pitches
                </h2>
                <Badge variant="outline" className="text-sm w-fit">
                    {filteredPitches.length} pitches found
                </Badge>
            </div>

            {/* Pitch Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-4">
                {filteredPitches.length > 0 ? (
                    filteredPitches.map((pitchItem) => (
                        <PitchCard
                            key={pitchItem._id}
                            pitchItem={pitchItem}
                            pitchLikes={pitchLikes}
                            setPitchLikes={setPitchLikes}
                            filteredPitches={filteredPitches}
                            setFilteredPitches={setFilteredPitches}
                        />
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

export default AllPitchList;
import FounderResultCard from "./FounderResultCard";
import { useEffect, useState } from "react";
import { Card, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Label } from "../../UI/Label";
import { RadioGroup, RadioGroupItem } from "../../UI/RadioGroup";
import { Search, Filter } from "lucide-react";
import axiosInstance from "../../../../utils/axiosInstance";

export default function FounderCardList() {
    const [search, setSearch] = useState("");
    const [mergeReady, setMergeReady] = useState("all");
    const [founders, setFounders] = useState([]);
    const [filteredFounders, setFilteredFounders] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getAllFounderProfile = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;
            setLoading(true);
            try {
                const response = await axiosInstance.get('/founder/allFounderProfile', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });
                setFounders(response.data.allfounder);
                setFilteredFounders(response.data.allfounder);
            } catch (err) {
                console.error("Server side Problem", err);
            } finally {
                setLoading(false);
            }
        }
        getAllFounderProfile();
    }, [])

    // Filter founders based on search and merge readiness
    useEffect(() => {
        let filtered = [...founders];

        // Search filter
        if (search.trim()) {
            filtered = filtered.filter(founder =>
                founder.startUpName?.toLowerCase().includes(search.toLowerCase()) ||
                founder.domain?.toLowerCase().includes(search.toLowerCase()) ||
                founder.bio?.toLowerCase().includes(search.toLowerCase()) ||
                founder.location?.toLowerCase().includes(search.toLowerCase()) ||
                founder.achievements?.toLowerCase().includes(search.toLowerCase())
            );
        }

        // Merge readiness filter
        if (mergeReady !== "all") {
            filtered = filtered.filter(founder => {
                if (mergeReady === "ready") {
                    return founder.readytomerge === true;
                } else if (mergeReady === "not-ready") {
                    return founder.readytomerge === false;
                }
                return true;
            });
        }

        setFilteredFounders(filtered);
    }, [search, mergeReady, founders]);

    const handleSearch = () => {
        // The filtering is already handled by useEffect
        // This function can be used for additional search logic if needed
        console.log("Search triggered");
    };

    if (loading) {
        return <p className="text-center text-slate-500">Loading founders...</p>;
    }

    return (
        <>
            <Card className="bg-white/80 backdrop-blur-sm">
                <CardContent className="p-4 sm:p-6">
                    <div className="flex flex-col sm:flex-row gap-4 sm:items-center">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                            <Input
                                placeholder="Search founders, companies, or keywords..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10 border-gray-300"
                            />
                        </div>

                        <Button
                            variant="outline"
                            className="flex items-center gap-2 border-gray-300 w-full sm:w-auto"
                            onClick={handleSearch}
                        >
                            <Filter className="h-4 w-4 text-gray-500" />
                            <span className="text-gray-500">Search</span>
                        </Button>
                    </div>

                    <div className="mt-6 pt-6 border-t border-gray-300 grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Merge readiness ───────────────────────── */}
                        <div className="space-y-3 lg:col-span-2">
                            <Label className="text-sm font-semibold text-gray-700">Merge Readiness</Label>

                            <RadioGroup
                                value={mergeReady}
                                onValueChange={setMergeReady}
                                className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-gray-600 text-sm font-light"
                            >
                                {[
                                    { id: "all", label: "All" },
                                    { id: "ready", label: "Ready to Merge" },
                                    { id: "not-ready", label: "Not Ready" },
                                ].map(({ id, label }) => (
                                    <div className="flex items-center space-x-2" key={id}>
                                        <RadioGroupItem id={id} value={id} />
                                        <Label htmlFor={id} className="text-sm cursor-pointer">
                                            {label}
                                        </Label>
                                    </div>
                                ))}
                            </RadioGroup>
                        </div>

                        {/* Results count */}
                        <div className="flex items-center lg:items-end lg:justify-end">
                            <p className="text-sm text-slate-600">
                                Showing {filteredFounders.length} of {founders.length} founders
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {filteredFounders.length === 0 ? (
                <Card className="bg-white/80 backdrop-blur-sm">
                    <CardContent className="p-8 text-center">
                        <p className="text-slate-500">No founders found matching your criteria.</p>
                        <p className="text-sm text-slate-400 mt-2">Try adjusting your search or filters.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
                    {filteredFounders.map((founder, idx) => (
                        <FounderResultCard key={founder._id || idx} founder={founder} />
                    ))}
                </div>
            )}
        </>
    );
}
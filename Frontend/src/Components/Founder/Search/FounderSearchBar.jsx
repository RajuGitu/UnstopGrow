import { useState } from "react";
import { Card, CardContent } from "../../UI/Card";
import { Input } from "../../UI/Input";
import { Button } from "../../UI/Button";
import { Label } from "../../UI/Label";
import { RadioGroup, RadioGroupItem } from "../../UI/RadioGroup";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "../../UI/Select";
import { Search, Filter } from "lucide-react";

const DOMAIN_OPTIONS = [
    { value: "all", label: "All Domains" },
    { value: "ai-ml", label: "AI & Machine Learning" },
    { value: "clean-energy", label: "Clean Energy" },
    { value: "health-tech", label: "HealthTech" },
    { value: "data-analytics", label: "Data Analytics" },
    { value: "edtech", label: "EdTech" },
    { value: "fintech", label: "FinTech" },
    { value: "ecommerce", label: "E-commerce" },
    { value: "cybersecurity", label: "Cybersecurity" },
    { value: "iot", label: "IoT" },
    { value: "blockchain", label: "Blockchain" },
];

export default function FounderSearchBar() {
    const [search, setSearch] = useState("");
    const [domain, setDomain] = useState("");
    const [mergeReady, setMergeReady] = useState("all");

    const handleSubmit = () => {
        console.log({ search, domain, mergeReady });
    };

    return (
        <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="p-6">
                {/* ──────────────────────────────────  Search row  ────────────────────────────────── */}
                <div className="flex gap-4 items-center">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                            placeholder="Search founders, companies, or keywords..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10"
                        />
                    </div>

                    <Button variant="outline" onClick={handleSubmit} className="flex items-center gap-2">
                        <Filter className="h-4 w-4" />
                        <span>Search</span>
                    </Button>
                </div>

                {/* ──────────────────────────────────  Filters  ────────────────────────────────── */}
                <div className="mt-6 pt-6 border-t grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Domain ───────────────────────────────── */}
                    <div className="space-y-2">
                        <Label className="text-sm font-medium">Domain</Label>

                        <Select value={domain} onValueChange={setDomain}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="All Domains" />
                            </SelectTrigger>

                            <SelectContent>
                                {DOMAIN_OPTIONS.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Merge readiness ───────────────────────── */}
                    <div className="space-y-3">
                        <Label className="text-sm font-medium">Merge Readiness</Label>

                        <RadioGroup
                            value={mergeReady}
                            onValueChange={setMergeReady}
                            className="grid gap-2"
                        >
                            {[
                                { id: "all", label: "All" },
                                { id: "ready", label: "Ready to Merge" },
                                { id: "not-ready", label: "Not Ready" },
                            ].map(({ id, label }) => (
                                <div className="flex items-center space-x-2" key={id}>
                                    <RadioGroupItem id={id} value={id} />
                                    <Label htmlFor={id} className="text-sm">
                                        {label}
                                    </Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}

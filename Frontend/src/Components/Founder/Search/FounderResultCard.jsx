import {
    Card,
    CardContent,
    CardHeader,
} from "../../UI/Card";
import { Avatar, AvatarFallback } from "../../UI/Avatar";
import { Badge } from "../../UI/Badge";
import { Button } from "../../UI/Button";

import {
    Mail,
    Linkedin,
    TrendingUp,
    MapPin,
    Building,
    Globe,
    Github,
    Twitter,
} from "lucide-react";
import { useState } from "react";
import { FounderExpressInterest } from "../FounderExpressInterest";

const imgPlaceholder = "https://via.placeholder.com/120x80?text=No+Image";
export default function FounderResultCard({ founder }) {
    const [selectedStartup, setSelectedStartup] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Generate initials from startup name
    const makeUrl = (absolute) => {
        if (!absolute) return imgPlaceholder;
        const rel = absolute.split("uploads")[1];
        return rel
            ? `http://localhost:5000/uploads${rel.replace(/\\/g, "/")}`
            : imgPlaceholder;
    };
    const getInitials = (name) => {
        if (!name) return "ST";
        return name?.split(" ").map(word => word[0]).join("").toUpperCase().slice(0, 2);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric'
        });
    };

    const handleExpressInterest = (startup) => {
        setSelectedStartup(startup);
        setIsModalOpen(true);
    }

    return (
        <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
            {/* ─────────── header ─────────── */}
            <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12">
                            {
                                founder.logo && <img src={makeUrl(founder.logo)} alt="" className="flex h-full w-full items-center justify-center rounded-full bg-muted" />
                            }
                            {
                                !founder.logo && <AvatarFallback>{getInitials(founder.startUpName)}</AvatarFallback>
                            }
                        </Avatar>

                        <div>
                            <h3 className="font-semibold text-lg">{founder.startUpName}</h3>
                            <p className="text-sm text-slate-600 flex items-center">
                                <Building className="h-3 w-3 mr-1" />
                                {founder.domain}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col items-end space-y-2">
                        <Badge variant={founder.readytomerge ? "default" : "outline"}>
                            {founder.readytomerge ? "Ready to Merge" : "Not Ready"}
                        </Badge>
                        <div className="flex items-center text-sm text-slate-500">
                            <TrendingUp className="h-4 w-4 mr-1" />
                            Since {formatDate(founder.createdAt)}
                        </div>
                    </div>
                </div>
            </CardHeader>

            {/* ─────────── body ─────────── */}
            <CardContent className="space-y-4 pt-0">
                {/* bio */}
                <div>
                    <p className="text-sm text-slate-600">{founder.bio}</p>
                </div>

                {/* location */}
                <div className="grid grid-cols-1 gap-4 text-sm">
                    <div className="flex items-center text-slate-600">
                        <MapPin className="h-4 w-4 mr-2" />
                        {founder.location}
                    </div>
                </div>

                {/* achievements */}
                {founder.achievements && (
                    <div className="space-y-2">
                        <p className="font-medium text-sm">Achievements:</p>
                        <p className="text-sm text-slate-600">{founder.achievements}</p>
                    </div>
                )}

                {/* actions */}
                <div className="flex flex-wrap justify-between items-center gap-2 pt-4 border-t border-gray-300">
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" className="border-gray-300 text-blue-600">
                            <Mail className="h-4 w-4 mr-1" />
                            Contact
                        </Button>

                        {founder.socials?.linkedin && (
                            <Button variant="outline" className="border-gray-300 text-blue-600" asChild>
                                <a href={founder.socials.linkedin} target="_blank" rel="noopener noreferrer">
                                    <Linkedin className="h-4 w-4 mr-1" />
                                    LinkedIn
                                </a>
                            </Button>
                        )}

                        {founder.socials?.github && (
                            <Button variant="outline" className="border-gray-300 text-blue-600" asChild>
                                <a href={founder.socials.github} target="_blank" rel="noopener noreferrer">
                                    <Github className="h-4 w-4 mr-1" />
                                    GitHub
                                </a>
                            </Button>
                        )}

                        {founder.socials?.twitter && (
                            <Button variant="outline" className="border-gray-300 text-blue-600" asChild>
                                <a href={founder.socials.twitter} target="_blank" rel="noopener noreferrer">
                                    <Twitter className="h-4 w-4 mr-1" />
                                    Twitter
                                </a>
                            </Button>
                        )}

                        {founder.website && (
                            <Button variant="outline" className="border-gray-300 text-blue-600" asChild>
                                <a href={founder.website} target="_blank" rel="noopener noreferrer">
                                    <Globe className="h-4 w-4 mr-1" />
                                    Website
                                </a>
                            </Button>
                        )}
                    </div>

                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500" onClick={() => { handleExpressInterest(founder) }}>
                        Send Merge Request
                    </Button>
                </div>
            </CardContent>
            <FounderExpressInterest
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                startup={selectedStartup} />

        </Card>
    );
}   
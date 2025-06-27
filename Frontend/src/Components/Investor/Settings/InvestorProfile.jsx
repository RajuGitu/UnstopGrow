import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Label } from "../../UI/Label";
import { User } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
const InvestorProfile = () => {
    const [profile, setProfile] = useState({
        name: "John Doe",
        email: "john.doe@email.com",
        company: "Venture Capital Partners",
        title: "Senior Partner",
        bio: "Experienced investor focused on early-stage tech startups with 10+ years in the industry.",
        avatar: ""
    });

    const handleSaveProfile = () => {
        toast.success("Profile updated successfully!");
    };
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                        <User className="w-5 h-5" />
                        <span>Profile Information</span>
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center">
                            <span className="text-white text-2xl font-bold">JD</span>
                        </div>
                        <div>
                            <Button variant="outline" size="sm" className='border-gray-300'>Change Avatar</Button>
                            <p className="text-sm text-gray-500 mt-1">JPG, PNG up to 2MB</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="name">Full Name</Label>
                            <Input
                                id="name"
                                value={profile.name}
                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                className="border-gray-300"
                            />
                        </div>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                value={profile.email}
                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                className="border-gray-300"
                            />
                        </div>
                        <div>
                            <Label htmlFor="company">Company</Label>
                            <Input
                                id="company"
                                value={profile.company}
                                onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                                className="border-gray-300"
                            />
                        </div>
                        <div>
                            <Label htmlFor="title">Job Title</Label>
                            <Input
                                id="title"
                                value={profile.title}
                                onChange={(e) => setProfile({ ...profile, title: e.target.value })}
                                className="border-gray-300"
                            />
                        </div>
                    </div>

                    <div>
                        <Label htmlFor="bio">Bio</Label>
                        <textarea
                            id="bio"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            rows={3}
                            value={profile.bio}
                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                        />
                    </div>

                    <Button onClick={handleSaveProfile} className='bg-gray-900 text-white'>Save Profile</Button>
                </CardContent>
            </Card>
        </>
    )
};
export default InvestorProfile;

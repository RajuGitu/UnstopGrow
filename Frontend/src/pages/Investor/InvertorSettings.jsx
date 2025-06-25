import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../Components/UI/Card";
import { Button } from "../../Components/UI/Button";
import { Input } from "../../Components/UI/Input";
import { Label } from "../../Components/UI/Label";
import { Badge } from "../../Components/UI/Badge";
import { Switch } from "../../Components/UI/Switch";
import { Separator } from "../../Components/UI/Separator";
import { User, Bell, Shield, X } from "lucide-react";
import { toast } from "sonner";

const InvestorSettings = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "john.doe@email.com",
    company: "Venture Capital Partners",
    title: "Senior Partner",
    bio: "Experienced investor focused on early-stage tech startups with 10+ years in the industry.",
    avatar: ""
  });

  const [interests, setInterests] = useState(["AI", "EdTech", "FinTech", "HealthTech"]);
  const [newInterest, setNewInterest] = useState("");

  const [notifications, setNotifications] = useState({
    newStartups: true,
    pitchUpdates: true,
    messages: true,
    weeklyDigest: false
  });

  const addInterest = () => {
    if (newInterest && !interests.includes(newInterest)) {
      setInterests([...interests, newInterest]);
      setNewInterest("");
      toast.success("Interest added successfully!");
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
    toast.success("Interest removed successfully!");
  };

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleSaveNotifications = () => {
    toast.success("Notification preferences updated!");
  };

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">Manage your profile and preferences</p>
      </div>

      {/* Profile Settings */}
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

      {/* Investment Interests */}
      <Card>
        <CardHeader>
          <CardTitle>Domains of Interest</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {interests.map((interest) => (
              <Badge key={interest} variant="secondary" className="flex items-center space-x-2 ">
                <span>#{interest}</span>
                <button
                  onClick={() => removeInterest(interest)}
                  className="ml-1 hover:text-red-500 "

                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>

          <div className="flex space-x-2">
            <Input
              placeholder="Add new domain (e.g., GreenTech)"
              value={newInterest}
              onChange={(e) => setNewInterest(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addInterest()}
              className="border-gray-300"
            />
            <Button onClick={addInterest} className="bg-gray-900 text-white">Add</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Settings */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Bell className="w-5 h-5" />
            <span>Notification Preferences</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">New Startup Alerts</h4>
                <p className="text-sm text-gray-600">Get notified when new startups match your interests</p>
              </div>
              <Switch
                checked={notifications.newStartups}
                onCheckedChange={(checked) => setNotifications({ ...notifications, newStartups: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Pitch Updates</h4>
                <p className="text-sm text-gray-600">Updates when startups you follow post new content</p>
              </div>
              <Switch
                checked={notifications.pitchUpdates}
                onCheckedChange={(checked) => setNotifications({ ...notifications, pitchUpdates: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Messages</h4>
                <p className="text-sm text-gray-600">Direct messages from founders</p>
              </div>
              <Switch
                checked={notifications.messages}
                onCheckedChange={(checked) => setNotifications({ ...notifications, messages: checked })}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Weekly Digest</h4>
                <p className="text-sm text-gray-600">Weekly summary of platform activity</p>
              </div>
              <Switch
                checked={notifications.weeklyDigest}
                onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyDigest: checked })}
              />
            </div>
          </div>

          <Button onClick={handleSaveNotifications} className="bg-gray-900 text-white">Save Preferences</Button>
        </CardContent>
      </Card>

      {/* Account Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Account Security</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Change Password</h4>
              <div className="space-y-2">
                <Input type="password" placeholder="Current password" className="border-gray-300"/>
                <Input type="password" placeholder="New password " className="border-gray-300"/>
                <Input type="password" placeholder="Confirm new password" className="border-gray-300"/>
                <Button variant="outline" className="border-gray-300" >Update Password</Button>
              </div>
            </div>

            <Separator />

            <div>
              <h4 className="font-medium mb-2">Two-Factor Authentication</h4>
              <p className="text-sm text-gray-600 mb-3">Add an extra layer of security to your account</p>
              <Button variant="outline" className="border-gray-300">Enable 2FA</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvestorSettings;

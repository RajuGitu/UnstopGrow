import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Switch } from "../../UI/Switch";
import { Separator } from "../../UI/Separator";
import { Bell } from "lucide-react";
import { toast } from "sonner";
const InvestorNotification = () => {

    const [notifications, setNotifications] = useState({
        newStartups: true,
        pitchUpdates: true,
        messages: true,
        weeklyDigest: false
    });




    const handleSaveNotifications = () => {
        toast.success("Notification preferences updated!");
    };
    return (
        <>
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

        </>
    )
}

export default InvestorNotification;

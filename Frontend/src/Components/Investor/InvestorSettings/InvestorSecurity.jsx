import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Shield } from "lucide-react";
const InvestorSecurity = () => {
    return (
        <>
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
                                <Input type="password" placeholder="Current password" className="border-gray-300" />
                                <Input type="password" placeholder="New password " className="border-gray-300" />
                                <Input type="password" placeholder="Confirm new password" className="border-gray-300" />
                                <Button variant="outline" className="border-gray-300" >Update Password</Button>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </>
    )
}

export default InvestorSecurity;

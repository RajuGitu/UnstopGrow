import { Card, CardHeader, CardTitle, CardContent } from "../../UI/Card";
import { Badge } from "../../UI/Badge";
import { Shield } from "lucide-react";

export default function VerificationStatusCard() {
    return (
        <Card className="rounded-lg border bg-gradient-to-br from-green-50 to-emerald-100 border-green-200 text-card-foreground shadow-sm">
            <CardHeader className="flex flex-col space-y-1.5 p-6">
                <CardTitle className="flex items-center space-x-2 text-2xl font-semibold leading-none tracking-tight">
                    <Shield className="h-5 w-5 text-green-600" />
                    <span>Verification Status</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="p-6 pt-0">
                <div>
                    <Badge className="bg-green-500 mb-2">✓ Verified Founder</Badge>
                    <p className="text-sm text-green-700">
                        Your startup is verified and has access to all founder features.
                    </p>
                </div>
            </CardContent>
        </Card>
    );
}

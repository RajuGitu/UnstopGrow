import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";
import { Button } from "../../UI/Button";
import { Input } from "../../UI/Input";
import { Badge } from "../../UI/Badge";
import { X } from "lucide-react";
import { toast } from "sonner";
const InvestorInvestment = () => {

    const [interests, setInterests] = useState(["AI", "EdTech", "FinTech", "HealthTech"]);
    const [newInterest, setNewInterest] = useState("");


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

    return (
        <>
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
        </>
    )
}
export default InvestorInvestment;

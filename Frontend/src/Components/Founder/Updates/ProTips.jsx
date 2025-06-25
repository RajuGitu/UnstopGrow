import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";   
const ProTips = () => {
    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="text-lg">💡 Pro Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                    <p className="text-slate-600">• Use engaging visuals to increase views by 65%</p>
                    <p className="text-slate-600">• Post during 9-11 AM for maximum reach</p>
                    <p className="text-slate-600">• Include specific numbers and metrics</p>
                    <p className="text-slate-600">• Ask questions to boost engagement</p>
                </CardContent>
            </Card>
        </>
    )
}

export default ProTips;
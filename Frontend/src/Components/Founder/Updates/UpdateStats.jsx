import { Card, CardContent, CardHeader, CardTitle } from "../../UI/Card";   

const UpdateStats = () => {
    return (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
            <CardHeader>
                <CardTitle className="text-lg">Your Update Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Updates</span>
                    <span className="font-bold text-2xl text-indigo-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Avg Views</span>
                    <span className="font-bold text-2xl text-green-600">1.2K</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600">Total Engagement</span>
                    <span className="font-bold text-2xl text-purple-600">3.4K</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default UpdateStats;

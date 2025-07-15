const UpdateStats = () => {
    return (
        <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 w-full">
            <CardHeader className="px-4 sm:px-6">
                <CardTitle className="text-base sm:text-lg">Your Update Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-4 px-4 sm:px-6">
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Total Updates</span>
                    <span className="font-bold text-xl sm:text-2xl text-indigo-600">24</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Avg Views</span>
                    <span className="font-bold text-xl sm:text-2xl text-green-600">1.2K</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-slate-600 text-sm sm:text-base">Total Engagement</span>
                    <span className="font-bold text-xl sm:text-2xl text-purple-600">3.4K</span>
                </div>
            </CardContent>
        </Card>
    );
};

export default UpdateStats;
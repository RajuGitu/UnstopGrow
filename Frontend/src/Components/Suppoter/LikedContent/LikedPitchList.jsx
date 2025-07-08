const LikedPitchList = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Liked Pitches</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                </div>
                <p className="text-gray-600">
                    Your liked pitch decks will appear here. Explore startup pitches and save the ones you find interesting!
                </p>
            </div>
        </div>
    )
}

export default LikedPitchList;
const LikedPostList = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Liked Posts</h2>
            <div className="bg-gray-50 rounded-lg p-8 text-center">
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                </div>
                <p className="text-gray-600">
                    Your liked posts will appear here. Start exploring and liking posts from startups!
                </p>
            </div>
        </div>
    )
}

export default LikedPostList;
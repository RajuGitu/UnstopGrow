import React, { useState } from 'react'
import LikedPostList from '../../Components/Suppoter/LikedContent/LikedPostList'
import LikedPitchList from '../../Components/Suppoter/LikedContent/LikedPitchList'

const SupporterLikedContent = () => {
    const [activeTab, setActiveTab] = useState('posts') // 'posts' or 'pitches'

    return (
        <>
            <div className="flex-1 p-3 sm:p-6 overflow-auto max-h-screen">
                <div className="space-y-6 sm:space-y-8 p-3 sm:p-5 bg-white rounded-lg">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                        <div className="flex-1">
                            <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                                Your Liked Content
                            </h1>
                            <p className="text-slate-600 mt-2 text-sm sm:text-base">
                                View all your liked posts and pitch decks from startups you're following.
                                Keep track of the most interesting content and opportunities.
                            </p>
                        </div>
                    </div>

                    {/* Toggle Button */}
                    <div className="flex items-center justify-center px-4">
                        <div className="bg-gray-100 p-1 rounded-lg flex w-full sm:w-auto">
                            <button
                                onClick={() => setActiveTab('posts')}
                                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-md transition-all duration-200 font-medium text-sm sm:text-base ${activeTab === 'posts'
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Liked Posts
                            </button>
                            <button
                                onClick={() => setActiveTab('pitches')}
                                className={`flex-1 sm:flex-initial px-4 sm:px-6 py-2 rounded-md transition-all duration-200 font-medium text-sm sm:text-base ${activeTab === 'pitches'
                                        ? 'bg-white text-indigo-600 shadow-sm'
                                        : 'text-gray-500 hover:text-gray-700'
                                    }`}
                            >
                                Liked Pitches
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="mt-6 sm:mt-8">
                        {activeTab === 'posts' ? (
                            <LikedPostList />
                        ) : (
                            <LikedPitchList />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default SupporterLikedContent
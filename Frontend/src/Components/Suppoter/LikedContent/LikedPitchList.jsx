import { useEffect, useState } from "react";
import axiosInstance from "../../../../utils/axiosInstance";
import { Loader2 } from "lucide-react";
import LikedPitchCard from "./LikedPitchCard";

const LikedPitchList = () => {
    const [allLikedPitch, setAllLikedPitch] = useState([]);
    const [loading, setLoading] = useState(true); // Set initial loading to true
    const [pitchLikes, setPitchLikes] = useState({});

    useEffect(() => {
        const AllLikedPitches = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAllLikedPitch([]);
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axiosInstance.get('/supporter/alllikedpitch', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    withCredentials: true,
                });

                const pitches = response?.data?.allPitches || [];
                setAllLikedPitch(pitches);

                // Initialize likes count
                const likesCount = {};
                pitches.forEach(pitch => {
                    likesCount[pitch._id] = pitch.likes?.length || 0;
                });
                setPitchLikes(likesCount);
            } catch (err) {
                console.error("Error fetching liked pitches:", err);
                setAllLikedPitch([]);
            } finally {
                setLoading(false);
            }
        };

        AllLikedPitches();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-indigo-600" />
                    <p className="text-gray-600">Loading pitches...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 px-1">Liked Pitches</h2>

            {allLikedPitch.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
                    {allLikedPitch.map((pitchItem) => (
                        <LikedPitchCard
                            key={pitchItem._id}
                            pitchItem={pitchItem}
                            pitchLikes={pitchLikes}
                            setPitchLikes={setPitchLikes}
                            allLikedPitch={allLikedPitch}
                            setAllLikedPitch={setAllLikedPitch}
                        />
                    ))}
                </div>
            ) : (
                <div className="bg-gray-50 rounded-lg p-6 sm:p-8 text-center mx-1">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-6 h-6 sm:w-8 sm:h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                    <p className="text-gray-600 text-sm sm:text-base px-4">
                        Your liked pitch decks will appear here. Explore startup pitches and save the ones you find interesting!
                    </p>
                </div>
            )}
        </div>
    );
};

export default LikedPitchList;
import { createContext, useContext, useState, useCallback } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const PitchPostContext = createContext(null);

export const usePitchPost = () => useContext(PitchPostContext);

export const PitchPostProvider = ({ children }) => {
    const [pitch, setPitch] = useState([]);
    const [post, setPost] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllPitches = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setPitch(null);
            return;
        }
        try {
            setLoading(true);
            const response = await axiosInstance.get("/founder/getPitch", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setPitch(response.data.pitches || []);
        } catch (err) {
            console.error("Error fetching pitches:", err);
            setPitch([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const getAllPost = useCallback(async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setPost(null);
            return;
        }
        try {
            setLoading(true);
            const response = await axiosInstance.get("/founder/recentUpdates", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            setPost(response.data.data || []);
        } catch (err) {
            console.error("Error fetching posts:", err);
            setPost([]); // Set empty array on error
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <PitchPostContext.Provider
            value={{
                pitch,
                post,
                getAllPitches,
                getAllPost,
                loading,
            }}
        >
            {children}
        </PitchPostContext.Provider>
    );
};
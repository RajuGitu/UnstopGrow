import { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

const InterestContext = createContext(null);

export const useInterest = () => useContext(InterestContext);

export const InterestProvider = ({ children }) => {
    const [intereseted, setIntereseted] = useState([]);
    const [loading, setLoading] = useState(false);
    const getAllInterestedFounder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            setIntereseted([]);
            return;
        }
        setLoading(true);
        try {
            const response = await axiosInstance.get('/founder/getinterestedfounder', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            })
            setIntereseted(response.data.mergedArray)
        } catch (err) {
            console.error("Server error while fetching intereseted investor:", err);
        } finally {
            setLoading(false);
        }
    }
    return (
        <InterestContext.Provider value={{ intereseted, loading, getAllInterestedFounder }}>
            {children}
        </InterestContext.Provider>
    )
}
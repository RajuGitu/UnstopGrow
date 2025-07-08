import { createContext, useContext, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";

export const SupporterpitchContext = createContext(null);

export const useSupporterPitch = () => useContext(SupporterpitchContext);

export const SupporterProvider = ({ children }) => {
    const [allpitches, SetAllPitches] = useState([]);
    const [loading, SetLoading] = useState(false);
    const getAllPitchesSupporter = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            SetAllPitches([]);
        }
        SetLoading(true);
        try {
            const { data } = await axiosInstance.get('/supporter/supporterallPitches', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
                withCredentials: true,
            });
            SetAllPitches(data.allPitches);
        } catch (err) {
            console.error("Getting Supporter Pitches error", err)
        } finally {
            SetLoading(false);
        }
    }


    return (
        <SupporterpitchContext.Provider value={{
            getAllPitchesSupporter,
            allpitches,
            loading,
        }}>
            {children}
        </SupporterpitchContext.Provider >
    )
}
import axiosInstance from "../../utils/axiosInstance";
import { createContext, useContext, useState } from "react";
const InvestorDiscoverStartupsContext = createContext(null);
export const useInvestorDiscoverStartups = () =>
  useContext(InvestorDiscoverStartupsContext);
export const InvestorDiscoverStartupsProvider = ({ children }) => {
    const [startups, setStartups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const getAllDiscoverStartups = async () => {
        try {
        setLoading(true);
        setError(null);
    
        const token = localStorage.getItem("token");
        const response = await axiosInstance.get(
            "/investor/investorDiscoverStartups",
            {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            }
        );
    
        if (response.data.success) {
            const startupsData = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
    
            const transformedStartups = startupsData.map((startup, index) => ({
            companyLogo: startup?.logo,
            domain: startup?.domain || "General",
            companyName: startup?.startUpName || startup?.name || "Unknown Company",
            location: startup?.location || "Location not specified",
            readyToMerge: startup?.readytomerge || false,
            tagline: startup?.bio || startup?.tagline || "No description available",
            website: startup?.website || "",
            achievements: startup?.achievements || [],
            startupId: startup?.startupId || startup?._id || index,
            verified: startup?.verified || false,
            isSaved: startup?.isSaved || false,
            isInterest : startup?.isInterest || false,
            }));
    
            setStartups(transformedStartups);
        } else {
            setError("Failed to fetch startups");
        }
        } catch (error) {
        console.error("Error fetching Startups:", error);
        setError("Failed to load startup data. Please try again later.");
        } finally {
        setLoading(false);
        }
    };
    
    return (
        <InvestorDiscoverStartupsContext.Provider
        value={{ startups, loading, error, getAllDiscoverStartups }}
        >
        {children}
        </InvestorDiscoverStartupsContext.Provider>
    );
    }
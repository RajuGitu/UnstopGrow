import axiosInstance from "../../utils/axiosInstance";

import { createContext, useContext, useState } from "react";

const InvestorInterestedStartupsContext = createContext(null);

export const useInvestorInterestedStartups = () =>
  useContext(InvestorInterestedStartupsContext);

export const InvestorInterestedStartupsProvider = ({ children }) => {
  const [interestedStartups, setInterestedStartups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAllInterestedStartups = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await axiosInstance.get(
        "/investor/investorInterestStartups",
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
          companyName:
            startup?.startUpName || startup?.name || "Unknown Company",
          location: startup?.location || "Location not specified",
          tagline:
            startup?.bio || startup?.tagline || "No description available",
          website: startup?.website || "",
          achievements: startup?.achievements || [],
          startupId: startup?.startupId || startup?._id || index,
          email: startup?.email || "No email provided",
          linkedIn: startup?.socials?.linkedin || "No LinkedIn provided",
          gitHub: startup?.socials?.github || "No GitHub provided",
          twitter: startup?.socials?.twitter || "No Twitter provided",
        }));

        setInterestedStartups(transformedStartups);
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
    <InvestorInterestedStartupsContext.Provider
      value={{ interestedStartups, loading,error, getAllInterestedStartups }}
    >
      {children}
    </InvestorInterestedStartupsContext.Provider>
  );
};

import axiosInstance from "../../utils/axiosInstance";
import { createContext, useContext, useState } from "react";

const InvestorSavedStartupsContext = createContext(null);

export const useInvestorSavedStartups = () => useContext(InvestorSavedStartupsContext);

export const InvestorSavedStartupsProvider = ({ children }) => {
  const [savedStartups, setSavedStartups] = useState([]);
  const [loading, setLoading] = useState(false);

  const getAllSavedStartups = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setSavedStartups([]);
      return;
    }
    setLoading(true);
    try {
      const response = await axiosInstance.get('/investor/investorSaveStartups', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
      });
      setSavedStartups(response.data.data);
    } catch (err) {
      console.error("Server error while fetching saved startups:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <InvestorSavedStartupsContext.Provider value={{ savedStartups, loading, getAllSavedStartups }}>
      {children}
    </InvestorSavedStartupsContext.Provider>
  );
}
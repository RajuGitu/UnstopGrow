import axiosInstance from "../../utils/axiosInstance";
import { createContext, useContext, useState} from "react";
const AllPostSupporterContext = createContext(null);
export const useAllPostSupporter = () => useContext(AllPostSupporterContext);

export const AllPostSupporterProvider = ({ children }) => 
{
    const [allPostSupporter, setAllPostSupporter] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getAllPostSupporter = async () => {
        try {
            setLoading(true);
            setError(null);
            const token = localStorage.getItem("token");
            const response = await axiosInstance.get("/supporter/supporterExploreAllPost", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.data.success) {
                setAllPostSupporter(response.data.data || []);
            } else {
                setError("Failed to fetch posts");
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            setError("Failed to load posts. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <AllPostSupporterContext.Provider value={{ allPostSupporter, loading, error,getAllPostSupporter }}>
            {children}
        </AllPostSupporterContext.Provider>
    );
}
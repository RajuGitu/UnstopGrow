import { createContext, useState, useContext, useEffect, useCallback } from "react";

export const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [founder, setFounder] = useState(null);
    const [investor, setInvestor] = useState(null);
    const [loading, setLoading] = useState(true); // Start with true
    const [initialized, setInitialized] = useState(false);

    const getFounderName = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setFounder(null);
            return false;
        }

        try {
            const response = await fetch('http://localhost:5000/getfounderauthenticate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch founder name");
            }

            const data = await response.json();
            setFounder(data.userName ?? null);
            return true; // Return true if successful
        } catch (err) {
            console.error("Server error while fetching founder:", err.message);
            setFounder(null);
            return false;
        }
    }, []);

    const getInvestorName = useCallback(async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setInvestor(null);
            return false;
        }

        try {
            const response = await fetch('http://localhost:5000/getinvestorauthenticate', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch investor name");
            }

            const data = await response.json();
            setInvestor(data.userName ?? null);
            return true;
        } catch (err) {
            console.error("Server error while fetching investor:", err.message);
            setInvestor(null);
            return false;
        }
    }, []);

    // Initialize authentication on mount
    useEffect(() => {
        const initializeAuth = async () => {
            setLoading(true);
            const token = localStorage.getItem('token');

            if (!token) {
                setFounder(null);
                setInvestor(null);
                setLoading(false);
                setInitialized(true);
                return;
            }

            // Try to authenticate as founder first, then investor
            const founderAuth = await getFounderName();
            if (!founderAuth) {
                await getInvestorName();
            }

            setLoading(false);
            setInitialized(true);
        };

        initializeAuth();
    }, [getFounderName, getInvestorName]);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setFounder(null);
        setInvestor(null);
    }, []);

    const isAuthenticated = founder !== null || investor !== null;

    return (
        <AuthContext.Provider value={{
            founder,
            investor,
            getFounderName,
            getInvestorName,
            loading,
            initialized,
            isAuthenticated,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
};
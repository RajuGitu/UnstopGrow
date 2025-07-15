import {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
} from "react";

export const AuthContext = createContext(null);
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    /* ───────── state ───────── */
    const [founder, setFounder] = useState({});
    const [investor, setInvestor] = useState(null);
    const [supporter, setSupporter] = useState({});

    const [loading, setLoading] = useState(true);
    const [initialized, setInitialized] = useState(false);

    /* ───────── helpers ───────── */
    const token = () => localStorage.getItem("token");

    /* 1️⃣  Founder  */
    const getFounderName = useCallback(async () => {
        if (!token()) return false;
        try {
            const res = await fetch("https://unstopgrowb.onrender.com/getfounderauthenticate", {
                headers: { Authorization: `Bearer ${token()}` },
                credentials: "include",
            });
            if (!res.ok) throw new Error();
            const { userName } = await res.json();
            setFounder(userName ?? null);
            return true;
        } catch (err) {
            setFounder({});
            return false;
        }
    }, []);

    /* 2️⃣  Investor */
    const getInvestorName = useCallback(async () => {
        if (!token()) return false;
        try {
            const res = await fetch("https://unstopgrowb.onrender.com/getinvestorauthenticate", {
                headers: { Authorization: `Bearer ${token()}` },
                credentials: "include",
            });
            if (!res.ok) throw new Error();
            const { userName } = await res.json();
            setInvestor(userName ?? null);
            return true;
        } catch (err) {
            setInvestor(null);
            return false;
        }
    }, []);

    /* 3️⃣  Supporter */
    const getSupporterName = useCallback(async () => {
        if (!token()) return false;
        try {
            const res = await fetch(
                "https://unstopgrowb.onrender.com/getSupporterAuthenticate",
                {
                    headers: { Authorization: `Bearer ${token()}` },
                    credentials: "include",
                }
            );
            if (!res.ok) throw new Error();
            const { userName } = await res.json();
            setSupporter(userName)
            return true;
        } catch (err) {
            setSupporter({});
            return false;
        }
    }, []);

    /* ───────── init once ───────── */
    useEffect(() => {
        const init = async () => {
            if (!token()) {
                setLoading(false);
                setInitialized(true);
                return;
            }

            setLoading(true);

            // try founder → investor → supporter (stop at first success)
            const okFounder = await getFounderName();
            const okInvestor = okFounder ? false : await getInvestorName();
            if (!okFounder && !okInvestor) await getSupporterName();

            setLoading(false);
            setInitialized(true);
        };
        init();
    }, [getFounderName, getInvestorName, getSupporterName]);

    /* ───────── logout ───────── */
    const logout = useCallback(() => {
        localStorage.removeItem("token");
        setFounder({});
        setInvestor(null);
        setSupporter({});
    }, []);

    const isAuthenticated = Boolean(founder || investor || supporter);

    /* ───────── provider ───────── */
    return (
        <AuthContext.Provider
            value={{
                founder,
                investor,
                supporter,

                getFounderName,
                getInvestorName,
                getSupporterName,

                loading,
                initialized,
                isAuthenticated,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

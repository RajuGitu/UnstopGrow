import { Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";
import { SupporterSidebar } from "./SupporterSidebar";

const SupporterLayout = () => {
    const { supporter, loading, initialized } = useAuth();

    if (!initialized || loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-lg">Checking authentication...</p>
            </div>
        );
    }

    if (initialized && !supporter) {
        return <Navigate to="/login" replace />;
    }
    return (
        <div className="min-h-screen bg-gray-50 flex">
            <SupporterSidebar />
            <div className="flex-1 flex flex-col">
                <main className="flex-1 overflow-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SupporterLayout;
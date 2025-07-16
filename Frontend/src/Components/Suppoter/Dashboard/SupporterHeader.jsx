// SupporterHeader.js
import { useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';

const SupporterHeader = () => {
    const { supporter, getSupporterName } = useAuth();

    useEffect(() => {
        getSupporterName()
    }, [])

    return (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 sm:gap-0">
            <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent break-words">
                    Welcome back, {supporter?.username || 'User'}! 👋
                </h1>
                <p className="text-slate-600 mt-2 text-sm sm:text-base">
                    Let's Explore new Startup Ideas
                </p>
            </div>
        </div>
    )
}

export default SupporterHeader;
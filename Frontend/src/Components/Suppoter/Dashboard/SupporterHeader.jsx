import { useAuth } from '../../../context/AuthContext';
const SupporterHeader = () => {
    const { supporter } = useAuth();
    return (
        <div className="flex justify-between items-start">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    Welcome back, {supporter.username}! 👋
                </h1>
                <p className="text-slate-600 mt-2">
                    Let's Explore new Startup Idea's
                </p>
            </div>
        </div>
    )
}

export default SupporterHeader;
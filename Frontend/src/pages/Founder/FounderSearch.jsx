import FounderCardList from "../../Components/Founder/Search/FounderCardList";

const FounderSearch = () => {
    return (
        <>
            <div className="space-y-8 max-h-screen">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Find Merge Partners 🔍
                    </h1>
                    <p className="text-slate-600 mt-2">Discover founders ready to merge and grow together.</p>
                </div>
                <FounderCardList />
            </div>
        </>
    )
}

export default FounderSearch;
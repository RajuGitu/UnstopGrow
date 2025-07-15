import FounderCardList from "../../Components/Founder/Search/FounderCardList";

const FounderSearch = () => {
    return (
        <>
            <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 max-h-screen">
                <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Find Merge Partners 🔍
                    </h1>
                    <p className="text-slate-600 mt-2 text-sm sm:text-base max-w-2xl mx-auto sm:mx-0">
                        Discover founders ready to merge and grow together.
                    </p>
                </div>
                <FounderCardList />
            </div>
        </>
    )
}

export default FounderSearch;
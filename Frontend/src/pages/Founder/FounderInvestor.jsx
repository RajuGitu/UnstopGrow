import InvestorList from "../../Components/Founder/Interests/InvestorList";

const FounderInvestor = () => {
    return (
        <>
            <div className="space-y-8 ">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Investor Interest ⭐
                    </h1>
                    <p className="text-slate-600 mt-2">Track and manage investor relationships and funding opportunities.</p>
                </div>
                <div className="rounded-lg text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm pb-8">
                    <InvestorList />
                </div>
            </div>
        </>
    )
}

export default FounderInvestor;
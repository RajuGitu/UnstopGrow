import FeedbackList from "../../Components/Founder/Feedback/FeedbackList";

const FounderFeedback = () => {
    return (
        <>
            <div className="space-y-8 ">
                <div>
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Community Feedback 💬
                    </h1>
                    <p className="text-slate-600 mt-2">Listen to your community and improve your startup with valuable insights.</p>
                </div>
                <div className="rounded-lg text-card-foreground shadow-sm bg-white/80 backdrop-blur-sm pb-8">
                    <FeedbackList />
                </div>
            </div>
        </>
    )
}

export default FounderFeedback;
import AllPostList from "../../Components/Suppoter/AllPost/AllPostList";

const SupporterAllPost = () => {
    return (
        <>
            <div className="flex-1 overflow-auto max-h-screen">
                <div className="space-y-8 p-2 bg-white">
                    <div className="flex justify-between items-start">
                        <div>
                            <AllPostList/>
                        </div>
                    </div>
                    
                </div>
            </div>
        </>
    )
}

export default SupporterAllPost;
import UpdateForm from "../../Components/Founder/Updates/UpdateForm";
import RecentUpdates from "../../Components/Founder/Updates/RecentUpdates";
import ProTips from "../../Components/Founder/Updates/ProTips";
import ExpandPost from "../../Components/Founder/Updates/ExpandPost";

const FounderUpdates = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Share Your Journey 📝
        </h1>
        <p className="text-slate-600 mt-2">
          Keep your community updated on your startup's milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <UpdateForm />
        </div>
        <div className="space-y-6">
          <ProTips />
        </div>
      </div>

      <RecentUpdates />
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
        <ExpandPost />
      </div>
    </div>
  );
};

export default FounderUpdates;

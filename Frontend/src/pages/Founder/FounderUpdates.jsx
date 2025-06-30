import UpdateForm from "../../Components/Founder/Updates/UpdateForm";
import UpdateStats from "../../Components/Founder/Updates/UpdateStats";
import RecentUpdates from "../../Components/Founder/Updates/RecentUpdates";
import ProTips from "../../Components/Founder/Updates/ProTips";

const FounderUpdates = () => {
  const pastUpdates = [
    {
      id: 1,
      title: "Successfully raised Series A funding!",
      description: "We secured $2M in Series A funding...",
      date: "2024-01-15",
      tags: ["#funding", "#milestone"],
      stats: { views: 1245, likes: 89, comments: 23 },
      image:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=200&fit=crop",
    },
    {
      id: 2,
      title: "New Product Feature Launch",
      description: "Revolutionary AI-powered analytics dashboard...",
      date: "2024-01-10",
      tags: ["#product", "#launch"],
      stats: { views: 892, likes: 67, comments: 15 },
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
    },
  ];

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
          <UpdateStats />
          <ProTips />
        </div>
      </div>

      <RecentUpdates pastUpdates={pastUpdates} />
    </div>
  );
};

export default FounderUpdates;

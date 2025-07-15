import { useAuth } from "../../../context/AuthContext";

function WelcomeHeader() {
  const { investor } = useAuth();

  return (
    <div className=" px-0.5  ">
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">
          Welcome back, {investor}! 👋
        </h1>
        <p className="text-indigo-100 text-sm sm:text-base">
          Discover promising startups and grow your investment portfolio.
        </p>
      </div>
    </div>
  );
}

export default WelcomeHeader;

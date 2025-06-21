import CallToAction from "../Components/Homepage/CallToAction";
import Footer from "../Components/Homepage/Footer";
import Hero from "../Components/Homepage/Hero";
import HowItWorks from "../Components/Homepage/HowItWorks";
import ProblemSolution from "../Components/Homepage/ProblemSolution";
import StartupFeed from "../Components/Homepage/StartUpFeed";

const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Hero />
        <ProblemSolution />
        <HowItWorks />
        <StartupFeed/>
        <CallToAction/>
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;

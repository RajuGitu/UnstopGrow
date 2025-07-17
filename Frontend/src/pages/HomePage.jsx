import About from "../Components/Homepage/About";
import CallToAction from "../Components/Homepage/CallToAction";
import Contact from "../Components/Homepage/Contact";
import Features from "../Components/Homepage/Features";
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
        <About/>
        <ProblemSolution />
        <Features/>
        <HowItWorks />
        {/* <StartupFeed/> */}
        {/* <CallToAction/> */}
        <Contact/>
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;

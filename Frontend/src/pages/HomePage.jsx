import About from "../Components/Homepage/About";
// import Contact from "../Components/Homepage/Contact";
import Features from "../Components/Homepage/Features";
import Footer from "../Components/Homepage/Footer";
import Hero from "../Components/Homepage/Hero";
import HowItWorks from "../Components/Homepage/HowItWorks";
import ProblemSolution from "../Components/Homepage/ProblemSolution";


const HomePage = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <Hero />
        <About/>
        <ProblemSolution />
        <Features/>
        <HowItWorks />
        {/* <Contact/> */}
        <Footer/>
      </div>
    </>
  );
};

export default HomePage;

import React from 'react';

const Hero = () => {
  return (
    <section id = "hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <nav className=" top-0 left-0 right-0 z-20 bg-white/80 backdrop-blur-sm border-b border-indigo-100 fixed ">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  <a href='#hero'>U</a></span>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-green-500 bg-clip-text text-transparent">
                  <a href="#hero">UnstopGrow</a>
                </h1>
                <p className="text-xs text-slate-500 -mt-1">Where Ideas Meet Opportunity</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600 transition-colors">How It Works</a>
              <a href="#startup-feed" className="text-slate-600 hover:text-indigo-600 transition-colors">Startups</a>
              <a href="#call-to-action" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
              <button className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg">Get Started</button>
            </div>
          </div>
        </div>
      </nav>

      {/* Background gradients and pulses */}
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-500/5 to-green-500/10"></div>
      <div className="absolute top-20 left-10 w-20 h-20 bg-indigo-200 rounded-full opacity-20 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-32 h-32 bg-green-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-pulse delay-500"></div>

      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-6">
              <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium">
                🚀 Where Ideas Meet Opportunity
              </div>
              <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 leading-tight">
                Pitch, Grow, Fund,{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500">
                  Collaborate
                </span>
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Join a platform where startup founders share ideas, investors discover potential, and users support innovations that shape the future.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="flex items-center h-11 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 group">
                Get Started
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform">
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </button>
              <button className="flex items-center h-11 px-8 py-4 rounded-xl border-2 border-slate-200 hover:border-indigo-300 transition-all duration-300 group">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-play mr-2 h-5 w-5 group-hover:scale-110 transition-transform">
                  <polygon points="6 3 20 12 6 21 6 3" />
                </svg>
                <span className="text-slate-800 font-medium">Watch Demo</span>
              </button>
            </div>
            <div className="flex items-center space-x-8 text-sm text-slate-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span>500+ Startups</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
                <span>200+ Investors</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span>$2M+ Raised</span>
              </div>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt="Team collaboration and innovation"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              <div className="absolute top-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-fade-in delay-1000">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">New investor joined!</span>
                </div>
              </div>
              <div className="absolute bottom-6 left-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg animate-fade-in delay-1500">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-indigo-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-slate-700">Startup got funded!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

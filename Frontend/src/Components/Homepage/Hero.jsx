import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Full Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Professional business meeting and collaboration"
          className="w-full h-full object-cover"
        />
        {/* Minimal dark overlay for better text readability */}
        <div className="absolute inset-0 bg-black/30"></div>
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/10 to-green-500/20"></div>
      </div>

      {/* Navigation */}
      <nav className="top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-indigo-100 fixed">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">
                  <a href='#hero'>U</a>
                </span>
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
              {/* <a href="#startup-feed" className="text-slate-600 hover:text-indigo-600 transition-colors">Startups</a> */}
              <a href="#call-to-action" className="text-slate-600 hover:text-indigo-600 transition-colors">Contact</a>
              <Link to="/login" className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all">Get Started</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Subtle animated background elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-indigo-200/30 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-24 h-24 bg-green-200/30 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-purple-200/30 rounded-full opacity-40 animate-pulse delay-500"></div>

      {/* Main Content */}
      <div className="container mx-auto px-6 relative z-10 pt-20">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100/90 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-medium">
              🚀 Where Ideas Meet Opportunity
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white leading-tight">
              Pitch, Grow, Share,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-green-400">
                Collaborate
              </span>
            </h1>
            <p className="text-xl text-white/90 leading-relaxed max-w-2xl mx-auto">
              A platform where startup founders share ideas, connect with like-minded entrepreneurs, and collaborate to build the future.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login" className="flex items-center justify-center h-12 bg-indigo-600 hover:bg-indigo-700 text-white px-8 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 group">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <a href="https://www.youtube.com/watch?v=WbAIjNBla9o" target="_blank" rel="noopener noreferrer" className="flex items-center justify-center h-12 px-8 rounded-lg border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform text-white">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span className="text-white font-medium">Watch Demo</span>
            </a>
          </div>
          
          {/* <div className="flex items-center justify-center space-x-12 text-sm text-white/70">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span>500+ Startups</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>200+ Entrepreneurs</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
              <span>50+ Collaborations</span>
            </div>
          </div> */}
        </div>

        {/* Minimal notification cards */}
        <div className="absolute top-1/3 right-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in delay-1000 border border-indigo-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">New startup joined!</span>
          </div>
        </div>
        
        <div className="absolute bottom-1/3 left-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in delay-1500 border border-indigo-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">New collaboration!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
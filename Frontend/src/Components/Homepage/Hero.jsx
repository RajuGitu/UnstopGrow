import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image + Overlays */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1556761175-b413da4baf72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
          alt="Professional business meeting and collaboration"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 via-purple-500/10 to-green-500/20"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-20 bg-white/95 backdrop-blur-sm border-b border-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg"><a href="#hero">U</a></span>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-green-500 bg-clip-text text-transparent">
                <a href="#hero">UnstopGrow</a>
              </h1>
              <p className="text-xs text-slate-500 -mt-1 hidden sm:block">Where Ideas Meet Opportunity</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" className="text-slate-600 hover:text-indigo-600">About</a>
            <a href="#features" className="text-slate-600 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="text-slate-600 hover:text-indigo-600">How It Works</a>
            <a href="#call-to-action" className="text-slate-600 hover:text-indigo-600">Contact</a>
            <Link to="/login" className="h-9 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all">Get Started</Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="md:hidden text-slate-600 focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-sm border-t border-indigo-100 px-4 pb-4 space-y-3">
            <a href="#about" className="block text-slate-600 hover:text-indigo-600">About</a>
            <a href="#features" className="block text-slate-600 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="block text-slate-600 hover:text-indigo-600">How It Works</a>
            <a href="#call-to-action" className="block text-slate-600 hover:text-indigo-600">Contact</a>
            <Link to="/login" className="block bg-indigo-600 text-white text-center py-2 rounded-lg">Get Started</Link>
          </div>
        )}
      </nav>

      {/* Animated Dots */}
      <div className="absolute top-20 left-10 w-12 h-12 sm:w-16 sm:h-16 bg-indigo-200/30 rounded-full opacity-40 animate-pulse"></div>
      <div className="absolute bottom-32 right-20 w-20 h-20 sm:w-24 sm:h-24 bg-green-200/30 rounded-full opacity-40 animate-pulse delay-1000"></div>
      <div className="absolute top-1/3 right-1/4 w-10 h-10 sm:w-12 sm:h-12 bg-purple-200/30 rounded-full opacity-40 animate-pulse delay-500"></div>

      {/* Hero Content */}
      <div className="container mx-auto px-4 sm:px-6 relative z-10 pt-32">
        <div className="max-w-4xl mx-auto text-center space-y-10">
          <div className="space-y-6 sm:space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-100/90 backdrop-blur-sm text-indigo-700 rounded-full text-sm font-medium">
              🚀 Where Ideas Meet Opportunity
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Pitch, Grow, Share,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-green-400">
                Collaborate
              </span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              A platform where startup founders share ideas, connect with like-minded entrepreneurs, and collaborate to build the future.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
            <Link to="/login" className="flex items-center justify-center h-12  bg-indigo-600 hover:bg-indigo-700 text-white  sm:px-5 rounded-lg shadow-lg transition-all duration-300 hover:scale-105 group">
              Get Started
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
            <a href="https://www.youtube.com/watch?v=WbAIjNBla9o" target="_blank" rel="noopener noreferrer"
              className="flex items-center justify-center h-12 px-6 sm:px-8 rounded-lg border-2 border-white/30 bg-white/10 hover:bg-white/20 backdrop-blur-sm transition-all duration-300 group">
              <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5 text-white group-hover:scale-110 transition-transform"
                viewBox="0 0 24 24" stroke="currentColor" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="6 3 20 12 6 21 6 3" />
              </svg>
              <span className="text-white font-medium">Watch Demo</span>
            </a>
          </div>
        </div>

        {/* Notification cards */}
        <div className="absolute hidden lg:block top-1/3 right-4 sm:right-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in delay-1000 border border-indigo-100">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-slate-700">New startup joined!</span>
          </div>
        </div>
        <div className="absolute hidden lg:block bottom-1/3 left-4 sm:left-8 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg animate-fade-in delay-1500 border border-indigo-100">
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

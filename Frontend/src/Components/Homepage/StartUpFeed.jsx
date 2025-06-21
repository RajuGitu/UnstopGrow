import React, { useState, useEffect } from 'react';
import { Button } from '../../Components/UI/Button';
import { Badge } from '../../Components/UI/Badge';
import { Heart, MessageCircle, TrendingUp, Users, ArrowRight } from 'lucide-react';

const StartupFeed = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const startups = [
    {
      id: 1,
      name: 'EcoTech Solutions',
      tagline: 'Sustainable technology for a greener future',
      description: 'Building IoT devices that help reduce carbon footprint in smart homes',
      category: 'CleanTech',
      stage: 'Seed',
      funding: '$250K',
      followers: 1250,
      likes: 89,
      comments: 24,
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      founder: 'Sarah Chen',
      location: 'San Francisco'
    },
    {
      id: 2,
      name: 'HealthAI',
      tagline: 'AI-powered personal health assistant',
      description: 'Making healthcare accessible through intelligent diagnosis and recommendations',
      category: 'HealthTech',
      stage: 'Series A',
      funding: '$2M',
      followers: 3200,
      likes: 156,
      comments: 42,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      founder: 'Dr. Alex Kumar',
      location: 'Boston'
    },
    {
      id: 3,
      name: 'EduVerse',
      tagline: 'Virtual reality meets education',
      description: 'Immersive learning experiences that make education engaging and effective',
      category: 'EdTech',
      stage: 'Pre-Seed',
      funding: '$100K',
      followers: 890,
      likes: 67,
      comments: 18,
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      founder: 'Maria Rodriguez',
      location: 'Austin'
    },
    {
      id: 4,
      name: 'FinFlow',
      tagline: 'Smart financial planning for millennials',
      description: 'Automated investment and savings platform with AI-driven insights',
      category: 'FinTech',
      stage: 'Seed',
      funding: '$500K',
      followers: 2100,
      likes: 134,
      comments: 31,
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80',
      founder: 'James Liu',
      location: 'New York'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % startups.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getStageColor = (stage) => {
    switch (stage) {
      case 'Pre-Seed': return 'bg-yellow-100 text-yellow-800';
      case 'Seed': return 'bg-green-100 text-green-800';
      case 'Series A': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section id="startup-feed" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            Trending Startups
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Discover the next generation of innovative companies making waves in their industries
          </p>
        </div>

        <div className="relative max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-6">
            {[0, 1, 2].map((offset) => {
              const index = (currentIndex + offset) % startups.length;
              const startup = startups[index];
              const isCenter = offset === 1;

              return (
                <div 
                  key={startup.id}
                  className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden transition-all duration-500 hover:shadow-xl hover:-translate-y-2 ${
                    isCenter ? 'scale-105 lg:scale-110 z-10 shadow-2xl' : 'scale-100'
                  }`}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={startup.image} 
                      alt={startup.name}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getStageColor(startup.stage)}>
                        {startup.stage}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-white/90 text-slate-700">
                        {startup.category}
                      </Badge>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">
                        {startup.name}
                      </h3>
                      <p className="text-indigo-600 font-medium text-sm mb-2">
                        {startup.tagline}
                      </p>
                      <p className="text-slate-600 text-sm leading-relaxed">
                        {startup.description}
                      </p>
                    </div>

                    <div className="flex items-center space-x-2 text-xs text-slate-500">
                      <span>by {startup.founder}</span>
                      <span>•</span>
                      <span>{startup.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1 text-slate-600">
                          <Users className="h-4 w-4" />
                          <span>{startup.followers.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-600">
                          <Heart className="h-4 w-4" />
                          <span>{startup.likes}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-slate-600">
                          <MessageCircle className="h-4 w-4" />
                          <span>{startup.comments}</span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-1 text-green-600 font-medium">
                        <TrendingUp className="h-4 w-4" />
                        <span>{startup.funding}</span>
                      </div>
                    </div>

                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" className="flex-1">
                        Follow
                      </Button>
                      <Button size="sm" className="flex-1 bg-indigo-600 hover:bg-indigo-700">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center mt-8 space-x-2">
            {startups.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-indigo-600 scale-125' 
                    : 'bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="text-center mt-8">
            <Button 
              variant="outline" 
              size="lg"
              className="px-8 py-3 rounded-xl border-2 border-indigo-200 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-300 transition-all duration-300 group"
            >
              Explore All Startups
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StartupFeed;

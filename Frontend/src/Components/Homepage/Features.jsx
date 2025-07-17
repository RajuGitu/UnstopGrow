import React from 'react';
import { Card, CardContent } from '../../Components/UI/Card';
import { Users, Target, TrendingUp, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Users,
      title: "Connect Ecosystem",
      description: "Bring together founders, investors, and supporters in one unified platform",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Target,
      title: "Smart Matching",
      description: "Advanced algorithms to match startups with the right investors and supporters",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: TrendingUp,
      title: "Growth Analytics",
      description: "Track your startup's progress with detailed analytics and insights",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Secure Platform",
      description: "Enterprise-grade security to protect your ideas and investments",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  return (
    <section id="features" className="py-20 px-6 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-emerald-100 to-teal-100"></div>
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1920&q=80)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      <div className="container mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 rounded-full text-sm font-medium mb-6 border border-green-200 shadow-lg">
            ⚡ Platform Features
          </div>
          <h2 className="text-4xl font-bold text-slate-800 mb-6">Platform Features</h2>
          <p className="text-xl text-slate-700 max-w-2xl mx-auto">
            Everything you need to connect, collaborate, and grow your innovation ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="p-6 hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/60 backdrop-blur-sm border border-white/20 shadow-xl">
                <CardContent className="p-0">
                  <div className={`w-12 h-12 bg-gradient-to-br ${feature.gradient} rounded-xl flex items-center justify-center mb-4 shadow-lg`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{feature.title}</h3>
                  <p className="text-slate-700 text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;
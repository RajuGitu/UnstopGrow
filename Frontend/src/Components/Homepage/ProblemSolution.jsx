import React from 'react';
import { AlertCircle, CheckCircle2, TrendingUp, Users, DollarSign, ArrowDown, Zap } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      icon: TrendingUp,
      problem: "Founders lack access to feedback & funding opportunities",
      solution: "UnstopGrow lets founders pitch, post updates, and connect with investors directly",
      gradient: "from-orange-500 to-red-500",
      bgColor: "from-orange-50 to-red-50",
    },
    {
      icon: DollarSign,
      problem: "Investors struggle to find verified early-stage startups",
      solution: "Discover curated startups filtered by domain, stage, and growth metrics",
      gradient: "from-emerald-500 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50",
    },
    {
      icon: Users,
      problem: "Users can't meaningfully contribute to innovation",
      solution: "Support startups, provide feedback, and follow your favorite companies",
      gradient: "from-blue-500 to-indigo-500",
      bgColor: "from-blue-50 to-indigo-50",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-200 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-indigo-200 mb-6">
            <Zap className="h-5 w-5 text-indigo-600" />
            <span className="text-indigo-600 font-medium">Innovation Challenge</span>
          </div>
          
          <h2 className="text-5xl font-bold text-slate-900 mb-6 leading-tight">
            Bridging the{' '}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-orange-500 bg-clip-text text-transparent">
              Innovation Gap
            </span>
          </h2>
          
          <p className="text-xl text-slate-600 max-w-4xl mx-auto leading-relaxed">
            We solve the disconnect between brilliant ideas and the resources they need to flourish. 
            Here's how we transform challenges into opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          {problems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <div 
                key={index} 
                className="group relative"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {/* Connecting line for desktop */}
                {index < problems.length - 1 && (
                  <div className="hidden lg:block absolute -right-6 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-slate-300 to-transparent"></div>
                    <ArrowDown className="h-6 w-6 text-slate-400 absolute -right-3 -top-3 rotate-90" />
                  </div>
                )}

                <div className="space-y-8">
                  {/* Problem Card */}
                  <div className="relative bg-white/80 backdrop-blur-sm border border-red-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]">
                    <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-6 transition-transform duration-300">
                      <AlertCircle className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="pt-6">
                      <div className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Challenge
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg leading-snug">
                        {item.problem}
                      </h4>
                    </div>
                  </div>

                  {/* Transform Arrow */}
                  <div className="flex justify-center relative">
                    <div className={`p-4 bg-gradient-to-r ${item.gradient} rounded-2xl shadow-lg transform group-hover:-translate-y-2 group-hover:scale-110 transition-all duration-500`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <ArrowDown className="h-6 w-6 text-slate-400 animate-bounce" />
                    </div>
                  </div>

                  {/* Solution Card */}
                  <div className={`relative bg-gradient-to-br ${item.bgColor} border border-green-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02]`}>
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:-rotate-6 transition-transform duration-300">
                      <CheckCircle2 className="h-8 w-8 text-white" />
                    </div>
                    
                    <div className="pr-6">
                      <div className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                        Solution
                      </div>
                      <h4 className="font-bold text-slate-900 mb-3 text-lg leading-snug">
                        {item.solution}
                      </h4>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-200 shadow-lg">
            <span className="text-slate-700 font-medium">Ready to bridge the gap?</span>
            <div className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
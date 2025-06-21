
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../UI/Tabs';
import { Lightbulb, DollarSign, Users, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState('founders');

  const workflows = {
    founders: {
      title: 'For Founders',
      icon: Lightbulb,
      color: 'orange',
      steps: [
        {
          number: '01',
          title: 'Create Your Startup Profile',
          description: 'Share your vision, team, and progress with detailed posts and updates',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          title: 'Engage with Community',
          description: 'Get feedback from users and build a following around your innovation',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          title: 'Connect with Investors',
          description: 'Get discovered by investors actively looking for opportunities in your space',
          image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    investors: {
      title: 'For Investors',
      icon: DollarSign,
      color: 'green',
      steps: [
        {
          number: '01',
          title: 'Discover Verified Startups',
          description: 'Browse curated startups filtered by industry, stage, and growth metrics',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          title: 'Analyze & Save Opportunities',
          description: 'Deep dive into startup metrics, team backgrounds, and market traction',
          image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          title: 'Connect Securely',
          description: 'Reach out to founders through our verified platform with confidence',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ]
    },
    users: {
      title: 'For Users',
      icon: Users,
      color: 'blue',
      steps: [
        {
          number: '01',
          title: 'Explore Trending Startups',
          description: 'Discover innovative startups on your personalized feed based on interests',
          image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '02',
          title: 'Follow & Give Feedback',
          description: 'Support founders with valuable insights and track their progress',
          image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        },
        {
          number: '03',
          title: 'Support & Earn Rewards',
          description: 'Contribute financially and earn exclusive badges and community recognition',
          image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
        }
      ]
    }
  };

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-br from-slate-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            How It Works
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Simple steps to get started, whether you're building, funding, or supporting the next big thing
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-white/50 backdrop-blur-sm p-2 rounded-2xl">
            {Object.entries(workflows).map(([key, workflow]) => {
              const IconComponent = workflow.icon;
              return (
                <TabsTrigger 
                  key={key} 
                  value={key}
                  className="flex items-center space-x-2 px-6 py-4 rounded-xl data-[state=active]:bg-white data-[state=active]:shadow-lg transition-all duration-300"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{workflow.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {Object.entries(workflows).map(([key, workflow]) => (
            <TabsContent key={key} value={key} className="mt-8">
              <div className="grid lg:grid-cols-3 gap-8">
                {workflow.steps.map((step, index) => (
                  <div 
                    key={index}
                    className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2"
                  >
                    {/* Step number */}
                    <div className={`absolute -top-4 left-8 w-12 h-12 bg-gradient-to-r ${
                      workflow.color === 'orange' ? 'from-orange-500 to-red-500' :
                      workflow.color === 'green' ? 'from-green-500 to-emerald-500' :
                      'from-blue-500 to-indigo-500'
                    } rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                      {step.number}
                    </div>

                    {/* Image */}
                    <div className="mt-4 mb-6 rounded-xl overflow-hidden">
                      <img 
                        src={step.image} 
                        alt={step.title}
                        className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <h3 className="text-xl font-semibold text-slate-900">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed">
                        {step.description}
                      </p>
                    </div>

                    {/* Arrow for flow */}
                    {index < workflow.steps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2">
                        <ArrowRight className="h-8 w-8 text-slate-300" />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default HowItWorks;
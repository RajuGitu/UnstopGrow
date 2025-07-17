import React from 'react';
import { Users, Target, Lightbulb, TrendingUp } from 'lucide-react';

const About = () => {
//   const stats = [
//     { label: 'Active Startups', value: '500+', icon: Lightbulb },
//     { label: 'Registered Investors', value: '200+', icon: Users },
//     { label: 'Funding Raised', value: '$2M+', icon: TrendingUp },
//     { label: 'Success Stories', value: '50+', icon: Target },
//   ];

  const values = [
    {
      title: 'Innovation First',
      description: 'We believe every great idea deserves a chance to flourish and change the world.',
      icon: Lightbulb,
    },
    {
      title: 'Community Driven',
      description: 'Building connections between founders, investors, and supporters to create a thriving ecosystem.',
      icon: Users,
    },
    {
      title: 'Growth Focused',
      description: 'Providing tools and resources that help startups scale from idea to successful business.',
      icon: TrendingUp,
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-50">
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium mb-6">
            🌟 About UnstopGrow
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            Empowering the Next Generation of{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-green-500">
              Innovators
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            UnstopGrow is more than just a platform – it's a movement to democratize innovation and 
            make entrepreneurship accessible to everyone, everywhere.
          </p>
        </div>

        {/* Stats */}
        {/* <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-green-400 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <div className="text-3xl font-bold text-slate-900 mb-2">{stat.value}</div>
                <div className="text-slate-600">{stat.label}</div>
              </div>
            );
          })}
        </div> */}

        {/* Mission Statement */}
        <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-xl mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h3>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We're on a mission to break down the barriers between great ideas and their realization. 
                UnstopGrow connects passionate founders with the right investors and supporters, 
                creating an ecosystem where innovation thrives.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                Whether you're a founder with a groundbreaking idea, an investor seeking the next big thing, 
                or a supporter wanting to be part of something meaningful – UnstopGrow is your platform 
                to make it happen.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt="Team collaboration" 
                className="rounded-2xl shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-gradient-to-br from-indigo-500 to-green-400 rounded-2xl p-6 text-white shadow-xl">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm opacity-90">Platform Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Values */}
        <div>
          <h3 className="text-3xl font-bold text-slate-900 text-center mb-12">Our Core Values</h3>
          <div className="grid lg:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-green-400 rounded-xl flex items-center justify-center mb-6">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-4">{value.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
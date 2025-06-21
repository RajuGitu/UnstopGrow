import React from 'react';
import { Button } from '../../Components/UI/Button';
import { ArrowRight, Sparkles } from 'lucide-react';
//import RoleSelectModal from './RoleSelectModal';

const CallToAction = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <section id="call-to-action" className="py-20 bg-gradient-to-r from-indigo-600 via-purple-600 to-green-500 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-white/10 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 bg-white/10 rounded-full animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white/5 rounded-full animate-pulse delay-500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="p-4 bg-white/20 rounded-2xl backdrop-blur-sm">
              <Sparkles className="h-12 w-12 text-white" />
            </div>
          </div>

          {/* Heading */}
          <div className="space-y-4">
            <h2 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
              Join the Innovation Revolution
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether you're building the future, funding it, or supporting it – 
              your journey starts here with UnstopGrow.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-white/80 text-sm">Active Startups</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">200+</div>
              <div className="text-white/80 text-sm">Verified Investors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">$2M+</div>
              <div className="text-white/80 text-sm">Total Funding</div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="space-y-4">
            <Button 
            //   onClick={() => setIsModalOpen(true)}
              size="lg"
              className="bg-white text-indigo-600 hover:bg-gray-50 px-12 py-4 rounded-2xl font-semibold text-lg shadow-2xl hover:scale-105 transition-all duration-300 group"
            >
              Get Started Today
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <p className="text-white/80 text-sm">
              Free to join • No credit card required • Start in 2 minutes
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex justify-center items-center space-x-8 text-white/60 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Secure Platform</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>Verified Profiles</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>Global Community</span>
            </div>
          </div>
        </div>
      </div>

      {/* <RoleSelectModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} /> */}
    </section>
  );
};

export default CallToAction;

import React from 'react';
import { Heart, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '/features' },
      { name: 'For Founders', href: '/founders' },
      { name: 'For Investors', href: '/investors' },
      { name: 'For Supporters', href: '/supporters' },
    ],
    project: [
      { name: 'GitHub', href: 'https://github.com/your-username/unstopgrow' },
      { name: 'Documentation', href: '/docs' },
      { name: 'Roadmap', href: '/roadmap' },
    ],
    resources: [
      { name: 'Getting Started', href: '/getting-started' },
      { name: 'Community', href: '/community' },
      { name: 'Support', href: '/support' },
    ],
    connect: [
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Feedback', href: '/feedback' },
    ],
  };

  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: Linkedin, 
      href: 'https://linkedin.com/in/your-profile', 
      color: 'hover:text-blue-600' 
    },
    { 
      name: 'GitHub', 
      icon: Github, 
      href: 'https://github.com/your-username', 
      color: 'hover:text-gray-300' 
    },
    { 
      name: 'Email', 
      icon: Mail, 
      href: 'mailto:gitmerge.sr@gmail.com', 
      color: 'hover:text-green-500' 
    },
  ];

  const handleSocialClick = (social) => {
    if (social.name === 'Email') {
      window.location.href = social.href;
    } else {
      window.open(social.href, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-16">
        {/* Main footer content */}
        <div className="grid lg:grid-cols-6 gap-8">
          {/* Brand section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">U</span>
              </div>
              <div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-transparent">
                  UnstopGrow
                </h3>
                <p className="text-slate-300 text-sm -mt-1">
                  Empowering Startups, Connecting Investors
                </p>
              </div>
            </div>
            
            <p className="text-slate-400 leading-relaxed max-w-sm">
              A dynamic MERN-based platform connecting founders, investors, and supporters. 
              Founders post startup ideas, supporters engage through likes and follows, 
              investors explore pitches and show interest.
            </p>

            {/* Social links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <button
                    key={social.name}
                    onClick={() => handleSocialClick(social)}
                    className={`p-2 bg-slate-800 rounded-lg transition-all duration-300 hover:bg-slate-700 ${social.color} transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900`}
                    aria-label={`Connect on ${social.name}`}
                    title={`Connect on ${social.name}`}
                  >
                    <IconComponent className="h-5 w-5" />
                  </button>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2">
              <h4 className="font-semibold text-slate-200">Get in Touch</h4>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-slate-400" />
                <a 
                  href="mailto:gitmerge.sr@gmail.com" 
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  gitmerge.sr@gmail.com
                </a>
              </div>
            </div>

            {/* Tech Stack & Project Info */}
            <div className="space-y-3">
              <h4 className="font-semibold text-slate-200">Tech Stack</h4>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">React.js</span>
                <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Node.js</span>
                <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">MongoDB</span>
                <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Express.js</span>
                <span className="px-2 py-1 bg-slate-800 text-xs rounded text-slate-300">Tailwind CSS</span>
              </div>
            </div>
          </div>

          {/* Links sections */}
          <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Project</h4>
              <ul className="space-y-3">
                {footerLinks.project.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                      target={link.href.startsWith('http') ? '_blank' : '_self'}
                      rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Resources</h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-slate-200 mb-4">Connect</h4>
              <ul className="space-y-3">
                {footerLinks.connect.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom section */}
        <div className="border-t border-slate-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-2 text-slate-400 text-sm">
              <span>© {currentYear} UnstopGrow. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for startup innovators and supporters worldwide.</span>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-slate-400">
              <span>🚀 MERN Stack</span>
              <span>⚡ Open Source</span>
              <span>🛠️ In Development</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
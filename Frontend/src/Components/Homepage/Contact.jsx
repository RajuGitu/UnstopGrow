import React from 'react';
import { Heart, Twitter, Linkedin, Github, Mail } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Features', href: '#features' },
      { name: 'How It Works', href: '#how-it-works' },
    ],
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Contact', href: '#contact' },
    ],
  };

  const socialLinks = [
    { name: 'Twitter', icon: Twitter, href: '#', color: 'hover:text-blue-400' },
    { name: 'LinkedIn', icon: Linkedin, href: '#', color: 'hover:text-blue-600' },
    { name: 'GitHub', icon: Github, href: '#', color: 'hover:text-gray-700' },
    { name: 'Email', icon: Mail, href: '#contact', color: 'hover:text-green-500' },
  ];

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Brand & Socials */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-green-400 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">U</span>
              </div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-green-400 bg-clip-text text-transparent">
                UnstopGrow
              </h3>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting startups with investors and supporters worldwide.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map(({ name, icon: Icon, href, color }) => (
                <a
                  key={name}
                  href={href}
                  aria-label={name}
                  className={`p-2 bg-slate-800 rounded-lg transition hover:bg-slate-700 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4 className="font-semibold text-slate-200 mb-3 capitalize">{section}</h4>
                <ul className="space-y-2">
                  {links.map(({ name, href }) => (
                    <li key={name}>
                      <a
                        href={href}
                        className="text-slate-400 hover:text-white transition-colors text-sm"
                      >
                        {name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-slate-800 mt-8 pt-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-3 lg:space-y-0 text-sm text-slate-400">
            <div className="flex items-center space-x-2">
              <span>© {currentYear} UnstopGrow. Made with</span>
              <Heart className="h-4 w-4 text-red-500 animate-pulse" />
              <span>for innovators worldwide.</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>🚀 500+ Startups</span>
              <span>💼 200+ Investors</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

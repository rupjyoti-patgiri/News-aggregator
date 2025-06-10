// src/components/Footer.jsx
import React from 'react';
import { Newspaper, Github, Linkedin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-neutral-dark dark:bg-black text-neutral-light mt-auto">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* Logo and About */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center text-accent mb-3">
              <Newspaper size={28} className="mr-2" />
              <span className="font-bold text-xl">NewsDeck</span>
            </div>
            <p className="text-sm text-gray-400 text-center md:text-left">
              Your daily source of aggregated news from around the world.
            </p>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h5 className="font-semibold text-lg mb-3 text-white">Quick Links</h5>
            <ul className="space-y-2">
              <li><a href="/all-news" className="hover:text-accent transition-colors">All News</a></li>
              <li><a href="/top-headlines" className="hover:text-accent transition-colors">Top Headlines</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Social Links and Copyright */}
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors" aria-label="GitHub">
                <Github size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-accent transition-colors" aria-label="LinkedIn">
                <Linkedin size={24} />
              </a>
            </div>
            <p className="text-sm text-gray-400 text-center md:text-right">
              &copy; {currentYear} NewsDeck. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 mt-1">
              Powered by <a href="https://newsapi.org" target="_blank" rel="noopener noreferrer" className="hover:text-accent underline">NewsAPI.org</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
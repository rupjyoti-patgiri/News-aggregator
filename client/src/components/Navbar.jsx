// src/components/Navbar.jsx
import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, Newspaper, Sun, Moon } from 'lucide-react'; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      return true;
    } else {
      document.documentElement.classList.remove('dark');
      return false;
    }
  });

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    if (!darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  };

  const navLinkClass = ({ isActive }) =>
    `px-3 py-2 rounded-md text-sm font-medium transition-colors ${
      isActive 
        ? 'bg-primary text-white' 
        : 'text-neutral-dark dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-neutral-dark/70'
    }`;

  return (
    <nav className="bg-blue dark:bg-neutral-dark shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center text-primary dark:text-accent">
              <Newspaper size={32} className="mr-2" />
              <span className="font-bold text-2xl">NewsDeck</span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/" className={navLinkClass} end>Home</NavLink>
            <NavLink to="/all-news" className={navLinkClass}>All News</NavLink>
            <NavLink to="/top-headlines" className={navLinkClass}>Top Headlines</NavLink>
            <NavLink to="/country/us" className={navLinkClass}>US News</NavLink> {/* Example specific country */}
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-md text-neutral-dark dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-neutral-dark/70 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
          <div className="md:hidden flex items-center">
             <button
              onClick={toggleDarkMode}
              className="p-2 mr-2 rounded-md text-neutral-dark dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-neutral-dark/70 transition-colors"
              aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={toggleNavbar}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-neutral-dark dark:text-neutral-light hover:bg-gray-200 dark:hover:bg-neutral-dark/70 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-neutral-dark border-t border-gray-200 dark:border-neutral-dark/70" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink to="/" className={navLinkClass + " block"} onClick={toggleNavbar} end>Home</NavLink>
            <NavLink to="/all-news" className={navLinkClass + " block"} onClick={toggleNavbar}>All News</NavLink>
            <NavLink to="/top-headlines" className={navLinkClass + " block"} onClick={toggleNavbar}>Top Headlines</NavLink>
            <NavLink to="/country/us" className={navLinkClass + " block"} onClick={toggleNavbar}>US News</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
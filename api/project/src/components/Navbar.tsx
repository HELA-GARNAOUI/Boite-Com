import React, { useState } from 'react';
import { Menu, X, Moon, Sun, Search } from 'lucide-react';
import { apiDocumentation } from '../data/apiData';

interface NavbarProps {
  toggleSidebar: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar, isDarkMode, toggleDarkMode }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (isSearchOpen) {
      setSearchTerm('');
    }
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 shadow-sm">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSidebar}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle sidebar"
          >
            <Menu size={24} className="text-gray-700 dark:text-gray-300" />
          </button>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-sm">API</span>
            </div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white hidden sm:block">
              {apiDocumentation.title}
            </h1>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {isSearchOpen ? (
            <div className="relative">
              <input
                type="text"
                placeholder="Search endpoints..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full sm:w-64 px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                           bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 
                           focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
              <button 
                onClick={toggleSearch}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400"
              >
                <X size={18} />
              </button>
            </div>
          ) : (
            <button 
              onClick={toggleSearch}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              aria-label="Search"
            >
              <Search size={20} className="text-gray-700 dark:text-gray-300" />
            </button>
          )}
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDarkMode ? (
              <Sun size={20} className="text-gray-300" />
            ) : (
              <Moon size={20} className="text-gray-700" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
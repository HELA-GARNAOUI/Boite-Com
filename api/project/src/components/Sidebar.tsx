import React, { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { apiDocumentation } from '../data/apiData';

interface SidebarProps {
  isOpen: boolean;
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  onEndpointSelect: (category: string, endpointIndex: number) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  activeCategory, 
  setActiveCategory, 
  onEndpointSelect 
}) => {
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>(
    apiDocumentation.categories.reduce((acc, category) => {
      acc[category.name] = category.name === activeCategory;
      return acc;
    }, {} as Record<string, boolean>)
  );

  const toggleCategory = (categoryName: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryName]: !prev[categoryName]
    }));
  };

  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    toggleCategory(categoryName);
  };

  return (
    <aside 
      className={`fixed top-0 left-0 z-20 h-full w-64 bg-gray-50 dark:bg-gray-800 shadow-lg transition-transform transform 
                lg:translate-x-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)] overflow-y-auto
                ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      style={{ marginTop: '62px' }}
    >
      <div className="py-4">
        <div className="px-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white">API Documentation</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">v{apiDocumentation.version}</p>
        </div>
        
        <div className="mt-2">
          {apiDocumentation.categories.map((category) => (
            <div key={category.name} className="mb-1">
              <button
                onClick={() => handleCategoryClick(category.name)}
                className={`w-full flex items-center justify-between px-4 py-2 text-left
                          ${activeCategory === category.name 
                            ? 'bg-blue-50 dark:bg-gray-700 text-blue-600 dark:text-blue-400'
                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
              >
                <span className="font-medium">{category.name}</span>
                {expandedCategories[category.name] ? (
                  <ChevronDown size={18} />
                ) : (
                  <ChevronRight size={18} />
                )}
              </button>
              
              {expandedCategories[category.name] && (
                <div className="pl-4 pr-2 py-1">
                  {category.endpoints.map((endpoint, index) => (
                    <button
                      key={`${category.name}-${endpoint.path}-${endpoint.method}`}
                      onClick={() => onEndpointSelect(category.name, index)}
                      className="w-full text-left px-4 py-2 text-sm rounded-md 
                                hover:bg-gray-200 dark:hover:bg-gray-700
                                text-gray-700 dark:text-gray-300 mb-1"
                    >
                      <div className="flex items-start">
                        <span className={`inline-block w-16 px-2 py-1 text-xs font-medium rounded-md mr-2
                                        ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                                          endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' : 
                                          endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                                          endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' : 
                                          'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'}`}
                        >
                          {endpoint.method}
                        </span>
                        <span className="truncate">
                          {endpoint.path.split('/').slice(-2).join('/')}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
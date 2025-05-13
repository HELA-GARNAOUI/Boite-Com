import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import EndpointDetail from './components/EndpointDetail';
import ApiIntroduction from './components/ApiIntroduction';
import ApiExplorer from './components/ApiExplorer';
import FloatingButton from './components/FloatingButton';
import { apiDocumentation } from './data/apiData';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(apiDocumentation.categories[0].name);
  const [activeEndpointIndex, setActiveEndpointIndex] = useState<number | null>(null);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    // Apply dark mode class to document
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Update document title
    document.title = apiDocumentation.title + ' - API Documentation';
  }, [isDarkMode]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleEndpointSelect = (categoryName: string, endpointIndex: number) => {
    setActiveCategory(categoryName);
    setActiveEndpointIndex(endpointIndex);
    // Close sidebar on mobile after selection
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Find the active category object
  const activeCategoryObj = apiDocumentation.categories.find(
    (category) => category.name === activeCategory
  );

  // Get the active endpoint
  const activeEndpoint = activeCategoryObj && activeEndpointIndex !== null 
    ? activeCategoryObj.endpoints[activeEndpointIndex] 
    : null;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Navbar 
        toggleSidebar={toggleSidebar} 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar 
          isOpen={isSidebarOpen} 
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onEndpointSelect={handleEndpointSelect}
        />
        
        <main className="flex-1 overflow-auto p-4 lg:p-6" onClick={() => {
          if (isSidebarOpen && window.innerWidth < 1024) {
            setIsSidebarOpen(false);
          }
        }}>
          <div className="container mx-auto max-w-5xl">
            {activeEndpoint ? (
              <div className="space-y-6">
                <EndpointDetail endpoint={activeEndpoint} />
                <ApiExplorer endpoint={activeEndpoint} />
              </div>
            ) : (
              <ApiIntroduction />
            )}
          </div>
        </main>
      </div>
      
      <FloatingButton />
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden" 
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
}

export default App;
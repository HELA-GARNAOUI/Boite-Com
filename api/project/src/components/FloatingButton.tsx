import React from 'react';
import { ArrowUp } from 'lucide-react';

const FloatingButton: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full shadow-lg 
                 transition-all duration-300 ease-in-out transform hover:scale-110
                 flex items-center justify-center z-50"
      aria-label="Scroll to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

export default FloatingButton;
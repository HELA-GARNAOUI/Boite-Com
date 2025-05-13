import React from 'react';
import { Endpoint } from '../types/api';
import { Check, Copy, Play } from 'lucide-react';

interface ApiExplorerProps {
  endpoint: Endpoint;
}

const ApiExplorer: React.FC<ApiExplorerProps> = ({ endpoint }) => {
  const [isTesting, setIsTesting] = React.useState(false);
  const [formData, setFormData] = React.useState<Record<string, string>>({});
  const [headers, setHeaders] = React.useState<Record<string, string>>(
    endpoint.headers || {}
  );
  const [response, setResponse] = React.useState<string | null>(null);
  const [copyStatus, setCopyStatus] = React.useState(false);

  const handleInputChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleHeaderChange = (key: string, value: string) => {
    setHeaders(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus(true);
      setTimeout(() => {
        setCopyStatus(false);
      }, 2000);
    });
  };

  const testEndpoint = () => {
    setIsTesting(true);
    // In a real application, this would make an actual API call
    // For now, we'll simulate a response after a delay
    setTimeout(() => {
      setResponse(endpoint.response?.example || JSON.stringify({ message: 'No response example available' }));
      setIsTesting(false);
    }, 1000);
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Try It Out</h3>
      
      {/* Headers */}
      {Object.keys(headers).length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Headers</h4>
          <div className="space-y-2">
            {Object.entries(headers).map(([key, value]) => (
              <div key={key} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="md:col-span-1">
                  <input
                    type="text"
                    value={key}
                    disabled
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleHeaderChange(key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Query Parameters */}
      {endpoint.queryParams && endpoint.queryParams.length > 0 && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Query Parameters</h4>
          <div className="space-y-2">
            {endpoint.queryParams.map((param) => (
              <div key={param.name} className="grid grid-cols-1 md:grid-cols-3 gap-2">
                <div className="md:col-span-1">
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={param.name}
                      disabled
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                                bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                    />
                    {param.required && (
                      <span className="ml-2 text-red-600 dark:text-red-400">*</span>
                    )}
                  </div>
                </div>
                <div className="md:col-span-2">
                  <input
                    type="text"
                    placeholder={param.type}
                    onChange={(e) => handleInputChange(param.name, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                              bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Request Body */}
      {endpoint.requestBody && endpoint.method !== 'GET' && (
        <div className="mb-4">
          <h4 className="text-md font-medium text-gray-800 dark:text-gray-200 mb-2">Request Body</h4>
          <div className="space-y-2">
            <textarea
              rows={5}
              defaultValue={endpoint.requestBody.example}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md 
                        bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-mono text-sm"
            />
          </div>
        </div>
      )}
      
      {/* Execute button */}
      <div className="flex justify-end mt-4">
        <button
          onClick={testEndpoint}
          disabled={isTesting}
          className={`px-4 py-2 rounded-md text-white font-medium flex items-center
                    ${isTesting 
                      ? 'bg-gray-400 dark:bg-gray-600 cursor-not-allowed'
                      : 'bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
                    }`}
        >
          {isTesting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            <>
              <Play size={18} className="mr-2" />
              Execute
            </>
          )}
        </button>
      </div>
      
      {/* Response */}
      {response && (
        <div className="mt-6">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-md font-medium text-gray-800 dark:text-gray-200">Response</h4>
            <button 
              onClick={() => handleCopy(response)}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
              aria-label="Copy response"
            >
              {copyStatus ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
          </div>
          <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300">
            {response}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ApiExplorer;
import React, { useState } from 'react';
import { Copy, Check, ChevronDown, ChevronRight, AlertCircle, Lock } from 'lucide-react';
import { Endpoint } from '../types/api';

interface EndpointDetailProps {
  endpoint: Endpoint;
}

const EndpointDetail: React.FC<EndpointDetailProps> = ({ endpoint }) => {
  const [activeTab, setActiveTab] = useState<'request' | 'response'>('request');
  const [expandedSections, setExpandedSections] = useState({
    description: true,
    headers: true,
    params: true,
    body: true,
    response: true
  });
  const [copyStatus, setCopyStatus] = useState<Record<string, boolean>>({});

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyStatus({ [key]: true });
      setTimeout(() => {
        setCopyStatus({});
      }, 2000);
    });
  };

  const getMethodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200';
      case 'POST': return 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200';
      case 'PUT': return 'bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200';
      case 'DELETE': return 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200';
      default: return 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200';
    }
  };

  const renderCurlExample = () => {
    let curl = `curl -X ${endpoint.method} "${endpoint.path}"`;
    
    if (endpoint.headers) {
      Object.entries(endpoint.headers).forEach(([key, value]) => {
        curl += ` \\\n  -H "${key}: ${value}"`;
      });
    }
    
    if (endpoint.requestBody && endpoint.method !== 'GET') {
      curl += ` \\\n  -H "Content-Type: ${endpoint.requestBody.contentType}"`;
      if (endpoint.requestBody.example) {
        curl += ` \\\n  -d '${endpoint.requestBody.example}'`;
      }
    }
    
    return curl;
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Header */}
      <div className="flex items-center p-4 border-b border-gray-200 dark:border-gray-700">
        <div className={`px-3 py-1 rounded-md text-sm font-medium mr-3 ${getMethodColor(endpoint.method)}`}>
          {endpoint.method}
        </div>
        <h2 className="text-lg font-mono text-gray-900 dark:text-white">{endpoint.path}</h2>
        
        {endpoint.authentication && (
          <div className="ml-auto flex items-center text-gray-500 dark:text-gray-400">
            <Lock size={16} className="mr-1" />
            <span className="text-sm">Requires Authentication</span>
          </div>
        )}
      </div>
      
      {/* Description */}
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <div 
          className="flex items-center justify-between cursor-pointer"
          onClick={() => toggleSection('description')}
        >
          <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Description</h3>
          {expandedSections.description ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
        </div>
        
        {expandedSections.description && (
          <div className="mt-2 text-gray-600 dark:text-gray-400">
            <p>{endpoint.description}</p>
          </div>
        )}
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700">
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'request'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('request')}
        >
          Request
        </button>
        <button
          className={`px-4 py-2 text-sm font-medium border-b-2 ${
            activeTab === 'response'
              ? 'border-blue-500 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
          }`}
          onClick={() => setActiveTab('response')}
        >
          Response
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4">
        {activeTab === 'request' ? (
          <div>
            {/* Headers */}
            {endpoint.headers && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-2"
                  onClick={() => toggleSection('headers')}
                >
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Headers</h3>
                  {expandedSections.headers ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedSections.headers && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Value</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {Object.entries(endpoint.headers).map(([key, value], index) => (
                          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-750">
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 font-mono">{key}</td>
                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400 font-mono">{value}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Query Parameters */}
            {endpoint.queryParams && endpoint.queryParams.length > 0 && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-2"
                  onClick={() => toggleSection('params')}
                >
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Query Parameters</h3>
                  {expandedSections.params ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedSections.params && (
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Required</th>
                          <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Description</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        {endpoint.queryParams.map((param, index) => (
                          <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-750">
                            <td className="px-4 py-2 text-sm text-gray-900 dark:text-gray-100 font-mono">{param.name}</td>
                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{param.type}</td>
                            <td className="px-4 py-2 text-sm">
                              {param.required ? (
                                <span className="text-red-600 dark:text-red-400">Yes</span>
                              ) : (
                                <span className="text-gray-500 dark:text-gray-400">No</span>
                              )}
                            </td>
                            <td className="px-4 py-2 text-sm text-gray-500 dark:text-gray-400">{param.description}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
            
            {/* Request Body */}
            {endpoint.requestBody && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-2"
                  onClick={() => toggleSection('body')}
                >
                  <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">Request Body</h3>
                  {expandedSections.body ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedSections.body && (
                  <div>
                    <div className="mb-2 flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Content-Type:</span>
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-300">
                        {endpoint.requestBody.contentType}
                      </code>
                    </div>
                    
                    {endpoint.requestBody.example && (
                      <div className="relative">
                        <div className="absolute right-2 top-2">
                          <button 
                            onClick={() => handleCopy(endpoint.requestBody.example || '', 'requestBody')}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label="Copy code"
                          >
                            {copyStatus['requestBody'] ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300">
                          {endpoint.requestBody.example}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* cURL Example */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200">cURL Example</h3>
                <button 
                  onClick={() => handleCopy(renderCurlExample(), 'curl')}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                  aria-label="Copy code"
                >
                  {copyStatus['curl'] ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                </button>
              </div>
              <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300">
                {renderCurlExample()}
              </pre>
            </div>
          </div>
        ) : (
          <div>
            {/* Response */}
            {endpoint.response && (
              <div className="mb-4">
                <div 
                  className="flex items-center justify-between cursor-pointer mb-2"
                  onClick={() => toggleSection('response')}
                >
                  <div className="flex items-center">
                    <h3 className="text-md font-semibold text-gray-800 dark:text-gray-200 mr-2">Response</h3>
                    <span className={`px-2 py-1 rounded-md text-xs font-medium ${
                      endpoint.response.status >= 200 && endpoint.response.status < 300
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : endpoint.response.status >= 400
                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                        : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                    }`}>
                      {endpoint.response.status}
                    </span>
                  </div>
                  {expandedSections.response ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                
                {expandedSections.response && (
                  <div>
                    <div className="mb-2 flex items-center">
                      <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">Content-Type:</span>
                      <code className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded text-sm font-mono text-gray-800 dark:text-gray-300">
                        {endpoint.response.contentType}
                      </code>
                    </div>
                    
                    {endpoint.response.example && (
                      <div className="relative">
                        <div className="absolute right-2 top-2">
                          <button 
                            onClick={() => handleCopy(endpoint.response.example || '', 'responseBody')}
                            className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                            aria-label="Copy code"
                          >
                            {copyStatus['responseBody'] ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                          </button>
                        </div>
                        <pre className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md overflow-x-auto font-mono text-sm text-gray-800 dark:text-gray-300">
                          {endpoint.response.example}
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
            
            {/* Error Responses */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 dark:border-yellow-600 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <AlertCircle size={20} className="text-yellow-400 dark:text-yellow-500" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800 dark:text-yellow-300">Error Handling</h3>
                  <div className="mt-2 text-sm text-yellow-700 dark:text-yellow-200">
                    <p>
                      This endpoint follows the standard error response format. All errors include error code, 
                      message, and additional details when available.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EndpointDetail;
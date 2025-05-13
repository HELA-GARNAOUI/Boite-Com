import React from 'react';
import { apiDocumentation } from '../data/apiData';
import { Code, FileText, Lock, Zap } from 'lucide-react';

const ApiIntroduction: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          {apiDocumentation.title}
        </h2>
        
        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">
            {apiDocumentation.description}
          </p>
          
          <div className="mt-6 mb-4">
            <div className="text-sm text-gray-500 dark:text-gray-400">API Version</div>
            <div className="font-medium text-gray-900 dark:text-white">{apiDocumentation.version}</div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start">
            <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Code size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Technology Stack</h3>
              <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-32 font-medium">Framework:</span>
                  <span>Django REST Framework</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Authentication:</span>
                  <span>JWT</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Documentation:</span>
                  <span>Swagger/OpenAPI</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Database:</span>
                  <span>PostgreSQL</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Caching:</span>
                  <span>Redis</span>
                </li>
                <li className="flex items-center">
                  <span className="w-32 font-medium">Integration:</span>
                  <span>XML-RPC/JSON-RPC</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start">
            <div className="p-2 bg-green-100 dark:bg-green-900 rounded-lg">
              <Zap size={24} className="text-green-600 dark:text-green-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">API Features</h3>
              <ul className="mt-2 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-40 font-medium">SEO Analytics:</span>
                  <span>Metrics & recommendations</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Social Media:</span>
                  <span>Performance tracking & scheduling</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">AI-Powered Marketing:</span>
                  <span>Data analysis & recommendations</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Client Portal:</span>
                  <span>Dashboards & custom reports</span>
                </li>
                <li className="flex items-center">
                  <span className="w-40 font-medium">Odoo Integration:</span>
                  <span>Two-way data sync</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start">
            <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
              <Lock size={24} className="text-amber-600 dark:text-amber-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Authentication</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                This API uses JWT tokens for authentication. Include the token in the Authorization header:
              </p>
              <div className="mt-3 bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                <code className="text-sm font-mono text-gray-800 dark:text-gray-300">
                  Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
                </code>
              </div>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                To obtain a token, use the <code className="text-sm font-mono">/api/auth/login/</code> endpoint.
                The token will expire after 24 hours.
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-start">
            <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-lg">
              <FileText size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Rate Limiting</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">
                The API implements rate limiting to ensure fair usage and system stability:
              </p>
              <ul className="mt-3 space-y-2 text-gray-700 dark:text-gray-300">
                <li className="flex items-center">
                  <span className="w-48 font-medium">Authenticated Users:</span>
                  <span>100 requests per minute</span>
                </li>
                <li className="flex items-center">
                  <span className="w-48 font-medium">Unauthenticated Users:</span>
                  <span>20 requests per minute</span>
                </li>
              </ul>
              <p className="mt-3 text-gray-700 dark:text-gray-300">
                The following headers are included in responses to help you track rate limit usage:
              </p>
              <ul className="mt-2 space-y-1 text-sm font-mono text-gray-700 dark:text-gray-300">
                <li>X-RateLimit-Limit</li>
                <li>X-RateLimit-Remaining</li>
                <li>X-RateLimit-Reset</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiIntroduction;
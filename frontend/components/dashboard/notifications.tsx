'use client';

import React from 'react';
import { Bell, Check, X, AlertCircle, Info } from 'lucide-react';

const Notifications = () => {
  const notifications = [
    {
      id: 1,
      type: 'success',
      title: 'Payment Received',
      message: 'Payment of $1,234.00 has been received from John Doe',
      time: '2 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'warning',
      title: 'Low Stock Alert',
      message: 'Product "Premium Widget" is running low on stock',
      time: '15 minutes ago',
      read: false
    },
    {
      id: 3,
      type: 'info',
      title: 'New User Registration',
      message: 'Sarah Smith has registered for an account',
      time: '1 hour ago',
      read: true
    },
    {
      id: 4,
      type: 'error',
      title: 'System Update Failed',
      message: 'The latest system update could not be completed',
      time: '2 hours ago',
      read: true
    }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <Check className="w-5 h-5 text-green-500" />;
      case 'warning':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      case 'error':
        return <X className="w-5 h-5 text-red-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Bell className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-semibold text-gray-800">Notifications</h2>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-sm text-primary hover:text-primary/80">
            Mark all as read
          </button>
          <button className="text-sm text-gray-500 hover:text-gray-700">
            Clear all
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg border ${
              notification.read ? 'bg-white' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900">
                    {notification.title}
                  </h3>
                  <span className="text-xs text-gray-500">
                    {notification.time}
                  </span>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {notification.message}
                </p>
              </div>
              <div className="flex-shrink-0">
                <button className="text-gray-400 hover:text-gray-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {notifications.length === 0 && (
        <div className="text-center py-12">
          <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            No notifications
          </h3>
          <p className="text-gray-500">
            You're all caught up! Check back later for new updates.
          </p>
        </div>
      )}
    </div>
  );
};

export default Notifications; 
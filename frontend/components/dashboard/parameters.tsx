'use client';

import React from 'react';
import { Settings, Bell, Lock, Globe, Mail, Shield, User } from 'lucide-react';

const Parameters = () => {
  const settings = [
    {
      id: 'notifications',
      title: 'Notifications',
      icon: Bell,
      description: 'Configure your notification preferences',
      options: [
        { id: 'email_notifications', label: 'Email Notifications', enabled: true },
        { id: 'push_notifications', label: 'Push Notifications', enabled: false },
        { id: 'sms_notifications', label: 'SMS Notifications', enabled: false }
      ]
    },
    {
      id: 'privacy',
      title: 'Privacy',
      icon: Lock,
      description: 'Manage your privacy settings',
      options: [
        { id: 'profile_visibility', label: 'Profile Visibility', enabled: true },
        { id: 'data_collection', label: 'Data Collection', enabled: true },
        { id: 'analytics', label: 'Analytics', enabled: false }
      ]
    },
    {
      id: 'language',
      title: 'Language & Region',
      icon: Globe,
      description: 'Set your preferred language and region',
      options: [
        { id: 'language', label: 'Language', value: 'English' },
        { id: 'timezone', label: 'Timezone', value: 'UTC+1' },
        { id: 'date_format', label: 'Date Format', value: 'MM/DD/YYYY' }
      ]
    },
    {
      id: 'security',
      title: 'Security',
      icon: Shield,
      description: 'Manage your security settings',
      options: [
        { id: 'two_factor', label: 'Two-Factor Authentication', enabled: false },
        { id: 'password_change', label: 'Password Change Required', enabled: true },
        { id: 'login_history', label: 'Login History', enabled: true }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="w-6 h-6 text-gray-800" />
          <h2 className="text-xl font-semibold text-gray-800">Parameters</h2>
        </div>
        <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors">
          Save Changes
        </button>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {settings.map((section) => (
          <div key={section.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <section.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-800">{section.title}</h3>
                <p className="text-sm text-gray-500">{section.description}</p>
              </div>
            </div>

            <div className="space-y-4">
              {section.options.map((option) => (
                <div key={option.id} className="flex items-center justify-between">
                  <label className="text-sm text-gray-700">{option.label}</label>
                  {'enabled' in option ? (
                    <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200">
                      <input
                        type="checkbox"
                        className="sr-only"
                        checked={option.enabled}
                        onChange={() => {}}
                      />
                      <div
                        className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform ${
                          option.enabled ? 'bg-primary transform translate-x-6' : 'bg-white'
                        }`}
                      />
                    </div>
                  ) : (
                    <select
                      className="text-sm border rounded-lg px-3 py-1.5 bg-white"
                      value={option.value}
                      onChange={() => {}}
                    >
                      <option value={option.value}>{option.value}</option>
                    </select>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Additional Settings */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Additional Settings</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-400" />
            <div>
              <h4 className="text-sm font-medium text-gray-800">Email Settings</h4>
              <p className="text-xs text-gray-500">Configure email preferences</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-gray-400" />
            <div>
              <h4 className="text-sm font-medium text-gray-800">Profile Settings</h4>
              <p className="text-xs text-gray-500">Manage your profile</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Shield className="w-5 h-5 text-gray-400" />
            <div>
              <h4 className="text-sm font-medium text-gray-800">Advanced Security</h4>
              <p className="text-xs text-gray-500">Additional security options</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parameters; 
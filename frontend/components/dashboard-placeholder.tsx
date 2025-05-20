'use client';

import React, { useState, useEffect } from 'react';
import { Users, TrendingUp, DollarSign, ShoppingCart, Activity, ArrowUpRight, ArrowDownRight, RefreshCw, AlertCircle } from 'lucide-react';

const DashboardPlaceholder = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<{
    metrics: typeof metrics;
    recentActivities: typeof recentActivities;
  } | null>(null);

  // Mock data for the dashboard
  const metrics = [
    {
      title: "Total Users",
      value: "2,543",
      change: "+12.5%",
      trend: "up",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Revenue",
      value: "$45,231",
      change: "+8.2%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Orders",
      value: "1,234",
      change: "-2.4%",
      trend: "down",
      icon: ShoppingCart,
      color: "text-purple-500"
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+4.1%",
      trend: "up",
      icon: TrendingUp,
      color: "text-orange-500"
    }
  ];

  const recentActivities = [
    {
      id: 1,
      action: "New order received",
      time: "2 minutes ago",
      user: "John Doe",
      amount: "$234.00"
    },
    {
      id: 2,
      action: "Payment processed",
      time: "15 minutes ago",
      user: "Sarah Smith",
      amount: "$1,234.00"
    },
    {
      id: 3,
      action: "New user registered",
      time: "1 hour ago",
      user: "Mike Johnson",
      amount: null
    },
    {
      id: 4,
      action: "Order completed",
      time: "2 hours ago",
      user: "Emma Wilson",
      amount: "$567.00"
    }
  ];

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulate random error (20% chance)
      if (Math.random() < 0.2) {
        throw new Error('Failed to load dashboard data');
      }

      setData({
        metrics,
        recentActivities
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <RefreshCw className="w-8 h-8 text-primary animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading dashboard data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center max-w-md">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Dashboard</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center mx-auto"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <button 
            onClick={fetchDashboardData}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors flex items-center"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.metrics.map((metric, index) => (
          <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className={`p-2 rounded-lg ${metric.color} bg-opacity-10`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
              <span className={`flex items-center text-sm ${
                metric.trend === 'up' ? 'text-green-500' : 'text-red-500'
              }`}>
                {metric.trend === 'up' ? <ArrowUpRight className="w-4 h-4 mr-1" /> : <ArrowDownRight className="w-4 h-4 mr-1" />}
                {metric.change}
              </span>
            </div>
            <h3 className="mt-4 text-2xl font-bold text-gray-800">{metric.value}</h3>
            <p className="text-sm text-gray-500">{metric.title}</p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
          <button className="text-primary hover:text-primary/80 text-sm">View All</button>
        </div>
        <div className="space-y-4">
          {data.recentActivities.map((activity) => (
            <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{activity.action}</p>
                  <p className="text-sm text-gray-500">{activity.user} • {activity.time}</p>
                </div>
              </div>
              {activity.amount && (
                <span className="font-medium text-gray-800">{activity.amount}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Top Products</h3>
          <div className="space-y-4">
            {['Product A', 'Product B', 'Product C'].map((product, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-gray-600">{product}</span>
                <div className="w-32 h-2 bg-gray-100 rounded-full">
                  <div 
                    className="h-full bg-primary rounded-full" 
                    style={{ width: `${(index + 1) * 30}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-800">Add New Product</h4>
              <p className="text-sm text-gray-500">Create a new product listing</p>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-800">View Orders</h4>
              <p className="text-sm text-gray-500">Check recent orders</p>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-800">Analytics</h4>
              <p className="text-sm text-gray-500">View detailed reports</p>
            </button>
            <button className="p-4 bg-gray-50 rounded-lg text-left hover:bg-gray-100 transition-colors">
              <h4 className="font-medium text-gray-800">Settings</h4>
              <p className="text-sm text-gray-500">Configure your store</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPlaceholder; 
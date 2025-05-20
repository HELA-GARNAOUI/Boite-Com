'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, Users, DollarSign, BarChart2, PieChart as PieChartIcon, LayoutDashboard } from 'lucide-react';

// Mock Data
const revenueData = [
  { name: 'Jan', revenue: 4000 },
  { name: 'Feb', revenue: 3000 },
  { name: 'Mar', revenue: 5000 },
  { name: 'Apr', revenue: 4500 },
  { name: 'May', revenue: 6000 },
  { name: 'Jun', revenue: 5500 },
  { name: 'Jul', revenue: 7000 },
];

const userDistributionData = [
  { name: 'New Users', value: 400 },
  { name: 'Returning Users', value: 300 },
  { name: 'Inactive', value: 300 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

const salesByCategoryData = [
  { category: 'Category A', sales: 200 },
  { category: 'Category B', sales: 300 },
  { category: 'Category C', sales: 150 },
  { category: 'Category D', sales: 250 },
];

const Analytics = () => {
  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <TrendingUp className="w-6 h-6 text-blue-500" />
            </div>
            <span className="text-sm text-green-500">+12.5%</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-800">$45,231</h3>
          <p className="text-sm text-gray-500">Total Revenue</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <Users className="w-6 h-6 text-purple-500" />
            </div>
            <span className="text-sm text-green-500">+8.2%</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-800">2,543</h3>
          <p className="text-sm text-gray-500">Active Users</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div className="p-2 rounded-lg bg-green-500/10">
              <DollarSign className="w-6 h-6 text-green-500" />
            </div>
            <span className="text-sm text-red-500">-2.4%</span>
          </div>
          <h3 className="mt-4 text-2xl font-bold text-gray-800">$1,234</h3>
          <p className="text-sm text-gray-500">Average Order Value</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Overview</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* User Distribution */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">User Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={userDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {userDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Sales by Category */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesByCategoryData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Rate (Placeholder - you can add a relevant chart here) */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Conversion Rate</h3>
          <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-lg">
             {/* Add your Conversion Rate chart here, e.g., an Area Chart or another Line Chart */}
            <BarChart2 className="w-12 h-12 text-gray-400" />
            <span className="ml-2 text-gray-500">Conversion rate chart placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics; 
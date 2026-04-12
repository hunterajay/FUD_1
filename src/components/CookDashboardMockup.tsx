import React from 'react';
import { ArrowLeft, TrendingUp, Users, IndianRupee, Package } from 'lucide-react';

interface CookDashboardProps {
  onBack: () => void;
}

export function CookDashboardMockup({ onBack }: CookDashboardProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-orange-500 mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Marketplace
      </button>

      <div className="flex justify-between items-end mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900">Chef Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Maria! Here's how your kitchen is doing.</p>
        </div>
        <button className="hidden sm:block px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors">
          + Add New Meal
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earnings', value: '₹12,405', icon: IndianRupee, trend: '+12%' },
          { label: 'Active Orders', value: '8', icon: Package, trend: 'Needs prep' },
          { label: 'Total Customers', value: '142', icon: Users, trend: '+5 this week' },
          { label: 'Profile Views', value: '890', icon: TrendingUp, trend: '+24%' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-50 rounded-lg">
                <stat.icon className="text-orange-500" size={24} />
              </div>
              <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">{stat.trend}</span>
            </div>
            <h3 className="text-gray-500 text-sm font-medium">{stat.label}</h3>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Active Orders List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Active Orders</h2>
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { id: '#ORD-001', item: "Mama's Classic Lasagna (x2)", customer: "Alex J.", time: "Pickup in 45m", status: "Preparing" },
            { id: '#ORD-002', item: "Vegan Power Buddha Bowl", customer: "Sam T.", time: "Pickup in 1h", status: "Pending" },
            { id: '#ORD-003', item: "Homestyle Mac & Cheese", customer: "Jordan L.", time: "Delivered", status: "Completed" },
          ].map((order, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    order.status === 'Preparing' ? 'bg-blue-50 text-blue-600' :
                    order.status === 'Pending' ? 'bg-yellow-50 text-yellow-600' :
                    'bg-green-50 text-green-600'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <p className="text-gray-900 font-medium">{order.item}</p>
                <p className="text-sm text-gray-500 mt-1">For {order.customer} • {order.time}</p>
              </div>
              {order.status !== 'Completed' && (
                <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-colors border border-gray-200">
                  Update Status
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

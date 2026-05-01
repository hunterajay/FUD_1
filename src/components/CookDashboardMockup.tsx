import React, { useState } from 'react';
import { ArrowLeft, TrendingUp, Users, IndianRupee, Package, Plus, X, Camera, Trash2 } from 'lucide-react';
import { Meal } from '../data/meals';
import { Order, OrderStatus } from '../types';

interface CookDashboardProps {
  meals: Meal[];
  orders: Order[];
  onBack: () => void;
  onAddMeal: (meal: Omit<Meal, 'id' | 'chefName' | 'rating' | 'reviews'>) => void;
  onRemoveMeal: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: OrderStatus) => void;
}

export function CookDashboardMockup({ meals, orders, onBack, onAddMeal, onRemoveMeal, onUpdateOrderStatus }: CookDashboardProps) {
  const [isAddingMeal, setIsAddingMeal] = useState(false);
  const [newMeal, setNewMeal] = useState({
    name: '',
    description: '',
    price: '',
    portions: '',
    image: '',
    tags: ''
  });

  const handleAddMealSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddMeal({
      name: newMeal.name,
      description: newMeal.description,
      price: Number(newMeal.price),
      portions: Number(newMeal.portions) || 0,
      imageUrl: newMeal.image || '/image1.jpg',
      tags: newMeal.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    });
    setIsAddingMeal(false);
    setNewMeal({ name: '', description: '', price: '', portions: '', image: '', tags: '' });
  };

  const handleImageCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewMeal({ ...newMeal, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const myMeals = meals.filter(meal => meal.chefName === 'Maria (You)');

  const cycleOrderStatus = (order: Order) => {
    let nextStatus: OrderStatus = 'Preparing';
    if (order.status === 'Pending') nextStatus = 'Preparing';
    if (order.status === 'Preparing') nextStatus = 'In Transit';
    if (order.status === 'In Transit') nextStatus = 'Completed';
    onUpdateOrderStatus(order.id, nextStatus);
  };

  const earnedToday = orders.filter(o => o.status === 'Completed').reduce((sum, o) => sum + o.total, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Completed').length;
  // Calculate unique customers count simply from orders list
  const totalCustomers = new Set(orders.map(o => o.customer)).size + 42; // mock starting base
  // Profile Views can be mock + some relationship to orders
  const profileViews = orders.length * 10 + 324;

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
        <button 
          onClick={() => setIsAddingMeal(true)}
          className="hidden sm:flex items-center px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors"
        >
          <Plus size={18} className="mr-1" /> Add New Meal
        </button>
      </div>

      {isAddingMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-orange-50">
              <h2 className="text-xl font-bold text-gray-900">Add New Meal</h2>
              <button onClick={() => setIsAddingMeal(false)} className="text-gray-500 hover:text-gray-700">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleAddMealSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Name</label>
                <input required type="text" value={newMeal.name} onChange={e => setNewMeal({...newMeal, name: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="e.g. Spicy Chicken Curry" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required value={newMeal.description} onChange={e => setNewMeal({...newMeal, description: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" rows={3} placeholder="Describe your meal..."></textarea>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹)</label>
                  <input required type="number" min="0" value={newMeal.price} onChange={e => setNewMeal({...newMeal, price: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="150" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Portions (Stock)</label>
                  <input required type="number" min="1" value={newMeal.portions} onChange={e => setNewMeal({...newMeal, portions: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="10" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dietary Tags</label>
                <input type="text" value={newMeal.tags} onChange={e => setNewMeal({...newMeal, tags: e.target.value})} className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Spicy, Halal" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meal Image</label>
                <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-orange-400 transition-colors relative">
                  {newMeal.image ? (
                    <div className="relative w-full h-32">
                      <img src={newMeal.image} alt="Preview" className="w-full h-full object-cover rounded-md" />
                      <button 
                        type="button"
                        onClick={() => setNewMeal({...newMeal, image: ''})}
                        className="absolute top-1 right-1 bg-white rounded-full p-1 shadow-sm text-gray-500 hover:text-red-500"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-1 text-center">
                      <Camera className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-orange-600 hover:text-orange-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500">
                          <span>Take a photo</span>
                          <input id="file-upload" name="file-upload" type="file" accept="image/*" capture="environment" className="sr-only" onChange={handleImageCapture} />
                        </label>
                        <p className="pl-1">or upload</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                    </div>
                  )}
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsAddingMeal(false)} className="px-4 py-2 text-gray-600 font-medium hover:bg-gray-50 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 transition-colors">Add Meal</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Earnings', value: `₹${earnedToday.toLocaleString()}`, icon: IndianRupee, trend: '+12%' },
          { label: 'Active Orders', value: activeOrdersCount.toString(), icon: Package, trend: 'Needs prep' },
          { label: 'Total Customers', value: totalCustomers.toString(), icon: Users, trend: 'Growing steadily' },
          { label: 'Profile Views', value: profileViews.toString(), icon: TrendingUp, trend: 'High visibility' },
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

      {/* My Menu Section */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-8">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">My Menu</h2>
        </div>
        <div className="divide-y divide-gray-100">
          {myMeals.length === 0 ? (
            <p className="p-6 text-gray-500 text-center">You haven't added any meals yet.</p>
          ) : (
            myMeals.map(meal => (
              <div key={meal.id} className="p-6 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <img src={meal.imageUrl} alt={meal.name} className="w-16 h-16 rounded-lg object-cover border border-gray-100" />
                  <div>
                    <h3 className="font-bold text-gray-900">{meal.name}</h3>
                    <p className="text-sm text-gray-500">₹{meal.price.toFixed(0)} • {meal.portions} portions left</p>
                  </div>
                </div>
                <button 
                  onClick={() => onRemoveMeal(meal.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove Meal"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Active Orders List */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Active Orders</h2>
          <button className="text-sm font-medium text-orange-500 hover:text-orange-600">View All</button>
        </div>
        <div className="divide-y divide-gray-100">
          {orders.map((order, i) => (
            <div key={i} className="p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    order.status === 'Preparing' ? 'bg-blue-50 text-blue-600' :
                    order.status === 'In Transit' ? 'bg-purple-50 text-purple-600' :
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
                <button 
                  onClick={() => cycleOrderStatus(order)}
                  className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-lg transition-colors border border-gray-200"
                >
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

import React from 'react';
import { MealCard } from './MealCard';
import { Meal } from '../data/meals';
import { CartItem } from '../types';

interface MealListProps {
  meals: Meal[];
  cartItems: CartItem[];
  onAddToCart: (meal: Meal) => void;
}

export function MealList({ meals, cartItems, onAddToCart }: MealListProps) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Meals near Campus</h2>
          <p className="text-gray-500 mt-1">Freshly prepared by local home chefs</p>
        </div>
        <div className="hidden sm:block">
          <select className="bg-white border border-gray-200 text-gray-700 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-orange-400">
            <option>Recommended</option>
            <option>Price: Low to High</option>
            <option>Highest Rated</option>
            <option>Nearest to me</option>
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {meals.map(meal => (
          <MealCard 
            key={meal.id} 
            meal={meal} 
            cartQuantity={cartItems.find(item => item.meal.id === meal.id)?.quantity || 0}
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>
    </div>
  );
}

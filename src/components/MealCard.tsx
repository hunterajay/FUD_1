import React from 'react';
import { Meal } from '../data/meals';
import { Star, Plus } from 'lucide-react';

interface MealCardProps {
  meal: Meal;
  cartQuantity: number;
  onAddToCart: (meal: Meal) => void;
}

export const MealCard: React.FC<MealCardProps> = ({ meal, cartQuantity, onAddToCart }) => {
  const remainingPortions = meal.portions - cartQuantity;
  const isOutOfStock = remainingPortions <= 0;

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-orange-100 flex flex-col h-full group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={meal.imageUrl} 
          alt={meal.name} 
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-orange-500 fill-orange-500" />
          {meal.rating} ({meal.reviews})
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-900 leading-tight">{meal.name}</h3>
          <span className="text-lg font-extrabold text-orange-600">₹{meal.price.toFixed(0)}</span>
        </div>
        
        <div className="flex justify-between items-center mb-3">
          <p className="text-sm text-gray-500">by <span className="font-medium text-gray-700">{meal.chefName}</span></p>
          <span className={`text-xs font-semibold px-2 py-1 rounded-full ${isOutOfStock ? 'bg-red-50 text-red-600' : 'bg-green-50 text-green-600'}`}>
            {isOutOfStock ? 'Out of Stock' : `${remainingPortions} portions left`}
          </span>
        </div>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">{meal.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-5">
          {meal.tags.map(tag => (
            <span key={tag} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-md text-xs font-medium border border-orange-100">
              {tag}
            </span>
          ))}
        </div>
        
        <button 
          onClick={() => onAddToCart(meal)}
          disabled={isOutOfStock}
          className={`w-full py-2.5 rounded-xl font-semibold transition-colors flex items-center justify-center gap-2 ${
            isOutOfStock 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-orange-100 hover:bg-orange-500 text-orange-700 hover:text-white'
          }`}
        >
          <Plus size={18} />
          {isOutOfStock ? 'Out of Stock' : 'Add to Order'}
        </button>
      </div>
    </div>
  );
}

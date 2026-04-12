import React from 'react';
import { Search, MapPin } from 'lucide-react';

export function Hero() {
  return (
    <div className="bg-[#FFD8B1] py-16 sm:py-24 px-4 sm:px-6 lg:px-8 text-center rounded-b-[2.5rem] shadow-sm mb-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-6">
          Home-cooked meals, <br className="hidden sm:block" />
          <span className="text-orange-600">student budget.</span>
        </h1>
        <p className="mt-4 text-lg sm:text-xl text-gray-800 mb-8 max-w-2xl mx-auto">
          Connect with local home chefs in your college town. Skip the dining hall and enjoy authentic, affordable food made with love.
        </p>
        
        <div className="max-w-xl mx-auto bg-white rounded-full shadow-md p-2 flex items-center border border-orange-100 focus-within:ring-2 focus-within:ring-orange-400 focus-within:border-transparent transition-all">
          <div className="flex-1 flex items-center px-4 border-r border-gray-200">
            <Search className="text-gray-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="What are you craving?" 
              className="w-full py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
            />
          </div>
          <div className="hidden sm:flex flex-1 items-center px-4">
            <MapPin className="text-gray-400 mr-2" size={20} />
            <input 
              type="text" 
              placeholder="Campus or Zip" 
              className="w-full py-2 outline-none text-gray-700 placeholder-gray-400 bg-transparent"
              defaultValue="University Campus"
            />
          </div>
          <button className="bg-orange-500 hover:bg-orange-600 text-white rounded-full px-6 py-3 font-semibold transition-colors">
            Find Food
          </button>
        </div>
        
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {['Halal', 'Vegan', 'Late Night', 'Comfort Food', 'Spicy'].map(tag => (
            <span key={tag} className="px-4 py-1.5 bg-white/60 text-orange-800 rounded-full text-sm font-medium cursor-pointer hover:bg-white transition-colors">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

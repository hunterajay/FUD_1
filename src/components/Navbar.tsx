import React from 'react';
import { ShoppingBag, Search, Menu, UserCircle } from 'lucide-react';

interface NavbarProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onNavigate: (page: 'home' | 'checkout' | 'dashboard') => void;
}

export function Navbar({ cartItemCount, onOpenCart, onNavigate }: NavbarProps) {
  return (
    <nav className="sticky top-0 z-40 w-full bg-[#FFF5EB] border-b border-orange-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <span className="text-3xl font-extrabold text-orange-500 tracking-tighter">füd</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors"
            >
              Browse Meals
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="text-gray-700 hover:text-orange-500 font-medium transition-colors flex items-center gap-2"
            >
              <UserCircle size={20} />
              Cook Dashboard
            </button>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <button 
              className="p-2 text-gray-600 hover:text-orange-500 transition-colors relative"
              onClick={onOpenCart}
            >
              <ShoppingBag size={24} />
              {cartItemCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-orange-500 rounded-full">
                  {cartItemCount}
                </span>
              )}
            </button>

            <button className="p-2 text-gray-600 hover:text-orange-500 transition-colors md:hidden">
              <Menu size={24} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

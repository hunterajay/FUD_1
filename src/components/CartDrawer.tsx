import React from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (mealId: string, delta: number) => void;
  onCheckout: () => void;
}

export function CartDrawer({ isOpen, onClose, cartItems, onUpdateQuantity, onCheckout }: CartDrawerProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.meal.price * item.quantity), 0);
  const fee = subtotal > 0 ? 40 : 0; // Flat platform fee
  const total = subtotal + fee;

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-50 flex flex-col transform transition-transform duration-300 ease-in-out">
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="text-orange-500" />
            Your Order
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={48} className="text-orange-200" />
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900">Your cart is empty</p>
                <p className="text-gray-500 mt-1">Looks like you haven't added any meals yet.</p>
              </div>
              <button 
                onClick={onClose}
                className="mt-4 px-6 py-2 bg-orange-100 text-orange-700 font-semibold rounded-full hover:bg-orange-200 transition-colors"
              >
                Browse Meals
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {cartItems.map((item) => (
                <div key={item.meal.id} className="flex gap-4">
                  <img 
                    src={item.meal.imageUrl} 
                    alt={item.meal.name} 
                    className="w-20 h-20 object-cover rounded-xl"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 line-clamp-1">{item.meal.name}</h3>
                      <p className="text-sm text-gray-500">{item.meal.chefName}</p>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-gray-200 rounded-lg">
                        <button 
                          onClick={() => onUpdateQuantity(item.meal.id, -1)}
                          className="p-1 text-gray-500 hover:text-orange-500 transition-colors"
                        >
                          <Minus size={16} />
                        </button>
                        <span className="w-8 text-center font-medium text-sm">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.meal.id, 1)}
                          disabled={item.quantity >= item.meal.portions}
                          className={`p-1 transition-colors ${item.quantity >= item.meal.portions ? 'text-gray-300 cursor-not-allowed' : 'text-gray-500 hover:text-orange-500'}`}
                        >
                          <Plus size={16} />
                        </button>
                      </div>
                      <span className="font-bold text-gray-900">₹{(item.meal.price * item.quantity).toFixed(0)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-4 border-t border-gray-100 bg-gray-50">
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-600">
                <span>Platform Fee</span>
                <span>₹{fee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
            <button 
              onClick={() => {
                onClose();
                onCheckout();
              }}
              className="w-full py-3.5 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold text-lg transition-colors shadow-sm"
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}

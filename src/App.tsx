import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealList } from './components/MealList';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { CookDashboardMockup } from './components/CookDashboardMockup';
import { sampleMeals, Meal } from './data/meals';
import { CartItem } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'checkout' | 'dashboard'>('home');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [meals, setMeals] = useState<Meal[]>(sampleMeals);

  const handleAddToCart = (meal: Meal) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.meal.id === meal.id);
      if (existing) {
        return prev.map(item => 
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { meal, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (mealId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.meal.id === mealId) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleAddMeal = (newMealData: Omit<Meal, 'id' | 'chefName' | 'rating' | 'reviews'>) => {
    const newMeal: Meal = {
      ...newMealData,
      id: `m${meals.length + 1}`,
      chefName: 'Maria (You)',
      rating: 0,
      reviews: 0,
    };
    setMeals(prev => [newMeal, ...prev]);
    setCurrentPage('home'); // Optional: redirect to home to see the new meal, or stay on dashboard
  };

  const handleRemoveMeal = (mealId: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== mealId));
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-gray-900">
      <Navbar 
        cartItemCount={cartItemCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onNavigate={setCurrentPage}
      />

      <main>
        {currentPage === 'home' && (
          <>
            <Hero 
              selectedUniversity={selectedUniversity} 
              onSelectUniversity={setSelectedUniversity} 
            />
            {selectedUniversity === 'RV University' && (
              <MealList meals={meals} onAddToCart={handleAddToCart} />
            )}
          </>
        )}
        
        {currentPage === 'checkout' && (
          <CheckoutPage 
            cartItems={cartItems} 
            onBack={() => setCurrentPage('home')}
            onClearCart={() => setCartItems([])}
          />
        )}

        {currentPage === 'dashboard' && (
          <CookDashboardMockup 
            meals={meals}
            onBack={() => setCurrentPage('home')} 
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
          />
        )}
      </main>

      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={() => setCurrentPage('checkout')}
      />
    </div>
  );
}


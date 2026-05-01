import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MealList } from './components/MealList';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutPage } from './components/CheckoutPage';
import { CookDashboardMockup } from './components/CookDashboardMockup';
import { sampleMeals, Meal } from './data/meals';
import { CartItem, Order, OrderStatus } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'checkout' | 'dashboard'>('home');
  const [selectedUniversity, setSelectedUniversity] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [meals, setMeals] = useState<Meal[]>(sampleMeals);
  const [orders, setOrders] = useState<Order[]>([
    { id: '#ORD-001', item: "Mama's Classic Lasagna (x2)", customer: "Alex J.", time: "Pickup in 45m", status: "Preparing", total: 450 },
    { id: '#ORD-002', item: "Vegan Power Buddha Bowl", customer: "Sam T.", time: "Pickup in 1h", status: "Pending", total: 220 },
    { id: '#ORD-003', item: "Homestyle Mac & Cheese", customer: "Jordan L.", time: "Delivered", status: "Completed", total: 180 },
  ]);

  const handleAddToCart = (meal: Meal) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.meal.id === meal.id);
      if (existing) {
        if (existing.quantity >= meal.portions) return prev;
        return prev.map(item => 
          item.meal.id === meal.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      if (meal.portions <= 0) return prev;
      return [...prev, { meal, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (mealId: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.meal.id === mealId) {
        const newQuantity = Math.max(0, Math.min(item.quantity + delta, item.meal.portions));
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

  const handleOrderComplete = (orderData: Omit<Order, 'id' | 'status' | 'time'>) => {
    // Add new order
    const newOrder: Order = {
      ...orderData,
      id: `#ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      status: 'Pending',
      time: 'Just now'
    };
    setOrders(prev => [newOrder, ...prev]);

    setMeals(prevMeals => {
      // Create a copy of meals
      const updatedMeals = [...prevMeals];
      
      // Decrease portions based on cart items
      cartItems.forEach(cartItem => {
        const mealIndex = updatedMeals.findIndex(m => m.id === cartItem.meal.id);
        if (mealIndex !== -1) {
          updatedMeals[mealIndex] = {
            ...updatedMeals[mealIndex],
            portions: Math.max(0, updatedMeals[mealIndex].portions - cartItem.quantity)
          };
        }
      });
      return updatedMeals;
    });
    setCartItems([]);
  };

  const handleUpdateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
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
              <MealList meals={meals} cartItems={cartItems} onAddToCart={handleAddToCart} />
            )}
          </>
        )}
        
        {currentPage === 'checkout' && (
          <CheckoutPage 
            cartItems={cartItems} 
            onBack={() => setCurrentPage('home')}
            onOrderComplete={handleOrderComplete}
          />
        )}

        {currentPage === 'dashboard' && (
          <CookDashboardMockup 
            meals={meals}
            orders={orders}
            onBack={() => setCurrentPage('home')} 
            onAddMeal={handleAddMeal}
            onRemoveMeal={handleRemoveMeal}
            onUpdateOrderStatus={handleUpdateOrderStatus}
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


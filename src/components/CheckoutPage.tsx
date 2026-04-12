import React, { useState } from 'react';
import { CartItem } from '../types';
import { ArrowLeft, CreditCard, ExternalLink, CheckCircle } from 'lucide-react';

interface CheckoutPageProps {
  cartItems: CartItem[];
  onBack: () => void;
  onClearCart: () => void;
}

export function CheckoutPage({ cartItems, onBack, onClearCart }: CheckoutPageProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.meal.price * item.quantity), 0);
  const fee = subtotal > 0 ? 40 : 0;
  const total = subtotal + fee;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const productNameStr = cartItems.map(item => `${item.quantity}x ${item.meal.name}`).join(', ');

    const payload = {
      firstName: formData.get('firstName'),
      'First Name': formData.get('firstName'),
      lastName: formData.get('lastName'),
      'Last Name': formData.get('lastName'),
      email: formData.get('email'),
      'Email': formData.get('email'),
      'Email Address': formData.get('email'),
      phone: formData.get('phone'),
      phoneNumber: formData.get('phone'),
      'phone number': formData.get('phone'),
      'Phone Number': formData.get('phone'),
      Phone: formData.get('phone'),
      phone_number: formData.get('phone'),
      contact: formData.get('phone'),
      Contact: formData.get('phone'),
      address: formData.get('address'),
      streetAddress: formData.get('address'),
      'street address': formData.get('address'),
      'Street Address': formData.get('address'),
      dorm: formData.get('dorm'),
      'Dorm': formData.get('dorm'),
      city: formData.get('city'),
      'City': formData.get('city'),
      state: formData.get('state'),
      'State': formData.get('state'),
      zipcode: formData.get('zipcode'),
      zipCode: formData.get('zipcode'),
      'zip code': formData.get('zipcode'),
      'Zip Code': formData.get('zipcode'),
      items: productNameStr,
      productName: productNameStr,
      'product name': productNameStr,
      'Product Name': productNameStr,
      'Items': productNameStr,
      total: total,
      totalAmount: total,
      'total amount': total,
      'Total Amount': total,
      'Total': total
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzUg-ybB8KzaNiQUulsRvBW3e4oqyaLNwddhUFgh0SEJI0K7DXUV02Fwwvh3rnSV6eS/exec', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onClearCart();
    }
  };

  if (cartItems.length === 0 && !isSubmitted) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button onClick={onBack} className="text-orange-500 font-medium hover:underline">
          Go back to browsing
        </button>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} />
        </div>
        <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Order Confirmed!</h2>
        <p className="text-lg text-gray-600 mb-8">
          Your chef has received your order and will start preparing it soon. We've sent a confirmation email with pickup/delivery details.
        </p>
        <button 
          onClick={onBack}
          className="px-8 py-3 bg-orange-500 text-white font-bold rounded-xl hover:bg-orange-600 transition-colors"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button 
        onClick={onBack}
        className="flex items-center text-gray-500 hover:text-orange-500 mb-8 transition-colors"
      >
        <ArrowLeft size={20} className="mr-2" />
        Back to Menu
      </button>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Form Section */}
        <div className="flex-1">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Checkout</h1>
          
          <form id="checkout-form" onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Info */}
            <section className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">First Name</label>
                  <input required type="text" name="firstName" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Jane" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Last Name</label>
                  <input required type="text" name="lastName" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Doe" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Email Address</label>
                  <input required type="email" name="email" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="jane@university.edu" />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="text-sm font-medium text-gray-700">Phone Number</label>
                  <input required type="tel" name="phone" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="(555) 123-4567" />
                </div>
              </div>
            </section>

            {/* Delivery Address */}
            <section className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Delivery Address</h2>
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Street Address</label>
                  <input required type="text" name="address" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="123 Campus Dr" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Apt, Suite, Dorm (Optional)</label>
                  <input type="text" name="dorm" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="Dorm 4B" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-1 sm:col-span-1">
                    <label className="text-sm font-medium text-gray-700">City</label>
                    <input required type="text" name="city" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="College Town" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">State</label>
                    <input required type="text" name="state" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="CA" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700">ZIP Code</label>
                    <input required type="text" name="zipcode" className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-orange-400 outline-none" placeholder="90210" />
                  </div>
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Payment</h2>
              <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex items-start gap-4">
                <CreditCard className="text-orange-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900">Secure PayPal Payment</h3>
                  <p className="text-sm text-gray-600 mt-1 mb-3">
                    You will be redirected to our secure payment partner (PayPal) to complete your transaction.
                  </p>
                  <a href="#" className="inline-flex items-center text-sm font-bold text-orange-600 hover:text-orange-700">
                    Preview Payment Link <ExternalLink size={14} className="ml-1" />
                  </a>
                </div>
              </div>
            </section>
          </form>
        </div>

        {/* Order Summary */}
        <div className="lg:w-96">
          <div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm sticky top-24">
            <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-6 max-h-64 overflow-y-auto pr-2">
              {cartItems.map((item) => (
                <div key={item.meal.id} className="flex justify-between text-sm">
                  <div className="flex gap-2">
                    <span className="font-medium text-gray-500">{item.quantity}x</span>
                    <span className="text-gray-900 line-clamp-1">{item.meal.name}</span>
                  </div>
                  <span className="font-medium text-gray-900">₹{(item.meal.price * item.quantity).toFixed(0)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Platform Fee</span>
                <span>₹{fee.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold text-gray-900 pt-3 border-t border-gray-200">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isSubmitting}
              form="checkout-form"
              className="w-full py-4 bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white rounded-xl font-bold text-lg transition-colors shadow-sm flex items-center justify-center gap-2"
            >
              {isSubmitting ? 'Processing...' : `Pay ₹${total.toFixed(0)}`}
              {!isSubmitting && <ExternalLink size={18} />}
            </button>
            <p className="text-xs text-center text-gray-400 mt-4">
              By placing your order, you agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

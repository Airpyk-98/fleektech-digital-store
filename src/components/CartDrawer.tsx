'use client';

import React, { useState } from 'react';
import { useCart } from '@/lib/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, CheckCircle2, ShieldCheck, Truck } from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const { items, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      clearCart();
    }, 1500);
  };

  const closeSuccessModal = () => {
    setCheckoutSuccess(false);
    setIsCartOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity animate-fadeIn"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-zinc-950 border-l border-zinc-800 text-white flex flex-col shadow-2xl animate-slideLeft">
          {/* Header */}
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between bg-zinc-900/40">
            <div className="flex items-center gap-2">
              <ShoppingBag className="text-cyan-400" size={24} />
              <h2 className="font-extrabold text-xl tracking-tight">Your Tech Bag</h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 text-zinc-400 hover:text-white rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-20 h-20 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600">
                  <ShoppingBag size={40} />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-lg text-zinc-300">Your bag is empty</h3>
                  <p className="text-sm text-zinc-500 max-w-xs">
                    Explore our cyberpunk laptops, titanium smartphones, and studio audio gear to start shopping!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-6 py-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20"
                >
                  Explore Store
                </button>
              </div>
            ) : (
              items.map(({ product, quantity }) => (
                <div
                  key={product.id}
                  className="flex gap-4 p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700/80 transition-all"
                >
                  <img
                    src={product.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80'}
                    alt={product.name}
                    className="w-20 h-20 object-cover rounded-xl bg-zinc-800 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <h4 className="font-bold text-sm text-zinc-100 truncate">{product.name}</h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-zinc-500 hover:text-red-400 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs text-zinc-500 font-medium">{product.category}</p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="font-extrabold text-cyan-400 text-sm">
                        ${(product.price * quantity).toLocaleString()}
                      </div>
                      <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-lg overflow-hidden">
                        <button
                          onClick={() => updateQuantity(product.id, -1)}
                          className="p-1 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 font-bold text-xs text-white">{quantity}</span>
                        <button
                          onClick={() => updateQuantity(product.id, 1)}
                          className="p-1 px-2 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-zinc-800 bg-zinc-900/80 space-y-4">
              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 py-2 border-b border-zinc-800/80 text-[11px] text-zinc-400">
                <div className="flex items-center gap-1.5">
                  <Truck size={14} className="text-cyan-400" />
                  <span>Free Express Delivery</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck size={14} className="text-cyan-400" />
                  <span>2-Year Tech Warranty</span>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Subtotal</span>
                  <span>${totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm text-zinc-400">
                  <span>Estimated Shipping</span>
                  <span className="text-green-400 font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-lg font-extrabold text-white pt-2 border-t border-zinc-800">
                  <span>Total</span>
                  <span className="text-cyan-400">${totalPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-black font-extrabold text-base hover:brightness-110 active:scale-[0.99] transition-all shadow-xl shadow-cyan-500/25 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Success Modal */}
      {checkoutSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl animate-scaleUp">
            <div className="w-16 h-16 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center mx-auto">
              <CheckCircle2 size={40} />
            </div>
            <div className="space-y-2">
              <h3 className="font-extrabold text-2xl text-white">Order Confirmed!</h3>
              <p className="text-sm text-zinc-400">
                Thank you for shopping at <span className="text-cyan-400 font-bold">FleekTech</span>. Your titanium tech order has been dispatched!
              </p>
            </div>
            <button
              onClick={closeSuccessModal}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

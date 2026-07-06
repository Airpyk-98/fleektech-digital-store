'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalPrice, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setOrderSuccess(true);
      clearCart();
    }, 1500);
  };

  const closeDrawer = () => {
    setIsCartOpen(false);
    if (orderSuccess) setOrderSuccess(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#1c1b1b]/50 backdrop-blur-sm transition-opacity" 
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f8] shadow-2xl border-l border-[#c6c5d5] flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-[#c6c5d5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00003c]">shopping_cart</span>
              <h2 className="font-headline font-bold text-lg text-[#00003c]">Your Cart - FleekTech</h2>
            </div>
            <button 
              onClick={closeDrawer}
              className="p-1 rounded-full text-[#464653] hover:text-[#00003c] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orderSuccess ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto text-[#2E7D32]">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="font-headline font-bold text-xl text-[#00003c]">Order Confirmed!</h3>
                <p className="text-sm text-[#464653] max-w-xs mx-auto">
                  Thank you for shopping with FleekTech. Your tech-forward electronics are being prepared for dispatch!
                </p>
                <button 
                  onClick={closeDrawer}
                  className="mt-6 bg-[#00003c] text-white font-bold px-6 py-2.5 rounded-lg text-sm hover:opacity-90 active:scale-95 transition-all"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-[#c6c5d5]">remove_shopping_cart</span>
                <p className="font-headline font-semibold text-[#00003c]">Your cart is empty</p>
                <p className="text-xs text-[#464653]">Explore our catalog for cutting-edge smartphones, laptops, and studio audio.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex gap-4 p-3 rounded-xl bg-white border border-[#c6c5d5] hover:shadow-md transition-shadow"
                  >
                    <div className="w-20 h-20 bg-[#f0edec] rounded-lg flex-shrink-0 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="font-body font-semibold text-sm text-[#00003c] line-clamp-1">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-[#767684] hover:text-[#D32F2F] transition-colors"
                            title="Remove item"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                        <p className="font-price font-bold text-sm text-[#B87F00] mt-1">
                          ₦{item.price.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center border border-[#c6c5d5] rounded-lg bg-[#f6f3f2]">
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#00003c] hover:bg-[#ebe7e7] rounded-l-lg"
                          >
                            -
                          </button>
                          <span className="w-8 text-center text-xs font-bold text-[#00003c]">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center text-[#00003c] hover:bg-[#ebe7e7] rounded-r-lg"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-xs font-semibold text-[#464653]">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer / Checkout */}
          {cart.length > 0 && !orderSuccess && (
            <div className="p-6 border-t border-[#c6c5d5] bg-white space-y-4">
              <div className="space-y-1.5 text-sm">
                <div className="flex justify-between text-[#464653]">
                  <span>Subtotal</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#464653]">
                  <span>Shipping & Handling</span>
                  <span className="text-[#2E7D32] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-[#00003c] font-bold text-base pt-2 border-t border-[#ebe7e7]">
                  <span>Total Amount</span>
                  <span className="font-price text-lg text-[#00003c]">₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button 
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full bg-[#ffa504] text-[#684100] font-headline font-bold py-3.5 rounded-xl hover:opacity-95 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-sm disabled:opacity-50"
              >
                {isCheckingOut ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
                    Processing Order...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined">lock</span>
                    Proceed to Checkout
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-[#767684]">
                ⚡ Guaranteed 24-Hour Dispatch & 100% Titanium Money-Back Guarantee
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

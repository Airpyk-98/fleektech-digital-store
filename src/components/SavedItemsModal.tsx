'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function SavedItemsModal() {
  const { savedItems, toggleSaveItem, addToCart, isSavedOpen, setIsSavedOpen } = useCart();
  const { user } = useAuth();

  if (!isSavedOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#1c1b1b]/60 backdrop-blur-sm transition-opacity" onClick={() => setIsSavedOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f8] shadow-2xl border-l border-[#c6c5d5] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#c6c5d5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#D32F2F]">favorite</span>
              <h2 className="font-headline font-bold text-lg text-[#00003c]">
                Saved Items ({savedItems.length}) • {user ? user.name : 'Guest'}
              </h2>
            </div>
            <button
              onClick={() => setIsSavedOpen(false)}
              className="p-1 rounded-full text-[#464653] hover:text-[#00003c] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {savedItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-[#c6c5d5]">heart_broken</span>
                <p className="font-headline font-semibold text-[#00003c]">No saved items</p>
                <p className="text-xs text-[#464653]">
                  Click the heart icon on any product to save it to your personal wishlist for later!
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {savedItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-3 rounded-xl bg-white border border-[#c6c5d5] shadow-sm items-center">
                    <div className="w-16 h-16 bg-[#f0edec] rounded-lg flex-shrink-0 relative overflow-hidden">
                      <img src={item.image} alt={item.name} className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-body font-semibold text-xs text-[#00003c] line-clamp-1">{item.name}</h4>
                      <p className="font-price font-bold text-xs text-[#B87F00] mt-1">
                        ₦{item.price.toLocaleString()}
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button
                          onClick={() => addToCart(item)}
                          className="px-3 py-1 bg-[#00003c] hover:bg-[#000080] text-white text-[11px] font-bold rounded-lg flex items-center gap-1 transition-all"
                        >
                          <span className="material-symbols-outlined text-sm">add_shopping_cart</span>
                          Add to Cart
                        </button>
                        <button
                          onClick={() => toggleSaveItem(item)}
                          className="p-1 text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg transition-colors"
                          title="Remove from wishlist"
                        >
                          <span className="material-symbols-outlined text-base">delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

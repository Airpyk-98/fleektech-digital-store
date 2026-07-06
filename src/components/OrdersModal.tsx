'use client';

import React from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function OrdersModal() {
  const { orders, isOrdersOpen, setIsOrdersOpen } = useCart();
  const { user } = useAuth();

  if (!isOrdersOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-[#1c1b1b]/60 backdrop-blur-sm transition-opacity" onClick={() => setIsOrdersOpen(false)} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#fcf9f8] shadow-2xl border-l border-[#c6c5d5] flex flex-col justify-between animate-in slide-in-from-right duration-300">
          {/* Header */}
          <div className="p-6 border-b border-[#c6c5d5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#855400]">package_2</span>
              <h2 className="font-headline font-bold text-lg text-[#00003c]">
                My Orders • {user ? user.name : 'Guest'}
              </h2>
            </div>
            <button
              onClick={() => setIsOrdersOpen(false)}
              className="p-1 rounded-full text-[#464653] hover:text-[#00003c] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {orders.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-[#c6c5d5]">inventory_2</span>
                <p className="font-headline font-semibold text-[#00003c]">No orders yet</p>
                <p className="text-xs text-[#464653]">
                  When you place an order, it will appear here with real-time delivery status.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((order) => (
                  <div key={order.id} className="p-4 bg-white rounded-xl border border-[#c6c5d5] space-y-3 shadow-sm">
                    <div className="flex justify-between items-center border-b border-[#ebe7e7] pb-2">
                      <div>
                        <span className="font-mono font-bold text-xs text-[#00003c]">#{order.id}</span>
                        <span className="block text-[10px] text-[#767684]">
                          {new Date(order.createdAt).toLocaleDateString('en-NG', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 rounded-full bg-[#ffb95c]/20 text-[#855400] font-bold text-[10px] uppercase flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#855400]"></span>
                        {order.status}
                      </span>
                    </div>

                    <div className="space-y-1.5 max-h-32 overflow-y-auto">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex justify-between text-xs text-[#464653]">
                          <span className="truncate max-w-[200px]">
                            {item.quantity}x {item.name}
                          </span>
                          <span className="font-price font-semibold text-[#00003c]">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#ebe7e7] flex justify-between items-center text-xs font-bold">
                      <span className="text-[#464653]">Total Paid:</span>
                      <span className="font-price text-sm text-[#B87F00]">₦{order.total.toLocaleString()}</span>
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

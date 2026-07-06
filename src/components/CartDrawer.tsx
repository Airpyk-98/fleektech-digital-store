'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleSelectItem,
    toggleSelectAll,
    selectedItems,
    selectedTotalItems,
    selectedTotalPrice,
    addOrder,
  } = useCart();
  const { user } = useAuth();

  const [step, setStep] = useState<'cart' | 'checkout' | 'success'>('cart');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [placedOrderId, setPlacedOrderId] = useState<string>('');

  // Shipping form state
  const [fullName, setFullName] = useState(user?.name || 'Ebiringai I.');
  const [phone, setPhone] = useState('08012345678');
  const [address, setAddress] = useState('12 Admiralty Way, Lekki Phase 1');
  const [city, setCity] = useState('Lagos, Nigeria');
  const [paymentMethod, setPaymentMethod] = useState<'pod' | 'card'>('pod');

  if (!isCartOpen) return null;

  const closeDrawer = () => {
    setIsCartOpen(false);
    setTimeout(() => {
      setStep('cart');
    }, 300);
  };

  const handleProceedToCheckout = () => {
    if (selectedItems.length === 0) return;
    setStep('checkout');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      const order = addOrder({
        items: selectedItems,
        total: selectedTotalPrice,
        shippingAddress: { fullName, phone, address, city },
      });
      setPlacedOrderId(order.id);
      setIsCheckingOut(false);
      setStep('success');
    }, 1200);
  };

  const allSelected = cart.length > 0 && cart.every((i) => i.selected !== false);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-[#1c1b1b]/60 backdrop-blur-sm transition-opacity" onClick={closeDrawer} />

      {/* Drawer */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-lg bg-[#fcf9f8] shadow-2xl border-l border-[#c6c5d5] flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 border-b border-[#c6c5d5] flex items-center justify-between bg-white">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#00003c]">
                {step === 'checkout' ? 'local_shipping' : step === 'success' ? 'verified' : 'shopping_cart'}
              </span>
              <h2 className="font-headline font-bold text-lg text-[#00003c]">
                {step === 'checkout'
                  ? 'Checkout Summary'
                  : step === 'success'
                  ? 'Order Confirmed!'
                  : `Your Cart (${cart.length})`}
              </h2>
            </div>
            <button
              onClick={closeDrawer}
              className="p-1 rounded-full text-[#464653] hover:text-[#00003c] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6">
            {step === 'success' ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-20 h-20 bg-[#2E7D32]/10 rounded-full flex items-center justify-center mx-auto text-[#2E7D32]">
                  <span className="material-symbols-outlined text-5xl">check_circle</span>
                </div>
                <h3 className="font-headline font-bold text-2xl text-[#00003c]">Thank You!</h3>
                <p className="text-sm text-[#464653] max-w-xs mx-auto">
                  Your order <b>#{placedOrderId}</b> has been registered in your account history. Our Jumia Nigeria logistics partner is preparing your items!
                </p>
                <div className="p-4 bg-[#f0edec] rounded-xl border border-[#c6c5d5] text-left text-xs space-y-1 max-w-xs mx-auto font-mono">
                  <p className="text-[#00003c]"><b>Recipient:</b> {fullName}</p>
                  <p className="text-[#00003c]"><b>Phone:</b> {phone}</p>
                  <p className="text-[#00003c]"><b>Delivery To:</b> {address}, {city}</p>
                  <p className="text-[#B87F00] font-bold"><b>Total Paid:</b> ₦{selectedTotalPrice.toLocaleString()}</p>
                </div>
                <button
                  onClick={closeDrawer}
                  className="mt-6 bg-[#00003c] text-white font-bold px-8 py-3 rounded-xl text-sm hover:opacity-90 active:scale-95 transition-all shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            ) : step === 'checkout' ? (
              <form onSubmit={handleConfirmOrder} className="space-y-6 animate-in slide-in-from-right-4 duration-200">
                <div className="p-4 bg-white rounded-xl border border-[#c6c5d5] space-y-3">
                  <h4 className="font-bold text-xs uppercase text-[#00003c] tracking-wider flex items-center gap-1.5 border-b border-[#ebe7e7] pb-2">
                    <span className="material-symbols-outlined text-base text-[#855400]">location_on</span>
                    Delivery Address (Nigeria)
                  </h4>
                  <div>
                    <label className="block text-xs font-bold text-[#464653] mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2.5 text-xs text-[#1c1b1b] outline-none focus:ring-2 focus:ring-[#00003c]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-[#464653] mb-1">Phone Number *</label>
                      <input
                        type="text"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2.5 text-xs text-[#1c1b1b] outline-none focus:ring-2 focus:ring-[#00003c]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#464653] mb-1">City / State *</label>
                      <input
                        type="text"
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2.5 text-xs text-[#1c1b1b] outline-none focus:ring-2 focus:ring-[#00003c]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#464653] mb-1">Street Address *</label>
                    <input
                      type="text"
                      required
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2.5 text-xs text-[#1c1b1b] outline-none focus:ring-2 focus:ring-[#00003c]"
                    />
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#c6c5d5] space-y-3">
                  <h4 className="font-bold text-xs uppercase text-[#00003c] tracking-wider flex items-center gap-1.5 border-b border-[#ebe7e7] pb-2">
                    <span className="material-symbols-outlined text-base text-[#2E7D32]">payments</span>
                    Payment Method
                  </h4>
                  <div className="space-y-2">
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'pod' ? 'bg-[#ffb95c]/10 border-[#ffa504]' : 'border-[#c6c5d5]'}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'pod'}
                        onChange={() => setPaymentMethod('pod')}
                        className="text-[#00003c] focus:ring-[#00003c]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#00003c]">Pay on Delivery (POS / Cash)</p>
                        <p className="text-[11px] text-[#767684]">Pay seamlessly when our courier arrives at your doorstep.</p>
                      </div>
                    </label>
                    <label className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all ${paymentMethod === 'card' ? 'bg-[#ffb95c]/10 border-[#ffa504]' : 'border-[#c6c5d5]'}`}>
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'card'}
                        onChange={() => setPaymentMethod('card')}
                        className="text-[#00003c] focus:ring-[#00003c]"
                      />
                      <div>
                        <p className="text-xs font-bold text-[#00003c]">Instant Card / Transfer (Paystack / Flutterwave)</p>
                        <p className="text-[11px] text-[#767684]">Secure online payment with Mastercard, Visa, or Bank Transfer.</p>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="p-4 bg-white rounded-xl border border-[#c6c5d5] space-y-2">
                  <h4 className="font-bold text-xs uppercase text-[#00003c] tracking-wider mb-2">
                    Selected Items ({selectedTotalItems})
                  </h4>
                  <div className="max-h-40 overflow-y-auto space-y-2 divide-y divide-[#ebe7e7]">
                    {selectedItems.map((item) => (
                      <div key={item.id} className="pt-2 first:pt-0 flex justify-between items-center text-xs">
                        <span className="text-[#1c1b1b] font-medium truncate max-w-[200px]">
                          {item.quantity}x {item.name}
                        </span>
                        <span className="font-price font-bold text-[#00003c]">
                          ₦{(item.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 border-t border-[#c6c5d5] flex justify-between items-center font-bold text-sm">
                    <span className="text-[#00003c]">Total to Pay:</span>
                    <span className="font-price text-lg text-[#B87F00]">₦{selectedTotalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="w-1/3 py-3 rounded-xl border border-[#c6c5d5] bg-white text-[#464653] font-bold text-xs hover:bg-[#ebe7e7] transition-colors"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    disabled={isCheckingOut}
                    className="w-2/3 py-3 rounded-xl bg-[#00003c] hover:bg-[#000080] text-white font-bold text-sm tracking-wide uppercase transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2"
                  >
                    {isCheckingOut ? (
                      <>
                        <span className="material-symbols-outlined animate-spin text-base">progress_activity</span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <span className="material-symbols-outlined text-base">verified_user</span>
                        PLACE ORDER (₦{selectedTotalPrice.toLocaleString()})
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : cart.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <span className="material-symbols-outlined text-5xl text-[#c6c5d5]">remove_shopping_cart</span>
                <p className="font-headline font-semibold text-[#00003c]">Your cart is empty</p>
                <p className="text-xs text-[#464653]">
                  Explore our catalog for cutting-edge smartphones, laptops, and studio audio.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Select All Bar */}
                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-[#c6c5d5] text-xs font-bold text-[#00003c]">
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={(e) => toggleSelectAll(e.target.checked)}
                      className="w-4 h-4 rounded border-[#c6c5d5] text-[#00003c] focus:ring-[#00003c] cursor-pointer"
                    />
                    <span>Select All ({cart.length} items)</span>
                  </label>
                  <button onClick={clearCart} className="text-[#D32F2F] hover:underline font-semibold">
                    Clear Cart
                  </button>
                </div>

                {/* Items List - Smooth Scrollable */}
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div
                      key={item.id}
                      className={`flex gap-3 p-3 rounded-xl bg-white border transition-all ${
                        item.selected !== false ? 'border-[#00003c]/40 shadow-sm' : 'border-[#c6c5d5] opacity-75'
                      }`}
                    >
                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          checked={item.selected !== false}
                          onChange={() => toggleSelectItem(item.id)}
                          className="w-4 h-4 rounded border-[#c6c5d5] text-[#00003c] focus:ring-[#00003c] cursor-pointer"
                        />
                      </div>

                      <div className="w-16 h-16 bg-[#f0edec] rounded-lg flex-shrink-0 relative overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="absolute inset-0 w-full h-full object-cover object-center mix-blend-multiply"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between min-w-0">
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h4 className="font-body font-semibold text-xs text-[#00003c] line-clamp-1">{item.name}</h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#767684] hover:text-[#D32F2F] transition-colors p-0.5"
                              title="Remove item"
                            >
                              <span className="material-symbols-outlined text-[16px]">delete</span>
                            </button>
                          </div>
                          <p className="font-price font-bold text-xs text-[#B87F00] mt-0.5">
                            ₦{item.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border border-[#c6c5d5] rounded-lg bg-[#f6f3f2]">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#00003c] hover:bg-[#ebe7e7] rounded-l-lg text-xs font-bold"
                            >
                              -
                            </button>
                            <span className="w-7 text-center text-[11px] font-bold text-[#00003c]">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 flex items-center justify-center text-[#00003c] hover:bg-[#ebe7e7] rounded-r-lg text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                          <span className="text-xs font-bold text-[#00003c] font-price">
                            ₦{(item.price * item.quantity).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Footer / Checkout Button */}
          {cart.length > 0 && step === 'cart' && (
            <div className="p-6 border-t border-[#c6c5d5] bg-white space-y-4">
              <div className="space-y-1.5 text-xs md:text-sm">
                <div className="flex justify-between text-[#464653]">
                  <span>Selected Items</span>
                  <span className="font-bold text-[#00003c]">
                    {selectedTotalItems} of {cart.reduce((sum, i) => sum + i.quantity, 0)} units
                  </span>
                </div>
                <div className="flex justify-between text-[#464653]">
                  <span>Shipping & Handling</span>
                  <span className="text-[#2E7D32] font-semibold">FREE</span>
                </div>
                <div className="flex justify-between text-[#00003c] font-bold text-base pt-2 border-t border-[#ebe7e7]">
                  <span>Selected Total</span>
                  <span className="font-price text-lg text-[#B87F00]">₦{selectedTotalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleProceedToCheckout}
                disabled={selectedItems.length === 0}
                className={`w-full py-3.5 rounded-xl font-headline font-bold text-sm tracking-wide uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 ${
                  selectedItems.length > 0
                    ? 'bg-[#00003c] hover:bg-[#000080] text-white'
                    : 'bg-[#c6c5d5] text-[#767684] cursor-not-allowed'
                }`}
              >
                <span className="material-symbols-outlined text-lg">shopping_bag</span>
                PROCEED TO CHECKOUT ({selectedItems.length})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

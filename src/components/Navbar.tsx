'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onSelectCategory?: (category: string) => void;
}

export default function Navbar({ onSearch, onSelectCategory }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const { user, isAuthModalOpen, authModalMode, openAuthModal, closeAuthModal, login, signup, logout, changePassword } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [showMobileAccountModal, setShowMobileAccountModal] = useState(false);
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  
  // Auth Form State
  const [authEmail, setAuthEmail] = useState('');
  const [authPass, setAuthPass] = useState('');
  const [authName, setAuthName] = useState('');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');

  // Change Pass Form State
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  const pathname = usePathname();
  const isHome = pathname === '/';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    setAuthLoading(true);

    if (authModalMode === 'login') {
      const res = await login(authEmail, authPass);
      if (!res.success) setAuthError(res.error || 'Login failed');
    } else {
      if (!authName.trim()) {
        setAuthError('Full Name is required');
        setAuthLoading(false);
        return;
      }
      const res = await signup(authName, authEmail, authPass);
      if (!res.success) setAuthError(res.error || 'Signup failed');
    }
    setAuthLoading(false);
  };

  const handleChangePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPassError('');
    setPassSuccess('');
    if (newPass !== confirmPass) {
      setPassError('New passwords do not match');
      return;
    }
    if (newPass.length < 6) {
      setPassError('Password must be at least 6 characters');
      return;
    }
    const res = await changePassword(oldPass, newPass);
    if (res.success) {
      setPassSuccess('Password updated successfully!');
      setTimeout(() => {
        setShowChangePassModal(false);
        setOldPass('');
        setNewPass('');
        setConfirmPass('');
        setPassSuccess('');
      }, 1500);
    } else {
      setPassError(res.error || 'Failed to update password');
    }
  };

  return (
    <>
      {/* TopAppBar - Stitch Design System */}
      <header className="fixed top-0 w-full z-50 bg-[#fcf9f8] border-b border-[#c6c5d5] flex justify-between items-center px-4 md:px-12 h-16 shadow-none transition-all duration-300">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => {
              if (onSelectCategory && isHome) onSelectCategory('All');
            }}
            className="text-[#00003c] hover:opacity-80 active:scale-95 transition-all"
            title="Menu / Reset"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link href="/" className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida/AP1WRLt9dUXw7EhLF1fIQDLhUefxkgX9lrFfWFPY7dhJCWcdw1cjVwp0ROgHvpATBq8iPnNM45lC0YgDHddTVNYNOMtgmSMzJQXahDx6s0hDuRJibH0oQ_39FWpv4USdqaaRd8jyKXmc1XG2pMSjQh2YjWFgyIORCf6z_4YgtMjNms85jfDWAonG9YquOuLiOULrYWiU4mQA9NY3p_h4ZyZ4ZbIN3h9WFz206e7ksRwxJA3RcJ828781k5BM0f8" 
              alt="FLEEKTECH" 
              className="h-8 w-auto object-contain" 
            />
          </Link>
        </div>

        {/* Desktop Search Bar */}
        <div className="flex-1 mx-8 hidden md:block max-w-xl">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#767684]">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search for phones, laptops, audio..." 
              className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-[#00003c] focus:border-transparent text-sm text-[#1c1b1b] placeholder-[#767684] outline-none transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => { setSearchQuery(''); if (onSearch) onSearch(''); }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767684] hover:text-[#1c1b1b]"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="md:hidden active:scale-95 transition-transform text-[#00003c] p-1"
            title="Search"
          >
            <span className="material-symbols-outlined">search</span>
          </button>

          {/* Jumia Nigeria Style Account Menu */}
          <div 
            className="relative hidden md:block"
            onMouseEnter={() => setShowAccountDropdown(true)}
            onMouseLeave={() => setShowAccountDropdown(false)}
          >
            <button 
              onClick={() => {
                if (!user) openAuthModal('login');
                else setShowAccountDropdown(!showAccountDropdown);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-[#f0edec] text-[#00003c] font-semibold text-xs transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">person</span>
              <span>{user ? `Hi, ${user.name.split(' ')[0]}` : 'Account'}</span>
              <span className="material-symbols-outlined text-[16px]">expand_more</span>
            </button>

            {/* Dropdown Box */}
            {showAccountDropdown && (
              <div className="absolute right-0 top-full pt-1 w-64 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                <div className="bg-white rounded-xl shadow-xl border border-[#c6c5d5] overflow-hidden">
                  {!user ? (
                    <div className="p-4 bg-[#fcf9f8] border-b border-[#ebe7e7] text-center">
                      <button
                        onClick={() => { setShowAccountDropdown(false); openAuthModal('login'); }}
                        className="w-full py-2.5 bg-[#ffa504] hover:bg-[#e69500] text-[#00003c] font-bold rounded-lg text-xs tracking-wide uppercase transition-colors shadow-sm mb-2"
                      >
                        Sign In
                      </button>
                      <button
                        onClick={() => { setShowAccountDropdown(false); openAuthModal('signup'); }}
                        className="text-xs text-[#00003c] font-semibold hover:underline block w-full"
                      >
                        Create an Account
                      </button>
                    </div>
                  ) : (
                    <div className="p-4 bg-[#fcf9f8] border-b border-[#ebe7e7]">
                      <p className="font-bold text-sm text-[#00003c]">{user.name}</p>
                      <p className="text-xs text-[#767684] truncate font-mono">{user.email}</p>
                    </div>
                  )}

                  <div className="py-2 text-xs text-[#464653]">
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-[#f6f3f2] hover:text-[#00003c] transition-colors">
                      <span className="material-symbols-outlined text-lg">package_2</span>
                      Orders
                    </a>
                    <a href="#" className="flex items-center gap-3 px-4 py-2 hover:bg-[#f6f3f2] hover:text-[#00003c] transition-colors">
                      <span className="material-symbols-outlined text-lg">favorite</span>
                      Saved Items
                    </a>
                    {user && (
                      <button 
                        onClick={() => { setShowAccountDropdown(false); setShowChangePassModal(true); }}
                        className="w-full text-left flex items-center gap-3 px-4 py-2 hover:bg-[#f6f3f2] hover:text-[#00003c] transition-colors"
                      >
                        <span className="material-symbols-outlined text-lg">lock_reset</span>
                        Change Password
                      </button>
                    )}
                  </div>

                  {user && (
                    <div className="p-2 border-t border-[#ebe7e7] bg-[#fcf9f8]">
                      <button
                        onClick={() => { logout(); setShowAccountDropdown(false); }}
                        className="w-full py-2 text-center text-xs font-bold text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-base">logout</span>
                        LOGOUT
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative active:scale-95 transition-transform text-[#00003c] flex items-center p-1"
            title="View Cart"
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#ffa504] text-[10px] font-bold text-[#684100] rounded-full w-4 h-4 flex items-center justify-center shadow-sm">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Mobile Search Dropdown */}
      {showMobileSearch && (
        <div className="fixed top-16 left-0 w-full bg-[#fcf9f8] border-b border-[#c6c5d5] p-3 z-40 md:hidden animate-in slide-in-from-top-2">
          <div className="relative w-full">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#767684]">search</span>
            <input 
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search phones, laptops..." 
              className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg py-2 pl-10 pr-10 text-sm text-[#1c1b1b] outline-none"
              autoFocus
            />
            <button 
              onClick={() => setShowMobileSearch(false)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767684]"
            >
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Desktop Side Hint Nav - Stitch Design System */}
      <div className="hidden md:block fixed left-0 top-16 h-full w-16 bg-[#fcf9f8] border-r border-[#c6c5d5] z-40">
        <div className="flex flex-col items-center py-8 gap-8">
          <Link href="/" className={`${isHome ? 'text-[#855400]' : 'text-[#464653] hover:text-[#00003c]'} transition-colors`} title="Home">
            <span className={`material-symbols-outlined text-2xl ${isHome ? 'fill-icon' : ''}`}>home</span>
          </Link>
          <button 
            onClick={() => { if (onSelectCategory && isHome) onSelectCategory('Phones'); }}
            className="text-[#464653] hover:text-[#00003c] transition-colors" 
            title="Phones"
          >
            <span className="material-symbols-outlined text-2xl">smartphone</span>
          </button>
          <button 
            onClick={() => { if (onSelectCategory && isHome) onSelectCategory('Laptops'); }}
            className="text-[#464653] hover:text-[#00003c] transition-colors" 
            title="Laptops"
          >
            <span className="material-symbols-outlined text-2xl">laptop</span>
          </button>
          <button 
            onClick={() => { if (onSelectCategory && isHome) onSelectCategory('Audio'); }}
            className="text-[#464653] hover:text-[#00003c] transition-colors" 
            title="Audio"
          >
            <span className="material-symbols-outlined text-2xl">headphones</span>
          </button>
          <button 
            onClick={() => { if (!user) openAuthModal('login'); else setShowChangePassModal(true); }}
            className="text-[#464653] hover:text-[#00003c] transition-colors mt-auto mb-12" 
            title="Account Security"
          >
            <span className="material-symbols-outlined text-2xl">security</span>
          </button>
        </div>
      </div>

      {/* BottomNavBar (Mobile) - Stitch Design System */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 rounded-t-xl bg-[#fcf9f8]/95 backdrop-blur-md border-t border-[#c6c5d5] shadow-lg flex justify-around items-center h-16 px-4 pb-safe">
        <Link href="/" className={`flex flex-col items-center justify-center ${isHome ? 'text-[#855400] font-bold' : 'text-[#464653]'} active:scale-90 transition-transform`}>
          <span className={`material-symbols-outlined ${isHome ? 'fill-icon' : ''}`}>home</span>
          <span className="font-label text-[11px]">Home</span>
        </Link>
        <button 
          onClick={() => {
            if (isHome && onSelectCategory) onSelectCategory('Phones');
          }}
          className="flex flex-col items-center justify-center text-[#464653] active:scale-90 transition-transform"
        >
          <span className="material-symbols-outlined">category</span>
          <span className="font-label text-[11px]">Categories</span>
        </button>
        <button 
          onClick={() => setIsCartOpen(true)}
          className="flex flex-col items-center justify-center text-[#464653] active:scale-90 transition-transform relative"
        >
          <span className="material-symbols-outlined">shopping_cart</span>
          <span className="font-label text-[11px]">Cart</span>
          {totalItems > 0 && (
            <span className="absolute top-0 right-4 bg-[#ffa504] text-[9px] font-bold text-[#684100] rounded-full w-3.5 h-3.5 flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
        <button 
          onClick={() => {
            if (!user) openAuthModal('login');
            else setShowMobileAccountModal(true);
          }}
          className={`flex flex-col items-center justify-center ${user ? 'text-[#00003c] font-bold' : 'text-[#464653]'} active:scale-90 transition-transform`}
        >
          <span className={`material-symbols-outlined ${user ? 'fill-icon' : ''}`}>person</span>
          <span className="font-label text-[11px] truncate max-w-[60px]">{user ? user.name.split(' ')[0] : 'Account'}</span>
        </button>
      </nav>

      {/* Mobile Account Action Sheet */}
      {showMobileAccountModal && user && (
        <div className="fixed inset-0 z-50 bg-[#1c1b1b]/60 backdrop-blur-sm flex items-end md:hidden animate-in fade-in">
          <div className="bg-[#fcf9f8] w-full rounded-t-2xl p-6 border-t border-[#c6c5d5] space-y-4 animate-in slide-in-from-bottom">
            <div className="flex justify-between items-center border-b border-[#ebe7e7] pb-3">
              <div>
                <h3 className="font-bold text-base text-[#00003c]">{user.name}</h3>
                <p className="text-xs text-[#767684] font-mono">{user.email}</p>
              </div>
              <button onClick={() => setShowMobileAccountModal(false)} className="p-1 text-[#767684]">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="space-y-2 py-2">
              <a href="#" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#c6c5d5] text-sm text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[#855400]">package_2</span>
                My Orders
              </a>
              <a href="#" className="flex items-center gap-3 p-3 bg-white rounded-xl border border-[#c6c5d5] text-sm text-[#1c1b1b]">
                <span className="material-symbols-outlined text-[#D32F2F]">favorite</span>
                Saved Items
              </a>
              <button 
                onClick={() => { setShowMobileAccountModal(false); setShowChangePassModal(true); }}
                className="w-full flex items-center gap-3 p-3 bg-white rounded-xl border border-[#c6c5d5] text-sm text-[#1c1b1b]"
              >
                <span className="material-symbols-outlined text-[#00003c]">lock_reset</span>
                Change Password
              </button>
            </div>

            <button
              onClick={() => { logout(); setShowMobileAccountModal(false); }}
              className="w-full py-3 bg-[#D32F2F]/10 border border-[#D32F2F] text-[#D32F2F] font-bold rounded-xl text-sm flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined">logout</span>
              LOGOUT
            </button>
          </div>
        </div>
      )}

      {/* Jumia Nigeria Style Login / Signup Modal */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fcf9f8] rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-[#c6c5d5] relative animate-in zoom-in-95 duration-200">
            <button
              onClick={closeAuthModal}
              className="absolute top-4 right-4 p-2 rounded-full text-[#464653] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-6">
              <img 
                src="https://lh3.googleusercontent.com/aida/AP1WRLt9dUXw7EhLF1fIQDLhUefxkgX9lrFfWFPY7dhJCWcdw1cjVwp0ROgHvpATBq8iPnNM45lC0YgDHddTVNYNOMtgmSMzJQXahDx6s0hDuRJibH0oQ_39FWpv4USdqaaRd8jyKXmc1XG2pMSjQh2YjWFgyIORCf6z_4YgtMjNms85jfDWAonG9YquOuLiOULrYWiU4mQA9NY3p_h4ZyZ4ZbIN3h9WFz206e7ksRwxJA3RcJ828781k5BM0f8" 
                alt="FLEEKTECH" 
                className="h-8 w-auto mx-auto mb-2 object-contain" 
              />
              <h2 className="font-headline font-bold text-lg text-[#00003c]">
                {authModalMode === 'login' ? 'Welcome Back to FleekTech' : 'Create Your FleekTech Account'}
              </h2>
              <p className="text-xs text-[#767684]">
                {authModalMode === 'login' ? 'Log in to access your orders and saved items' : 'Join thousands of tech-forward shoppers across Nigeria'}
              </p>
            </div>

            {/* Mode Switcher Tabs (Jumia Style) */}
            <div className="grid grid-cols-2 bg-[#ebe7e7] p-1 rounded-xl mb-6 text-xs font-bold">
              <button
                type="button"
                onClick={() => { openAuthModal('login'); setAuthError(''); }}
                className={`py-2 rounded-lg transition-all ${authModalMode === 'login' ? 'bg-white text-[#00003c] shadow-sm' : 'text-[#464653]'}`}
              >
                LOG IN
              </button>
              <button
                type="button"
                onClick={() => { openAuthModal('signup'); setAuthError(''); }}
                className={`py-2 rounded-lg transition-all ${authModalMode === 'signup' ? 'bg-white text-[#00003c] shadow-sm' : 'text-[#464653]'}`}
              >
                CREATE ACCOUNT
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 bg-[#D32F2F]/10 border border-[#D32F2F] text-[#D32F2F] text-xs rounded-lg flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-base">error</span>
                {authError}
              </div>
            )}

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              {authModalMode === 'signup' && (
                <div>
                  <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={authName}
                    onChange={(e) => setAuthName(e.target.value)}
                    placeholder="e.g. Chinedu Okafor"
                    className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2.5 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={authEmail}
                  onChange={(e) => setAuthEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2.5 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Password</label>
                <input
                  type="password"
                  required
                  value={authPass}
                  onChange={(e) => setAuthPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2.5 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={authLoading}
                className="w-full py-3 bg-[#ffa504] hover:bg-[#e69500] text-[#00003c] font-bold rounded-xl text-sm tracking-wide uppercase transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 mt-6"
              >
                {authLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    Please wait...
                  </>
                ) : (
                  authModalMode === 'login' ? 'LOG IN' : 'CREATE ACCOUNT'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showChangePassModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fcf9f8] rounded-2xl max-w-md w-full p-6 md:p-8 shadow-2xl border border-[#c6c5d5] relative animate-in zoom-in-95 duration-200">
            <button
              onClick={() => { setShowChangePassModal(false); setPassError(''); setPassSuccess(''); }}
              className="absolute top-4 right-4 p-2 rounded-full text-[#464653] hover:bg-[#ebe7e7] transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <div className="text-center mb-6">
              <span className="material-symbols-outlined text-4xl text-[#00003c] mb-2">lock_reset</span>
              <h2 className="font-headline font-bold text-lg text-[#00003c]">Change Your Password</h2>
              <p className="text-xs text-[#767684]">Update the password for your account</p>
            </div>

            {passError && (
              <div className="mb-4 p-3 bg-[#D32F2F]/10 border border-[#D32F2F] text-[#D32F2F] text-xs rounded-lg flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-base">error</span>
                {passError}
              </div>
            )}

            {passSuccess && (
              <div className="mb-4 p-3 bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32] text-xs rounded-lg flex items-center gap-2 font-semibold">
                <span className="material-symbols-outlined text-base">check_circle</span>
                {passSuccess}
              </div>
            )}

            <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Current Password</label>
                <input
                  type="password"
                  required
                  value={oldPass}
                  onChange={(e) => setOldPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2 text-sm text-[#1c1b1b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">New Password</label>
                <input
                  type="password"
                  required
                  value={newPass}
                  onChange={(e) => setNewPass(e.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2 text-sm text-[#1c1b1b] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  required
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-white border border-[#c6c5d5] rounded-xl px-4 py-2 text-sm text-[#1c1b1b] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#00003c] hover:bg-[#000080] text-white font-bold rounded-xl text-sm tracking-wide uppercase transition-all shadow-md active:scale-95 mt-4"
              >
                UPDATE PASSWORD
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

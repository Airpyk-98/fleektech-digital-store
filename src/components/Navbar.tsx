'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCart } from '@/context/CartContext';

interface NavbarProps {
  onSearch?: (query: string) => void;
  onSelectCategory?: (category: string) => void;
}

export default function Navbar({ onSearch, onSelectCategory }: NavbarProps) {
  const { totalItems, setIsCartOpen } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const pathname = usePathname();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  const isHome = pathname === '/';

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

          <Link 
            href="/admin" 
            className="hidden md:flex items-center gap-1 px-3 py-1.5 rounded-lg border border-[#c6c5d5] bg-white text-[#00003c] font-semibold text-xs hover:border-[#00003c] transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">admin_panel_settings</span>
            Admin Portal
          </Link>

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
          <Link href="/admin" className={`${pathname === '/admin' ? 'text-[#855400]' : 'text-[#464653] hover:text-[#00003c]'} transition-colors mt-auto mb-12`} title="Admin Portal">
            <span className={`material-symbols-outlined text-2xl ${pathname === '/admin' ? 'fill-icon' : ''}`}>admin_panel_settings</span>
          </Link>
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
        <Link href="/admin" className={`flex flex-col items-center justify-center ${pathname === '/admin' ? 'text-[#855400] font-bold' : 'text-[#464653]'} active:scale-90 transition-transform`}>
          <span className={`material-symbols-outlined ${pathname === '/admin' ? 'fill-icon' : ''}`}>admin_panel_settings</span>
          <span className="font-label text-[11px]">Admin</span>
        </Link>
      </nav>
    </>
  );
}

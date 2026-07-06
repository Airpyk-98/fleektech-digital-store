'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/lib/CartContext';
import { ShoppingBag, ShieldAlert, Search, Menu, X, Sparkles, Smartphone, Headphones, Laptop, Watch, Zap } from 'lucide-react';

interface NavbarProps {
  onSearch?: (query: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSearch, selectedCategory = 'All', onSelectCategory }) => {
  const { totalItems, setIsCartOpen } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { name: 'All', icon: Sparkles },
    { name: 'Phones', icon: Smartphone },
    { name: 'Audio', icon: Headphones },
    { name: 'Laptops', icon: Laptop },
    { name: 'Wearables', icon: Watch },
    { name: 'Accessories', icon: Zap },
  ];

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleCategoryClick = (catName: string) => {
    if (onSelectCategory) onSelectCategory(catName);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/80 text-white transition-all">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 text-xs font-semibold text-center py-1.5 px-4 tracking-wide">
        ⚡ FLASH SALE: UP TO 30% OFF TITANIUM PHONES & PRO AUDIO • FREE EXPRESS DELIVERY WORLDWIDE ⚡
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="md:hidden p-2 text-zinc-400 hover:text-white rounded-lg focus:outline-none"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center font-extrabold text-xl text-black shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
                FT
              </div>
              <span className="font-extrabold text-xl sm:text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-400">
                FLEEK<span className="text-cyan-400">TECH</span>
              </span>
            </Link>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="hidden sm:flex flex-1 max-w-md relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search cyberpunk laptops, titanium phones, ANC audio..."
              className="w-full bg-zinc-900/90 border border-zinc-700/80 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all"
            />
            <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={18} />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Admin Dashboard Link */}
            <Link
              href="/admin"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/60 text-xs sm:text-sm font-semibold text-cyan-400 hover:text-cyan-300 transition-all shadow-sm"
            >
              <ShieldAlert size={16} className="text-cyan-400 animate-pulse" />
              <span className="hidden sm:inline">Admin Portal</span>
              <span className="sm:hidden">Admin</span>
            </Link>

            {/* Cart Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold hover:brightness-110 transition-all shadow-lg shadow-cyan-500/25 flex items-center justify-center"
              aria-label="Open Cart"
            >
              <ShoppingBag size={20} className="text-zinc-950" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-black font-extrabold text-[11px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-zinc-950 animate-bounce">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="sm:hidden pb-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search tech products..."
              className="w-full bg-zinc-900 border border-zinc-700 rounded-full py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={18} />
          </div>
        </div>

        {/* Category Navigation Bar (Desktop) */}
        {onSelectCategory && (
          <nav className="hidden md:flex items-center justify-center gap-2 py-2.5 border-t border-zinc-900 text-sm font-medium overflow-x-auto">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full transition-all whitespace-nowrap ${
                    isSelected
                      ? 'bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                  }`}
                >
                  <Icon size={16} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </nav>
        )}
      </div>

      {/* Mobile Navigation Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-zinc-950 border-b border-zinc-800 px-4 pt-2 pb-6 space-y-3 animate-fadeIn">
          <div className="font-semibold text-xs text-zinc-500 uppercase tracking-wider px-2">Categories</div>
          <div className="grid grid-cols-2 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  onClick={() => handleCategoryClick(cat.name)}
                  className={`flex items-center gap-2 p-3 rounded-xl text-left font-medium transition-all ${
                    isSelected
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-bold'
                      : 'bg-zinc-900/80 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Icon size={18} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>
          <div className="pt-2 border-t border-zinc-900">
            <Link
              href="/admin"
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full py-3 bg-zinc-900 hover:bg-zinc-800 rounded-xl text-cyan-400 font-bold text-sm"
            >
              <ShieldAlert size={18} />
              <span>Go to Admin Portal</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

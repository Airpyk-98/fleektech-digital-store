'use client';

import React, { useState, useEffect } from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { CartDrawer } from '@/components/CartDrawer';
import { CartProvider, useCart } from '@/lib/CartContext';
import { Product } from '@/lib/db';
import { ShoppingBag, Star, Sparkles, ShieldCheck, Zap, ArrowRight, Eye, X, Check, Flame, Award, Clock, Search } from 'lucide-react';

const StorefrontContent: React.FC = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Countdown timer for Flash Sale
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 53 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 4, minutes: 30, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch products:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.tagline?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-white selection:bg-cyan-500 selection:text-black">
      <Navbar
        onSearch={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-8 pb-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-zinc-900">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(6,182,212,0.15),rgba(255,255,255,0))] pointer-events-none" />
          
          <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-semibold text-xs tracking-wide">
                <Sparkles size={14} className="animate-spin" />
                <span>TECH-FORWARD ELECTRONICS VANGUARD</span>
              </div>

              <h1 className="font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-none">
                Engineered For <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-400">
                  The Next Frontier.
                </span>
              </h1>

              <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                Discover aerospace-grade titanium smartphones, studio-tuned beryllium acoustic headphones, and neural AI laptops built for creators who demand absolute perfection.
              </p>

              {/* Flash Sale Banner in Hero */}
              <div className="p-4 rounded-2xl bg-zinc-900/80 border border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto lg:mx-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                    <Flame size={22} />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Flash Sale Ends In</div>
                    <div className="text-sm font-semibold text-zinc-300">Up to $200 off selected Titanium gear</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 font-mono font-bold text-lg bg-zinc-950 px-3 py-1.5 rounded-xl border border-zinc-800 text-cyan-400">
                  <Clock size={16} className="text-zinc-500 mr-1" />
                  <span>{String(timeLeft.hours).padStart(2, '0')}</span>:
                  <span>{String(timeLeft.minutes).padStart(2, '0')}</span>:
                  <span>{String(timeLeft.seconds).padStart(2, '0')}</span>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => {
                    const el = document.getElementById('catalog');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm sm:text-base hover:brightness-110 shadow-xl shadow-cyan-500/25 transition-all flex items-center gap-2"
                >
                  <span>Shop The Catalog</span>
                  <ArrowRight size={18} />
                </button>
                <a
                  href="/admin"
                  className="px-6 py-4 rounded-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-700/80 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2"
                >
                  <ShieldCheck size={18} className="text-cyan-400" />
                  <span>Admin Portal</span>
                </a>
              </div>
            </div>

            {/* Hero Visual Mockup Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-3xl bg-gradient-to-b from-zinc-800 to-zinc-900 p-1 shadow-2xl shadow-cyan-500/10">
                <div className="rounded-[22px] bg-zinc-950 p-6 space-y-6 overflow-hidden relative">
                  <div className="absolute -right-10 -top-10 w-40 h-40 bg-cyan-500/20 rounded-full blur-3xl" />
                  
                  <div className="flex items-center justify-between">
                    <span className="px-3 py-1 rounded-full bg-cyan-500 text-black font-extrabold text-[11px] tracking-wider uppercase">
                      FEATURED DROP
                    </span>
                    <div className="flex items-center gap-1 text-amber-400 text-sm font-bold">
                      <Star size={16} className="fill-amber-400" />
                      <span>4.9</span>
                    </div>
                  </div>

                  <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800/80 relative group">
                    <img
                      src="https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80"
                      alt="Titan Pro"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="text-xs text-cyan-400 font-semibold uppercase tracking-wider">Smartphones • Titanium Series</div>
                    <h3 className="font-extrabold text-2xl text-white">FleekTech Titan Pro</h3>
                    <p className="text-xs text-zinc-400 line-clamp-2">
                      Aerospace-grade titanium casing with 200MP neural camera array and satellite emergency sync.
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                    <div>
                      <div className="text-xs text-zinc-500 line-through font-medium">$1,399</div>
                      <div className="text-2xl font-extrabold text-white">$1,199</div>
                    </div>
                    <button
                      onClick={() => {
                        const prod = products.find(p => p.id === 'prod-1') || {
                          id: 'prod-1',
                          name: 'FleekTech Titan Pro Phone',
                          tagline: 'Next-Gen AI & Titanium Build',
                          price: 1199,
                          category: 'Phones',
                          image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
                          rating: 4.9,
                          reviewsCount: 328,
                          stock: 45,
                          isListed: true,
                          description: 'Aerospace titanium phone.',
                          specs: {}
                        };
                        addToCart(prod);
                      }}
                      className="px-5 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-sm transition-all shadow-lg shadow-cyan-500/20 flex items-center gap-2"
                    >
                      <ShoppingBag size={18} />
                      <span>Add To Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Catalog Section */}
        <section id="catalog" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-zinc-900 pb-6">
            <div>
              <div className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-1">Our Catalog</div>
              <h2 className="font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
                {selectedCategory === 'All' ? 'All Tech Equipment' : `${selectedCategory} Collection`}
              </h2>
            </div>
            <div className="text-xs text-zinc-500 font-medium">
              Showing <span className="text-cyan-400 font-bold">{filteredProducts.length}</span> listed products
            </div>
          </div>

          {/* Product Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-12">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-zinc-900/60 rounded-3xl h-96 animate-pulse border border-zinc-800/60 p-6 flex flex-col justify-between">
                  <div className="w-full h-48 bg-zinc-800 rounded-2xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-zinc-800 rounded w-1/3" />
                    <div className="h-6 bg-zinc-800 rounded w-3/4" />
                    <div className="h-4 bg-zinc-800 rounded w-full" />
                  </div>
                  <div className="h-10 bg-zinc-800 rounded-xl w-full mt-4" />
                </div>
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-24 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 rounded-full bg-zinc-900 flex items-center justify-center text-zinc-600 mx-auto">
                <Search size={32} />
              </div>
              <h3 className="font-bold text-xl text-white">No products found</h3>
              <p className="text-sm text-zinc-500">
                We couldn't find any items matching "{searchQuery}" in {selectedCategory}. Try adjusting your search query or check back later!
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="px-6 py-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-bold text-xs"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="group bg-zinc-900/80 hover:bg-zinc-900 border border-zinc-800/80 hover:border-cyan-500/40 rounded-3xl p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/10 relative overflow-hidden"
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between z-10 mb-3">
                    {product.badge ? (
                      <span className={`px-2.5 py-0.5 rounded-full font-extrabold text-[10px] tracking-wider uppercase ${
                        product.badge === 'NEW' ? 'bg-cyan-500 text-black' :
                        product.badge === 'HOT' ? 'bg-amber-500 text-black' :
                        product.badge === 'SALE' ? 'bg-red-500 text-white' :
                        'bg-blue-600 text-white'
                      }`}>
                        {product.badge}
                      </span>
                    ) : <span />}
                    <div className="flex items-center gap-1 text-amber-400 text-xs font-bold bg-zinc-950/80 px-2 py-1 rounded-lg border border-zinc-800">
                      <Star size={13} className="fill-amber-400" />
                      <span>{product.rating}</span>
                      <span className="text-zinc-600">({product.reviewsCount})</span>
                    </div>
                  </div>

                  {/* Product Image */}
                  <div
                    onClick={() => setSelectedProduct(product)}
                    className="aspect-square rounded-2xl overflow-hidden bg-zinc-950 border border-zinc-800/60 relative cursor-pointer mb-4 group-hover:border-zinc-700 transition-all"
                  >
                    <img
                      src={product.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80'}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="px-3 py-1.5 rounded-full bg-white/90 text-black font-bold text-xs flex items-center gap-1 shadow-lg">
                        <Eye size={14} /> Quick View
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-1.5 flex-1 mb-4">
                    <div className="text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">{product.category}</div>
                    <h3 
                      onClick={() => setSelectedProduct(product)}
                      className="font-extrabold text-base text-white group-hover:text-cyan-300 transition-colors cursor-pointer line-clamp-1"
                    >
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 leading-relaxed">
                      {product.tagline || product.description}
                    </p>
                  </div>

                  {/* Price & Action */}
                  <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between gap-2">
                    <div>
                      {product.originalPrice && (
                        <div className="text-[11px] text-zinc-500 line-through font-medium">
                          ${product.originalPrice.toLocaleString()}
                        </div>
                      )}
                      <div className="text-lg font-extrabold text-white">
                        ${product.price.toLocaleString()}
                      </div>
                    </div>
                    <button
                      onClick={() => addToCart(product)}
                      className="px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-black text-white font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm active:scale-95"
                    >
                      <ShoppingBag size={15} />
                      <span>Add</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Quick View Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 md:p-8 space-y-6 relative shadow-2xl animate-scaleUp">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 rounded-full bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-all"
            >
              <X size={20} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
              <div className="aspect-square rounded-2xl overflow-hidden bg-zinc-900 border border-zinc-800">
                <img
                  src={selectedProduct.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=800&q=80'}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider">{selectedProduct.category}</div>
                  <h3 className="font-extrabold text-2xl text-white">{selectedProduct.name}</h3>
                  <div className="flex items-center gap-2 pt-1">
                    <div className="flex items-center gap-1 text-amber-400 font-bold text-sm">
                      <Star size={16} className="fill-amber-400" />
                      <span>{selectedProduct.rating}</span>
                    </div>
                    <span className="text-zinc-600">•</span>
                    <span className="text-xs text-zinc-400">{selectedProduct.reviewsCount} verified reviews</span>
                  </div>
                </div>

                <div className="text-2xl font-extrabold text-white">
                  ${selectedProduct.price.toLocaleString()}
                  {selectedProduct.originalPrice && (
                    <span className="text-sm text-zinc-500 line-through ml-2 font-medium">
                      ${selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed">
                  {selectedProduct.description}
                </p>

                {/* Specs */}
                {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                  <div className="space-y-2 pt-2 border-t border-zinc-900">
                    <div className="text-xs font-bold text-zinc-400 uppercase tracking-wider">Specifications</div>
                    <div className="grid grid-cols-1 gap-1.5 text-xs">
                      {Object.entries(selectedProduct.specs).map(([k, v]) => (
                        <div key={k} className="flex justify-between py-1 border-b border-zinc-900/60">
                          <span className="text-zinc-500 font-medium">{k}:</span>
                          <span className="text-zinc-200 font-semibold text-right">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex gap-3">
                  <button
                    onClick={() => {
                      addToCart(selectedProduct);
                      setSelectedProduct(null);
                    }}
                    className="flex-1 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                  >
                    <ShoppingBag size={18} />
                    <span>Add To Bag</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default function Home() {
  return (
    <CartProvider>
      <StorefrontContent />
    </CartProvider>
  );
}

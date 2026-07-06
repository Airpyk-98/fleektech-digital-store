'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import { useCart } from '@/context/CartContext';
import { Product } from '@/lib/db';

const CATEGORIES = [
  { name: 'All', icon: 'grid_view' },
  { name: 'Phones', icon: 'smartphone' },
  { name: 'Laptops', icon: 'laptop' },
  { name: 'Audio', icon: 'headphones' },
  { name: 'Gaming', icon: 'sports_esports' },
  { name: 'Wearables', icon: 'watch' },
  { name: 'Cameras', icon: 'camera' },
];

const BRAND_FILTERS = ['All Brands', 'Apple', 'Samsung', 'Google', 'Xiaomi', 'Sony', 'Dell', 'Nintendo'];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high'>('popularity');
  const [wishlist, setWishlist] = useState<Record<string, boolean>>({});
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 36, seconds: 9 });

  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  // Countdown timer for Flash Sales
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev;
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
          if (minutes < 0) {
            minutes = 59;
            hours--;
            if (hours < 0) hours = 23;
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Filter and sort products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesBrand = selectedBrand === 'All Brands' || p.brand?.toLowerCase() === selectedBrand.toLowerCase() || p.name.toLowerCase().includes(selectedBrand.toLowerCase());
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.tagline.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesBrand && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return b.rating - a.rating; // popularity / rating
  });

  const flashSaleProducts = products.filter((p) => p.badge || p.originalPrice).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8]">
      <Navbar onSearch={setSearchQuery} onSelectCategory={setSelectedCategory} />
      <CartDrawer />

      {/* Main Storefront Canvas */}
      <main className="flex-1 pt-16 pb-24 md:pl-16">
        {/* Hero Banner - Stitch UI Guide */}
        {selectedCategory === 'All' && !searchQuery && (
          <section className="p-4 md:p-8 max-w-7xl mx-auto">
            <div className="relative overflow-hidden rounded-2xl h-[360px] md:h-[480px] bg-[#00003c] group shadow-xl">
              <div
                className="absolute inset-0 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                style={{
                  backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuByA-fKAQ1AR69YF5A3rbd1J-QOecf2m_0e4VOmixxx8kKFTS4f0tthv7TSbX4N3KqjBN40NWBzP20Yfiw2SpB-rSDta9iOLGiaHG45_s7Txo4YqawpSdynCnrIwtAfQIgvoAJJq5RTCisgDodlNy2D5NYGdkQIN-wP-oLoACVKgLYUe0Ya87b5MAwRamX8zjzSMK6guRwb2btgFJHLFvc0vh9ul6hxUZeEDp88K-MnLK-VSVqdY38T')`,
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#00003c]/95 via-[#00003c]/60 to-transparent z-10 flex flex-col justify-center p-6 md:p-14">
                <span className="text-[#ffa504] font-label tracking-widest uppercase mb-2 text-xs md:text-sm font-bold">
                  New Arrival
                </span>
                <h1 className="font-display text-white text-3xl md:text-5xl lg:text-6xl font-bold max-w-lg mb-4 leading-tight">
                  iPhone 15 Pro &amp; MacBook M3
                </h1>
                <p className="text-[#777eea] font-body text-sm md:text-lg mb-8 max-w-md">
                  Experience the pinnacle of performance with exclusive launch deals up to 15% off.
                </p>
                <div>
                  <button
                    onClick={() => setSelectedCategory('Phones')}
                    className="bg-[#ffa504] text-[#684100] font-headline font-bold px-8 py-3.5 rounded-xl hover:opacity-90 transition-all active:scale-95 shadow-lg"
                  >
                    Shop Now
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Categories Horizontal Scroll - Stitch UI Guide */}
        <section className="py-6 max-w-7xl mx-auto overflow-hidden">
          <div className="px-4 md:px-8 mb-4 flex justify-between items-center">
            <h2 className="font-headline font-bold text-xl md:text-2xl text-[#00003c]">Browse Categories</h2>
            {selectedCategory !== 'All' && (
              <button
                onClick={() => setSelectedCategory('All')}
                className="text-[#855400] font-label text-sm font-semibold hover:underline"
              >
                View All Categories
              </button>
            )}
          </div>
          <div className="flex gap-4 md:gap-6 overflow-x-auto px-4 md:px-8 hide-scrollbar snap-x py-2">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className="flex flex-col items-center gap-2 snap-start min-w-[80px] cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center border transition-all ${
                    selectedCategory === cat.name
                      ? 'bg-[#00003c] border-[#ffa504] text-white shadow-md scale-105'
                      : 'bg-[#ebe7e7] border-[#c6c5d5] text-[#00003c] group-hover:border-[#855400] group-hover:bg-white'
                  }`}
                >
                  <span className="material-symbols-outlined text-3xl">{cat.icon}</span>
                </div>
                <span
                  className={`font-label text-xs ${
                    selectedCategory === cat.name ? 'text-[#00003c] font-bold' : 'text-[#464653]'
                  }`}
                >
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Flash Sales Section - Stitch UI Guide */}
        {selectedCategory === 'All' && !searchQuery && flashSaleProducts.length > 0 && (
          <section className="bg-[#000080]/10 py-10 my-6 max-w-7xl mx-auto rounded-none md:rounded-2xl">
            <div className="px-4 md:px-8 mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#ffa504] text-3xl fill-icon">bolt</span>
                <h2 className="font-headline font-bold text-xl md:text-2xl text-[#00003c]">Flash Sales</h2>
                <div className="flex items-center gap-1.5 ml-2" id="flash-sale-timer">
                  <div className="bg-[#00003c] text-white font-bold px-2.5 py-1 rounded text-sm shadow">
                    {String(timeLeft.hours).padStart(2, '0')}
                  </div>
                  <span className="text-[#00003c] font-bold">:</span>
                  <div className="bg-[#00003c] text-white font-bold px-2.5 py-1 rounded text-sm shadow">
                    {String(timeLeft.minutes).padStart(2, '0')}
                  </div>
                  <span className="text-[#00003c] font-bold">:</span>
                  <div className="bg-[#00003c] text-white font-bold px-2.5 py-1 rounded text-sm shadow">
                    {String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedCategory('Phones')}
                className="text-[#00003c] font-bold text-sm hover:underline"
              >
                See All Deals &rarr;
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 px-4 md:px-8">
              {flashSaleProducts.map((product) => (
                <div
                  key={`flash-${product.id}`}
                  onClick={() => setSelectedProduct(product)}
                  className="bg-white border border-[#c6c5d5] rounded-xl overflow-hidden flex flex-col group hover:shadow-xl transition-all cursor-pointer"
                >
                  <div className="relative aspect-square bg-[#fcf9f8] p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                    {product.badge && (
                      <div className="absolute top-2 left-2 bg-[#D32F2F] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm shadow">
                        {product.badge}
                      </div>
                    )}
                    <button
                      onClick={(e) => toggleWishlist(product.id, e)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-[#00003c] hover:text-[#D32F2F] transition-colors"
                    >
                      <span className={`material-symbols-outlined text-lg ${wishlist[product.id] ? 'fill-icon text-[#D32F2F]' : ''}`}>
                        favorite
                      </span>
                    </button>
                  </div>
                  <div className="p-3.5 flex flex-col flex-1 justify-between">
                    <div>
                      <span className="font-label text-[10px] text-[#464653] uppercase font-semibold">
                        {product.brand || 'FleekTech'}
                      </span>
                      <h3 className="font-body font-semibold text-sm text-[#1c1b1b] line-clamp-2 mt-0.5 mb-2 group-hover:text-[#00003c]">
                        {product.name}
                      </h3>
                    </div>
                    <div>
                      <div className="flex items-baseline gap-2 mb-3">
                        <span className="font-price font-bold text-base text-[#B87F00]">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="text-xs text-[#767684] line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="w-full py-2 border border-[#00003c] text-[#00003c] font-bold rounded-lg hover:bg-[#00003c] hover:text-white transition-colors text-xs flex items-center justify-center gap-1.5"
                      >
                        <span className="material-symbols-outlined text-[16px]">add_shopping_cart</span>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category Header & Controls - Stitch UI Guide */}
        <section className="px-4 md:px-8 mb-6 max-w-7xl mx-auto mt-8">
          <div className="flex justify-between items-end mb-4">
            <div>
              <nav className="text-[#464653] font-label text-xs mb-1">
                Home / Categories / <span className="text-[#00003c] font-bold">{selectedCategory}</span>
              </nav>
              <h2 className="font-headline font-bold text-2xl md:text-3xl text-[#00003c]">
                {selectedCategory === 'All' ? 'Full Catalog' : selectedCategory}
              </h2>
            </div>
            <div className="text-[#464653] font-body text-xs md:text-sm font-semibold">
              {sortedProducts.length} {sortedProducts.length === 1 ? 'Product' : 'Products'} Found
            </div>
          </div>

          {/* Filter / Sort / Brand Pills */}
          <div className="flex gap-2.5 overflow-x-auto hide-scrollbar py-2 items-center">
            <div className="flex items-center gap-1 bg-white border border-[#c6c5d5] rounded-lg px-3 py-1.5 font-label text-xs text-[#00003c]">
              <span className="material-symbols-outlined text-[16px]">tune</span>
              <span>Filter:</span>
            </div>

            <button
              onClick={() => {
                const nextSort =
                  sortBy === 'popularity'
                    ? 'price-low'
                    : sortBy === 'price-low'
                    ? 'price-high'
                    : 'popularity';
                setSortBy(nextSort);
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#c6c5d5] rounded-lg font-label text-xs text-[#00003c] whitespace-nowrap active:scale-95 hover:border-[#00003c] transition-all"
            >
              <span className="material-symbols-outlined text-[16px]">swap_vert</span>
              <span>
                Sort by:{' '}
                {sortBy === 'popularity'
                  ? 'Popularity'
                  : sortBy === 'price-low'
                  ? 'Price: Low to High'
                  : 'Price: High to Low'}
              </span>
            </button>

            <div className="h-6 w-[1px] bg-[#c6c5d5] mx-1"></div>

            {BRAND_FILTERS.map((brand) => (
              <button
                key={brand}
                onClick={() => setSelectedBrand(brand)}
                className={`px-3.5 py-1.5 rounded-lg font-label text-xs whitespace-nowrap transition-all ${
                  selectedBrand === brand
                    ? 'bg-[#ffa504] text-[#684100] font-bold shadow-sm'
                    : 'bg-white border border-[#c6c5d5] text-[#464653] hover:border-[#00003c]'
                }`}
              >
                {brand}
              </button>
            ))}
          </div>
        </section>

        {/* Product Grid - Stitch UI Guide (2-column mobile, 4-column tablet, 6-column desktop) */}
        <section className="px-4 md:px-8 max-w-7xl mx-auto">
          {loading ? (
            <div className="py-24 flex flex-col items-center justify-center gap-3">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#00003c]">progress_activity</span>
              <p className="text-sm text-[#464653] font-semibold">Loading FleekTech catalog from Neon PostgreSQL...</p>
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="py-20 text-center bg-white rounded-2xl border border-[#c6c5d5] p-8 max-w-lg mx-auto my-8">
              <span className="material-symbols-outlined text-5xl text-[#c6c5d5] mb-2">search_off</span>
              <h3 className="font-headline font-bold text-lg text-[#00003c]">No products found</h3>
              <p className="text-xs text-[#464653] mt-1 mb-4">
                We couldn&apos;t find any items matching your filter or search criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedBrand('All Brands');
                  setSearchQuery('');
                }}
                className="bg-[#00003c] text-white px-5 py-2 rounded-lg text-xs font-bold hover:opacity-90 transition-all"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4 xl:grid-cols-4">
              {sortedProducts.map((product) => (
                <div
                  key={product.id}
                  onClick={() => setSelectedProduct(product)}
                  className="group relative flex flex-col bg-white border border-[#c6c5d5] rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {product.badge && (
                    <div className="absolute top-2 left-2 z-10 px-2.5 py-0.5 bg-[#ffa504] text-[#684100] font-label text-[10px] rounded-sm uppercase tracking-wider font-bold shadow">
                      {product.badge}
                    </div>
                  )}
                  <button
                    onClick={(e) => toggleWishlist(product.id, e)}
                    className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/90 shadow flex items-center justify-center text-[#464653] hover:text-[#D32F2F] transition-colors"
                  >
                    <span className={`material-symbols-outlined text-[18px] ${wishlist[product.id] ? 'fill-icon text-[#D32F2F]' : ''}`}>
                      favorite
                    </span>
                  </button>
                  <div className="aspect-square bg-[#fcf9f8] flex items-center justify-center p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-3.5 flex flex-col flex-grow justify-between">
                    <div>
                      <span className="font-label text-[11px] text-[#464653] uppercase font-semibold">
                        {product.brand || 'FleekTech'}
                      </span>
                      <h3 className="font-body font-semibold text-sm text-[#00003c] line-clamp-2 min-h-[40px] mt-0.5 mb-1.5 group-hover:underline">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-1 mb-3">
                        <div className="flex text-[#B87F00]">
                          <span className="material-symbols-outlined text-[14px] fill-icon">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-icon">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-icon">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-icon">star</span>
                          <span className="material-symbols-outlined text-[14px] fill-icon">
                            {product.rating >= 4.9 ? 'star' : 'star_half'}
                          </span>
                        </div>
                        <span className="font-body text-[11px] text-[#464653]">({product.reviewsCount})</span>
                      </div>
                    </div>
                    <div className="mt-auto flex justify-between items-center pt-2.5 border-t border-[#f0edec]">
                      <div>
                        <span className="font-price font-bold text-base md:text-lg text-[#00003c]">
                          ₦{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice && (
                          <span className="block text-[11px] text-[#767684] line-through">
                            ₦{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          addToCart(product);
                        }}
                        className="h-9 w-9 bg-[#00003c] hover:bg-[#000080] rounded-full flex items-center justify-center text-white active:scale-90 transition-transform shadow"
                        title="Add to cart"
                      >
                        <span className="material-symbols-outlined text-[18px]">shopping_cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Top Brands Section - Stitch UI Guide */}
        <section className="py-12 max-w-7xl mx-auto px-4 md:px-8 mt-8">
          <div className="mb-6">
            <h2 className="font-headline font-bold text-xl md:text-2xl text-[#00003c]">Top Brands</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div
              onClick={() => setSelectedBrand('Apple')}
              className="aspect-[3/2] bg-white border border-[#c6c5d5] rounded-xl flex items-center justify-center p-6 hover:shadow-md hover:border-[#00003c] transition-all cursor-pointer group"
            >
              <img
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBS_flJQPe1My6SNxJC7cRepex8nodErJp4nV5O8K-045PY1Tu54AU6bcNna8gwOx9pBwS3sazwbpvWWUFCb6XYsymqPAGhiZOoenbJBQiJ9G0c_5p7Okfc2Sa9qsK51i7ba8y-zn-2LcVe6uQPKZltjstcbeNdGwZimXIQYJPVk11S9TjTRId_iF6VFor5-Ml6Bz08M1vd1TsFZxWx43Y6IKYxeGCDeKkV9T2F9NQfjWRXNtMt8dOU"
                alt="Apple"
              />
            </div>
            <div
              onClick={() => setSelectedBrand('Samsung')}
              className="aspect-[3/2] bg-white border border-[#c6c5d5] rounded-xl flex items-center justify-center p-6 hover:shadow-md hover:border-[#00003c] transition-all cursor-pointer group"
            >
              <img
                className="h-8 w-auto object-contain group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC6k2-uvAjzen4269mb5yZGu08Ivfspl-7WM04IGd_Q7cn_tcNzQdHvIBBKhVdLDEKFDMys2PfzjOIOe1nN84g_zsbajlVdHIBJ8ToqkjhgyIM_IrW_qGP2FPqik_5YrWbIsQwYnYnnt2KV_BqcYEM322DIW4C4R-G84x20z77c-QFkZZRfD4ALzs0YDLO1ZCc-I2pNCB8rMEwSU8S8eNxfYQ6I-2j2auD9Q4r6IQg9jN6zspSEbOt-"
                alt="Samsung"
              />
            </div>
            <div
              onClick={() => setSelectedBrand('Dell')}
              className="aspect-[3/2] bg-white border border-[#c6c5d5] rounded-xl flex items-center justify-center p-6 hover:shadow-md hover:border-[#00003c] transition-all cursor-pointer group"
            >
              <img
                className="h-10 w-auto object-contain group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDL8-HXg-pcCyc94XNcduuptqwjHW6VFEDfAd9CEmmjN98UEtW1tMmVzwcmcLJfw9jp7Ry3ylFqqaxGklgJP18OZ5gknYZxPN2aBKXNrJyiRNl6-5tQebNYZ-tP4RQ4kN98O4aEhId7hSLhcg3_iaUDGFZF7vBLoB1ndiKz9O3lPXbf7Q1wS9CTuGIArH9pgv0-dm7dRnpBvQ2VjiazqaKbs9qyncMNJc8WTDhp4SvcY7ckSytYBuah"
                alt="Dell"
              />
            </div>
            <div
              onClick={() => setSelectedBrand('All Brands')}
              className="aspect-[3/2] bg-white border border-[#c6c5d5] rounded-xl flex items-center justify-center p-6 hover:shadow-md hover:border-[#00003c] transition-all cursor-pointer group"
            >
              <img
                className="h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCTzsmomKNyE5lbFEZgNT3A5qL3QDX9MUOyedo1So5A9uhqli7mWvgnIw2cxOKxFlTR2Y867WSsCcmvU7p-097gxzDsykdsP7t_PwXIl6wH9zIpGdaSW_1p_GtM1jJoGGLcOBaVnRF4Dshym_QS-RQPlZo3_ESvODRoxjPFQiZDDz7KVQZUxpgXkz3Qd1o2FONtIv4FiApCuqfxpoxjkBzDpngHEQSSC0sxSDetK1dNJzMQSEYCgaOT"
                alt="HP"
              />
            </div>
          </div>
        </section>
      </main>

      {/* Product Detail Modal - Stitch UI Guide Screen 5 */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fcf9f8] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c6c5d5] flex flex-col md:flex-row relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/80 text-[#1c1b1b] hover:bg-[#ebe7e7] transition-colors shadow"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            {/* Product Image */}
            <div className="md:w-1/2 bg-white p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#c6c5d5] relative min-h-[300px]">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-full h-auto max-h-[350px] object-contain mix-blend-multiply"
              />
              {selectedProduct.badge && (
                <div className="absolute top-4 left-4 bg-[#ffa504] text-[#684100] font-bold px-3 py-1 rounded-md text-xs shadow">
                  {selectedProduct.badge}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between space-y-6">
              <div>
                <div className="flex items-center justify-between text-xs text-[#464653] font-semibold uppercase mb-1">
                  <span>{selectedProduct.brand || 'FleekTech'} &bull; {selectedProduct.category}</span>
                  <span className="text-[#2E7D32] font-bold">In Stock ({selectedProduct.stock})</span>
                </div>
                <h2 className="font-headline font-bold text-2xl text-[#00003c] mb-2">{selectedProduct.name}</h2>
                <p className="text-sm text-[#464653] mb-4">{selectedProduct.tagline}</p>

                <div className="flex items-center gap-2 mb-4 bg-[#f0edec] p-2.5 rounded-lg w-fit">
                  <div className="flex text-[#B87F00]">
                    <span className="material-symbols-outlined text-[18px] fill-icon">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-icon">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-icon">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-icon">star</span>
                    <span className="material-symbols-outlined text-[18px] fill-icon">star</span>
                  </div>
                  <span className="text-xs font-bold text-[#00003c]">{selectedProduct.rating} / 5.0</span>
                  <span className="text-xs text-[#767684]">({selectedProduct.reviewsCount} verified reviews)</span>
                </div>

                <div className="flex items-baseline gap-3 mb-6">
                  <span className="font-price font-bold text-3xl text-[#00003c]">
                    ₦{selectedProduct.price.toLocaleString()}
                  </span>
                  {selectedProduct.originalPrice && (
                    <span className="text-base text-[#767684] line-through">
                      ₦{selectedProduct.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>

                <div className="space-y-4 text-xs text-[#464653] border-t border-[#ebe7e7] pt-4">
                  <p className="leading-relaxed">{selectedProduct.description}</p>

                  {selectedProduct.features && selectedProduct.features.length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#00003c] mb-1.5 uppercase tracking-wider text-[11px]">Key Highlights:</h4>
                      <ul className="grid grid-cols-1 gap-1 pl-4 list-disc">
                        {selectedProduct.features.map((f, i) => (
                          <li key={i} className="text-[#1c1b1b] font-medium">{f}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 && (
                    <div>
                      <h4 className="font-bold text-[#00003c] mb-1.5 uppercase tracking-wider text-[11px]">Technical Specifications:</h4>
                      <div className="grid grid-cols-2 gap-2 bg-[#f0edec] p-3 rounded-lg">
                        {Object.entries(selectedProduct.specs).map(([k, v]) => (
                          <div key={k}>
                            <span className="text-[#767684] block">{k}:</span>
                            <span className="font-semibold text-[#00003c] block">{v}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ebe7e7] flex gap-3">
                <button
                  onClick={() => {
                    addToCart(selectedProduct);
                    setSelectedProduct(null);
                  }}
                  className="flex-1 bg-[#00003c] hover:bg-[#000080] text-white font-headline font-bold py-3.5 rounded-xl transition-all active:scale-95 shadow-md flex items-center justify-center gap-2 text-sm"
                >
                  <span className="material-symbols-outlined">add_shopping_cart</span>
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(selectedProduct.id)}
                  className="px-4 border border-[#c6c5d5] rounded-xl hover:border-[#00003c] flex items-center justify-center transition-colors"
                  title="Save to Wishlist"
                >
                  <span className={`material-symbols-outlined ${wishlist[selectedProduct.id] ? 'fill-icon text-[#D32F2F]' : 'text-[#464653]'}`}>
                    favorite
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product } from '@/lib/db';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formTagline, setFormTagline] = useState('');
  const [formPrice, setFormPrice] = useState('');
  const [formOriginalPrice, setFormOriginalPrice] = useState('');
  const [formCategory, setFormCategory] = useState('Phones');
  const [formBrand, setFormBrand] = useState('FleekTech');
  const [formImage, setFormImage] = useState('');
  const [formBadge, setFormBadge] = useState('');
  const [formStock, setFormStock] = useState('50');
  const [formRating, setFormRating] = useState('4.8');
  const [formReviewsCount, setFormReviewsCount] = useState('100');
  const [formDescription, setFormDescription] = useState('');
  const [formSpecs, setFormSpecs] = useState('{\n  "Display": "6.8 inch",\n  "Processor": "AI Neural Chip"\n}');
  const [formFeatures, setFormFeatures] = useState('Titanium Build, Fast Charging, AI Processor');

  useEffect(() => {
    fetchProducts();
  }, []);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/products?all=true');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Error fetching admin products:', err);
      showStatus('Failed to load products from database.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleList = async (product: Product) => {
    try {
      const updatedStatus = !product.isListed;
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isListed: updatedStatus }),
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map((p) => (p.id === product.id ? updated : p)));
        showStatus(`Product "${product.name}" is now ${updatedStatus ? 'LISTED (Visible)' : 'DELISTED (Hidden)'}.`);
      } else {
        showStatus('Failed to update listing status.', 'error');
      }
    } catch (err) {
      console.error('Error toggling list status:', err);
      showStatus('Error communicating with server.', 'error');
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setProducts(products.filter((p) => p.id !== id));
        showStatus(`Product "${name}" deleted permanently.`);
      } else {
        showStatus('Failed to delete product.', 'error');
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      showStatus('Error communicating with server.', 'error');
    }
  };

  const openCreateModal = () => {
    setIsCreating(true);
    setEditingProduct(null);
    setFormName('');
    setFormTagline('');
    setFormPrice('500000');
    setFormOriginalPrice('');
    setFormCategory('Phones');
    setFormBrand('FleekTech');
    setFormImage('https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=600&auto=format&fit=crop&q=80');
    setFormBadge('New');
    setFormStock('50');
    setFormRating('5.0');
    setFormReviewsCount('1');
    setFormDescription('Cutting-edge electronics engineered for top tier performance.');
    setFormSpecs('{\n  "Warranty": "2 Years Titanium Care",\n  "Connectivity": "5G & Wi-Fi 7"\n}');
    setFormFeatures('Aerospace Titanium, Neural AI Chip, Studio Fidelity Audio');
  };

  const openEditModal = (product: Product) => {
    setIsCreating(false);
    setEditingProduct(product);
    setFormName(product.name);
    setFormTagline(product.tagline);
    setFormPrice(product.price.toString());
    setFormOriginalPrice(product.originalPrice ? product.originalPrice.toString() : '');
    setFormCategory(product.category);
    setFormBrand(product.brand || 'FleekTech');
    setFormImage(product.image);
    setFormBadge(product.badge || '');
    setFormStock(product.stock.toString());
    setFormRating(product.rating.toString());
    setFormReviewsCount(product.reviewsCount.toString());
    setFormDescription(product.description);
    setFormSpecs(JSON.stringify(product.specs || {}, null, 2));
    setFormFeatures((product.features || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let parsedSpecs = {};
      try {
        parsedSpecs = JSON.parse(formSpecs);
      } catch (e) {
        showStatus('Invalid JSON format in Specifications field.', 'error');
        return;
      }

      const parsedFeatures = formFeatures.split(',').map((f) => f.trim()).filter(Boolean);

      const payload = {
        name: formName,
        tagline: formTagline,
        price: parseFloat(formPrice) || 0,
        originalPrice: formOriginalPrice ? parseFloat(formOriginalPrice) : undefined,
        category: formCategory,
        brand: formBrand,
        image: formImage,
        badge: formBadge,
        stock: parseInt(formStock, 10) || 0,
        rating: parseFloat(formRating) || 5.0,
        reviewsCount: parseInt(formReviewsCount, 10) || 1,
        description: formDescription,
        specs: parsedSpecs,
        features: parsedFeatures,
        isListed: editingProduct ? editingProduct.isListed : true,
      };

      if (isCreating) {
        const res = await fetch('/api/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setProducts([created, ...products]);
          showStatus(`Product "${created.name}" created successfully!`);
          setIsCreating(false);
        } else {
          showStatus('Failed to create product.', 'error');
        }
      } else if (editingProduct) {
        const res = await fetch(`/api/products/${editingProduct.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
          showStatus(`Product "${updated.name}" updated successfully!`);
          setEditingProduct(null);
        } else {
          showStatus('Failed to update product.', 'error');
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      showStatus('Error communicating with server.', 'error');
    }
  };

  const filteredProducts = products.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalValue = products.reduce((acc, p) => acc + p.price * p.stock, 0);
  const listedCount = products.filter((p) => p.isListed).length;
  const delistedCount = products.filter((p) => !p.isListed).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcf9f8]">
      <Navbar />

      <main className="flex-1 pt-24 pb-24 px-4 md:px-12 max-w-7xl mx-auto w-full">
        {/* Status Notification Banner */}
        {statusMessage && (
          <div
            className={`mb-6 p-4 rounded-xl flex items-center justify-between shadow-md animate-in fade-in ${
              statusMessage.type === 'success'
                ? 'bg-[#2E7D32]/10 border border-[#2E7D32] text-[#2E7D32]'
                : 'bg-[#D32F2F]/10 border border-[#D32F2F] text-[#D32F2F]'
            }`}
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">
                {statusMessage.type === 'success' ? 'check_circle' : 'error'}
              </span>
              <span className="font-semibold text-sm">{statusMessage.text}</span>
            </div>
            <button onClick={() => setStatusMessage(null)} className="p-1 hover:opacity-70">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          </div>
        )}

        {/* Admin Header & Stats - Stitch UI Guide */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 bg-white p-6 md:p-8 rounded-2xl border border-[#c6c5d5] shadow-sm">
          <div>
            <div className="flex items-center gap-2 text-[#00003c] font-label text-xs uppercase font-bold tracking-wider mb-1">
              <span className="material-symbols-outlined text-[18px]">verified_user</span>
              <span>Executive Admin Control Portal</span>
            </div>
            <h1 className="font-headline font-bold text-2xl md:text-3xl text-[#00003c]">Catalog &amp; Inventory Management</h1>
            <p className="text-xs md:text-sm text-[#464653] mt-1">
              Real-time synchronization with Neon Serverless PostgreSQL. Manage listings, prices, stock, and product details.
            </p>
          </div>
          <div className="flex gap-3">
            <button
              onClick={openCreateModal}
              className="bg-[#00003c] hover:bg-[#000080] text-white font-headline font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-md flex items-center gap-2 text-sm whitespace-nowrap"
            >
              <span className="material-symbols-outlined">add_circle</span>
              Add New Product
            </button>
          </div>
        </div>

        {/* Analytics Overview Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <span className="text-xs font-semibold text-[#464653] block mb-1">Total SKU Count</span>
            <span className="font-headline font-bold text-2xl text-[#00003c]">{products.length} Items</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <span className="text-xs font-semibold text-[#464653] block mb-1">Active Storefront (Listed)</span>
            <span className="font-headline font-bold text-2xl text-[#2E7D32]">{listedCount} Listed</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <span className="text-xs font-semibold text-[#464653] block mb-1">Hidden Catalog (Delisted)</span>
            <span className="font-headline font-bold text-2xl text-[#D32F2F]">{delistedCount} Delisted</span>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <span className="text-xs font-semibold text-[#464653] block mb-1">Total Inventory Valuation</span>
            <span className="font-price font-bold text-xl md:text-2xl text-[#B87F00]">₦{totalValue.toLocaleString()}</span>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="mb-6 bg-white p-4 rounded-xl border border-[#c6c5d5] flex items-center gap-3">
          <span className="material-symbols-outlined text-[#767684]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products by title, category, brand, or ID..."
            className="w-full bg-transparent text-sm text-[#1c1b1b] placeholder-[#767684] outline-none"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-[#767684] hover:text-[#1c1b1b]">
              <span className="material-symbols-outlined text-[18px]">close</span>
            </button>
          )}
        </div>

        {/* Product Table */}
        <div className="bg-white rounded-2xl border border-[#c6c5d5] overflow-hidden shadow-sm">
          {loading ? (
            <div className="py-20 text-center space-y-3">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#00003c]">progress_activity</span>
              <p className="text-sm text-[#464653] font-semibold">Loading admin catalog...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-16 text-center space-y-2">
              <span className="material-symbols-outlined text-4xl text-[#c6c5d5]">inventory_2</span>
              <p className="font-semibold text-[#00003c]">No products match your search</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0edec] text-[#464653] font-label text-xs uppercase tracking-wider border-b border-[#c6c5d5]">
                    <th className="p-4">Product Details</th>
                    <th className="p-4">Category &amp; Brand</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Stock</th>
                    <th className="p-4">Status (List / Delist)</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#ebe7e7] text-sm">
                  {filteredProducts.map((product) => (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#f6f3f2] transition-colors ${!product.isListed ? 'opacity-60 bg-[#ebe7e7]/40' : ''}`}
                    >
                      <td className="p-4 flex items-center gap-3.5 min-w-[240px]">
                        <div className="w-12 h-12 rounded-lg bg-[#f0edec] p-1.5 flex items-center justify-center flex-shrink-0">
                          <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div>
                          <span className="font-body font-bold text-[#00003c] block line-clamp-1">{product.name}</span>
                          <span className="text-xs text-[#767684] block font-mono">ID: {product.id}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="font-semibold text-[#1c1b1b] block">{product.category}</span>
                        <span className="text-xs text-[#767684]">{product.brand || 'FleekTech'}</span>
                      </td>
                      <td className="p-4 font-price font-bold text-[#B87F00] whitespace-nowrap">
                        ₦{product.price.toLocaleString()}
                      </td>
                      <td className="p-4">
                        <span className={`font-semibold px-2 py-0.5 rounded text-xs ${product.stock < 20 ? 'bg-[#D32F2F]/10 text-[#D32F2F]' : 'bg-[#2E7D32]/10 text-[#2E7D32]'}`}>
                          {product.stock} units
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleList(product)}
                          className={`px-3 py-1.5 rounded-lg font-bold text-xs flex items-center gap-1.5 transition-all active:scale-95 shadow-sm ${
                            product.isListed
                              ? 'bg-[#2E7D32] text-white hover:bg-[#2E7D32]/90'
                              : 'bg-[#767684] text-white hover:bg-[#767684]/90'
                          }`}
                          title={product.isListed ? 'Click to Delist (Hide from store)' : 'Click to List (Show on store)'}
                        >
                          <span className="material-symbols-outlined text-[16px]">
                            {product.isListed ? 'visibility' : 'visibility_off'}
                          </span>
                          {product.isListed ? 'Listed (Active)' : 'Delisted (Hidden)'}
                        </button>
                      </td>
                      <td className="p-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditModal(product)}
                            className="px-3 py-1.5 rounded-lg border border-[#c6c5d5] bg-white text-[#00003c] font-semibold text-xs hover:border-[#00003c] flex items-center gap-1 transition-colors"
                          >
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                            Edit Details
                          </button>
                          <button
                            onClick={() => handleDelete(product.id, product.name)}
                            className="p-1.5 rounded-lg border border-[#D32F2F]/30 bg-[#D32F2F]/10 text-[#D32F2F] hover:bg-[#D32F2F] hover:text-white transition-colors"
                            title="Delete permanently"
                          >
                            <span className="material-symbols-outlined text-[18px]">delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Edit / Create Modal */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fcf9f8] rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#c6c5d5] p-6 md:p-8 relative">
            <div className="flex items-center justify-between border-b border-[#c6c5d5] pb-4 mb-6">
              <h2 className="font-headline font-bold text-xl text-[#00003c]">
                {isCreating ? 'Add New Product to Catalog' : `Edit Product: ${editingProduct?.name}`}
              </h2>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-full text-[#767684] hover:text-[#1c1b1b] hover:bg-[#ebe7e7]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Brand *</label>
                  <input
                    type="text"
                    required
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00003c] mb-1">Tagline / Short Description *</label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={(e) => setFormPrice(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none font-price font-bold text-[#B87F00]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Original Strike Price (₦)</label>
                  <input
                    type="number"
                    value={formOriginalPrice}
                    onChange={(e) => setFormOriginalPrice(e.target.value)}
                    placeholder="Optional"
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Category *</label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  >
                    <option value="Phones">Phones</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Audio">Audio</option>
                    <option value="Gaming">Gaming</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Cameras">Cameras</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Stock Count *</label>
                  <input
                    type="number"
                    required
                    value={formStock}
                    onChange={(e) => setFormStock(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Rating (1.0 - 5.0)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="1"
                    max="5"
                    value={formRating}
                    onChange={(e) => setFormRating(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Reviews Count</label>
                  <input
                    type="number"
                    value={formReviewsCount}
                    onChange={(e) => setFormReviewsCount(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Image URL *</label>
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={(e) => setFormImage(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Badge / Sale Tag</label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="e.g. -20%, Best Seller, New"
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00003c] mb-1">Full Description *</label>
                <textarea
                  rows={3}
                  required
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none text-xs"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Key Features (comma separated)</label>
                  <input
                    type="text"
                    value={formFeatures}
                    onChange={(e) => setFormFeatures(e.target.value)}
                    placeholder="Titanium Build, AI Chip, Fast Charging"
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Specifications (JSON format) *</label>
                  <textarea
                    rows={3}
                    value={formSpecs}
                    onChange={(e) => setFormSpecs(e.target.value)}
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none font-mono text-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-[#c6c5d5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsCreating(false);
                    setEditingProduct(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#c6c5d5] text-[#464653] font-semibold hover:bg-[#ebe7e7] transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00003c] hover:bg-[#000080] text-white font-headline font-bold transition-all active:scale-95 shadow-md flex items-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">save</span>
                  {isCreating ? 'Create Product' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

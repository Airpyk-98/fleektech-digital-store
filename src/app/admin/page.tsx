'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Product } from '@/lib/db';
import { ShieldAlert, Plus, Edit3, Eye, EyeOff, Trash2, Search, ArrowLeft, CheckCircle2, Sparkles, Package, Layers, DollarSign, RefreshCw, AlertCircle, Save, X } from 'lucide-react';

export default function AdminPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  
  // Modals
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Partial<Product> | null>(null);
  const [specsInput, setSpecsInput] = useState('');
  const [actionMessage, setActionMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminProducts();
  }, []);

  const fetchAdminProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?admin=true');
      const data = await res.json();
      if (data.success) {
        setProducts(data.products);
      }
    } catch (err) {
      console.error('Failed to fetch admin products:', err);
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (msg: string) => {
    setActionMessage(msg);
    setTimeout(() => setActionMessage(null), 3000);
  };

  // Toggle List / Delist
  const handleToggleList = async (product: Product) => {
    const newStatus = !product.isListed;
    try {
      // Optimistic update
      setProducts(prev => prev.map(p => p.id === product.id ? { ...p, isListed: newStatus } : p));
      
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isListed: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showNotification(`Product "${product.name}" is now ${newStatus ? 'LISTED (Live)' : 'DELISTED (Hidden)'}`);
      } else {
        fetchAdminProducts();
      }
    } catch (err) {
      console.error('Error toggling list status:', err);
      fetchAdminProducts();
    }
  };

  // Delete Product
  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Are you sure you want to completely delete "${name}"?`)) return;
    try {
      setProducts(prev => prev.filter(p => p.id !== id));
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showNotification(`Deleted "${name}" successfully.`);
      } else {
        fetchAdminProducts();
      }
    } catch (err) {
      console.error('Error deleting product:', err);
      fetchAdminProducts();
    }
  };

  // Open Edit Modal
  const openEdit = (product: Product) => {
    setCurrentProduct({ ...product });
    setSpecsInput(JSON.stringify(product.specs || {}, null, 2));
    setIsEditModalOpen(true);
  };

  // Open Create Modal
  const openCreate = () => {
    setCurrentProduct({
      name: '',
      tagline: '',
      price: 199,
      originalPrice: undefined,
      category: 'Phones',
      image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80',
      badge: 'NEW',
      rating: 5.0,
      reviewsCount: 1,
      stock: 50,
      isListed: true,
      description: '',
      specs: {}
    });
    setSpecsInput('{\n  "Display": "6.8 inch OLED",\n  "Processor": "Neural AI Core"\n}');
    setIsCreateModalOpen(true);
  };

  // Save Edit
  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct || !currentProduct.id) return;

    let parsedSpecs = {};
    try {
      parsedSpecs = JSON.parse(specsInput);
    } catch (err) {
      alert('Invalid JSON in Specifications field!');
      return;
    }

    const payload = { ...currentProduct, specs: parsedSpecs };

    try {
      const res = await fetch(`/api/products/${currentProduct.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => prev.map(p => p.id === currentProduct.id ? data.product : p));
        setIsEditModalOpen(false);
        showNotification(`Updated "${payload.name}" successfully.`);
      } else {
        alert(data.error || 'Failed to update product');
      }
    } catch (err) {
      console.error('Error saving edit:', err);
      alert('Error updating product');
    }
  };

  // Save Create
  const handleSaveCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentProduct) return;

    let parsedSpecs = {};
    try {
      parsedSpecs = JSON.parse(specsInput);
    } catch (err) {
      alert('Invalid JSON in Specifications field!');
      return;
    }

    const payload = { ...currentProduct, specs: parsedSpecs };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (data.success) {
        setProducts(prev => [data.product, ...prev]);
        setIsCreateModalOpen(false);
        showNotification(`Created "${payload.name}" successfully.`);
      } else {
        alert(data.error || 'Failed to create product');
      }
    } catch (err) {
      console.error('Error creating product:', err);
      alert('Error creating product');
    }
  };

  // Stats
  const totalProducts = products.length;
  const listedCount = products.filter(p => p.isListed).length;
  const delistedCount = products.filter(p => !p.isListed).length;
  const totalStockValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col selection:bg-cyan-500 selection:text-black">
      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-zinc-900/90 backdrop-blur-md border-b border-zinc-800 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Storefront</span>
          </Link>
          <div className="h-6 w-px bg-zinc-800" />
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
              <ShieldAlert size={18} />
            </div>
            <div>
              <h1 className="font-extrabold text-base sm:text-lg tracking-tight">FleekTech Admin Vanguard</h1>
              <p className="text-[11px] text-zinc-500 font-medium">Full Control • List, Delist & Edit Every Detail</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchAdminProducts}
            className="p-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-all"
            title="Refresh Database"
          >
            <RefreshCw size={16} className={loading ? 'animate-spin text-cyan-400' : ''} />
          </button>
          <button
            onClick={openCreate}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs sm:text-sm hover:brightness-110 shadow-lg shadow-cyan-500/20 transition-all flex items-center gap-1.5"
          >
            <Plus size={16} />
            <span>Add New Tech</span>
          </button>
        </div>
      </header>

      {/* Action Notification Toast */}
      {actionMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-cyan-500 text-black font-bold text-xs sm:text-sm px-4 py-3 rounded-2xl shadow-2xl flex items-center gap-2 animate-bounce">
          <CheckCircle2 size={18} />
          <span>{actionMessage}</span>
        </div>
      )}

      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:px-8 py-8 space-y-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold">
              <span>TOTAL CATALOG</span>
              <Package size={16} className="text-cyan-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">{totalProducts}</div>
            <div className="text-[11px] text-zinc-500">All electronics items</div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold">
              <span>LIVE STOREFRONT</span>
              <Eye size={16} className="text-green-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-green-400">{listedCount}</div>
            <div className="text-[11px] text-zinc-500">Currently visible to shoppers</div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold">
              <span>DELISTED / HIDDEN</span>
              <EyeOff size={16} className="text-amber-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400">{delistedCount}</div>
            <div className="text-[11px] text-zinc-500">Hidden from storefront</div>
          </div>

          <div className="bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 space-y-1">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-semibold">
              <span>INVENTORY VALUE</span>
              <DollarSign size={16} className="text-blue-400" />
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white">${totalStockValue.toLocaleString()}</div>
            <div className="text-[11px] text-zinc-500">Estimated stock valuation</div>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-zinc-900/40 p-4 rounded-2xl border border-zinc-800">
          <div className="relative w-full md:w-80">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products by name or category..."
              className="w-full bg-zinc-900 border border-zinc-700/80 rounded-xl py-2 pl-10 pr-4 text-xs text-zinc-200 placeholder-zinc-500 focus:outline-none focus:border-cyan-500"
            />
            <Search className="absolute left-3.5 top-2.5 text-zinc-500" size={16} />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {['All', 'Phones', 'Audio', 'Laptops', 'Wearables', 'Accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-cyan-500 text-black shadow-md shadow-cyan-500/20'
                    : 'bg-zinc-900 text-zinc-400 hover:text-white border border-zinc-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Products Table / Grid */}
        <div className="bg-zinc-900/40 border border-zinc-800 rounded-3xl overflow-hidden shadow-xl">
          <div className="p-6 border-b border-zinc-800 flex items-center justify-between">
            <h2 className="font-extrabold text-base text-white flex items-center gap-2">
              <Layers size={18} className="text-cyan-400" />
              <span>Product Inventory & Control Panel</span>
            </h2>
            <span className="text-xs text-zinc-500 font-medium">Click any row action to toggle status or edit details</span>
          </div>

          {loading ? (
            <div className="p-12 text-center text-zinc-500 text-sm">Loading database records...</div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center space-y-2">
              <AlertCircle size={32} className="text-zinc-600 mx-auto" />
              <div className="font-bold text-white">No products found</div>
              <div className="text-xs text-zinc-500">Try adjusting your filters or click "Add New Tech" to create one.</div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-zinc-800 bg-zinc-900/60 text-[11px] font-extrabold text-zinc-400 uppercase tracking-wider">
                    <th className="p-4">Product Info</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Price / Stock</th>
                    <th className="p-4">Status (List / Delist)</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-800/60 text-xs">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-zinc-900/60 transition-colors group">
                      {/* Product */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={product.image || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80'}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded-xl bg-zinc-800 border border-zinc-700/60 flex-shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="font-extrabold text-white text-sm truncate max-w-xs">{product.name}</div>
                            <div className="text-zinc-500 truncate max-w-xs">{product.tagline || product.description}</div>
                            {product.badge && (
                              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 font-bold text-[9px] uppercase">
                                {product.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4 font-semibold text-zinc-300">{product.category}</td>

                      {/* Price & Stock */}
                      <td className="p-4">
                        <div className="font-extrabold text-white text-sm">${product.price.toLocaleString()}</div>
                        <div className="text-zinc-500">Stock: <span className="text-cyan-400 font-bold">{product.stock}</span></div>
                      </td>

                      {/* List / Delist Toggle Button */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleList(product)}
                          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm ${
                            product.isListed
                              ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                              : 'bg-amber-500/20 text-amber-400 border border-amber-500/30 hover:bg-amber-500/30'
                          }`}
                          title="Click to toggle visibility on storefront"
                        >
                          {product.isListed ? (
                            <>
                              <Eye size={14} className="text-green-400 animate-pulse" />
                              <span>LISTED (LIVE)</span>
                            </>
                          ) : (
                            <>
                              <EyeOff size={14} className="text-amber-400" />
                              <span>DELISTED (HIDDEN)</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right space-x-2">
                        <button
                          onClick={() => openEdit(product)}
                          className="px-3 py-1.5 rounded-xl bg-zinc-800 hover:bg-cyan-500 hover:text-black text-zinc-300 font-bold transition-all inline-flex items-center gap-1 shadow-sm"
                        >
                          <Edit3 size={14} />
                          <span>Edit</span>
                        </button>
                        <button
                          onClick={() => handleDelete(product.id, product.name)}
                          className="px-2.5 py-1.5 rounded-xl bg-zinc-900 hover:bg-red-500/20 text-zinc-500 hover:text-red-400 transition-all inline-flex items-center justify-center"
                          title="Delete completely"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {/* Edit & Create Modal */}
      {(isEditModalOpen || isCreateModalOpen) && currentProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn overflow-y-auto">
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-2xl w-full p-6 md:p-8 space-y-6 relative shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
              <h3 className="font-extrabold text-xl text-white flex items-center gap-2">
                <Edit3 size={20} className="text-cyan-400" />
                <span>{isEditModalOpen ? `Edit "${currentProduct.name}"` : 'Add New Tech Product'}</span>
              </h3>
              <button
                onClick={() => {
                  setIsEditModalOpen(false);
                  setIsCreateModalOpen(false);
                }}
                className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={isEditModalOpen ? handleSaveEdit : handleSaveCreate} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={currentProduct.name || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, name: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="e.g. FleekTech CyberPhone 17"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Category *</label>
                  <select
                    value={currentProduct.category || 'Phones'}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, category: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Phones">Phones</option>
                    <option value="Audio">Audio</option>
                    <option value="Laptops">Laptops</option>
                    <option value="Wearables">Wearables</option>
                    <option value="Accessories">Accessories</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={currentProduct.price || 0}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, price: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Original Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentProduct.originalPrice || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, originalPrice: e.target.value ? parseFloat(e.target.value) : undefined })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                    placeholder="Optional strike-through"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Stock Count</label>
                  <input
                    type="number"
                    value={currentProduct.stock || 0}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, stock: parseInt(e.target.value) || 0 })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Image URL</label>
                  <input
                    type="url"
                    value={currentProduct.image || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, image: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="https://..."
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-zinc-400">Badge (Optional)</label>
                  <input
                    type="text"
                    value={currentProduct.badge || ''}
                    onChange={(e) => setCurrentProduct({ ...currentProduct, badge: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                    placeholder="NEW, SALE, HOT, BESTSELLER"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Tagline / Subtitle</label>
                <input
                  type="text"
                  value={currentProduct.tagline || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, tagline: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Short punchy feature summary"
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Full Description</label>
                <textarea
                  rows={3}
                  value={currentProduct.description || ''}
                  onChange={(e) => setCurrentProduct({ ...currentProduct, description: e.target.value })}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-cyan-500"
                  placeholder="Detailed explanation of features and design..."
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-zinc-400">Specifications (JSON Format)</label>
                <textarea
                  rows={4}
                  value={specsInput}
                  onChange={(e) => setSpecsInput(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-700 rounded-xl p-2.5 text-cyan-300 font-mono focus:outline-none focus:border-cyan-500"
                />
                <p className="text-[10px] text-zinc-500">Must be valid JSON object with key-value pairs (e.g., &quot;Display&quot;: &quot;6.8 inch&quot;)</p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    setIsCreateModalOpen(false);
                  }}
                  className="px-6 py-3 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold hover:brightness-110 shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2"
                >
                  <Save size={16} />
                  <span>{isEditModalOpen ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

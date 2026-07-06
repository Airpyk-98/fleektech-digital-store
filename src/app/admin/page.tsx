'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Product } from '@/lib/db';
import { useAuth } from '@/context/AuthContext';

export default function AdminPage() {
  const { user, login, logout, changePassword } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Admin Login State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [adminLoading, setAdminLoading] = useState(false);
  const [adminError, setAdminError] = useState('');

  // Admin Change Password State
  const [showChangePassModal, setShowChangePassModal] = useState(false);
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

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
  const [formSpecsList, setFormSpecsList] = useState<Array<{ key: string; value: string }>>([
    { key: 'Warranty', value: '2 Years Titanium Care' },
    { key: 'Connectivity', value: '5G & Wi-Fi 7' }
  ]);
  const [formFeatures, setFormFeatures] = useState('Titanium Build, Fast Charging, AI Processor');

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchProducts();
    }
  }, [user]);

  const showStatus = (text: string, type: 'success' | 'error' = 'success') => {
    setStatusMessage({ type, text });
    setTimeout(() => setStatusMessage(null), 4000);
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/products?all=true');
      const data = await res.json();
      const items = data.products || (Array.isArray(data) ? data : []);
      setProducts(items);
    } catch (err) {
      console.error('Error fetching admin products:', err);
      showStatus('Failed to fetch products from server.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdminError('');
    setAdminLoading(true);
    const res = await login(adminEmail, adminPass);
    if (!res.success) {
      setAdminError(res.error || 'Invalid admin credentials');
    }
    setAdminLoading(false);
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
      setPassSuccess('Admin password updated successfully!');
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

  const handleToggleList = async (product: Product) => {
    try {
      const res = await fetch(`/api/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isListed: !product.isListed }),
      });
      if (res.ok) {
        const data = await res.json();
        const updated = data.product || data;
        setProducts(products.map((p) => (p.id === product.id ? updated : p)));
        showStatus(`Product "${product.name}" is now ${updated.isListed ? 'Listed' : 'Delisted'}.`);
      } else {
        showStatus('Failed to update product status.', 'error');
      }
    } catch (err) {
      console.error('Error toggling listing:', err);
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
    setFormSpecsList([
      { key: 'Warranty', value: '2 Years Titanium Care' },
      { key: 'Connectivity', value: '5G & Wi-Fi 7' }
    ]);
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
    
    const specsObj = product.specs || {};
    const list = Object.entries(specsObj).map(([key, value]) => ({ key, value: String(value) }));
    setFormSpecsList(list.length > 0 ? list : [{ key: '', value: '' }]);
    setFormFeatures((product.features || []).join(', '));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const parsedSpecs: Record<string, string> = {};
      formSpecsList.forEach(({ key, value }) => {
        if (key.trim()) {
          parsedSpecs[key.trim()] = value.trim();
        }
      });

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
          const data = await res.json();
          const created = data.product || data;
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
          const data = await res.json();
          const updated = data.product || data;
          setProducts(products.map((p) => (p.id === editingProduct.id ? updated : p)));
          showStatus(`Product "${updated.name}" updated successfully!`);
          setEditingProduct(null);
        } else {
          showStatus('Failed to update product.', 'error');
        }
      }
    } catch (err) {
      console.error('Error saving product:', err);
      showStatus('Error saving product to DB.', 'error');
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

  // Admin Guard: If not logged in as Admin, show Restricted Admin Login Portal!
  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcf9f8]">
        <Navbar />
        <main className="flex-1 flex items-center justify-center p-4 pt-24 pb-24">
          <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-[#c6c5d5] text-center animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 bg-[#00003c]/10 rounded-full flex items-center justify-center mx-auto mb-4 text-[#00003c]">
              <span className="material-symbols-outlined text-3xl">admin_panel_settings</span>
            </div>
            <h1 className="font-headline font-bold text-xl text-[#00003c] mb-1">FleekTech Admin Portal</h1>
            <p className="text-xs text-[#767684] mb-6">
              Restricted management access. Please authenticate with executive credentials.
            </p>

            <div className="p-3 bg-[#ffa504]/10 border border-[#ffa504] rounded-xl mb-6 text-left">
              <p className="text-[11px] font-bold text-[#684100] uppercase mb-0.5">Demo Admin Credentials:</p>
              <p className="text-xs font-mono text-[#00003c]">Email: <b>admin@fleektech.com</b></p>
              <p className="text-xs font-mono text-[#00003c]">Password: <b>NwachukwuJacklyn</b> (or admin123)</p>
            </div>

            {adminError && (
              <div className="mb-4 p-3 bg-[#D32F2F]/10 border border-[#D32F2F] text-[#D32F2F] text-xs rounded-lg flex items-center gap-2 font-semibold text-left">
                <span className="material-symbols-outlined text-base">error</span>
                {adminError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Admin Email</label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@fleektech.com"
                  className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-xl px-4 py-2.5 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-[#464653] mb-1">Admin Password</label>
                <input
                  type="password"
                  required
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-xl px-4 py-2.5 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={adminLoading}
                className="w-full py-3.5 bg-[#00003c] hover:bg-[#000080] text-white font-bold rounded-xl text-sm tracking-wide uppercase transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 mt-6"
              >
                {adminLoading ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>
                    Authenticating...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">lock_open</span>
                    ACCESS ADMIN PORTAL
                  </>
                )}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

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
              <span className="material-symbols-outlined text-[18px] text-[#2E7D32]">verified_user</span>
              <span>Executive Admin Control Portal • {user.name}</span>
            </div>
            <h1 className="font-headline font-bold text-2xl md:text-3xl text-[#00003c]">Catalog &amp; Inventory Management</h1>
            <p className="text-xs md:text-sm text-[#464653] mt-1">
              Real-time synchronization with Neon Serverless PostgreSQL. Manage listings, prices, stock, and product details.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/"
              className="px-4 py-2.5 rounded-xl border border-[#ffa504] bg-[#ffb95c]/20 hover:bg-[#ffb95c]/30 text-[#684100] font-bold text-xs transition-all flex items-center gap-1.5 shadow-sm"
            >
              <span className="material-symbols-outlined text-[18px]">visibility</span>
              Preview Storefront
            </Link>
            <button
              onClick={() => setShowChangePassModal(true)}
              className="px-4 py-2.5 rounded-xl border border-[#c6c5d5] bg-[#f0edec] hover:bg-[#ebe7e7] text-[#00003c] font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">lock_reset</span>
              Change Password
            </button>
            <button
              onClick={logout}
              className="px-4 py-2.5 rounded-xl border border-[#D32F2F] bg-[#D32F2F]/10 hover:bg-[#D32F2F]/20 text-[#D32F2F] font-semibold text-xs transition-all flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              Logout
            </button>
            <button
              onClick={openCreateModal}
              className="px-6 py-2.5 rounded-xl bg-[#00003c] hover:bg-[#000080] text-white font-headline font-bold text-sm transition-all active:scale-95 shadow-md flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[20px]">add_circle</span>
              Add New Product
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <p className="text-xs font-label text-[#767684] uppercase font-bold">Total Products</p>
            <p className="font-headline font-bold text-2xl text-[#00003c] mt-1">{products.length}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <p className="text-xs font-label text-[#767684] uppercase font-bold">Active Listings</p>
            <p className="font-headline font-bold text-2xl text-[#2E7D32] mt-1">{listedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <p className="text-xs font-label text-[#767684] uppercase font-bold">Delisted / Drafts</p>
            <p className="font-headline font-bold text-2xl text-[#D32F2F] mt-1">{delistedCount}</p>
          </div>
          <div className="bg-white p-5 rounded-xl border border-[#c6c5d5] shadow-sm">
            <p className="text-xs font-label text-[#767684] uppercase font-bold">Total Stock Value</p>
            <p className="font-headline font-bold text-xl text-[#B87F00] mt-1 font-price">
              ₦{totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="bg-white p-4 rounded-xl border border-[#c6c5d5] shadow-sm mb-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="relative w-full md:w-96">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#767684]">search</span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, category, or ID..."
              className="w-full bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg py-2 pl-10 pr-4 text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#767684]">
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>
          <div className="text-xs text-[#767684] font-semibold">
            Showing {filteredProducts.length} of {products.length} catalog items
          </div>
        </div>

        {/* Products Table - Stitch Design System */}
        <div className="bg-white rounded-2xl border border-[#c6c5d5] shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-[#767684]">
              <span className="material-symbols-outlined animate-spin text-4xl text-[#00003c] mb-2">progress_activity</span>
              <p className="text-sm font-semibold">Loading catalog from Neon database...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="p-12 text-center text-[#767684]">
              <span className="material-symbols-outlined text-4xl mb-2">inventory_2</span>
              <p className="text-base font-bold text-[#1c1b1b]">No products found</p>
              <p className="text-xs mt-1">Try adjusting your search query or add a new product.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#f0edec] border-b border-[#c6c5d5] text-[#00003c] font-label text-xs uppercase font-bold tracking-wider">
                    <th className="py-3.5 px-4">Product</th>
                    <th className="py-3.5 px-4">Category</th>
                    <th className="py-3.5 px-4">Price (₦)</th>
                    <th className="py-3.5 px-4">Stock</th>
                    <th className="py-3.5 px-4">Status</th>
                    <th className="py-3.5 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#c6c5d5]/40 text-sm">
                  {filteredProducts.map((p) => (
                    <tr key={p.id} className="hover:bg-[#f6f3f2]/50 transition-colors">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={p.image}
                            alt={p.name}
                            className="w-12 h-12 rounded-lg object-contain bg-[#fcf9f8] border border-[#c6c5d5]/60 p-1 flex-shrink-0"
                          />
                          <div>
                            <p className="font-bold text-[#1c1b1b] line-clamp-1">{p.name}</p>
                            <p className="text-xs text-[#767684] line-clamp-1 font-mono">{p.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <span className="px-2.5 py-1 rounded-full bg-[#f0edec] text-[#00003c] font-semibold text-xs">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-price font-bold text-[#1c1b1b]">
                        ₦{p.price.toLocaleString()}
                        {p.originalPrice && (
                          <span className="block text-xs font-normal text-[#767684] line-through">
                            ₦{p.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-semibold text-[#464653]">
                        {p.stock} <span className="text-xs font-normal text-[#767684]">units</span>
                      </td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                            p.isListed
                              ? 'bg-[#2E7D32]/10 text-[#2E7D32] border border-[#2E7D32]/30'
                              : 'bg-[#D32F2F]/10 text-[#D32F2F] border border-[#D32F2F]/30'
                          }`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                          {p.isListed ? 'Listed' : 'Delisted'}
                        </span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleList(p)}
                            title={p.isListed ? 'Delist Product' : 'List Product'}
                            className={`p-2 rounded-lg border transition-colors ${
                              p.isListed
                                ? 'border-[#ffa504] text-[#855400] hover:bg-[#ffa504]/10'
                                : 'border-[#2E7D32] text-[#2E7D32] hover:bg-[#2E7D32]/10'
                            }`}
                          >
                            <span className="material-symbols-outlined text-[18px]">
                              {p.isListed ? 'visibility_off' : 'visibility'}
                            </span>
                          </button>
                          <button
                            onClick={() => openEditModal(p)}
                            title="Edit Product Details"
                            className="p-2 rounded-lg border border-[#c6c5d5] text-[#00003c] hover:bg-[#f0edec] transition-colors"
                          >
                            <span className="material-symbols-outlined text-[18px]">edit</span>
                          </button>
                          <button
                            onClick={() => handleDelete(p.id, p.name)}
                            title="Delete Permanently"
                            className="p-2 rounded-lg border border-[#D32F2F]/40 text-[#D32F2F] hover:bg-[#D32F2F]/10 transition-colors"
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

      {/* Admin Change Password Modal */}
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
              <h2 className="font-headline font-bold text-lg text-[#00003c]">Change Admin Password</h2>
              <p className="text-xs text-[#767684]">Update executive credentials for {user.email}</p>
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
                UPDATE ADMIN PASSWORD
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Create/Edit Modal - Stitch Design System */}
      {(isCreating || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1c1b1b]/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-[#fcf9f8] rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl border border-[#c6c5d5] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#c6c5d5]">
              <h3 className="font-headline font-bold text-xl text-[#00003c] flex items-center gap-2">
                <span className="material-symbols-outlined text-[#855400]">
                  {isCreating ? 'add_circle' : 'edit_square'}
                </span>
                {isCreating ? 'Add New Product to Catalog' : `Edit: ${editingProduct?.name}`}
              </h3>
              <button
                onClick={() => {
                  setIsCreating(false);
                  setEditingProduct(null);
                }}
                className="p-1 rounded-full hover:bg-[#ebe7e7] text-[#464653] transition-colors"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    placeholder="e.g. FleekTech Titanium Pro"
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#00003c] mb-1">Brand</label>
                  <input
                    type="text"
                    value={formBrand}
                    onChange={(e) => setFormBrand(e.target.value)}
                    placeholder="FleekTech"
                    className="w-full bg-white border border-[#c6c5d5] rounded-lg p-2.5 text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#00003c] mb-1">Tagline / Short Summary *</label>
                <input
                  type="text"
                  required
                  value={formTagline}
                  onChange={(e) => setFormTagline(e.target.value)}
                  placeholder="e.g. 16GB RAM • Titanium Frame • Neural AI"
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

              {/* Interactive Key-Value Specifications Editor (No JSON Required!) */}
              <div className="bg-white p-4 rounded-xl border border-[#c6c5d5]/80">
                <label className="block text-xs font-label font-bold uppercase tracking-wider text-[#00003c] mb-1 flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[18px] text-[#855400]">list_alt</span>
                  Specifications (Key - Value Pairs)
                </label>
                <p className="text-[11px] text-[#767684] mb-3">
                  Easily add or edit specifications without touching JSON or code.
                </p>
                <div className="space-y-2.5">
                  {formSpecsList.map((spec, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        placeholder="Key (e.g. Warranty)"
                        value={spec.key}
                        onChange={(e) => {
                          const updated = [...formSpecsList];
                          updated[idx].key = e.target.value;
                          setFormSpecsList(updated);
                        }}
                        className="w-5/12 bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2 text-xs md:text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                      />
                      <input
                        type="text"
                        placeholder="Value (e.g. 2 Years Titanium Care)"
                        value={spec.value}
                        onChange={(e) => {
                          const updated = [...formSpecsList];
                          updated[idx].value = e.target.value;
                          setFormSpecsList(updated);
                        }}
                        className="w-6/12 bg-[#f6f3f2] border border-[#c6c5d5] rounded-lg p-2 text-xs md:text-sm text-[#1c1b1b] focus:ring-2 focus:ring-[#00003c] outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setFormSpecsList(formSpecsList.filter((_, i) => i !== idx))}
                        className="w-1/12 p-2 text-[#D32F2F] hover:bg-[#D32F2F]/10 rounded-lg flex items-center justify-center transition-colors"
                        title="Remove Specification"
                      >
                        <span className="material-symbols-outlined text-base">delete</span>
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setFormSpecsList([...formSpecsList, { key: '', value: '' }])}
                  className="mt-3 px-3 py-1.5 bg-[#f0edec] border border-[#c6c5d5] rounded-lg text-xs font-bold text-[#00003c] hover:bg-[#ebe7e7] flex items-center gap-1 transition-colors shadow-sm"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  Add Specification
                </button>
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

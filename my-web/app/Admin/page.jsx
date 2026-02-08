'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MdDashboard,
  MdPeopleOutline,
  MdShoppingBag,
  MdOutlineInventory2,
  MdLocalOffer,
  MdAddCircleOutline,
  MdSearch,
  MdNotificationsNone,
  MdDeleteOutline,
  MdEdit
} from 'react-icons/md';
import { FaUpload, FaBoxOpen } from 'react-icons/fa6';
import { IoMdClose } from 'react-icons/io';
import { ProductContext } from '../Context/ProductContext';
import { AuthContext } from '../Context/AuthContext';
import { OrderContext } from '../Context/OrderContext';
import { AdContext } from '../Context/AdsContext';

import { toast, ecommerceToasts } from '@/lib/toast';

/* =========================================
   Components: Stats, Tables, Forms
   ========================================= */

const StatCard = ({ title, value, icon, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center justify-between hover:shadow-md transition-shadow"
  >
    <div>
      <p className="text-gray-400 text-xs font-semibold uppercase tracking-wider">{title}</p>
      <h3 className="text-3xl font-bold text-gray-800 mt-2">{value}</h3>
    </div>
    <div className={`p-4 rounded-xl ${color} bg-opacity-10 text-2xl`}>
      {icon}
    </div>
  </motion.div>
);

const SectionTitle = ({ title, subtitle }) => (
  <div className="mb-8">
    <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
    {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
  </div>
);

const AdminPanel = () => {
  // Contexts
  const { products = [], addProduct, deleteProduct, fetchProducts } = useContext(ProductContext);
  const { allUsers: users = [], fetchAllUsers } = useContext(AuthContext);
  const { orders = [], fetchOrders, updateOrderStatus, cancelOrder } = useContext(OrderContext);
  const { ads = [], addNewAd } = useContext(AdContext);

  useEffect(() => {
    fetchProducts();
    fetchOrders();
    fetchAllUsers();
  }, [fetchProducts, fetchOrders, fetchAllUsers]);


  // Navigation
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabs = [
    { id: 'dashboard', label: 'Overview', icon: <MdDashboard /> },
    { id: 'orders', label: 'Orders', icon: <MdShoppingBag /> },
    { id: 'products', label: 'Inventory', icon: <MdOutlineInventory2 /> },
    { id: 'customers', label: 'Customers', icon: <MdPeopleOutline /> },
    { id: 'add-product', label: 'Add Product', icon: <MdAddCircleOutline /> },
    { id: 'marketing', label: 'Marketing', icon: <MdLocalOffer /> },
  ];

  // State
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(10);
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState({ open: false, action: null, message: '' });

  // Forms State
  const [productForm, setProductForm] = useState({
    name: '', description: '', price: '', quantity: '', category: '', gender: '', material: '', colors: [], sizes: [], collection: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  // Computed
  const stats = useMemo(() => ({
    revenue: orders.reduce((acc, o) => acc + (parseFloat(o.total) || 0), 0),
    orders: orders.length,
    users: users.length,
    products: products.length
  }), [orders, users, products]);

  // Handlers
  const handleProductSubmit = async (e) => {
    e.preventDefault();
    if (!productForm.name || !productForm.price) return toast.warning('🛎️ Please complete all required inventory details.');

    const toastId = toast.loading('Synchronizing new inventory item...');
    try {
      const formData = new FormData();
      Object.keys(productForm).forEach(key => {
        if (Array.isArray(productForm[key])) {
          productForm[key].forEach(val => formData.append(key, val));
        } else {
          formData.append(key, productForm[key]);
        }
      });
      if (imageFile) formData.append('Photo', imageFile);

      await addProduct(formData);

      toast.update(toastId, {
        render: '✨ Inventory successfully updated with new product.',
        type: 'success',
        isLoading: false,
        autoClose: 3000,
      });

      setProductForm({ name: '', description: '', price: '', quantity: '', category: '', gender: '', material: '', colors: [], sizes: [], collection: '' });
      setImageFile(null);
      setImagePreview(null);
    } catch {
      toast.update(toastId, {
        render: '⚠️ We encountered an issue updating the inventory.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  /* Render Helpers for Table */
  const TableHeader = ({ cols }) => (
    <thead>
      <tr className="border-b border-gray-100 bg-gray-50/50">
        {cols.map((c, i) => <th key={i} className="text-left py-4 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">{c}</th>)}
      </tr>
    </thead>
  );

  const StatusBadge = ({ status }) => {
    let color = 'bg-gray-100 text-gray-600';
    if (status === 'Delivered') color = 'bg-green-100 text-green-700';
    if (status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
    if (status === 'Canceled') color = 'bg-red-100 text-red-700';
    return <span className={`px-2 py-1 rounded-full text-xs font-bold ${color}`}>{status}</span>;
  };

  return (
    <div className="flex min-h-screen bg-gray-50 font-sans text-gray-800">

      {/* SIDEBAR */}
      <aside className="w-20 lg:w-72 bg-white border-r border-gray-100 flex flex-col fixed h-screen z-20 transition-all duration-300">
        <div className="h-20 flex items-center justify-center lg:justify-start lg:px-8 border-b border-gray-50">
          <div className="w-10 h-10 bg-black text-white rounded-xl flex items-center justify-center font-bold text-xl mr-0 lg:mr-3">F</div>
          <span className="hidden lg:block font-bold text-xl tracking-tight">Fashionista<span className="text-gray-400">.</span></span>
        </div>

        <nav className="flex-1 py-8 px-2 lg:px-4 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === tab.id
                ? 'bg-black text-white shadow-lg shadow-black/20'
                : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="hidden lg:block font-medium text-sm">{tab.label}</span>
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-50">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden">
              <Image src="/admin-avatar.png" width={40} height={40} alt="Admin" />
            </div>
            <div className="hidden lg:block overflow-hidden">
              <p className="text-sm font-bold truncate">Admin User</p>
              <p className="text-xs text-gray-400 truncate">admin@fashionista.com</p>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 ml-20 lg:ml-72 p-6 lg:p-10 transition-all duration-300 max-w-[1920px]">
        {/* Top Navbar */}
        <header className="flex justify-between items-center mb-10">
          <div>
            <h1 className="text-2xl font-bold">{tabs.find(t => t.id === activeTab)?.label}</h1>
            <p className="text-sm text-gray-400">Welcome back, here is what is happening.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5 block w-64"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
            <button className="w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:bg-gray-50 relative">
              <MdNotificationsNone size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
            </button>
          </div>
        </header>

        {/* --- DASHBOARD VIEW --- */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              <StatCard title="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} icon={<MdLocalOffer className="text-green-600" />} color="bg-green-500" />
              <StatCard title="Total Orders" value={stats.orders} icon={<MdShoppingBag className="text-blue-600" />} color="bg-blue-500" />
              <StatCard title="Active Customers" value={stats.users} icon={<MdPeopleOutline className="text-purple-600" />} color="bg-purple-500" />
              <StatCard title="Products" value={stats.products} icon={<MdOutlineInventory2 className="text-orange-600" />} color="bg-orange-500" />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
              {/* Recent Orders */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Recent Orders</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <TableHeader cols={['Order ID', 'Customer', 'Items', 'Total', 'Status']} />
                    <tbody className="text-sm">
                      {orders.slice(0, 5).map(o => (
                        <tr key={o._id} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition">
                          <td className="py-4 px-4 text-gray-500">#{o._id.slice(-6)}</td>
                          <td className="px-4 font-medium">{o.user?.name || 'Guest'}</td>
                          <td className="px-4 text-center">{o.Products?.length || 0}</td>
                          <td className="px-4 font-bold text-gray-700">${o.total}</td>
                          <td className="px-4"><StatusBadge status={o.status || 'Pending'} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Top Products */}
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">New Inventory</h3>
                  <button onClick={() => setActiveTab('products')} className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                </div>
                <ul className="space-y-4">
                  {products.slice(0, 5).map(p => (
                    <li key={p._id} className="flex items-center gap-4 p-2 hover:bg-gray-50 rounded-xl transition">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0 relative">
                        <Image src={p.Photo?.[0]?.url || '/placeholder.png'} fill className="object-cover" alt={p.name} />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-sm text-gray-900">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.category}</p>
                      </div>
                      <span className="font-bold text-sm text-gray-700">${p.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* --- ADD PRODUCT VIEW --- */}
        {activeTab === 'add-product' && (
          <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mx-auto">
            <SectionTitle title="Add New Product" subtitle="Fill in details to upload a new item to the store." />
            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="flex flex-col gap-4">
                <div className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-blue-500 transition-colors cursor-pointer">
                  {imagePreview ? (
                    <Image src={imagePreview} fill className="object-cover" alt="Preview" />
                  ) : (
                    <div className="text-center p-6">
                      <FaUpload className="text-3xl text-gray-300 mx-auto mb-2 group-hover:text-blue-500 transition" />
                      <p className="text-sm text-gray-500 font-medium">Click to upload image</p>
                    </div>
                  )}
                  <input type="file" className="absolute inset-0 opacity-0 cursor-pointer" onChange={e => {
                    const f = e.target.files[0];
                    if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                  }} />
                </div>
              </div>

              {/* Fields */}
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Product Name</label>
                    <input className="input-field" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-text">Price</label>
                    <input className="input-field" type="number" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} />
                  </div>
                </div>

                <div>
                  <label className="label-text">Description</label>
                  <textarea className="input-field h-32 resize-none" value={productForm.description} onChange={e => setProductForm({ ...productForm, description: e.target.value })}></textarea>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Category</label>
                    <input className="input-field" value={productForm.category} onChange={e => setProductForm({ ...productForm, category: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-text">Gender</label>
                    <select className="input-field" value={productForm.gender} onChange={e => setProductForm({ ...productForm, gender: e.target.value })}>
                      <option value="">Select</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <button className="w-full btn-primary mt-4">Publish Product</button>
              </div>
            </form>
          </div>
        )}

        {/* --- OTHER VIEWS (Simplified for brevity but maintaining style) --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg">All Orders</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHeader cols={['ID', 'Date', 'Customer', 'Total', 'Status', 'Actions']} />
                <tbody className="text-sm">
                  {orders.map(o => (
                    <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50 group">
                      <td className="px-4 py-4 font-mono text-gray-500">#{o._id.slice(-6)}</td>
                      <td className="px-4 text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</td>
                      <td className="px-4 font-medium">{o.user?.name}</td>
                      <td className="px-4 font-bold">${o.total}</td>
                      <td className="px-4"><StatusBadge status={o.status || 'Pending'} /></td>
                      <td className="px-4">
                        <button onClick={() => cancelOrder(o._id)} className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition"><MdDeleteOutline size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      {/* Global Styles for Inputs (Tailwind utility classes abstraction) */}
      <style jsx global>{`
        .label-text { @apply block text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide; }
        .input-field { @apply w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-gray-400 transition-all text-sm; }
        .btn-primary { @apply px-6 py-3 bg-black text-white font-bold rounded-xl shadow-lg shadow-gray-200 hover:shadow-xl hover:-translate-y-0.5 transition-all active:scale-95; }
      `}</style>
    </div>
  );
};

export default AdminPanel;

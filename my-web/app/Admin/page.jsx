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
  const { products = [], addProduct, updateProduct, deleteProduct, fetchProducts } = useContext(ProductContext);
  const { allUsers: users = [], fetchAllUsers, deleteUser } = useContext(AuthContext);
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
    { id: 'add-product', label: 'Product Manager', icon: <MdAddCircleOutline /> },
    { id: 'marketing', label: 'Marketing', icon: <MdLocalOffer /> },
  ];

  // State
  const [search, setSearch] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  // Forms State
  const initialProductState = {
    name: '', description: '', price: '', quantity: '', category: '', gender: '', material: '', colors: [], sizes: [], collections: ''
  };
  const [productForm, setProductForm] = useState(initialProductState);
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
    if (!productForm.name || !productForm.price) return toast.warning('Please complete all required fields.');

    const isEdit = !!editingProduct;
    const toastId = toast.loading(isEdit ? 'Updating product...' : 'Creating new product...');

    try {
      const formData = new FormData();
      Object.keys(productForm).forEach(key => {
        if (Array.isArray(productForm[key])) {
          productForm[key].forEach(val => formData.append(key, val));
        } else {
          formData.append(key, productForm[key]);
        }
      });
      if (imageFile) formData.append('image', imageFile);

      let success;
      if (isEdit) {
        success = await updateProduct(editingProduct._id, formData);
      } else {
        success = await addProduct(formData);
      }

      if (success) {
        toast.update(toastId, {
          render: isEdit ? 'Product updated successfully' : 'Product created successfully',
          type: 'success',
          isLoading: false,
          autoClose: 3000,
        });
        setProductForm(initialProductState);
        setEditingProduct(null);
        setImageFile(null);
        setImagePreview(null);
        setActiveTab('products');
      }
    } catch (err) {
      toast.update(toastId, {
        render: 'Failed to process request.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const handleEditClick = (product) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      gender: product.gender,
      material: product.material,
      colors: product.colors || [],
      sizes: product.sizes || [],
      collections: product.collections || ''
    });
    setImagePreview(product.Photo?.[0]?.url || null);
    setActiveTab('add-product');
  };

  /* Render Helpers for Table */
  const TableHeader = ({ cols }) => (
    <thead>
      <tr className="border-b border-gray-100 bg-gray-50/50">
        {cols.map((c, i) => <th key={i} className="text-left py-4 px-4 font-semibold text-gray-500 text-xs uppercase tracking-wider">{c}</th>)}
      </tr>
    </thead>
  );

  const StatusBadge = ({ status, onUpdate }) => {
    let color = 'bg-gray-100 text-gray-600';
    if (status === 'Delivered') color = 'bg-green-100 text-green-700';
    if (status === 'Pending') color = 'bg-yellow-100 text-yellow-700';
    if (status === 'Processing') color = 'bg-blue-100 text-blue-700';
    if (status === 'Shipped') color = 'bg-purple-100 text-purple-700';
    if (status === 'Canceled') color = 'bg-red-100 text-red-700';

    return (
      <div className="flex items-center gap-2">
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${color}`}>{status}</span>
        <select
          value={status}
          onChange={(e) => onUpdate(e.target.value)}
          className="text-[10px] border border-gray-200 rounded px-1 py-0.5 focus:outline-none"
        >
          <option value="Pending">Pending</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
          <option value="Canceled">Canceled</option>
        </select>
      </div>
    );
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
              onClick={() => {
                setActiveTab(tab.id);
                if (tab.id !== 'add-product') setEditingProduct(null);
              }}
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
            <div className="w-10 h-10 rounded-full bg-gray-200 shrink-0 overflow-hidden relative">
              <Image src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" fill className="object-cover" alt="Admin" />
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
            <p className="text-sm text-gray-400">Manage your store activities.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative hidden md:block">
              <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
              <input
                type="text"
                placeholder="Search everything..."
                className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black/5 block w-64"
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
            </div>
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
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="font-bold text-lg">Recent Transactions</h3>
                  <button onClick={() => setActiveTab('orders')} className="text-sm text-blue-600 font-medium hover:underline">View All</button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-50 text-gray-400 uppercase">
                        <th className="py-2 text-left">ID</th>
                        <th className="py-2 text-left">Customer</th>
                        <th className="py-2 text-left">Total</th>
                        <th className="py-2 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {orders.slice(0, 5).map(o => (
                        <tr key={o._id} className="border-b border-gray-50 last:border-0">
                          <td className="py-4 font-mono text-gray-400">#{o._id.slice(-6)}</td>
                          <td className="py-4 font-bold">{o.user?.name}</td>
                          <td className="py-4 font-black">${o.total}</td>
                          <td className="py-4">
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase ${o.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>{o.status}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <h3 className="font-bold text-lg mb-6">Inventory Quick-look</h3>
                <div className="space-y-4">
                  {products.slice(0, 5).map(p => (
                    <div key={p._id} className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-gray-100 overflow-hidden relative shrink-0">
                        <Image src={p.Photo?.[0]?.url || '/placeholder.png'} fill className="object-cover" alt={p.name} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-gray-900">{p.name}</p>
                        <p className="text-[10px] text-gray-400 uppercase">{p.category} • {p.quantity} In Stock</p>
                      </div>
                      <p className="text-sm font-black text-gray-800">${p.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* --- INVENTORY VIEW --- */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="font-bold text-lg">Product Inventory</h3>
              <button onClick={() => setActiveTab('add-product')} className="text-sm bg-black text-white px-4 py-2 rounded-lg font-bold">Add Item</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHeader cols={['Product', 'Price', 'Stock', 'Category', 'Actions']} />
                <tbody>
                  {products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map(p => (
                    <tr key={p._id} className="border-b border-gray-50 hover:bg-gray-50 group transition">
                      <td className="px-4 py-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gray-100 overflow-hidden relative">
                          <Image src={p.Photo?.[0]?.url || '/placeholder.png'} fill className="object-cover" alt={p.name} />
                        </div>
                        <div>
                          <p className="font-bold text-sm">{p.name}</p>
                          <p className="text-[10px] text-gray-400 uppercase tracking-tighter">{p.gender} • {p.material}</p>
                        </div>
                      </td>
                      <td className="px-4 font-black">${p.price}</td>
                      <td className="px-4">
                        <span className={`text-xs font-bold ${p.quantity < 5 ? 'text-red-500' : 'text-gray-600'}`}>
                          {p.quantity} Units
                        </span>
                      </td>
                      <td className="px-4 text-xs text-gray-500 capitalize">{p.category}</td>
                      <td className="px-4">
                        <div className="flex gap-2">
                          <button onClick={() => handleEditClick(p)} className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"><MdEdit size={18} /></button>
                          <button onClick={() => deleteProduct(p._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><MdDeleteOutline size={18} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- PRODUCT MANAGER VIEW (Add/Edit) --- */}
        {activeTab === 'add-product' && (
          <div className="max-w-4xl bg-white p-8 rounded-2xl shadow-sm border border-gray-100 mx-auto">
            <SectionTitle
              title={editingProduct ? "Revise Product" : "System Entry"}
              subtitle={editingProduct ? `Updating: ${editingProduct.name}` : "Create a new entry in the store inventory."}
            />
            <form onSubmit={handleProductSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div onClick={() => document.getElementById('imageInput').click()} className="aspect-square bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200 flex flex-col items-center justify-center relative overflow-hidden group hover:border-black transition-colors cursor-pointer">
                  {imagePreview ? (
                    <Image src={imagePreview} fill className="object-cover" alt="Preview" />
                  ) : (
                    <div className="text-center p-6">
                      <FaUpload className="text-3xl text-gray-200 mx-auto mb-2 group-hover:text-black transition" />
                      <p className="text-xs text-gray-400 font-bold uppercase">Upload Media</p>
                    </div>
                  )}
                  <input id="imageInput" type="file" className="hidden" onChange={e => {
                    const f = e.target.files[0];
                    if (f) { setImageFile(f); setImagePreview(URL.createObjectURL(f)); }
                  }} />
                </div>
                <p className="text-[10px] text-center text-gray-400 uppercase tracking-widest font-medium">Recommended: 1000 x 1000px JPG/PNG</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="label-text">Identifier Name</label>
                  <input className="input-field" placeholder="Ex: Premium Wool Suit" value={productForm.name} onChange={e => setProductForm({ ...productForm, name: e.target.value })} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Quote Price</label>
                    <input className="input-field" type="number" placeholder="299" value={productForm.price} onChange={e => setProductForm({ ...productForm, price: e.target.value })} />
                  </div>
                  <div>
                    <label className="label-text">Initial Inventory</label>
                    <input className="input-field" type="number" placeholder="100" value={productForm.quantity} onChange={e => setProductForm({ ...productForm, quantity: e.target.value })} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="label-text">Collection</label>
                    <select className="input-field" value={productForm.collections} onChange={e => setProductForm({ ...productForm, collections: e.target.value })}>
                      <option value="">None</option>
                      <option value="Spring 2024">Spring 2024</option>
                      <option value="Essentials">Essentials</option>
                      <option value="Limited Edition">Limited Edition</option>
                    </select>
                  </div>
                  <div>
                    <label className="label-text">Section</label>
                    <select className="input-field" value={productForm.gender} onChange={e => setProductForm({ ...productForm, gender: e.target.value })}>
                      <option value="">Select</option>
                      <option value="Men">Men</option>
                      <option value="Women">Women</option>
                      <option value="Kids">Kids</option>
                      <option value="Unisex">Unisex</option>
                    </select>
                  </div>
                </div>

                <button className="w-full btn-primary mt-6">{editingProduct ? 'Commit Changes' : 'Initialize Entry'}</button>
                {editingProduct && (
                  <button type="button" onClick={() => { setEditingProduct(null); setProductForm(initialProductState); setImagePreview(null); }} className="w-full text-sm font-bold text-gray-400 hover:text-black mt-2">Abort Editing</button>
                )}
              </div>
            </form>
          </div>
        )}

        {/* --- CUSTOMERS VIEW --- */}
        {activeTab === 'customers' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg">Customer Directory</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHeader cols={['User', 'Email', 'Verified', 'Role', 'Actions']} />
                <tbody>
                  {users.map(u => (
                    <tr key={u._id} className="border-b border-gray-50 hover:bg-gray-50 group">
                      <td className="px-4 py-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden relative border-2 border-white shadow-sm">
                          <Image src={u.profilePhoto?.url || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"} fill className="object-cover" alt={u.name} />
                        </div>
                        <span className="font-bold text-sm">{u.name}</span>
                      </td>
                      <td className="px-4 text-sm text-gray-500">{u.email}</td>
                      <td className="px-4 text-xs font-bold uppercase transition">
                        {u.isVerified ? (
                          <span className="text-green-500">Verified</span>
                        ) : (
                          <span className="text-gray-400">Pending</span>
                        )}
                      </td>
                      <td className="px-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${u.isAdmin ? 'bg-black text-white' : 'bg-gray-100 text-gray-500'}`}>
                          {u.isAdmin ? 'Administrator' : 'Client'}
                        </span>
                      </td>
                      <td className="px-4">
                        <button onClick={() => deleteUser(u._id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><MdDeleteOutline size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- ORDERS VIEW --- */}
        {activeTab === 'orders' && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h3 className="font-bold text-lg">Order Management</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <TableHeader cols={['Order ID', 'Timestamp', 'Customer', 'Total Value', 'Status', 'Options']} />
                <tbody>
                  {orders.map(o => (
                    <tr key={o._id} className="border-b border-gray-50 hover:bg-gray-50 transition">
                      <td className="px-4 py-4 font-mono text-[10px] text-gray-400">#{o._id.slice(-8)}</td>
                      <td className="px-4 text-[11px] text-gray-500 uppercase font-medium">{new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                      <td className="px-4 font-bold text-sm">{o.user?.name}</td>
                      <td className="px-4 font-black text-gray-800">${o.total}</td>
                      <td className="px-4">
                        <StatusBadge status={o.status} onUpdate={(s) => updateOrderStatus(o._id, s)} />
                      </td>
                      <td className="px-4">
                        <button onClick={() => cancelOrder(o._id)} className="p-2 text-gray-400 hover:text-red-500 rounded-lg transition"><MdDeleteOutline size={18} /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>

      <style jsx global>{`
        .label-text { @apply block text-[10px] font-black text-gray-400 mb-1.5 uppercase tracking-widest; }
        .input-field { @apply w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-black/5 focus:bg-white focus:border-gray-200 transition-all text-sm font-medium; }
        .btn-primary { @apply px-8 py-4 bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-black/10 hover:shadow-black/20 hover:-translate-y-1 transition-all active:scale-95; }
      `}</style>
    </div>
  );
};

export default AdminPanel;

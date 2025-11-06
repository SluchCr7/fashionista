'use client';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MdDelete,
  MdOutlineDashboard,
  MdInventory,
  MdOutlineAddBox,
  MdLocalOffer,
  MdPeople,
  MdOutlineSearch,
} from 'react-icons/md';
import { FaUpload } from 'react-icons/fa6';
import { IoMdAdd, IoMdRemove, IoMdClose } from 'react-icons/io';
import { ProductContext } from '../Context/ProductContext';
import { UserContext } from '../Context/UserContext';
import { CartContext } from '../Context/Cart';
import { AdContext } from '../Context/AdsContext';

const AdminPanel = () => {
  // contexts
  const { products = [], AddProduct, deleteProduct } = useContext(ProductContext);
  const { users = [] } = useContext(UserContext);
  const { orders = [], deleteOrder, AddDiscount } = useContext(CartContext);
  const { ads = [], AddAd } = useContext(AdContext || { ads: [], AddAd: () => {} });

  // navigation
  const tabs = [
    { key: 'dashboard', label: 'Dashboard', icon: <MdOutlineDashboard /> },
    { key: 'users', label: 'Users', icon: <MdPeople /> },
    { key: 'products', label: 'Products', icon: <MdInventory /> },
    { key: 'orders', label: 'Orders', icon: <MdOutlineAddBox /> },
    { key: 'add', label: 'Add Product', icon: <MdOutlineAddBox /> },
    { key: 'discounts', label: 'Discounts', icon: <MdLocalOffer /> },
  ];
  const [activeTab, setActiveTab] = useState('dashboard');

  // common states
  const [search, setSearch] = useState('');
  const [perPage, setPerPage] = useState(8);
  const [page, setPage] = useState(0);
  const [confirm, setConfirm] = useState({ open: false, type: '', id: null, name: '' });
  const [toast, setToast] = useState('');

  // add product (form)
  const [form, setForm] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '',
    gender: '',
    material: '',
    colors: [],
    sizes: [],
    collection: '',
  });
  const [newColor, setNewColor] = useState('');
  const [newSize, setNewSize] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (!toast) return;
    const id = setTimeout(() => setToast(''), 3000);
    return () => clearTimeout(id);
  }, [toast]);

  // computed KPIs
  const stats = useMemo(() => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalUsers = users.length;
    const revenue = orders.reduce((acc, o) => acc + (parseFloat(o.total) || 0), 0);
    return { totalProducts, totalOrders, totalUsers, revenue };
  }, [products, orders, users]);

  // filtered lists
  const filteredProducts = useMemo(() => {
    const q = search.trim().toLowerCase();
    return products.filter(
      (p) =>
        !q ||
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q) ||
        p._id?.toString().includes(q)
    );
  }, [products, search]);

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase();
    return orders.filter(
      (o) =>
        !q ||
        o.user?.name?.toLowerCase().includes(q) ||
        o._id?.toString().includes(q) ||
        o.address?.toLowerCase().includes(q)
    );
  }, [orders, search]);

  const filteredUsers = useMemo(() => {
    const q = search.trim().toLowerCase();
    return users.filter((u) => !q || u.name?.toLowerCase().includes(q) || u.email?.toLowerCase().includes(q));
  }, [users, search]);

  // pagination helpers
  const totalPages = (list) => Math.max(1, Math.ceil(list.length / perPage));
  const currentPageItems = (list) => list.slice(page * perPage, page * perPage + perPage);

  // form handlers
  const updateForm = (field, value) => setForm((f) => ({ ...f, [field]: value }));
  const addColor = () => {
    if (!newColor) return setToast('Enter a color');
    if (form.colors.includes(newColor)) return setToast('Color exists');
    updateForm('colors', [...form.colors, newColor]);
    setNewColor('');
  };
  const removeColor = (c) => updateForm('colors', form.colors.filter((x) => x !== c));
  const addSize = () => {
    if (!newSize) return setToast('Enter a size');
    if (form.sizes.includes(newSize)) return setToast('Size exists');
    updateForm('sizes', [...form.sizes, newSize]);
    setNewSize('');
  };
  const removeSize = (s) => updateForm('sizes', form.sizes.filter((x) => x !== s));

  const onImageChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setImageFile(f);
    setImagePreview(URL.createObjectURL(f));
  };

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.price || !form.category) return setToast('Fill required fields');
    try {
      // call AddProduct from context (assumed signature similar to original)
      await AddProduct(
        form.name,
        form.description,
        form.price,
        form.quantity,
        form.category,
        form.gender,
        form.collection,
        form.sizes,
        form.colors,
        form.material,
        imageFile
      );
      setToast('Product created successfully');
      // reset
      setForm({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '',
        gender: '',
        material: '',
        colors: [],
        sizes: [],
        collection: '',
      });
      setImageFile(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setToast('Failed to create product');
    }
  };

  // confirm delete
  const requestDelete = (type, id, name) => setConfirm({ open: true, type, id, name });
  const performDelete = async () => {
    try {
      if (confirm.type === 'product') await deleteProduct(confirm.id);
      if (confirm.type === 'order') await deleteOrder(confirm.id);
      setToast('Deleted successfully');
    } catch (err) {
      console.error(err);
      setToast('Delete failed');
    } finally {
      setConfirm({ open: false, type: '', id: null, name: '' });
    }
  };

  const handleAddDiscount = (value) => {
    AddDiscount(value);
    setToast('Discount added');
  };

  // mini components (for readability inside same file)
  const KPI = ({ title, value, accent }) => (
    <div className="bg-white rounded-xl shadow p-4 flex-1 min-w-[160px]">
      <div className="text-sm text-gray-500">{title}</div>
      <div className={`mt-2 text-2xl font-bold ${accent || 'text-gray-900'}`}>{value}</div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        {/* layout: sidebar + content */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="w-full lg:w-64 bg-white rounded-xl shadow p-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Image src="/logo.png" alt="logo" width={48} height={48} className="rounded-md" />
              <div>
                <h3 className="font-bold text-lg">Admin</h3>
                <p className="text-xs text-gray-500">YourStore Dashboard</p>
              </div>
            </div>

            <nav className="flex flex-col gap-1 mt-3">
              {tabs.map((t) => (
                <button
                  key={t.key}
                  onClick={() => {
                    setActiveTab(t.key);
                    setPage(0);
                    setSearch('');
                  }}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition ${
                    activeTab === t.key ? 'bg-red-600 text-white' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <span className="text-xl">{t.icon}</span>
                  <span>{t.label}</span>
                </button>
              ))}
            </nav>

            <div className="mt-auto text-xs text-gray-400">
              © {new Date().getFullYear()} YourStore — Admin Panel
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Topbar: search & actions */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="relative w-full sm:w-[360px]">
                  <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-gray-400">
                    <MdOutlineSearch />
                  </div>
                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search products, orders, users..."
                    className="pl-10 pr-4 py-2 w-full rounded-lg border bg-white shadow-sm"
                  />
                </div>
                <div className="hidden sm:flex gap-2">
                  <button
                    onClick={() => setActiveTab('add')}
                    className="bg-black text-white px-4 py-2 rounded-lg text-sm"
                  >
                    New Product
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="text-xs text-gray-500">Signed as</div>
                  <div className="font-semibold">Admin</div>
                </div>
                <div className="bg-white p-2 rounded-full shadow">
                  <Image src="/admin-avatar.png" width={40} height={40} alt="admin" className="rounded-full" />
                </div>
              </div>
            </div>

            {/* Dashboard */}
            {activeTab === 'dashboard' && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                {/* KPIs */}
                <div className="flex gap-4 mb-6 flex-col md:flex-row">
                  <KPI title="Products" value={stats.totalProducts} accent="text-red-600" />
                  <KPI title="Orders" value={stats.totalOrders} accent="text-green-600" />
                  <KPI title="Users" value={stats.totalUsers} accent="text-blue-600" />
                  <KPI title="Revenue" value={`$${stats.revenue.toFixed(2)}`} accent="text-yellow-600" />
                </div>

                {/* Quick lists: latest products & orders */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl shadow p-4">
                    <h4 className="font-semibold mb-3">Latest Products</h4>
                    <ul className="flex flex-col gap-3">
                      {products.slice(0, 5).map((p) => (
                        <li key={p._id} className="flex items-center gap-3">
                          <Image src={p.Photo?.[0]?.url || '/placeholder.png'} width={56} height={56} alt="" className="rounded-md" />
                          <div className="flex-1">
                            <div className="font-medium">{p.name}</div>
                            <div className="text-xs text-gray-500">{p.category} • {p.gender}</div>
                          </div>
                          <div className="text-sm font-semibold text-green-600">${p.price}</div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-white rounded-xl shadow p-4">
                    <h4 className="font-semibold mb-3">Recent Orders</h4>
                    <ul className="flex flex-col gap-3">
                      {orders.slice(0, 5).map((o) => (
                        <li key={o._id} className="flex items-center justify-between gap-3">
                          <div>
                            <div className="font-medium">{o.user?.name || 'Customer'}</div>
                            <div className="text-xs text-gray-500">{new Date(o.createdAt).toLocaleDateString()}</div>
                          </div>
                          <div className="text-sm font-semibold">${o.total}</div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Users */}
            {activeTab === 'users' && (
              <section className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold mb-4">All Users ({users.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-xs text-gray-500">
                      <tr>
                        <th className="py-3">#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Profile</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems(filteredUsers).map((u, idx) => (
                        <tr key={u._id} className="border-t">
                          <td className="py-3">{page * perPage + idx + 1}</td>
                          <td className="font-medium">{u.name}</td>
                          <td className="text-sm text-gray-600">{u.email}</td>
                          <td>
                            <div className="flex items-center gap-2">
                              <Image src={u.profilePhoto?.url || '/avatar-placeholder.png'} width={36} height={36} alt="" className="rounded-full" />
                              <span className="text-sm text-gray-600">{u.ProfileName || '-'}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* pager */}
                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">Showing {currentPageItems(filteredUsers).length} of {filteredUsers.length}</div>
                  <div className="flex gap-2">
                    <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(0); }} className="border rounded px-2 py-1 text-sm">
                      <option value={5}>5</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                    </select>
                    <div className="flex gap-1 items-center">
                      <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-2 py-1 border rounded">Prev</button>
                      <button onClick={() => setPage((p) => Math.min(totalPages(filteredUsers) - 1, p + 1))} className="px-2 py-1 border rounded">Next</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Products */}
            {activeTab === 'products' && (
              <section className="bg-white rounded-xl shadow p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold">Products ({products.length})</h3>
                  <div className="text-sm text-gray-500">Search: <span className="font-medium">{search || '—'}</span></div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs text-gray-500">
                      <tr>
                        <th className="py-3">Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Qty</th>
                        <th>Gender</th>
                        <th>Price</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems(filteredProducts).map((p) => (
                        <tr key={p._id} className="border-t">
                          <td className="py-3"><Image src={p.Photo?.[0]?.url || '/placeholder.png'} width={48} height={48} alt="" className="rounded-md" /></td>
                          <td className="font-medium">{p.name}</td>
                          <td className="text-sm text-gray-600">{p.category}</td>
                          <td className="text-sm">{p.quantity}</td>
                          <td className="text-sm">{p.gender}</td>
                          <td className="text-sm font-semibold text-green-600">${p.price}</td>
                          <td>
                            <div className="flex gap-2">
                              <button onClick={() => requestDelete('product', p._id, p.name)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                              {/* future: edit button */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">Showing {currentPageItems(filteredProducts).length} of {filteredProducts.length}</div>
                  <div className="flex gap-2">
                    <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(0); }} className="border rounded px-2 py-1 text-sm">
                      <option value={5}>5</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                    </select>
                    <div className="flex gap-1 items-center">
                      <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-2 py-1 border rounded">Prev</button>
                      <button onClick={() => setPage((p) => Math.min(totalPages(filteredProducts) - 1, p + 1))} className="px-2 py-1 border rounded">Next</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Orders */}
            {activeTab === 'orders' && (
              <section className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold mb-3">Orders ({orders.length})</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="text-xs text-gray-500">
                      <tr>
                        <th>#</th>
                        <th>Customer</th>
                        <th>Date</th>
                        <th>Address</th>
                        <th>Items</th>
                        <th>Total</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPageItems(filteredOrders).map((o, idx) => (
                        <tr key={o._id} className="border-t">
                          <td className="py-3">{page * perPage + idx + 1}</td>
                          <td className="font-medium">{o.user?.name}</td>
                          <td className="text-sm text-gray-600">{new Date(o.createdAt).toLocaleDateString()}</td>
                          <td className="text-sm">{o.address}</td>
                          <td className="text-sm">{o.Products?.length || 0}</td>
                          <td className="text-sm font-semibold text-green-600">${o.total}</td>
                          <td>
                            <div className="flex gap-2">
                              <button onClick={() => requestDelete('order', o._id, `Order ${o._id}`)} className="px-3 py-1 border rounded text-red-600">Delete</button>
                              {/* future: view details */}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="text-xs text-gray-500">Showing {currentPageItems(filteredOrders).length} of {filteredOrders.length}</div>
                  <div className="flex gap-2">
                    <select value={perPage} onChange={(e) => { setPerPage(Number(e.target.value)); setPage(0); }} className="border rounded px-2 py-1 text-sm">
                      <option value={5}>5</option>
                      <option value={8}>8</option>
                      <option value={12}>12</option>
                    </select>
                    <div className="flex gap-1 items-center">
                      <button onClick={() => setPage((p) => Math.max(0, p - 1))} className="px-2 py-1 border rounded">Prev</button>
                      <button onClick={() => setPage((p) => Math.min(totalPages(filteredOrders) - 1, p + 1))} className="px-2 py-1 border rounded">Next</button>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {/* Add Product */}
            {activeTab === 'add' && (
              <section className="bg-white rounded-xl shadow p-6">
                <h3 className="font-semibold mb-4">Create New Product</h3>
                <form onSubmit={handleCreateProduct} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* left: image & preview */}
                  <div className="col-span-1 bg-gray-50 rounded-lg p-4 flex flex-col gap-3 items-center">
                    <div className="w-full flex flex-col items-center gap-2">
                      {imagePreview ? (
                        <Image src={imagePreview} alt="preview" width={280} height={280} className="rounded-md object-cover" />
                      ) : (
                        <div className="w-full h-56 border border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400">
                          <div className="text-center">
                            <FaUpload size={28} />
                            <div className="text-sm mt-2">Upload main image</div>
                          </div>
                        </div>
                      )}
                      <input id="product-image" type="file" accept="image/*" onChange={onImageChange} className="hidden" />
                      <label htmlFor="product-image" className="bg-black text-white px-4 py-2 rounded mt-2 cursor-pointer">Choose Image</label>
                    </div>

                    <div className="w-full mt-3">
                      <label className="text-xs text-gray-500">Collection (optional)</label>
                      <input value={form.collection} onChange={(e) => updateForm('collection', e.target.value)} className="w-full mt-1 p-2 border rounded" placeholder="e.g. Summer 2025" />
                    </div>
                  </div>

                  {/* middle: main fields */}
                  <div className="col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-gray-500">Name *</label>
                      <input value={form.name} onChange={(e) => updateForm('name', e.target.value)} className="w-full mt-1 p-2 border rounded" />
                    </div>
                    <div>
                      <label className="text-xs text-gray-500">Price *</label>
                      <input value={form.price} onChange={(e) => updateForm('price', e.target.value)} type="number" className="w-full mt-1 p-2 border rounded" />
                    </div>

                    <div className="md:col-span-2">
                      <label className="text-xs text-gray-500">Description</label>
                      <textarea value={form.description} onChange={(e) => updateForm('description', e.target.value)} className="w-full mt-1 p-2 border rounded h-28" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Category</label>
                      <input value={form.category} onChange={(e) => updateForm('category', e.target.value)} className="w-full mt-1 p-2 border rounded" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Gender</label>
                      <select value={form.gender} onChange={(e) => updateForm('gender', e.target.value)} className="w-full mt-1 p-2 border rounded">
                        <option value="">Select</option>
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Unisex">Unisex</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Material</label>
                      <input value={form.material} onChange={(e) => updateForm('material', e.target.value)} className="w-full mt-1 p-2 border rounded" />
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Quantity</label>
                      <input value={form.quantity} onChange={(e) => updateForm('quantity', e.target.value)} type="number" className="w-full mt-1 p-2 border rounded" />
                    </div>

                    {/* colors & sizes */}
                    <div>
                      <label className="text-xs text-gray-500">Add Color</label>
                      <div className="flex gap-2 mt-1">
                        <input value={newColor} onChange={(e) => setNewColor(e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. Red" />
                        <button type="button" onClick={addColor} className="px-3 py-2 bg-red-600 text-white rounded">Add</button>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {form.colors.map((c) => (
                          <span key={c} className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-2 text-sm">
                            {c}
                            <button type="button" onClick={() => removeColor(c)} className="text-xs text-red-600"><IoMdClose /></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-gray-500">Add Size</label>
                      <div className="flex gap-2 mt-1">
                        <input value={newSize} onChange={(e) => setNewSize(e.target.value)} className="flex-1 p-2 border rounded" placeholder="e.g. M" />
                        <button type="button" onClick={addSize} className="px-3 py-2 bg-red-600 text-white rounded">Add</button>
                      </div>
                      <div className="flex gap-2 mt-2 flex-wrap">
                        {form.sizes.map((s) => (
                          <span key={s} className="bg-gray-100 px-2 py-1 rounded-full flex items-center gap-2 text-sm">
                            {s}
                            <button type="button" onClick={() => removeSize(s)} className="text-xs text-red-600"><IoMdClose /></button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-2 flex gap-2 justify-end items-center mt-2">
                      <button type="submit" className="px-4 py-2 bg-black text-white rounded">Create Product</button>
                      <button type="button" onClick={() => { setForm({ name: '', description: '', price: '', quantity: '', category: '', gender: '', material: '', colors: [], sizes: [], collection: '' }); setImagePreview(null); setImageFile(null); }} className="px-4 py-2 border rounded">Reset</button>
                    </div>
                  </div>
                </form>
              </section>
            )}

            {/* Discounts */}
            {activeTab === 'discounts' && (
              <section className="bg-white rounded-xl shadow p-4">
                <h3 className="font-semibold mb-3">Discounts & Ads</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Create Discount</h4>
                    <DiscountForm onCreate={(v) => { handleAddDiscount(v); setToast('Discount created'); }} />
                  </div>
                  <div className="p-4 bg-gray-50 rounded">
                    <h4 className="font-medium mb-2">Ads</h4>
                    <div className="flex flex-col gap-3">
                      {ads?.map((ad, idx) => (
                        <div key={idx} className="flex items-center gap-3">
                          <Image src={ad.image || '/placeholder.png'} width={72} height={48} alt="" className="rounded-md object-cover" />
                          <div>
                            <div className="font-medium">{ad.title}</div>
                            <div className="text-xs text-gray-500">{ad.link}</div>
                          </div>
                        </div>
                      ))}
                      <button onClick={() => AddAd({ title: 'New Ad', link: '#', image: '/placeholder.png' })} className="px-3 py-2 bg-black text-white rounded w-fit">Add Ad</button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </main>
        </div>
      </div>

      {/* Confirm Modal */}
      <AnimateConfirm confirm={confirm} onClose={() => setConfirm({ open: false, type: '', id: null })} onConfirm={performDelete} />

      {/* Toast */}
      {toast && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="fixed top-6 right-6 bg-black text-white px-4 py-2 rounded shadow">
          {toast}
        </motion.div>
      )}
    </div>
  );
};

/* helper subcomponents */

// Animated Confirm Modal
const AnimateConfirm = ({ confirm, onClose, onConfirm }) => {
  if (!confirm.open) return null;
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-lg p-6 w-full max-w-md">
        <h4 className="font-semibold text-lg mb-2">Confirm Delete</h4>
        <p className="text-sm text-gray-600">Are you sure you want to delete <span className="font-medium">{confirm.name}</span>?</p>
        <div className="flex gap-3 justify-end mt-6">
          <button onClick={onClose} className="px-3 py-2 border rounded">Cancel</button>
          <button onClick={onConfirm} className="px-3 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </motion.div>
    </div>
  );
};

// Discount form
const DiscountForm = ({ onCreate }) => {
  const [value, setValue] = useState('');
  return (
    <form onSubmit={(e) => { e.preventDefault(); onCreate(Number(value)); setValue(''); }} className="flex gap-2 items-center">
      <input type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Discount %" className="p-2 border rounded w-full" />
      <button type="submit" className="px-3 py-2 bg-red-600 text-white rounded">Create</button>
    </form>
  );
};

export default AdminPanel;

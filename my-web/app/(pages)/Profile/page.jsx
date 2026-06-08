'use client';
import { useAppDispatch, useAppSelector } from '@/lib/redux/hooks';
import { fetchOrders, cancelOrder } from '@/lib/redux/slices/orderSlice';
import { logout, updateProfile } from '@/lib/redux/slices/authSlice';
import React, { useEffect, useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LogOut,
  Package,
  CheckCircle,
  XCircle,
  Clock,
  Shield,
  Heart,
  MapPin,
  Calendar,
  ChevronRight,
  Trash2,
  User,
  Loader2
} from 'lucide-react';
import { toast, ecommerceToasts } from '@/lib/toast';

const Profile = () => {
  const dispatch = useAppDispatch();
  const { orders: myOrders, loading } = useAppSelector(state => state.order);
  const user = useAppSelector(state => state.auth.user);

  // Editing profile states
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState("");
  const [editProfileName, setEditProfileName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    if (!editName || !editEmail) return toast.warning("Name and Email are required");
    
    setIsSaving(true);
    try {
      await dispatch(updateProfile({ name: editName, ProfileName: editProfileName, email: editEmail })).unwrap();
      setIsEditing(false);
    } catch (err) {
      // Error handled in slice/toast
    }
    setIsSaving(false);
  };

  useEffect(() => {
    if (user) {
      dispatch(fetchOrders());
    }
  }, [user, fetchOrders]);


  const stats = useMemo(() => ({
    delivered: myOrders.filter(o => o.status === "Delivered").length,
    pending: myOrders.filter(o => o.status === "Pending").length,
    total: myOrders.length
  }), [myOrders]);

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Delivered':
        return { icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-500/10', border: 'border-green-500/20' };
      case 'Canceled':
        return { icon: XCircle, color: 'text-destructive', bg: 'bg-destructive/10', border: 'border-destructive/20' };
      default:
        return { icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' };
    }
  };

  if (!user && !loading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-serif font-bold">Please Login</h1>
          <Link href="/Login" className="inline-block px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 md:px-8 bg-background">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Sidebar / Profile Card */}
          <div className="lg:w-1/3 flex-shrink-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="sticky top-24 bg-card border border-border rounded-2xl overflow-hidden shadow-lg"
            >
              <div className="h-32 bg-primary/10 relative overflow-hidden">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent" />
              </div>

              <div className="px-8 pb-8 relative">
                <div className="relative -mt-16 w-32 h-32 mx-auto">
                  <div className="w-full h-full rounded-full border-4 border-background shadow-lg overflow-hidden bg-muted relative">
                    <Image
                      src={user?.profilePhoto?.url || "/default-avatar.png"}
                      alt="Profile"
                      fill
                      className="object-cover"
                    />
                  </div>
                  {user?.isAdmin && (
                    <div className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full shadow-sm" title="Admin">
                      <Shield size={16} />
                    </div>
                  )}
                </div>

                {!isEditing ? (
                  <>
                    <div className="text-center mt-4 space-y-1">
                      <h2 className="text-2xl font-serif font-bold truncate">{user?.name}</h2>
                      {user?.ProfileName && <p className="text-[10px] uppercase tracking-widest font-black text-accent">{user.ProfileName}</p>}
                      <p className="text-muted-foreground text-sm truncate">{user?.email}</p>
                    </div>

                    <div className="flex justify-center gap-6 mt-8 py-6 border-y border-border">
                      <div className="text-center">
                        <div className="text-2xl font-bold">{stats.total}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Orders</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{stats.delivered}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Delivered</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">{user?.favorites?.length || 0}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Wishlist</div>
                      </div>
                    </div>

                    <nav className="mt-8 space-y-3">
                      <button
                        onClick={() => {
                          setEditName(user?.name || "");
                          setEditProfileName(user?.ProfileName || "");
                          setEditEmail(user?.email || "");
                          setIsEditing(true);
                        }}
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-muted transition-colors group text-left text-sm font-medium"
                      >
                        <span className="flex items-center gap-3">
                          <User className="w-5 h-5 text-muted-foreground" />
                          Edit Curation Profile
                        </span>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </button>

                      <Link
                        href="/Wishlist"
                        className="flex items-center justify-between w-full p-4 rounded-xl hover:bg-muted transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Heart className="w-5 h-5 text-muted-foreground group-hover:text-destructive transition-colors" />
                          <span className="font-medium text-sm">My Wishlist</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground" />
                      </Link>

                      <button
                        onClick={() => dispatch(logout())}
                        className="w-full p-4 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 transition-colors flex items-center justify-center gap-2 font-medium mt-4 text-sm"
                      >
                        <LogOut size={16} /> Sign Out
                      </button>
                    </nav>
                  </>
                ) : (
                  <form onSubmit={handleSaveProfile} className="mt-6 space-y-6 text-left">
                    <div className="space-y-4">
                      <div className="relative group w-full">
                        <input
                          type="text" value={editName} onChange={(e) => setEditName(e.target.value)} required
                          className="peer w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder-transparent text-foreground font-medium"
                          placeholder="Full Name" id="edit-name"
                        />
                        <label htmlFor="edit-name" className="absolute left-0 top-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground peer-focus:-top-4 peer-focus:text-accent peer-valid:-top-4 transition-all pointer-events-none">Full Name</label>
                      </div>

                      <div className="relative group w-full">
                        <input
                          type="text" value={editProfileName} onChange={(e) => setEditProfileName(e.target.value)} required
                          className="peer w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder-transparent text-foreground font-medium"
                          placeholder="Profile Handle" id="edit-profilename"
                        />
                        <label htmlFor="edit-profilename" className="absolute left-0 top-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground peer-focus:-top-4 peer-focus:text-accent peer-valid:-top-4 transition-all pointer-events-none">Profile Handle</label>
                      </div>

                      <div className="relative group w-full">
                        <input
                          type="email" value={editEmail} onChange={(e) => setEditEmail(e.target.value)} required
                          className="peer w-full bg-transparent border-b border-border py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder-transparent text-foreground font-medium"
                          placeholder="Email Address" id="edit-email"
                        />
                        <label htmlFor="edit-email" className="absolute left-0 top-2 text-[9px] font-bold uppercase tracking-widest text-muted-foreground peer-focus:-top-4 peer-focus:text-accent peer-valid:-top-4 transition-all pointer-events-none">Email Address</label>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        disabled={isSaving}
                        className="flex-1 py-3 text-xs uppercase tracking-widest font-bold border border-border rounded-xl hover:bg-muted transition-colors disabled:opacity-50"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={isSaving}
                        className="flex-1 py-3 text-xs uppercase tracking-widest font-bold bg-black text-white dark:bg-white dark:text-black rounded-xl hover:opacity-85 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {isSaving ? <Loader2 className="animate-spin" size={14} /> : 'Save'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          </div>

          {/* Main Content / Orders */}
          <div className="flex-1 space-y-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-serif font-bold mb-2">Order History</h1>
              <p className="text-muted-foreground">View and track your recent orders.</p>
            </div>

            {loading ? (
              <div className="space-y-6">
                {[1, 2, 3].map(i => (
                  <div key={i} className="h-48 bg-muted/50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : myOrders.length > 0 ? (
              <div className="space-y-6">
                <AnimatePresence>
                  {myOrders.map((order, index) => {
                    const status = order.status || 'Pending';
                    const config = getStatusConfig(status);
                    const StatusIcon = config.icon;

                    return (
                      <motion.div
                        key={order._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 group"
                      >
                        <div className="flex flex-col md:flex-row justify-between gap-6">

                          {/* Order Info */}
                          <div className="flex items-start gap-4">
                            <div className={`p-3 rounded-xl ${config.bg} ${config.color}`}>
                              <Package size={24} />
                            </div>
                            <div className="space-y-2">
                              <div className="flex flex-wrap items-center gap-3">
                                <h3 className="font-bold text-lg">Order #{order._id.slice(-6).toUpperCase()}</h3>
                                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 ${config.bg} ${config.color} border ${config.border}`}>
                                  <StatusIcon size={12} /> {status}
                                </span>
                              </div>
                              <div className="text-sm text-muted-foreground space-y-1">
                                <div className="flex items-center gap-2">
                                  <Calendar size={14} />
                                  {new Date(order.createdAt).toLocaleDateString(undefined, {
                                    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
                                  })}
                                </div>
                                <div className="flex items-center gap-2">
                                  <MapPin size={14} />
                                  {order.address}
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Order Actions */}
                          <div className="flex flex-row md:flex-col justify-between md:items-end gap-4 border-t md:border-t-0 border-border pt-4 md:pt-0">
                            <div className="text-right">
                              <p className="text-xs text-muted-foreground font-bold uppercase tracking-wider">Total</p>
                              <p className="text-2xl font-serif font-bold">${order.total}</p>
                            </div>

                            {status !== 'Delivered' && (
                              <button
                                onClick={() => {
                                  if (confirm("Are you sure you wish to cancel this order?")) {
                                    dispatch(cancelOrder(order._id));
                                  }
                                }}
                                className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-destructive transition-colors px-3 py-2 rounded-full hover:bg-destructive/10"
                              >
                                <Trash2 size={14} /> Cancel Order
                              </button>
                            )}

                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>
            ) : (
              <div className="text-center py-24 bg-muted/30 rounded-3xl border border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-serif font-bold">No orders yet</h3>
                <p className="text-muted-foreground mt-2 max-w-sm mx-auto mb-8">
                  You have not placed any orders yet. Discover our latest collections today.
                </p>
                <Link
                  href="/Shop"
                  className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-bold uppercase tracking-widest hover:shadow-lg hover:-translate-y-1 transition-all"
                >
                  Start Shopping
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

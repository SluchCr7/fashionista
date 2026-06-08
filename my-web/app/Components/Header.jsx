'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Heart, User, Menu, Sun, Moon, X, ArrowUpRight, LogOut } from 'lucide-react';

import { useAppSelector, useAppDispatch } from '@/lib/redux/hooks';
import { setTheme } from '@/lib/redux/slices/themeSlice';
import { logout } from '@/lib/redux/slices/authSlice';

import ProductNavSearch from './ProductNavSearch';
import CartShop from './CartShop';

const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Shop', link: '/Shop' },
  { name: 'Men', link: '/Men' },
  { name: 'Women', link: '/Women' },
  { name: 'Kids', link: '/Kids' },
  { name: 'Shoes', link: '/Shoes' },
  { name: 'Accessories', link: '/Accessories' },
];

const megamenuData = {
  Men: {
    categories: [
      { name: 'Suits & Blazers', link: '/Shop?gender=Men&category=Suits' },
      { name: 'Outerwear & Jackets', link: '/Shop?gender=Men&category=Jackets' },
      { name: 'Formal Shirts', link: '/Shop?gender=Men&category=Shirts' },
      { name: 'Casual T-Shirts', link: '/Shop?gender=Men&category=T-Shirts' },
      { name: 'Trousers & Denim', link: '/Shop?gender=Men&category=Pants' },
      { name: 'Active Shorts', link: '/Shop?gender=Men&category=Shorts' }
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1617137968427-85924c800a22?q=80&w=600&auto=format&fit=crop",
      title: "The Menswear Atelier",
      subtitle: "Chapter I — Modern Tailoring",
      link: "/Shop?gender=Men"
    }
  },
  Women: {
    categories: [
      { name: 'Evening Dresses', link: '/Shop?gender=Women&category=Dresses' },
      { name: 'Tailored Jackets', link: '/Shop?gender=Women&category=Jackets' },
      { name: 'Silk Shirts & Tops', link: '/Shop?gender=Women&category=Shirts' },
      { name: 'Minimalist T-Shirts', link: '/Shop?gender=Women&category=T-Shirts' },
      { name: 'Structured Pants', link: '/Shop?gender=Women&category=Pants' },
      { name: 'Pleated Skirts', link: '/Shop?gender=Women&category=Skirts' }
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=600&auto=format&fit=crop",
      title: "La Femme Spring",
      subtitle: "Chapter II — Summer Elegance",
      link: "/Shop?gender=Women"
    }
  },
  Shoes: {
    categories: [
      { name: 'All Footwear', link: '/Shoes' },
      { name: 'Leather Loafers', link: '/Shoes' },
      { name: 'Formal Shoes', link: '/Shoes' },
      { name: 'Premium Sneakers', link: '/Shoes' },
      { name: 'Atelier Boots', link: '/Shoes' }
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600&auto=format&fit=crop",
      title: "Walk The Talk",
      subtitle: "Department 05 — Footwear Campaign",
      link: "/Shoes"
    }
  },
  Accessories: {
    categories: [
      { name: 'Leather Bags', link: '/Shop?category=Accessories' },
      { name: 'Atelier Belts', link: '/Shop?category=Accessories' },
      { name: 'Private Wallets', link: '/Shop?category=Accessories' },
      { name: 'Classic Sunglasses', link: '/Shop?category=Accessories' },
      { name: 'Minimal Jewelry', link: '/Shop?category=Accessories' }
    ],
    featured: {
      image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600&auto=format&fit=crop",
      title: "Objet d'Art",
      subtitle: "Chapter III — Curated Details",
      link: "/Accessories"
    }
  }
};

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  
  // Custom navigation states
  const [hoveredTab, setHoveredTab] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();
  const router = useRouter();
  const user = useAppSelector(state => state.auth.user);
  const products = useAppSelector(state => state.product.products);
  const theme = useAppSelector(state => state.theme.theme);
  const dispatch = useAppDispatch();

  // Handle scroll events
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  // Lock body scroll when mobile menu is active
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  // Handle Search Filtering
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
    } else {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results);
    }
  }, [search, products]);

  // Keyboard shortcut for search focus
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (
        (e.ctrlKey && e.key === 'k') || 
        (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA')
      ) {
        e.preventDefault();
        setShowSearch(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleTheme = () => {
    dispatch(setTheme(theme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0, opacity: 1 },
          hidden: { y: -100, opacity: 0 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 mx-auto w-full max-w-7xl px-4 md:px-8 py-4 ${isScrolled ? 'top-2 md:top-4' : 'top-4 md:top-6'}`}
      >
        <div 
          className={`flex items-center justify-between transition-all duration-700 overflow-visible ${isScrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl px-6 py-3 rounded-full border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]' : 'bg-transparent py-2 px-2'}`}
        >
          {/* Brand / Logo */}
          <Link href="/" className="group relative z-50 flex items-center shrink-0">
            <h1 className="text-xl md:text-2xl font-serif font-black tracking-[-0.05em] uppercase text-black dark:text-white transition-opacity group-hover:opacity-70">
              Fashion<span className="text-accent italic font-light">ista.</span>
            </h1>
          </Link>

          {/* Desktop Pill Navigation */}
          <nav 
            className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2"
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className={`flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md transition-all duration-700 ${isScrolled ? 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5' : 'bg-transparent'}`}>
              {navLinks.slice(0, 7).map((link) => {
                const isActive = pathname === link.link;
                const hasMenu = ['Men', 'Women', 'Shoes', 'Accessories'].includes(link.name);
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    onMouseEnter={() => {
                      if (hasMenu) setHoveredTab(link.name);
                      else setHoveredTab(null);
                    }}
                    className="relative px-4 py-2 rounded-full overflow-hidden group"
                  >
                    {isActive && (
                      <motion.div 
                        layoutId="nav-pill-bg"
                        className="absolute inset-0 bg-black dark:bg-white rounded-full z-0"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span 
                      className={`relative z-10 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors duration-300 ${isActive ? 'text-white dark:text-black' : 'text-black/60 dark:text-white/60 group-hover:text-black dark:group-hover:text-white'}`}
                    >
                      {link.name}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* Megamenu Dropdown Container */}
            <AnimatePresence>
              {hoveredTab && megamenuData[hoveredTab] && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-full left-1/2 -translate-x-1/2 w-[800px] z-50 pt-3"
                  onMouseEnter={() => setHoveredTab(hoveredTab)}
                  onMouseLeave={() => setHoveredTab(null)}
                >
                  <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[2rem] border border-black/5 dark:border-white/10 shadow-2xl p-8">
                    <div className="grid grid-cols-12 gap-8 text-left">
                      {/* Subcategories (left side) */}
                      <div className="col-span-6 space-y-6">
                        <h4 className="text-[10px] font-bold tracking-[0.3em] uppercase text-black/40 dark:text-white/40 border-b border-black/5 dark:border-white/5 pb-2">
                          Shop {hoveredTab}
                        </h4>
                        <div className="grid grid-cols-2 gap-4">
                          {megamenuData[hoveredTab].categories.map((sub, idx) => (
                            <Link
                              key={idx}
                              href={sub.link}
                              onClick={() => setHoveredTab(null)}
                              className="text-xs font-black uppercase tracking-widest text-black/70 dark:text-white/70 hover:text-accent hover:translate-x-1.5 transition-all duration-300"
                            >
                              {sub.name}
                            </Link>
                          ))}
                        </div>
                      </div>

                      {/* Featured Item (right side) */}
                      <div className="col-span-6 relative rounded-2xl overflow-hidden aspect-[16/9] group/card">
                        <Link 
                          href={megamenuData[hoveredTab].featured.link}
                          onClick={() => setHoveredTab(null)}
                        >
                          <Image
                            src={megamenuData[hoveredTab].featured.image}
                            alt={megamenuData[hoveredTab].featured.title}
                            fill
                            className="object-cover group-hover/card:scale-105 transition-transform duration-[1.5s]"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          <div className="absolute inset-6 flex flex-col justify-end text-white space-y-1">
                            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-white/60">
                              {megamenuData[hoveredTab].featured.subtitle}
                            </span>
                            <h4 className="text-lg font-serif font-black italic tracking-tighter leading-none">
                              {megamenuData[hoveredTab].featured.title}
                            </h4>
                            <span className="text-[8px] font-bold tracking-[0.2em] uppercase underline decoration-accent underline-offset-4 pt-1">
                              Discover
                            </span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 md:gap-3 relative z-50 shrink-0">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
              aria-label="Search"
              title="Search Archive (Ctrl+K or /)"
            >
              <Search strokeWidth={2} size={18} />
            </button>

            <button
              onClick={toggleTheme}
              className="hidden sm:flex p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
              aria-label="Toggle Theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {theme === 'dark' ? <Sun strokeWidth={2} size={18} /> : <Moon strokeWidth={2} size={18} />}
              </motion.div>
            </button>

            <Link 
              href="/Wishlist" 
              className="hidden sm:flex relative p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-red-500 dark:text-white/70 dark:hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
              aria-label="Wishlist"
            >
              <Heart strokeWidth={2} size={18} />
              {user?.favorites?.length > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-accent text-[8px] font-bold text-white shadow-sm"
                >
                  {user.favorites.length}
                </motion.span>
              )}
            </Link>

            {/* Profile Dropdown Container */}
            <div 
              className="relative hidden sm:block"
              onMouseEnter={() => setProfileOpen(true)}
              onMouseLeave={() => setProfileOpen(false)}
            >
              <button
                onClick={() => router.push(user ? '/Profile' : '/Login')}
                className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
                aria-label="Profile"
              >
                {user?.profilePhoto?.url ? (
                  <div className="w-[18px] h-[18px] rounded-full overflow-hidden relative">
                    <Image src={user.profilePhoto.url} alt={user.name} fill className="object-cover" />
                  </div>
                ) : (
                  <User strokeWidth={2} size={18} />
                )}
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full pt-2 w-72 z-50 text-left"
                  >
                    <div className="bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-3xl p-6 rounded-2xl border border-black/5 dark:border-white/10 shadow-2xl space-y-4">
                      {user ? (
                        <>
                          <div className="flex items-center gap-3 pb-3 border-b border-black/5 dark:border-white/5">
                            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 relative overflow-hidden shrink-0">
                              <Image src={user.profilePhoto?.url || "/default-avatar.png"} alt="Avatar" fill className="object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="font-serif font-black text-sm text-black dark:text-white truncate">{user.name}</p>
                              <p className="text-[10px] text-black/40 dark:text-white/40 truncate">{user.email}</p>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2.5 text-[10px] font-bold tracking-widest uppercase">
                            {user.isAdmin && (
                              <Link 
                                href="/Admin" 
                                onClick={() => setProfileOpen(false)}
                                className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                                Admin Terminal
                              </Link>
                            )}
                            <Link 
                              href="/Profile" 
                              onClick={() => setProfileOpen(false)}
                              className="hover:text-accent transition-colors"
                            >
                              Account Curation
                            </Link>
                            <Link 
                              href="/Profile" 
                              onClick={() => setProfileOpen(false)}
                              className="hover:text-accent transition-colors"
                            >
                              Order History
                            </Link>
                            <Link 
                              href="/Wishlist" 
                              onClick={() => setProfileOpen(false)}
                              className="hover:text-accent transition-colors"
                            >
                              Private Wishlist
                            </Link>
                          </div>

                          <button
                            onClick={() => {
                              setProfileOpen(false);
                              dispatch(logout());
                            }}
                            className="w-full py-3 border border-destructive/20 text-destructive hover:bg-destructive/10 hover:border-destructive/30 transition-colors flex items-center justify-center gap-2 font-bold text-[9px] uppercase tracking-widest rounded-xl"
                          >
                            <LogOut size={12} /> Sign Out
                          </button>
                        </>
                      ) : (
                        <div className="space-y-4">
                          <div className="text-center space-y-1">
                            <h4 className="font-serif font-black text-sm uppercase text-black dark:text-white">Resume Journey</h4>
                            <p className="text-[9px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wider">Access your private archive</p>
                          </div>
                          <div className="flex flex-col gap-2">
                            <Link 
                              href="/Login" 
                              onClick={() => setProfileOpen(false)}
                              className="w-full py-3 bg-black text-white dark:bg-white dark:text-black font-bold text-[9px] uppercase tracking-widest text-center hover:opacity-85 transition-opacity rounded-xl"
                            >
                              Sign In
                            </Link>
                            <Link 
                              href="/Register" 
                              onClick={() => setProfileOpen(false)}
                              className="w-full py-3 border border-black/10 dark:border-white/10 font-bold text-[9px] uppercase tracking-widest text-center hover:bg-black/5 dark:hover:bg-white/5 transition-all rounded-xl"
                            >
                              Apply
                            </Link>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative flex items-center shrink-0">
              <CartShop />
            </div>

            <button
              className="lg:hidden flex items-center justify-center p-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform shrink-0"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Menu"
            >
              <Menu strokeWidth={2.5} size={18} />
            </button>
          </div>
        </div>

        {/* Search Overlay dropdown */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, scale: 0.95, y: -10, filter: "blur(10px)" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="absolute top-full left-0 right-0 mt-4 mx-4 md:mx-0 bg-white/95 dark:bg-[#0a0a0a]/95 backdrop-blur-2xl p-6 md:p-10 rounded-[2rem] shadow-2xl z-40 border border-black/5 dark:border-white/10"
            >
              <ProductNavSearch
                setShowSearch={setShowSearch}
                search={search}
                setSearch={setSearch}
                filteredProducts={filteredProducts}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Heroic Full-Screen Mobile Nav */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[200] bg-white dark:bg-[#0a0a0a] flex flex-col pt-24 pb-8 px-6 lg:hidden"
          >
            {/* Nav Header */}
            <div className="absolute top-6 left-6 right-6 flex justify-between items-center">
              <span className="text-xl font-serif font-black tracking-[-0.05em] uppercase text-black dark:text-white">
                Fashion<span className="text-accent italic font-light">ista.</span>
              </span>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-3 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white hover:bg-black/10 dark:hover:bg-white/20 transition-colors"
              >
                <X strokeWidth={2} size={20} />
              </button>
            </div>

            {/* Expansive Navigation Links */}
            <div className="flex-1 flex flex-col justify-center gap-1 h-full overflow-y-auto overflow-x-hidden no-scrollbar">
              {navLinks.map((link, idx) => {
                const isActive = pathname === link.link;
                return (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ delay: 0.1 + (idx * 0.08), duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <Link
                      href={link.link}
                      onClick={() => setMobileMenuOpen(false)}
                      className="group flex items-center justify-between py-5 border-b border-black/5 dark:border-white/5 overflow-hidden"
                    >
                      <span 
                        className={`text-5xl md:text-6xl font-serif font-black uppercase tracking-tighter transition-all duration-500 group-hover:translate-x-4 ${isActive ? 'text-black dark:text-white italic' : 'text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white group-hover:italic'}`}
                      >
                        {link.name}
                      </span>
                      <span className={`bg-black text-white dark:bg-white dark:text-black p-3.5 rounded-full transition-all duration-500 ${isActive ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12 group-hover:opacity-100 group-hover:translate-x-0'}`}>
                        <ArrowUpRight strokeWidth={2.5} size={24} />
                      </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* Utility Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="mt-6 flex items-center justify-between border-t border-black/10 dark:border-white/10 pt-6"
            >
              <div className="flex gap-3">
                <button
                  onClick={toggleTheme}
                  className="p-3.5 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/20"
                >
                  {theme === 'dark' ? <Sun strokeWidth={2} size={20} /> : <Moon strokeWidth={2} size={20} />}
                </button>
                <Link href="/Wishlist" onClick={() => setMobileMenuOpen(false)} className="p-3.5 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/20">
                  <Heart strokeWidth={2} size={20} />
                </Link>
                <Link href={user ? "/Profile" : "/Login"} onClick={() => setMobileMenuOpen(false)} className="p-3.5 rounded-full bg-black/5 dark:bg-white/10 text-black dark:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/20">
                  <User strokeWidth={2} size={20} />
                </Link>
              </div>
              <p className="text-[10px] uppercase font-bold tracking-[0.2em] text-black/40 dark:text-white/40">
                © Fashionista
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

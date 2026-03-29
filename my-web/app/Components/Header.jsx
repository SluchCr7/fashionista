'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Heart, User, Menu, Sun, Moon, X, ArrowUpRight } from 'lucide-react';

import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';
import { useTheme } from '../Context/ThemeContext';

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

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();
  const pathname = usePathname();
  const { user } = useContext(AuthContext);
  const { products } = useContext(ProductContext);
  const { theme, setTheme } = useTheme();

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
      setFilteredProducts(results.slice(0, 5));
    }
  }, [search, products]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
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
          className={`flex items-center justify-between transition-all duration-700 overflow-hidden ${isScrolled ? 'bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-2xl px-6 py-3 rounded-full border border-black/5 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgb(255,255,255,0.02)]' : 'bg-transparent py-2 px-2'}`}
        >
          {/* Brand / Logo */}
          <Link href="/" className="group relative z-50 flex items-center shrink-0">
            <h1 className="text-xl md:text-2xl font-serif font-black tracking-[-0.05em] uppercase text-black dark:text-white transition-opacity group-hover:opacity-70">
              Fashion<span className="text-accent italic font-light">ista.</span>
            </h1>
          </Link>

          {/* Desktop Pill Navigation */}
          <nav className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2">
            <div className={`flex items-center gap-1 p-1.5 rounded-full backdrop-blur-md transition-all duration-700 ${isScrolled ? 'bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5' : 'bg-transparent'}`}>
              {navLinks.slice(0, 6).map((link) => {
                const isActive = pathname === link.link;
                return (
                  <Link
                    key={link.name}
                    href={link.link}
                    className="relative px-5 py-2 rounded-full overflow-hidden group"
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
          </nav>

          {/* Right Utilities */}
          <div className="flex items-center gap-2 md:gap-3 relative z-50 shrink-0">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
              aria-label="Search"
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
              className="hidden sm:flex p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-red-500 dark:text-white/70 dark:hover:text-red-500 transition-colors hover:bg-red-50 dark:hover:bg-red-950/30 shrink-0"
              aria-label="Wishlist"
            >
              <Heart strokeWidth={2} size={18} />
            </Link>

            <Link 
              href={user ? '/Profile' : '/Login'} 
              className="hidden sm:flex p-2.5 rounded-full bg-black/5 dark:bg-white/5 text-black/70 hover:text-black dark:text-white/70 dark:hover:text-white transition-colors hover:bg-black/10 dark:hover:bg-white/10 shrink-0"
              aria-label="Profile"
            >
              <User strokeWidth={2} size={18} />
            </Link>

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

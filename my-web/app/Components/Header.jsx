'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { Search, Heart, User, Menu, Sun, Moon, X, ShoppingBag } from 'lucide-react';

import { AuthContext } from '../Context/AuthContext';
import { ProductContext } from '../Context/ProductContext';
import { useTheme } from '../Context/ThemeContext';
import { CartContext } from '../Context/CartContext';


import ProductNavSearch from './ProductNavSearch';
import CartShop from './CartShop';

const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Shop', link: '/Shop' },
  { name: 'Collections', link: '/Collections' },
  { name: 'Men', link: '/Men' },
  { name: 'Women', link: '/Women' },
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

  // Smart Header Hide/Show on Scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    setIsScrolled(latest > 20);
  });

  // Search Logic
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
    } else {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(results.slice(0, 5)); // Limit to 5 results for dropdown
    }
  }, [search, products]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -100 },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${isScrolled
          ? 'bg-background/80 backdrop-blur-xl border-border/40 shadow-sm py-3'
          : 'bg-transparent border-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="group relative z-50">
            <h1 className={`text-2xl md:text-3xl font-serif font-bold tracking-tighter ${!isScrolled && pathname === '/' && !mobileMenuOpen ? 'text-white md:text-foreground' : 'text-foreground'
              }`}>
              FASHION<span className="text-primary italic">ISTA</span>
            </h1>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.link;
              return (
                <Link
                  key={link.name}
                  href={link.link}
                  className={`relative text-sm font-medium uppercase tracking-widest transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Search Toggle */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-muted/50"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="hidden md:block p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-muted/50"
              aria-label="Toggle Theme"
            >
              <AnimatePresence mode='wait'>
                {theme === 'dark' ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="w-5 h-5" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>

            {/* Wishlist */}
            <Link
              href="/Wishlist"
              className="hidden md:block p-2 text-foreground hover:text-destructive transition-colors rounded-full hover:bg-muted/50"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
            </Link>

            {/* Account */}
            <Link
              href={user ? '/Profile' : '/Login'}
              className="hidden md:block p-2 text-foreground hover:text-primary transition-colors rounded-full hover:bg-muted/50"
              aria-label="Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Cart */}
            <div className="relative">
              <CartShop />
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 text-foreground z-50"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="border-t border-border bg-background/95 backdrop-blur-xl"
            >
              <div className="container mx-auto px-4 py-8 relative">
                <ProductNavSearch
                  setShowSearch={setShowSearch}
                  search={search}
                  setSearch={setSearch}
                  filteredProducts={filteredProducts}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-muted rounded-full"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-background/98 backdrop-blur-xl md:hidden flex flex-col pt-24 px-6"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.link}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-3xl font-serif font-bold text-foreground hover:text-primary"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}

              <div className="h-px bg-border my-4" />

              <div className="flex flex-col gap-4 text-lg font-medium">
                <Link href="/Wishlist" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                  <Heart className="w-5 h-5" /> Wishlist
                </Link>
                <Link href={user ? '/Profile' : '/Login'} onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-3">
                  <User className="w-5 h-5" /> {user ? 'Profile' : 'Login'}
                </Link>
                <button onClick={toggleTheme} className="flex items-center gap-3 text-left">
                  {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                  {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

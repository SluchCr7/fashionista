'use client';
import React, { useState, useEffect, useContext } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Heart, User, ShoppingBag, Menu, Sun, Moon, X } from 'lucide-react';

import { UserContext } from '../Context/UserContext';
import { ProductContext } from '../Context/ProductContext';
import { useTheme } from '../Context/ThemeContext';
import ProductNavSearch from './ProductNavSearch';
import CartShop from './CartShop';
import MobileNav from './MobileNav';

const topBarLinks = [
  { name: 'About Us', link: '/About' },
  { name: 'Help Center', link: '/FAQ' },
  { name: 'Contact', link: '/Contact' },
  { name: 'Shipping Policy', link: '/Shipping' },
];

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

  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const { products, cart } = useContext(ProductContext);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!search.trim()) setFilteredProducts([]);
    else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 font-sans ${isScrolled
            ? 'bg-background/80 backdrop-blur-md shadow-sm py-3'
            : 'bg-transparent py-5'
          }`}
      >
        <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group">
            <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tighter text-foreground">
              FASHION<span className="text-destructive">ISTA</span>
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
                  className={`relative text-sm font-medium uppercase tracking-wider transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-muted-foreground'
                    }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.span
                      layoutId="underline"
                      className="absolute -bottom-1 left-0 w-full h-[1.5px] bg-primary"
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search className="w-5 h-5 md:w-6 md:h-6" />
            </button>

            <button
              onClick={toggleTheme}
              className="hidden md:block text-foreground hover:text-primary transition-colors"
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 md:w-6 md:h-6" />
              ) : (
                <Moon className="w-5 h-5 md:w-6 md:h-6" />
              )}
            </button>

            <Link
              href="/Wishlist"
              className="hidden md:block text-foreground hover:text-destructive transition-colors"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5 md:w-6 md:h-6" />
            </Link>

            <Link
              href={user ? '/Profile' : '/Login'}
              className="hidden md:block text-foreground hover:text-primary transition-colors"
              aria-label="Account"
            >
              <User className="w-5 h-5 md:w-6 md:h-6" />
            </Link>

            <div className="relative">
              <CartShop />
              {cart?.length > 0 && (
                <span className="absolute -top-1 -right-2 bg-destructive text-destructive-foreground text-[10px] w-4 h-4 flex items-center justify-center rounded-full">
                  {cart.length}
                </span>
              )}
            </div>

            <button
              className="md:hidden text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Search Overlay */}
        <AnimatePresence>
          {showSearch && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 w-full bg-background border-b border-border shadow-lg p-4"
            >
              <div className="container mx-auto max-w-2xl relative">
                <ProductNavSearch
                  setShowSearch={setShowSearch}
                  search={search}
                  setSearch={setSearch}
                  filteredProducts={filteredProducts}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-[60] bg-background flex flex-col p-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-serif font-bold">Menu</h2>
              <button onClick={() => setMobileMenuOpen(false)}>
                <X className="w-8 h-8" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 text-lg font-medium">
              {navLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-foreground hover:text-primary"
                >
                  {link.name}
                </Link>
              ))}
              <div className="h-px bg-border my-2" />
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
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;

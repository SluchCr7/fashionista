'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { TbLogin2 } from "react-icons/tb";
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { navLinks, pages, socialLinks } from '../Data';
import CartShop from './CartShop';
import MobileNav from './MobileNav';
import { UserContext } from '../Context/UserContext';
import { ProductContext } from '../Context/ProductContext';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const { products, cart } = useContext(ProductContext);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Filter products
  useEffect(() => {
    if (!search.trim()) {
      setFilteredProducts([]);
    } else {
      setFilteredProducts(
        products.filter((prod) =>
          prod.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, products]);

  return (
    <header className="w-full z-50 sticky top-0">
      {/* Top Header */}
      <div className="hidden md:flex justify-between items-center bg-gray-100 text-gray-600 px-8 py-2 text-sm">
        <div className="flex gap-4">
          {pages.map((page, i) => (
            <Link key={i} href={page.link} className="hover:text-black transition">
              {page.name}
            </Link>
          ))}
        </div>
        <span className="text-xs font-medium">🚚 Free Shipping on Orders Over $100</span>
        <div className="flex items-center gap-4">
          {socialLinks.map((s, i) => (
            <Link key={i} href={s.link} className="hover:text-black text-lg">{s.icon}</Link>
          ))}
        </div>
      </div>

      {/* Main Header */}
      <nav className={`flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-300
        ${isScrolled ? "bg-white shadow-md" : "bg-transparent"}`}>
        
        {/* Logo + Nav */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold uppercase tracking-wide">
            Fashionista
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ name, link }, i) => {
              const active = pathname === link;
              return (
                <Link
                  key={i}
                  href={link}
                  className={`relative text-sm uppercase font-medium transition
                    ${active ? "text-red-500" : "text-gray-700 hover:text-black"}`}
                >
                  {name}
                  {active && <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-red-500"></span>}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <div className="relative hidden md:flex items-center">
            <IoIosSearch
              className="text-2xl cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setShowSearch(!showSearch)}
            />
          </div>

          {/* Wishlist */}
          <Link href="/Wishlist" className="hidden md:flex text-2xl text-gray-600 hover:text-red-500">
            <FaHeart />
          </Link>

          {/* User */}
          {user ? null : (
            <Link href="/Login" className="text-2xl text-gray-600 hover:text-red-500">
              <TbLogin2 />
            </Link>
          )}

          {/* Cart */}
          <div className="relative">
            <CartShop />
            {cart?.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cart.length}
              </span>
            )}
          </div>

          {/* Mobile Nav */}
          <div className="flex md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 flex items-start justify-center z-50 pt-28"
          >
            <motion.div
              initial={{ y: -50 }}
              animate={{ y: 0 }}
              exit={{ y: -50 }}
              className="bg-white w-[90%] md:w-[600px] rounded-lg shadow-lg p-6 relative"
            >
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="w-full border px-4 py-3 rounded-lg outline-none text-gray-700"
              />
              <div className="mt-4 max-h-[300px] overflow-y-auto">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-2 gap-4">
                    {filteredProducts.map((p) => (
                      <Link key={p._id} href={`/Product/${p._id}`} className="flex flex-col items-center border rounded-lg p-3 hover:shadow-md transition">
                        <Image src={p.Photo[0].url} alt={p.name} width={120} height={120} className="object-cover rounded-md" />
                        <span className="text-xs mt-2 text-center">{p.name}</span>
                        <span className="text-red-600 font-semibold">${p.price}</span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  search && <p className="text-gray-500 text-sm text-center">No products found.</p>
                )}
              </div>
              <button
                onClick={() => setShowSearch(false)}
                className="absolute top-3 right-4 text-gray-500 hover:text-black"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;

'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { TbLogin2 } from "react-icons/tb";
import CartShop from './CartShop';
import MobileNav from './MobileNav';
import { UserContext } from '../Context/UserContext';
import { ProductContext } from '../Context/ProductContext';
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa";
import { navLinks, pages, socialLinks } from '../Data';
import { motion, AnimatePresence } from "framer-motion";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const { products, cart } = useContext(ProductContext);

  // scroll listener
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY >= 100);
      });
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Filter products
  useEffect(() => {
    if (search.trim() === "") {
      setFilteredProducts([]);
    } else {
      const filtered = products.filter((prod) =>
        prod.name.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [search, products]);

  return (
    <header className="w-full z-50 sticky top-0">
      {/* Top Bar */}
      <div className="hidden md:flex w-full px-8 py-2 bg-gray-100 text-gray-600 justify-between items-center text-sm">
        <div className="flex gap-4">
          {pages.map((page, index) => (
            <Link key={index} href={page.link} className="hover:text-black transition">
              {page.name}
            </Link>
          ))}
        </div>
        <span className="flex items-center gap-2 text-xs font-medium">
          🚚 Free Shipping on Orders Over $100
        </span>
        <div className="flex items-center gap-5">
          <Link href="/Wishlist" className="hover:text-red-500 flex items-center gap-1">
            <FaHeart /> Wishlist
          </Link>
          <Link href="/Profile" className="hover:text-black">My Account</Link>
          <div className="flex items-center gap-3">
            {socialLinks.map((social, index) => (
              <Link key={index} href={social.link} className="hover:text-black">
                {social.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav
        className={`w-full px-6 lg:px-16 py-4 flex items-center justify-between transition-all duration-300
          ${isScrolled ? "backdrop-blur-md bg-white/80 shadow-lg" : "bg-transparent"}`}
      >
        {/* Logo & Nav Links */}
        <div className="flex items-center gap-10">
          <Link href="/" className="text-2xl font-extrabold uppercase tracking-wide">
            Fashionista
          </Link>
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map(({ name, link }, index) => {
              const isActive = pathname === link;
              return (
                <Link
                  key={index}
                  href={link}
                  className={`relative text-base uppercase font-medium transition 
                  ${isActive ? "text-red-500" : "text-gray-600 hover:text-black"}`}
                >
                  {name}
                  <span
                    className={`absolute left-0 -bottom-1 h-[2px] bg-red-500 transition-all duration-300
                      ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                  ></span>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Search, User, Cart, Mobile Nav */}
        <div className="flex items-center gap-6">
          {/* Search Bar */}
          <div className="relative hidden md:flex gap-3 items-center">
            <AnimatePresence>
              {showSearchBar && (
                <motion.input
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 200, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="border px-3 py-2 border-gray-400 focus:outline-none rounded-lg bg-white text-black"
                  placeholder="Search products..."
                  autoFocus
                />
              )}
            </AnimatePresence>
            <IoIosSearch
              className="text-2xl cursor-pointer text-gray-600 hover:text-black"
              onClick={() => setShowSearchBar(!showSearchBar)}
            />
          </div>

          {/* User */}
          {user ? null : (
            <Link href="/Login" className="text-2xl text-gray-600 hover:text-red-500">
              <TbLogin2 />
            </Link>
          )}

          {/* Wishlist */}
          <Link href="/Wishlist" className="hidden md:flex text-2xl text-gray-600 hover:text-red-500">
            <FaHeart />
          </Link>

          {/* Cart with badge */}
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

      {/* Search Results Dropdown */}
      {search !== "" && (
        <div className="absolute top-[80px] left-0 w-full z-40 px-6 lg:px-14 py-3 bg-white shadow-lg">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col items-center gap-2 p-3 border rounded-lg hover:shadow-md transition"
                >
                  <Link href={`/Product/${product._id}`}>
                    <Image
                      src={product.Photo[0].url}
                      alt={product.name}
                      width={180}
                      height={180}
                      className="w-[150px] h-[150px] object-cover rounded-md"
                    />
                  </Link>
                  <div className="flex flex-col items-center text-center">
                    <span className="text-xs font-medium">{product.name}</span>
                    <span className="text-red-600 font-bold">${product.price}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm col-span-full text-center">
                No products found.
              </p>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

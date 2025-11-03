'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect, useContext } from 'react'
import { TbLogin2 } from 'react-icons/tb'
import { IoIosSearch } from 'react-icons/io'
import { FaHeart } from 'react-icons/fa'
import { CgProfile } from 'react-icons/cg'
import { navLinks, pages, socialLinks } from '../Data'
import CartShop from './CartShop'
import MobileNav from './MobileNav'
import { UserContext } from '../Context/UserContext'
import { ProductContext } from '../Context/ProductContext'
import { motion, AnimatePresence } from 'framer-motion'
import ProductNavSearch from './ProductNavSearch'

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const pathname = usePathname()
  const { user } = useContext(UserContext)
  const { products, cart } = useContext(ProductContext)

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 70)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!search.trim()) setFilteredProducts([])
    else {
      setFilteredProducts(
        products.filter((p) =>
          p.name.toLowerCase().includes(search.toLowerCase())
        )
      )
    }
  }, [search, products])

  return (
    <header className="w-full sticky top-0 z-50">
      {/* ==== TOP BAR ==== */}
      <div className="hidden md:flex justify-between items-center bg-gray-50 border-b border-gray-200 px-10 py-2 text-[13px] text-gray-600">
        <div className="flex items-center gap-5">
          {pages.map((page, i) => (
            <Link
              key={i}
              href={page.link}
              className="hover:text-black transition-colors"
            >
              {page.name}
            </Link>
          ))}
        </div>
        <span className="font-medium tracking-wide text-gray-700">
          🚚 Free Shipping on Orders Over $100
        </span>
        <div className="flex items-center gap-4">
          {socialLinks.map((s, i) => (
            <Link
              key={i}
              href={s.link}
              className="hover:text-black text-lg transition"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* ==== MAIN NAV ==== */}
      <nav
        className={`flex items-center justify-between transition-all duration-300 px-6 lg:px-16 py-4
          ${isScrolled ? 'bg-white shadow-md' : 'bg-white/95 backdrop-blur-sm'}
        `}
      >
        {/* === LEFT SECTION === */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl font-extrabold uppercase tracking-wider text-gray-900"
          >
            Fashionista
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ name, link }, i) => {
              const active = pathname === link
              return (
                <Link
                  key={i}
                  href={link}
                  className={`relative font-semibold text-sm uppercase tracking-wide transition
                    ${
                      active
                        ? 'text-red-500'
                        : 'text-gray-700 hover:text-black'
                    }`}
                >
                  {name}
                  {active && (
                    <span className="absolute bottom-[-6px] left-0 w-full h-[2px] bg-red-500 rounded"></span>
                  )}
                </Link>
              )
            })}
          </div>
        </div>

        {/* === RIGHT SECTION === */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <IoIosSearch
            className="text-2xl cursor-pointer text-gray-600 hover:text-black transition"
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* Wishlist */}
          <Link
            href="/Wishlist"
            className="hidden md:flex text-2xl text-gray-600 hover:text-red-500 transition"
          >
            <FaHeart />
          </Link>

          {/* User */}
          {user ? (
            <Link
              href="/Profile"
              className="text-2xl text-gray-600 hover:text-red-500 transition"
            >
              <CgProfile />
            </Link>
          ) : (
            <Link
              href="/Login"
              className="text-2xl text-gray-600 hover:text-red-500 transition"
            >
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

          {/* Mobile Menu */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* ==== SEARCH BAR ==== */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="absolute top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-40"
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
    </header>
  )
}

export default Header

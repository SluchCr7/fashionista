// 'use client'
// import React, { useState, useEffect, useContext } from 'react'
// import Link from 'next/link'
// import { usePathname } from 'next/navigation'
// import { IoIosSearch } from 'react-icons/io'
// import { FaHeart } from 'react-icons/fa'
// import { CgProfile } from 'react-icons/cg'
// import { TbLogin2 } from 'react-icons/tb'
// import { motion, AnimatePresence } from 'framer-motion'

// import { UserContext } from '../Context/UserContext'
// import { ProductContext } from '../Context/ProductContext'
// import ProductNavSearch from './ProductNavSearch'
// import CartShop from './CartShop'
// import MobileNav from './MobileNav'

// // ==== إعداد بيانات ديناميكية لسهولة التخصيص ====
// const topBarLinks = [
//   { name: 'About Us', link: '/About' },
//   { name: 'Help Center', link: '/FAQ' },
//   { name: 'Contact', link: '/contact' },
// ]
// const socialLinks = [
//   { icon: <i className="ri-facebook-fill" />, link: 'https://facebook.com' },
//   { icon: <i className="ri-instagram-fill" />, link: 'https://instagram.com' },
//   { icon: <i className="ri-twitter-x-line" />, link: 'https://twitter.com' },
// ]

// const navLinks = [
//   { name: 'Home', link: '/' },
//   { name: 'Shop', link: '/Shop' },
//   { name: 'Collections', link: '/Collections' },
//   { name: 'Blog', link: '/Blog' },
//   { name: 'Men', link: '/Men' },
//   { name: 'Women', link: '/Women' },
//   { name: 'Kids', link: '/Kids' },
//   { name: 'Shoes', link: '/Shoes' },
// ]

// const Header = () => {
//   const [isScrolled, setIsScrolled] = useState(false)
//   const [showSearch, setShowSearch] = useState(false)
//   const [search, setSearch] = useState('')
//   const [filteredProducts, setFilteredProducts] = useState([])
//   const pathname = usePathname()
//   const { user } = useContext(UserContext)
//   const { products, cart } = useContext(ProductContext)

//   // ==== تأثير التمرير لتغيير مظهر الهيدر ====
//   useEffect(() => {
//     const handleScroll = () => setIsScrolled(window.scrollY > 60)
//     window.addEventListener('scroll', handleScroll)
//     return () => window.removeEventListener('scroll', handleScroll)
//   }, [])

//   // ==== منطق البحث ====
//   useEffect(() => {
//     if (!search.trim()) setFilteredProducts([])
//     else {
//       setFilteredProducts(
//         products.filter((p) =>
//           p.name.toLowerCase().includes(search.toLowerCase())
//         )
//       )
//     }
//   }, [search, products])

//   return (
//     <header className="w-full sticky top-0 z-50 font-sans">
//       {/* ==== TOP BAR ==== */}
//       <div className="hidden md:flex items-center justify-between bg-gray-50 text-gray-600 text-sm border-b border-gray-200 px-12 py-2">
//         <div className="flex items-center gap-5">
//           {topBarLinks.map((link, i) => (
//             <Link key={i} href={link.link} className="hover:text-black transition">
//               {link.name}
//             </Link>
//           ))}
//         </div>
//         <span className="text-gray-700 font-medium tracking-wide">
//           🚚 Free Worldwide Shipping on Orders Over <b>$100</b>
//         </span>
//         <div className="flex items-center gap-4 text-lg">
//           {socialLinks.map((s, i) => (
//             <Link
//               key={i}
//               href={s.link}
//               target="_blank"
//               className="hover:text-[#080606] text-black  transition"
//             >
//               {s.icon}
//             </Link>
//           ))}
//         </div>
//       </div>

//       {/* ==== MAIN NAVIGATION ==== */}
//       <nav
//         className={`flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-300 
//           ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}
//       >
//         {/* === LEFT: LOGO + NAV LINKS === */}
//         <div className="flex items-center gap-10">
//           <Link
//             href="/"
//             className="text-2xl lg:text-3xl font-extrabold tracking-wide text-gray-900 uppercase"
//           >
//             Fash<span className="text-red-500">ion</span>ista
//           </Link>

//           <div className="hidden md:flex items-center gap-8">
//             {navLinks.map(({ name, link }, i) => {
//               const active = pathname === link
//               return (
//                 <Link
//                   key={i}
//                   href={link}
//                   className={`relative font-semibold text-sm uppercase tracking-wide transition
//                     ${
//                       active
//                         ? 'text-red-500 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500'
//                         : 'text-gray-700 hover:text-black'
//                     }`}
//                 >
//                   {name}
//                 </Link>
//               )
//             })}
//           </div>
//         </div>

//         {/* === RIGHT: ACTION ICONS === */}
//         <div className="flex items-center gap-6">
//           {/* Search */}
//           <IoIosSearch
//             onClick={() => setShowSearch(!showSearch)}
//             className="text-2xl text-gray-600 hover:text-black cursor-pointer transition"
//           />

//           {/* Wishlist */}
//           <Link
//             href="/Wishlist"
//             className="hidden md:flex text-2xl text-gray-600 hover:text-red-500 transition"
//           >
//             <FaHeart />
//           </Link>

//           {/* User */}
//           {user ? (
//             <Link
//               href="/Profile"
//               className="text-2xl text-gray-600 hover:text-red-500 transition"
//             >
//               <CgProfile />
//             </Link>
//           ) : (
//             <Link
//               href="/Login"
//               className="text-2xl text-gray-600 hover:text-red-500 transition"
//             >
//               <TbLogin2 />
//             </Link>
//           )}

//           {/* Cart */}
//           <div className="relative">
//             <CartShop />
//             {cart?.length > 0 && (
//               <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
//                 {cart.length}
//               </span>
//             )}
//           </div>

//           {/* Mobile Nav (يبقى كما هو) */}
//           <div className="md:hidden">
//             <MobileNav />
//           </div>
//         </div>
//       </nav>

//       {/* ==== SEARCH OVERLAY ==== */}
//       <AnimatePresence>
//         {showSearch && (
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.25 }}
//             className="absolute top-0 left-0 w-full bg-white shadow-md border-b border-gray-200 z-40"
//           >
//             <ProductNavSearch
//               setShowSearch={setShowSearch}
//               search={search}
//               setSearch={setSearch}
//               filteredProducts={filteredProducts}
//             />
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </header>
//   )
// }

// export default Header
'use client'
import React, { useState, useEffect, useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { UserContext } from '../Context/UserContext'
import { ProductContext } from '../Context/ProductContext'
import ProductNavSearch from './ProductNavSearch'
import CartShop from './CartShop'
import MobileNav from './MobileNav'
import { CiSearch } from "react-icons/ci"; 
import { CiHeart } from "react-icons/ci"; 
import { CiLogin } from "react-icons/ci"; 
import { CiUser } from "react-icons/ci"; 
// ==== إعداد بيانات ديناميكية لسهولة التخصيص ====
const topBarLinks = [
  { name: 'About Us', link: '/About' },
  { name: 'Help Center', link: '/FAQ' },
  { name: 'Contact', link: '/contact' },
]
const socialLinks = [
  { icon: <i className="ri-facebook-fill" />, link: 'https://facebook.com' },
  { icon: <i className="ri-instagram-fill" />, link: 'https://instagram.com' },
  { icon: <i className="ri-twitter-x-line" />, link: 'https://twitter.com' },
]

const navLinks = [
  { name: 'Home', link: '/' },
  { name: 'Shop', link: '/Shop' },
  { name: 'Collections', link: '/Collections' },
  { name: 'Blog', link: '/Blog' },
  { name: 'Men', link: '/Men' },
  { name: 'Women', link: '/Women' },
  { name: 'Kids', link: '/Kids' },
  { name: 'Shoes', link: '/Shoes' },
]

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showSearch, setShowSearch] = useState(false)
  const [search, setSearch] = useState('')
  const [filteredProducts, setFilteredProducts] = useState([])
  const pathname = usePathname()
  const { user } = useContext(UserContext)
  const { products, cart } = useContext(ProductContext)

  // ==== تأثير التمرير لتغيير مظهر الهيدر ====
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // ==== منطق البحث ====
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
    <header className="w-full sticky top-0 z-50 font-sans">
      {/* ==== TOP BAR ==== */}
      <div className="hidden md:flex items-center justify-between bg-gray-50 text-gray-600 text-sm border-b border-gray-200 px-12 py-2">
        <div className="flex items-center gap-5">
          {topBarLinks.map((link, i) => (
            <Link key={i} href={link.link} className="hover:text-black transition">
              {link.name}
            </Link>
          ))}
        </div>
        <span className="text-gray-700 font-medium tracking-wide">
          🚚 Free Worldwide Shipping on Orders Over <b>$100</b>
        </span>
        <div className="flex items-center gap-4 text-lg">
          {socialLinks.map((s, i) => (
            <Link
              key={i}
              href={s.link}
              target="_blank"
              className="hover:text-[#080606] text-black  transition"
            >
              {s.icon}
            </Link>
          ))}
        </div>
      </div>

      {/* ==== MAIN NAVIGATION ==== */}
      <nav
        className={`flex items-center justify-between px-6 lg:px-16 py-4 transition-all duration-300 
          ${isScrolled ? 'bg-white shadow-md' : 'bg-white/90 backdrop-blur-sm'}`}
      >
        {/* === LEFT: LOGO + NAV LINKS === */}
        <div className="flex items-center gap-10">
          <Link
            href="/"
            className="text-2xl lg:text-3xl font-extrabold tracking-wide text-gray-900 uppercase"
          >
            Fash<span className="text-red-500">ion</span>ista
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
                        ? 'text-red-500 after:content-[""] after:absolute after:-bottom-1 after:left-0 after:w-full after:h-[2px] after:bg-red-500'
                        : 'text-gray-700 hover:text-black'
                    }`}
                >
                  {name}
                </Link>
              )
            })}
          </div>
        </div>

        {/* === RIGHT: ACTION ICONS === */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <CiSearch
            onClick={() => setShowSearch(!showSearch)}
            className="text-2xl text-gray-600 hover:text-black cursor-pointer transition"
          />

          {/* Wishlist */}
          <Link
            href="/Wishlist"
            className="hidden md:flex text-2xl text-gray-600 hover:text-red-500 transition"
          >
            <CiHeart />
          </Link>

          {/* User */}
          {user ? (
            <Link
              href="/Profile"
              className="text-2xl text-gray-600 hover:text-red-500 transition"
            >
              <CiUser />
            </Link>
          ) : (
            <Link
              href="/Login"
              className="text-2xl text-gray-600 hover:text-red-500 transition"
            >
              <CiLogin />
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

          {/* Mobile Nav (يبقى كما هو) */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </nav>

      {/* ==== SEARCH OVERLAY ==== */}
      <AnimatePresence>
        {showSearch && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
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

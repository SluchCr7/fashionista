'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState, useContext } from 'react';
import { IoIosSearch } from "react-icons/io";
import { TbLogin2 } from "react-icons/tb";
import { navLinks, socialLinks } from '../Data';
import { UserContext } from '../Context/UserContext';
import { ProductContext } from '../Context/ProductContext';
import CartShop from './CartShop';
import MobileNav from './MobileNav';
import Image from 'next/image';

export default function Header() {
  const pathname = usePathname();
  const { user } = useContext(UserContext);
  const { products } = useContext(ProductContext);

  const [isScrolled, setIsScrolled] = useState(false);
  const [search, setSearch] = useState('');
  const [showSearch, setShowSearch] = useState(false);
  const [filtered, setFiltered] = useState([]);

  const homePaths = ['/', '/Men', '/Women', '/Kids', '/Shoes'];
  const isHome = homePaths.includes(pathname);

  useEffect(() => {
    if (isHome) {
      const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    } else {
      setIsScrolled(true);
    }
  }, [isHome]);

  useEffect(() => {
    if (search.trim()) {
      const results = products.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setFiltered(results);
    } else {
      setFiltered([]);
    }
  }, [search, products]);

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'}`}>
      {/* Top Bar */}
      <div className="hidden md:flex justify-between px-10 py-2 bg-black text-gray-300 text-sm">
        <div className="flex gap-6">
          <Link href="/About" className="hover:text-white">About</Link>
          <Link href="/Contact" className="hover:text-white">Contact</Link>
        </div>
        <span>Free shipping for orders above $100</span>
        <div className="flex gap-4">
          {
            socialLinks.map((icon) => (
              <Link key={icon.id} href={icon.link} className="hover:text-white">
                {icon.icon}
              </Link>
            ))
          }
        </div>
      </div>

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 md:px-16 py-4">
        {/* Left: Logo */}
        <Link href="/" className="text-2xl font-bold tracking-wider text-gray-800">
          Fashionista
        </Link>

        {/* Middle: Navigation */}
        <nav className="hidden md:flex gap-8 text-sm font-medium text-gray-700">
          {navLinks.map(({ name, link }) => (
            <Link key={link} href={link} className="hover:text-red-500 hover:underline underline-offset-4 transition">
              {name}
            </Link>
          ))}
        </nav>

        {/* Right: Icons */}
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative hidden md:block">
            <IoIosSearch
              onClick={() => setShowSearch(!showSearch)}
              className="text-2xl cursor-pointer text-gray-600 hover:text-black"
            />
            {showSearch && (
              <input
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                type="text"
                placeholder="Search products..."
                className="absolute top-10 right-0 w-72 border px-3 py-2 rounded shadow bg-white text-black"
              />
            )}
          </div>

          {/* Login */}
          {!user && (
            <Link href="/Login" className="text-2xl text-gray-600 hover:text-red-500">
              <TbLogin2 />
            </Link>
          )}

          {/* Cart */}
          <CartShop />

          {/* Mobile nav */}
          <div className="md:hidden">
            <MobileNav />
          </div>
        </div>
      </div>

      {/* Mobile Search */}
      <div className={`md:hidden w-full px-6 pb-2 ${showSearch ? 'block' : 'hidden'}`}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder="Search products..."
          className="w-full border px-3 py-2 rounded bg-white text-black"
        />
      </div>

      {/* Search Results */}
      {search && (
        <div className="absolute z-50 bg-white w-full px-6 md:px-20 py-4 shadow-lg">
          {filtered.length ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {filtered.map((product) => (
                <Link href={`/Product/${product._id}`} key={product._id} className="flex flex-col items-center">
                  <Image src={product.Photo[0].url} width={150} height={150} alt={product.name} className="object-cover w-[120px] h-[120px] rounded" />
                  <span className="text-xs mt-1 text-center">{product.name}</span>
                  <span className="text-red-500 font-bold">${product.price}</span>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </header>
  );
}

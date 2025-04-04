'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React, { useState, useEffect, useContext } from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { CiUser } from "react-icons/ci";
import { TbLogin2 } from "react-icons/tb";
import CartShop from './CartShop';
import MobileNav from './MobileNav';
import { UserContext } from '../Context/UserContext';
import { ProductContext } from '../Context/ProductContext';
import Image from 'next/image';
import { IoIosSearch } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import {IoMdHeart} from 'react-icons/io'
import { navLinks , pages, socialLinks } from '../Data';
const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [showSearchBar , setShowSearchBar] = useState(false)
    const [search, setSearch] = useState("");
    const [filteredProducts, setFilteredProducts] = useState([]);
    const pathname = usePathname();
    const isHomePage = pathname === "/" || pathname === "/Men" || pathname === "/Women" || pathname === "/Kids" || pathname === "/Shoes"; // Check if on the home page
    const { user } = useContext(UserContext);
    const { products } = useContext(ProductContext);

    useEffect(() => {
        if (isHomePage) {
            const handleScroll = () => {
                requestAnimationFrame(() => {
                    setIsScrolled(window.scrollY >= 100);
                });
            };

            window.addEventListener('scroll', handleScroll);
            return () => window.removeEventListener('scroll', handleScroll);
        } else {
            setIsScrolled(true); // Apply styles if not on home page
        }
    }, [isHomePage]);

    // Filter products based on search input
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
        <header className="w-full z-50">
            {/* Top Bar */}
            <div className="hidden md:flex w-full px-8 py-2 bg-gray-900 text-gray-300 justify-between items-center">
                <div className="flex gap-3">
                    {
                        pages.map((page , index) => (
                            <Link key={index} href={page.link} className="hover:text-white text-xs cursor-pointer">
                                {page.name}
                            </Link>
                        ))
                    }
                </div>
                <span className="text-xs">Free Shipping on Orders Over $100</span>
                <div className='flex items-center gap-6'>
                    <div className='flex items-center gap-2 text-xs font-bold'>
                        <Link href="/Wishlist">My Wishlist</Link>
                        <Link href="/Profile">My Account</Link>
                    </div>
                    <div className='flex items-center gap-2'>
                        {
                            socialLinks.map((social , index) => (
                                <Link key={index} href={social.link} className="hover:text-white cursor-pointer">
                                    {social.icon}
                                </Link>
                            ))
                        }
                    </div>
                </div>
            </div>

            {/* Navbar */}
            <nav
                className={`w-full px-6 lg:px-16 py-4 flex items-center justify-between bg-white shadow-md transition-all duration-300 ${
                isScrolled ? "bg-white shadow-lg" : "bg-transparent"
                }`}
            >
                {/* Logo & Navigation */}
                <div className="flex items-center gap-10">
                <Link href="/" className="text-2xl font-extrabold uppercase tracking-wide">
                    Fashionista
                </Link>
                <div className="hidden md:flex items-center gap-5">
                    {navLinks.map(({ name, link }, index) => (
                    <Link
                        key={index}
                        href={link}
                        className="text-base uppercase font-medium text-gray-600 hover:text-red-500 transition-all"
                    >
                        {name}
                    </Link>
                    ))}
                </div>
                </div>

                {/* Search, User, Cart, and Mobile Nav */}
                <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="relative hidden md:flex gap-3 items-center">
                    <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className={`border px-3 py-2 ${
                        showSearchBar ? "opacity-100 w-full" : "opacity-0 w-0 pointer-events-none"
                    } transition-all duration-700 border-gray-400 focus:outline-none rounded-lg bg-white text-black`}
                    placeholder="Search products..."
                    />
                    <IoIosSearch
                    className="text-2xl cursor-pointer text-gray-600 hover:text-black"
                    onClick={() => setShowSearchBar(!showSearchBar)}
                    />
                </div>

                {/* User Icon */}
                {user ? (
                    null
                ) : (
                    <Link href="/Login" className="text-2xl text-gray-600 hover:text-red-500">
                    <TbLogin2 />
                    </Link>
                )}

                {/* Cart Icon */}
                <CartShop />

                {/* Mobile Nav Toggle */}
                <div className="flex md:hidden">
                    <MobileNav />
                </div>
                </div>
            </nav>

            <div className={`absolute flex md:hidden w-full top-[70px] left-0 right-0 z-40 px-6 lg:px-14 py-3 ${showSearchBar ? 'block' : 'hidden'}`}>
                <input 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)} 
                    type="text" 
                    className="border px-3 py-2 w-full border-gray-400 rounded-md bg-white text-black"
                    placeholder="Search products..."
                />
            </div>
            {/* Search Results Dropdown */}
            {search !== "" && (
                <div className="absolute top-32 md:top-[100px] left-0 w-[100%] md:w-[80%] mx-auto rounded-lg right-0 z-40 px-6 lg:px-14 py-3 bg-white shadow-lg">
                    <div className="flex items-center gap-3 overflow-x-auto whitespace-nowrap scrollbar-hide">
                        {filteredProducts.length > 0 ? (
                            filteredProducts.map((product) => (
                                <div key={product._id} className="flex flex-col items-center gap-2 p-4 border rounded-lg min-w-[180px]">
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
                                        <span className="text-xs font-medium w-[100%] md:w-[70%]">{product.name}</span>
                                        <span className="text-red-600 font-bold">${product.price}</span>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No products found.</p>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
}

export default Header;

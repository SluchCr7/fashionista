import Link from 'next/link'
import React from 'react'
import { socialLinks } from '../Data'
import Image from 'next/image'
import { FaCcVisa, FaCcMastercard, FaCcPaypal, FaApplePay } from 'react-icons/fa'

const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 text-gray-700">
      {/* Top Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-16 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">
        
        {/* Brand + Newsletter */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-extrabold uppercase">Fashionista</h2>
          <p className="text-sm leading-relaxed">
            Discover the latest trends in fashion. Premium clothing for men, women & kids.
          </p>
          <div className="flex w-full mt-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-2/3 px-3 py-2 border border-gray-400 rounded-l-md outline-none"
            />
            <button className="w-1/3 bg-black text-white font-semibold py-2 rounded-r-md hover:bg-gray-800 transition">
              Subscribe
            </button>
          </div>
          <span className="text-xs text-gray-500 mt-1">Join & get 10% off your first order</span>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Shop</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/Men" className="hover:underline">Men</Link></li>
            <li><Link href="/Women" className="hover:underline">Women</Link></li>
            <li><Link href="/Kids" className="hover:underline">Kids</Link></li>
            <li><Link href="/Shoes" className="hover:underline">Shoes</Link></li>
            <li><Link href="/Accessories" className="hover:underline">Accessories</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Company</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/About" className="hover:underline">About Us</Link></li>
            <li><Link href="/Careers" className="hover:underline">Careers</Link></li>
            <li><Link href="/Blog" className="hover:underline">Blog</Link></li>
            <li><Link href="/Sustainability" className="hover:underline">Sustainability</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="font-bold text-lg mb-3">Support</h3>
          <ul className="text-sm space-y-2">
            <li><Link href="/FAQ" className="hover:underline">FAQ</Link></li>
            <li><Link href="/Shipping" className="hover:underline">Shipping & Delivery</Link></li>
            <li><Link href="/Returns" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link href="/Contact" className="hover:underline">Contact Us</Link></li>
          </ul>
        </div>

        {/* Social & Payments */}
        <div className="flex flex-col gap-4">
          <div>
            <h3 className="font-bold text-lg">Follow Us</h3>
            <div className="flex gap-4 mt-2">
              {socialLinks.map((item, index) => (
                <Link key={index} href={item.link} className="text-2xl hover:text-gray-900">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg">We Accept</h3>
            <div className="flex gap-3 text-3xl mt-2 text-gray-700">
              <FaCcVisa />
              <FaCcMastercard />
              <FaCcPaypal />
              <FaApplePay />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-full border-t border-gray-300 bg-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center py-4 px-6 text-sm text-gray-600">
          <span>&copy; 2025 Fashionista. All rights reserved.</span>
          <div className="flex gap-4 mt-2 md:mt-0">
            <Link href="/Terms" className="hover:underline">Terms</Link>
            <Link href="/Privacy" className="hover:underline">Privacy</Link>
            <Link href="/Sitemap" className="hover:underline">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

'use client'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { IoIosLogOut } from "react-icons/io"
import { CgProfile } from "react-icons/cg"
import { navLinks } from '../Data'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Sheet>
        {/* Trigger Icon */}
        <SheetTrigger>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-8 h-10 text-yellow-700 pt-1"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </SheetTrigger>

        {/* Sidebar Content */}
        <SheetContent
          position="right"
          size="content"
          className="w-[80vw] sm:w-[60vw] bg-white text-gray-800 shadow-xl border-l border-gray-100"
        >
          <div className="flex flex-col justify-between h-full py-8">

            {/* Header with Logo */}
            <div className="flex flex-col items-center gap-3 border-b border-gray-200 pb-6">
              {/* <Image
                src="/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="rounded-full shadow-md"
              /> */}
              <h2 className="text-lg font-semibold text-yellow-700">
                Welcome to Our Store
              </h2>
            </div>

            {/* Navigation Links */}
            <motion.nav
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-5 text-center mt-10"
            >
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.link}
                  className={`text-lg tracking-wide transition ${
                    pathname === link.link
                      ? 'text-yellow-700 font-semibold'
                      : 'text-gray-600 hover:text-yellow-700'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </motion.nav>

            {/* Footer Actions */}
            <div className="flex flex-col items-center gap-6 mt-10 border-t border-gray-200 pt-6">
              <p className="text-sm text-gray-400 mt-4">© 2025 Fashionista</p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav

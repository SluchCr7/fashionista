'use client'
import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import { Menu, ArrowUpRight } from 'lucide-react'
import { navLinks } from '../Data'

const MobileNav = () => {
  const pathname = usePathname()

  return (
    <div className="md:hidden">
      <Sheet>
        {/* Trigger Icon */}
        <SheetTrigger className="p-2.5 rounded-full bg-black text-white dark:bg-white dark:text-black hover:scale-105 transition-transform">
          <Menu strokeWidth={2} size={18} />
        </SheetTrigger>

        {/* Sidebar Content */}
        <SheetContent
          position="right"
          side="right"
          className="w-full sm:w-[400px] bg-white dark:bg-[#0a0a0a] text-black dark:text-white shadow-2xl border-l border-black/5 dark:border-white/10 p-0"
        >
          <div className="flex flex-col h-full bg-gradient-to-b from-transparent to-black/5 dark:to-white/5">
            {/* Header */}
            <div className="p-8 border-b border-black/5 dark:border-white/10">
              <h2 className="text-2xl font-serif font-black tracking-[-0.05em] uppercase text-black dark:text-white">
                Fashion<span className="text-accent italic font-light">ista.</span>
              </h2>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-black/40 dark:text-white/40 mt-2">
                Menu Directory
              </p>
            </div>

            {/* Links */}
            <div className="flex-1 overflow-y-auto p-8 space-y-2">
              <AnimatePresence>
                {navLinks.map((link, index) => {
                  const isActive = pathname === link.link;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1, ease: "easeOut" }}
                    >
                      <Link
                        href={link.link}
                        className={`group flex items-center justify-between py-4 border-b border-black/5 dark:border-white/5 transition-all ${
                          isActive ? 'text-black dark:text-white' : 'text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white'
                        }`}
                      >
                        <span className={`text-2xl font-serif font-black uppercase tracking-tight transition-all duration-300 group-hover:translate-x-2 ${isActive ? 'italic' : ''}`}>
                          {link.name}
                        </span>
                        <ArrowUpRight 
                          size={18} 
                          className={`transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} 
                        />
                      </Link>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {/* Footer */}
            <div className="p-8 border-t border-black/5 dark:border-white/10 bg-black/5 dark:bg-white/5">
              <div className="flex flex-col gap-4">
                <Link href="/Profile" className="text-sm font-semibold hover:underline">Account</Link>
                <Link href="/Wishlist" className="text-sm font-semibold hover:underline">Wishlist</Link>
              </div>
              <p className="text-[10px] text-black/40 dark:text-white/40 uppercase tracking-widest mt-8 font-bold">
                © 2025 Fashionista
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default MobileNav

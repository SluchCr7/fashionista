'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger , SheetContent} from '@/components/ui/sheet'
import { IoIosLogOut } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { navLinks } from '../Data';
const MobileNav = () => {
    const pathname = usePathname()
  return (
    <div>
        <Sheet>
            <SheetTrigger>
                <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-10 text-yellow-700"
                >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
                </svg>
            </SheetTrigger>
            <SheetContent position="right" size="content">
                <div className='flex flex-col items-center gap-4 justify-center w-full min-h-[100vh]'>                         
                    <nav className='flex flex-col items-center gap-4 mt-20 text-center'>
                    {
                        navLinks.map((link, index) => {
                            return (
                                <Link href={link.link} className={`text-lg ${link.link === pathname ? 'text-yellow-700 font-bold' : 'text-yellow-700 font-medium'}`} key={index}>
                                    {link.name}
                                </Link>
                            )
                        })
                    }
                    </nav>  
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default MobileNav
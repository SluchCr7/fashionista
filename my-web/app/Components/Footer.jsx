import Link from 'next/link';
import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    const socialLinks = [
        { icon: <FaFacebook />, link: "/" },
        { icon: <FaInstagram />, link: "/" },
        { icon: <FaTwitter />, link: "/" }
    ];

    return (
        <div className='flex flex-col w-full bg-gray-100 text-black'>
            <div className='grid px-10 sm:px-20 gap-8 py-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
                <div className='flex flex-col gap-4'>
                    <h2 className='text-lg font-extrabold uppercase'>Sluchwisky</h2>
                    <p className='text-sm leading-relaxed'>
                        Discover the latest trends in fashion. High-quality clothing for men and women.
                    </p>
                    <div className='flex w-full'>
                        <input type="email" placeholder='Enter your email' 
                               className='w-2/3 px-3 py-2 border border-black rounded-l-md outline-none' />
                        <button className='w-1/3 bg-black text-white font-semibold py-2 rounded-r-md hover:bg-gray-800'>
                            Subscribe
                        </button>
                    </div>
                </div>
                
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold text-lg'>Shop</h3>
                    <ul className='text-sm space-y-2'>
                        <li><Link href='/mens-topwear' className='hover:underline'>Men`&apos;`s Top Wear</Link></li>
                        <li><Link href='/womens-topwear' className='hover:underline'>Women`&apos;`s Top Wear</Link></li>
                        <li><Link href='/mens-bottomwear' className='hover:underline'>Men`&apos;`s Bottom Wear</Link></li>
                        <li><Link href='/womens-bottomwear' className='hover:underline'>Women`&apos;`s Bottom Wear</Link></li>
                    </ul>
                </div>
                
                <div className='flex flex-col gap-3'>
                    <h3 className='font-bold text-lg'>Support</h3>
                    <ul className='text-sm space-y-2'>
                        <li><Link href='/Contact' className='hover:underline'>Contact Us</Link></li>
                        <li><Link href='/About' className='hover:underline'>About Us</Link></li>
                        <li><Link href='/Privacy' className='hover:underline'>Privacy Policy</Link></li>
                        <li><Link href='/Terms' className='hover:underline'>Terms & Conditions</Link></li>
                        <li><Link href='/FAQ' className='hover:underline'>FAQ</Link></li>
                    </ul>
                </div>
                
                <div className='flex flex-col gap-4'>
                    <div>
                        <h3 className='font-bold text-lg'>Follow Us</h3>
                        <div className='flex gap-4 mt-2'>
                            {socialLinks.map((item, index) => (
                                <Link key={index} href={item.link} className='text-2xl hover:text-gray-600'>
                                    {item.icon}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div>
                        <h3 className='font-bold text-lg'>Call Us</h3>
                        <p className='text-sm'>+91 1234567890</p>
                    </div>
                </div>
            </div>
            <div className='w-full text-center py-4 bg-gray-200'>
                <span className='text-sm'>&copy; 2025 Sluchwisky. All rights reserved.</span>
            </div>
        </div>
    );
};

export default Footer;
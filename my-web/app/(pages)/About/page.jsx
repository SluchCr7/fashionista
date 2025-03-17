'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { stats } from '@/app/Data';
const About = () => {



  return (
    <div className="flex flex-col items-center gap-10 py-24 px-6 mx-auto max-w-7xl">
      
      {/* Hero Section */}
      <div className="relative w-full h-[450px]">
        <Image 
          src="/Hero/h1_hero1.jpg.webp" 
          layout="fill" 
          objectFit="cover" 
          alt="Fashion Collection" 
          className="rounded-lg"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-4xl font-bold uppercase">About Our Fashion Brand</h1>
        </div>
      </div>

      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image 
          src="/assets/mens-collection.webp" 
          className="w-[450px] h-[550px] rounded-lg shadow-lg" 
          width={500} 
          height={500} 
          alt="About" 
        />
        <div className="flex flex-col gap-5 max-w-lg">
          <h2 className="text-2xl font-bold text-red-600">Who We Are</h2>
          <p className="text-gray-700">
            Welcome to our premium fashion store! We blend style, comfort, and sustainability 
            to bring you an exclusive clothing collection. Our designs cater to individuals 
            who value elegance and uniqueness.
          </p>
          <p className="text-gray-700">
            With years of expertise, we ensure that each piece is crafted with passion and precision, 
            offering a seamless shopping experience.
          </p>
        </div>
      </div>
      
      {/* Statistics Section */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-6 text-center">
        {stats.map((ele, index) => (
          <div key={index} className="flex flex-col items-center">
            <CountUp end={ele.num} duration={5} className="text-4xl font-bold text-yellow-700" />
            <p className="text-gray-900 font-semibold text-sm uppercase">{ele.text}</p>
          </div>
        ))}
      </div>

      {/* Our Mission & Values */}
      <div className="flex bg-gray-100 flex-col gap-6 items-center text-center p-6 max-w-6xl">
        <h2 className="text-2xl font-bold text-red-600">Our Mission & Values</h2>
        <p className="text-gray-700 text-sm">
          We are committed to redefining fashion with high-quality, sustainable materials and 
          exceptional craftsmanship. Our goal is to create timeless pieces that empower individuals 
          to express themselves effortlessly.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Sustainability</h3>
            <p className="text-sm text-gray-600">Eco-friendly fabrics and ethical production.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Quality Craftsmanship</h3>
            <p className="text-sm text-gray-600">Each piece is crafted with precision and passion.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Customer Satisfaction</h3>
            <p className="text-sm text-gray-600">Your satisfaction is our priority.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Innovation</h3>
            <p className="text-sm text-gray-600">We stay ahead of the fashion curve.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Community Engagement</h3>
            <p className="text-sm text-gray-600">We believe in giving back to the community.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Accessibility</h3>
            <p className="text-sm text-gray-600">We design for everyone, from small to big.</p>
          </div>
        </div>
      </div>


    </div>
  );
};

export default About;

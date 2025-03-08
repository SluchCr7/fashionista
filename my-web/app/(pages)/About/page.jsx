'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const About = () => {
  const stats = [
    { num: 50, text: 'Years of Experience' },
    { num: 70, text: 'Projects Completed' },
    { num: 200, text: 'Awards Won' },
    { num: 100, text: 'Happy Clients' },
    { num: 40, text: 'Architect Engineers' },
  ];

  const team = [
    { name: 'John Doe', role: 'Founder & CEO', img: '/assets/team1.jpg' },
    { name: 'Jane Smith', role: 'Lead Designer', img: '/assets/team2.jpg' },
    { name: 'Michael Brown', role: 'Marketing Head', img: '/assets/team3.jpg' },
  ];

  return (
    <div className="flex flex-col items-center gap-10 py-24 px-6 mx-auto max-w-9xl">
      {/* About Section */}
      <div className="flex flex-col md:flex-row items-center gap-10">
        <Image 
          src="/assets/mens-collection.webp" 
          className="w-[450px] h-[450px] rounded-lg shadow-lg" 
          width={500} 
          height={500} 
          alt="About" 
        />
        <div className="flex flex-col gap-5 max-w-lg">
          <h1 className="text-2xl font-bold text-DarkRed">About Us</h1>
          <p className="text-gray-700">
            Welcome to our premium fashion store! We pride ourselves on providing high-quality,
            stylish, and sustainable clothing for modern individuals. Our designs are crafted to
            match your personality, offering the perfect blend of comfort and elegance.
          </p>
          <p className="text-gray-700">
            With decades of experience in the fashion industry, our team ensures that every piece
            is designed with passion and precision, giving you an unmatched shopping experience.
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
      
      {/* Why Choose Us Section */}
      <div className="flex flex-col items-center gap-6 max-w-6xl text-center">
        <h2 className="text-2xl font-bold text-red-600">Why Choose Us?</h2>
        <p className="text-gray-700">
          We go beyond selling clothes. Our goal is to provide a seamless shopping experience
          with quality you can trust.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Sustainable Fabrics</h3>
            <p className="text-sm text-gray-600">We use eco-friendly materials that are soft, durable, and ethically sourced.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Premium Craftsmanship</h3>
            <p className="text-sm text-gray-600">Each item is designed with precision to offer superior fit and comfort.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Fast & Secure Shipping</h3>
            <p className="text-sm text-gray-600">We ensure timely delivery with multiple shipping options for convenience.</p>
          </div>
          <div className="p-4 border-l-4 border-red-500 bg-gray-100 rounded-md shadow-md">
            <h3 className="font-semibold text-lg">Customer-Centric Approach</h3>
            <p className="text-sm text-gray-600">Our 24/7 support ensures you have a hassle-free shopping experience.</p>
          </div>
        </div>
    </div>
    </div>
  );
};

export default About;

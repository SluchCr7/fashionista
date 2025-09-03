'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { stats } from '@/app/Data';
import { FaLeaf, FaUsers, FaStar, FaLightbulb, FaHandsHelping, FaGlobe } from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col gap-20 pb-24">

      {/* Hero Section */}
      <div className="relative w-full h-[500px]">
        <Image 
          src="/Hero/h1_hero1.jpg.webp" 
          alt="Fashion Hero" 
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-6">
          <motion.h1 
            initial={{opacity:0, y:40}} 
            animate={{opacity:1, y:0}} 
            transition={{duration:0.8}}
            className="text-white text-5xl font-extrabold uppercase mb-4"
          >
            About Our Fashion Brand
          </motion.h1>
          <motion.p 
            initial={{opacity:0}} 
            animate={{opacity:1}} 
            transition={{delay:0.6, duration:0.8}}
            className="text-gray-200 max-w-2xl"
          >
            We redefine fashion with elegance, comfort, and sustainability. Discover who we are and why thousands trust our brand worldwide.
          </motion.p>
        </div>
      </div>

      {/* Who We Are */}
      <div className="flex flex-col md:flex-row items-center gap-10 max-w-6xl mx-auto px-6">
        <motion.div 
          initial={{opacity:0, x:-50}} 
          whileInView={{opacity:1, x:0}} 
          transition={{duration:0.8}}
        >
          <Image 
            src="/assets/mens-collection.webp" 
            alt="About Us" 
            width={500} 
            height={500} 
            className="rounded-lg shadow-xl"
          />
        </motion.div>
        <motion.div 
          initial={{opacity:0, x:50}} 
          whileInView={{opacity:1, x:0}} 
          transition={{duration:0.8}}
          className="flex flex-col gap-5"
        >
          <h2 className="text-3xl font-bold text-red-600">Who We Are</h2>
          <p className="text-gray-700 leading-relaxed">
            We blend style, comfort, and sustainability to bring you an exclusive clothing collection. Each piece is made for individuals who value elegance and uniqueness.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With years of expertise, our designs are crafted with passion and precision, ensuring a seamless shopping experience.
          </p>
        </motion.div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto px-6">
        {stats.map((ele, index) => (
          <motion.div 
            key={index} 
            initial={{opacity:0, scale:0.8}} 
            whileInView={{opacity:1, scale:1}} 
            transition={{duration:0.6, delay:index*0.2}}
            className="bg-gray-100 rounded-lg p-6 flex flex-col items-center shadow-md"
          >
            <CountUp end={ele.num} duration={3} className="text-4xl font-bold text-yellow-700" />
            <p className="text-gray-800 font-medium mt-2 uppercase text-sm">{ele.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Mission & Values */}
      <div className="flex flex-col gap-10 items-center text-center px-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-red-600">Our Mission & Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {[
            {icon: <FaLeaf />, title:"Sustainability", text:"Eco-friendly fabrics and ethical production."},
            {icon: <FaStar />, title:"Quality", text:"Each piece is crafted with precision and passion."},
            {icon: <FaUsers />, title:"Customer First", text:"Your satisfaction is our priority."},
            {icon: <FaLightbulb />, title:"Innovation", text:"We stay ahead of the fashion curve."},
            {icon: <FaHandsHelping />, title:"Community", text:"We believe in giving back to the community."},
            {icon: <FaGlobe />, title:"Accessibility", text:"We design for everyone, everywhere."},
          ].map((item, i) => (
            <motion.div 
              key={i} 
              whileHover={{scale:1.05}} 
              className="p-6 bg-white rounded-lg shadow-lg border-t-4 border-red-500 flex flex-col items-center gap-3"
            >
              <div className="text-red-600 text-3xl">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative w-full h-[300px]">
        <Image 
          src="/Hero/h1_hero2.jpg.webp" 
          alt="CTA" 
          fill 
          className="object-cover rounded-lg"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-center p-6">
          <motion.h2 
            initial={{opacity:0, y:40}} 
            whileInView={{opacity:1, y:0}} 
            transition={{duration:0.8}}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Join Our Fashion Journey
          </motion.h2>
          <motion.button 
            whileHover={{scale:1.1}} 
            className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-full shadow-lg uppercase font-semibold"
          >
            Shop Now
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default About;

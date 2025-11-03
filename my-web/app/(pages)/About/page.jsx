'use client';
import Image from 'next/image';
import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { stats } from '@/app/Data';
import { 
  FaLeaf, FaUsers, FaStar, FaLightbulb, 
  FaHandsHelping, FaGlobe 
} from "react-icons/fa";

const About = () => {
  return (
    <div className="flex flex-col gap-28 pb-28 bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800">

      {/* 🌆 HERO SECTION */}
      <section className="relative w-full h-[550px] overflow-hidden">
        <Image 
          src="/Hero/h1_hero1.jpg.webp"
          alt="Fashion Hero"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70 flex flex-col items-center justify-center text-center p-8">
          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-6xl font-extrabold text-white tracking-wide uppercase drop-shadow-lg"
          >
            Redefining Modern Fashion
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-gray-300 mt-6 max-w-2xl leading-relaxed"
          >
            We blend timeless elegance with sustainable innovation — creating clothing that celebrates individuality and confidence.
          </motion.p>
        </div>
      </section>

      {/* 🧵 WHO WE ARE */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-14 px-6">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2"
        >
          <div className="relative group rounded-2xl overflow-hidden shadow-2xl">
            <Image 
              src="/assets/mens-collection.webp"
              alt="About Us"
              width={600}
              height={500}
              className="object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-70 group-hover:opacity-90 transition duration-700" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="md:w-1/2 flex flex-col gap-6"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-yellow-600">Who We Are</h2>
          <p className="text-lg leading-relaxed text-gray-700">
            We’re more than just a fashion brand — we’re storytellers, dreamers, and innovators. 
            Each collection we design carries a message of sophistication and sustainability.
          </p>
          <p className="text-gray-700 leading-relaxed">
            With years of experience and a global customer base, our brand stands as a symbol of trust, creativity, and premium craftsmanship.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            className="w-fit bg-yellow-600 hover:bg-yellow-700 text-black font-semibold px-6 py-3 rounded-full shadow-md mt-4"
          >
            Discover More
          </motion.button>
        </motion.div>
      </section>

      {/* 📊 STATISTICS */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((ele, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition flex flex-col items-center"
            >
              <CountUp end={ele.num} duration={3} className="text-5xl font-extrabold text-yellow-600" />
              <p className="text-gray-700 font-medium mt-3 uppercase tracking-wide">{ele.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💎 MISSION & VALUES */}
      <section className="flex flex-col items-center text-center max-w-7xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-yellow-600 mb-12">
          Our Mission & Core Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {[
            { icon: <FaLeaf />, title: "Sustainability", text: "Eco-friendly materials & ethical manufacturing." },
            { icon: <FaStar />, title: "Quality", text: "Excellence is stitched into every thread." },
            { icon: <FaUsers />, title: "Customer First", text: "Your satisfaction defines our success." },
            { icon: <FaLightbulb />, title: "Innovation", text: "Ahead of the trend, inspired by creativity." },
            { icon: <FaHandsHelping />, title: "Community", text: "Building connections beyond fashion." },
            { icon: <FaGlobe />, title: "Accessibility", text: "Fashion for everyone, everywhere." },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-8 bg-white rounded-xl shadow-lg border-t-4 border-yellow-500 flex flex-col items-center gap-4 hover:shadow-yellow-200 transition"
            >
              <div className="text-yellow-600 text-4xl">{item.icon}</div>
              <h3 className="font-semibold text-lg">{item.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 🛍️ CTA SECTION */}
      <section className="relative w-full h-[350px] overflow-hidden rounded-2xl max-w-7xl mx-auto shadow-2xl">
        <Image 
          src="/Hero/h1_hero2.jpg.webp" 
          alt="Call to Action"
          fill 
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70 flex flex-col items-center justify-center text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white text-3xl md:text-4xl font-bold mb-4"
          >
            Join Our Global Fashion Movement
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-gray-300 max-w-lg mb-8"
          >
            Step into a world of style, sustainability, and sophistication. Explore our collections today.
          </motion.p>
          <motion.button 
            whileHover={{ scale: 1.1 }}
            className="bg-yellow-600 hover:bg-yellow-700 text-black px-8 py-3 rounded-full font-semibold shadow-lg uppercase"
          >
            Shop Now
          </motion.button>
        </div>
      </section>

    </div>
  );
};

export default About;

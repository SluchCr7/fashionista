'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/app/Data';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';
import { MdExpandLess, MdExpandMore } from 'react-icons/md';
import Intro from '../../Components/Intro';

const Page = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (index) => setOpenIndex(openIndex === index ? null : index);

  return (
    <div className="flex flex-col items-center w-full min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-20 relative overflow-hidden">
      {/* Subtle background decorations */}
      <motion.div
        className="absolute top-10 left-10 w-72 h-72 bg-blue-200/40 rounded-full blur-3xl"
        animate={{ y: [0, 20, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl"
        animate={{ y: [0, -20, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      {/* Intro Section */}
      <Intro
        title="Frequently Asked Questions"
        para="Find answers to common questions about orders, shipping, returns, and more — or reach out to us directly."
      />

      {/* FAQ Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-7xl w-full mt-12"
      >
        {faqs.map((section, secIndex) => (
          <div
            key={secIndex}
            className="bg-white/80 backdrop-blur-xl shadow-xl rounded-2xl p-6 border border-gray-100 hover:shadow-2xl transition-all duration-500"
          >
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4 flex items-center justify-between">
              <span>{section.category}</span>
              <div className="w-10 h-[3px] bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" />
            </h2>

            {section.items.map((faq, i) => {
              const index = `${secIndex}-${i}`;
              const isOpen = openIndex === index;
              return (
                <div key={index} className="mb-3">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className={`w-full flex justify-between items-center text-left font-medium text-gray-800 transition-all py-2 px-3 rounded-lg ${
                      isOpen ? 'bg-blue-50 text-blue-700' : 'hover:bg-gray-50'
                    }`}
                  >
                    {faq.question}
                    {isOpen ? (
                      <MdExpandLess className="text-xl text-blue-600" />
                    ) : (
                      <MdExpandMore className="text-xl text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35 }}
                        className="text-gray-600 text-sm mt-2 px-3 leading-relaxed"
                      >
                        {faq.answer}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        ))}
      </motion.div>

      {/* Contact Form */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        className="mt-20 max-w-2xl w-full bg-white/90 backdrop-blur-xl border border-gray-100 p-10 rounded-2xl shadow-2xl relative overflow-hidden"
      >
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 blur-3xl opacity-40" />
        <h2 className="text-2xl font-extrabold text-gray-800 mb-8 text-center">
          Still Have a Question?
        </h2>

        <form className="flex flex-col gap-5 relative z-10">
          <div className="flex items-center border border-gray-200 focus-within:border-blue-500 rounded-md px-3 py-3 transition bg-white shadow-sm">
            <FaUser className="text-blue-500 mr-3 text-lg" />
            <input
              type="text"
              placeholder="Full Name"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-200 focus-within:border-blue-500 rounded-md px-3 py-3 transition bg-white shadow-sm">
            <FaEnvelope className="text-blue-500 mr-3 text-lg" />
            <input
              type="email"
              placeholder="Email Address"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <div className="flex items-center border border-gray-200 focus-within:border-blue-500 rounded-md px-3 py-3 transition bg-white shadow-sm">
            <FaPhone className="text-blue-500 mr-3 text-lg" />
            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full bg-transparent outline-none text-gray-700"
            />
          </div>

          <textarea
            placeholder="Your Question"
            className="border border-gray-200 focus:border-blue-500 rounded-md p-3 h-32 outline-none bg-white shadow-sm resize-none text-gray-700 transition"
          ></textarea>

          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            type="submit"
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 rounded-md shadow-md transition"
          >
            <FaPaperPlane className="text-lg" /> Submit
          </motion.button>
        </form>

        <p className="text-gray-500 text-sm mt-6 text-center">
          📧 We’ll get back to you within <span className="font-semibold text-blue-600">24 hours</span>.
        </p>
      </motion.div>
    </div>
  );
};

export default Page;

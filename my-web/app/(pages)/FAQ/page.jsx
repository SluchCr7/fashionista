'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '@/app/Data';
import Intro from '../../Components/Intro';
import { FaUser, FaEnvelope, FaPhone, FaPaperPlane } from 'react-icons/fa';

const Page = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="flex flex-col items-center w-full py-20 px-6 bg-gray-50">
      {/* Intro */}
      <Intro
        title="Frequently Asked Questions"
        para="Find answers to common questions about orders, shipping, returns, sizing, and more."
      />

      {/* FAQs Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full mt-10">
        {faqs.map((section, secIndex) => (
          <div key={secIndex} className="bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-lg font-bold text-gray-800 border-b pb-3 mb-4">
              {section.category}
            </h2>
            {section.items.map((faq, i) => {
              const index = `${secIndex}-${i}`;
              return (
                <div key={index} className="mb-3 border-b pb-2">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex justify-between items-center text-left font-medium text-gray-900 hover:text-blue-600 transition"
                  >
                    {faq.question}
                    <span>{openIndex === index ? '−' : '+'}</span>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="text-gray-600 text-sm mt-2"
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
      </div>

      {/* Ask a Question Form */}
      <div className="mt-12 max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Still have a question?</h2>
        <form className="flex flex-col gap-5">
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaUser className="text-gray-400 mr-2" />
            <input type="text" placeholder="Full Name" className="w-full outline-none" />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaEnvelope className="text-gray-400 mr-2" />
            <input type="email" placeholder="Email" className="w-full outline-none" />
          </div>
          <div className="flex items-center border rounded-md px-3 py-2">
            <FaPhone className="text-gray-400 mr-2" />
            <input type="tel" placeholder="Phone" className="w-full outline-none" />
          </div>
          <textarea
            placeholder="Your Question"
            className="border rounded-md p-3 h-28 outline-none"
          ></textarea>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-md transition"
          >
            <FaPaperPlane /> Submit
          </button>
        </form>
        <p className="text-gray-500 text-sm mt-4 text-center">
          📧 We'll get back to you within 24 hours.
        </p>
      </div>
    </div>
  );
};

export default Page;

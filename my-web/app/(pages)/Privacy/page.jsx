'use client';
import React from 'react';
import Intro from '../../Components/Intro';
import { motion } from 'framer-motion';
import { FaUserShield, FaLock, FaShareAlt, FaCookieBite, FaGavel, FaSync, FaEnvelope } from "react-icons/fa";

const sections = [
  {
    id: "info",
    title: "1. Information We Collect",
    icon: <FaUserShield className="text-blue-600 text-2xl" />,
    content: (
      <>
        <p className="text-gray-700 mt-2">We collect the following types of information when you use our website:</p>
        <ul className="list-disc pl-6 mt-2 text-gray-700">
          <li>Personal Information (e.g., name, email, phone number, address).</li>
          <li>Payment Information (e.g., credit card details, billing address).</li>
          <li>Order Details (e.g., purchase history, shipping preferences).</li>
          <li>Device & Usage Information (e.g., IP address, browser type, cookies).</li>
        </ul>
      </>
    )
  },
  {
    id: "use",
    title: "2. How We Use Your Information",
    icon: <FaSync className="text-green-600 text-2xl" />,
    content: (
      <ul className="list-disc pl-6 mt-2 text-gray-700">
        <li>To process and fulfill your orders.</li>
        <li>To improve our website, services, and customer experience.</li>
        <li>To send order confirmations, updates, and promotional offers.</li>
        <li>To prevent fraudulent transactions and enhance security.</li>
      </ul>
    )
  },
  {
    id: "protect",
    title: "3. How We Protect Your Information",
    icon: <FaLock className="text-red-600 text-2xl" />,
    content: (
      <ul className="list-disc pl-6 mt-2 text-gray-700">
        <li>SSL encryption for secure transactions.</li>
        <li>Strict access controls to prevent unauthorized data access.</li>
        <li>Regular security audits and updates.</li>
      </ul>
    )
  },
  {
    id: "share",
    title: "4. Sharing Your Information",
    icon: <FaShareAlt className="text-purple-600 text-2xl" />,
    content: (
      <ul className="list-disc pl-6 mt-2 text-gray-700">
        <li>Trusted third-party service providers for payment processing and shipping.</li>
        <li>Legal authorities when required by law or fraud prevention measures.</li>
      </ul>
    )
  },
  {
    id: "cookies",
    title: "5. Cookies & Tracking Technologies",
    icon: <FaCookieBite className="text-yellow-600 text-2xl" />,
    content: (
      <p className="text-gray-700 mt-2">
        We use cookies to enhance your browsing experience. You can manage your cookie preferences in your browser settings.
      </p>
    )
  },
  {
    id: "rights",
    title: "6. Your Rights & Choices",
    icon: <FaGavel className="text-pink-600 text-2xl" />,
    content: (
      <ul className="list-disc pl-6 mt-2 text-gray-700">
        <li>Access, modify, or delete your personal data.</li>
        <li>Opt-out of marketing communications at any time.</li>
        <li>Request details on how we process your data.</li>
      </ul>
    )
  },
  {
    id: "changes",
    title: "7. Changes to This Policy",
    icon: <FaSync className="text-indigo-600 text-2xl" />,
    content: (
      <p className="text-gray-700 mt-2">
        We may update this policy from time to time. Changes will be reflected on this page with an updated date.
      </p>
    )
  },
  {
    id: "contact",
    title: "8. Contact Us",
    icon: <FaEnvelope className="text-orange-600 text-2xl" />,
    content: (
      <>
        <p className="text-gray-700 mt-2">If you have any questions about this Privacy Policy, contact us at:</p>
        <p className="text-gray-700 mt-2 font-bold">📧 Email: support@yourstore.com</p>
        <p className="text-gray-700">📞 Phone: +1 (800) 123-4567</p>
      </>
    )
  }
];

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-20 px-6 md:px-12">
      {/* Hero */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl p-10 text-center shadow-lg mb-12">
        <h1 className="text-4xl font-bold mb-4">🔒 Privacy Policy</h1>
        <p>Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information.</p>
      </div>

      {/* Table of Contents */}
      <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12">
        <h2 className="text-xl font-semibold mb-3">Quick Navigation</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-blue-600">
          {sections.map((sec) => (
            <li key={sec.id}>
              <a href={`#${sec.id}`} className="hover:underline">{sec.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {sections.map((sec, index) => (
          <motion.section
            key={sec.id}
            id={sec.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="bg-white p-6 rounded-lg shadow-md"
          >
            <div className="flex items-center gap-3 mb-3">
              {sec.icon}
              <h2 className="text-2xl font-semibold">{sec.title}</h2>
            </div>
            {sec.content}
          </motion.section>
        ))}
      </div>
    </div>
  );
};

export default PrivacyPolicy;

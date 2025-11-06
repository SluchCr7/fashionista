'use client'
import { motion } from "framer-motion"
import React from "react"

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900"
          >
            Shipping & Return Policy
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-gray-500 text-lg max-w-2xl mx-auto"
          >
            We aim to provide a seamless shopping experience — here’s everything you need to know about shipping, delivery, and returns.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-16">
        {/* Shipping Policy */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🚚 Shipping Policy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            Orders are processed within <span className="font-semibold">1–2 business days</span>. You will receive a confirmation email with tracking information once your order ships.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Standard delivery takes <b>3–7 business days</b> depending on your location.</li>
            <li>Express shipping is available at checkout for faster delivery.</li>
            <li>We currently ship to most regions worldwide. Shipping rates vary by destination.</li>
            <li>Orders placed on weekends or public holidays will be processed the next business day.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            Once your package has been handed over to the courier, we cannot modify the delivery address.
          </p>
        </motion.div>

        {/* Return Policy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            🔁 Return & Exchange Policy
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            We want you to love your purchase! If for any reason you’re not fully satisfied, you can request a return or exchange within <span className="font-semibold">14 days</span> of receiving your order.
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Items must be unworn, unwashed, and in original packaging.</li>
            <li>Sale items are final and cannot be returned or exchanged.</li>
            <li>Refunds are processed within 5–7 business days after receiving the returned item.</li>
            <li>Customers are responsible for return shipping costs unless the item is defective.</li>
          </ul>
          <p className="mt-4 text-gray-600">
            To start a return, contact our support team at{" "}
            <a
              href="mailto:support@yourstore.com"
              className="text-blue-600 hover:underline"
            >
              support@yourstore.com
            </a>.
          </p>
        </motion.div>
      </div>

      {/* Extra Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gray-100 border-t border-gray-200 py-16 px-6 text-center"
      >
        <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">
          Questions or Concerns?
        </h3>
        <p className="text-gray-600 max-w-2xl mx-auto mb-6">
          Our customer care team is here to help. Reach out to us anytime regarding your order or delivery.
        </p>
        <a
          href="/contact"
          className="inline-block bg-black text-white py-3 px-8 rounded-full font-medium hover:bg-gray-800 transition"
        >
          Contact Support
        </a>
      </motion.div>
    </div>
  )
}

export default ShippingReturns

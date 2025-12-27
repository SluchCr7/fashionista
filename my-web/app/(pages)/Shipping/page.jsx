'use client';
import { motion } from "framer-motion";
import React from "react";
import { Truck, RefreshCw, ShieldCheck, Mail } from "lucide-react";

const ShippingReturns = () => {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header Section */}
      <section className="relative py-24 px-6 border-b border-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs font-bold tracking-[0.3em] uppercase text-gray-400 mb-4 block"
          >
            Customer Care
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-serif font-medium mb-6"
          >
            Shipping & Returns
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-lg max-w-xl mx-auto leading-relaxed font-light"
          >
            Our commitment to your satisfaction extends beyond the purchase.
            Experience a seamless delivery and returns process.
          </motion.p>
        </div>
      </section>

      {/* Main Content Grid */}
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-24 lg:gap-32">

          {/* Shipping Policy */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 text-black">
              <Truck size={28} strokeWidth={1.5} />
              <h2 className="text-2xl font-serif font-medium uppercase tracking-tight">Delivery Logistics</h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed font-light">
              <p>
                Each order is handled with the utmost care and precision. We process all shipments within
                <span className="text-black font-normal"> 24 to 48 business hours</span> of confirmation.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Standard delivery: 3–5 business days via premium couriers.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Express shipping available globally for time-sensitive arrivals.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Real-time tracking provided upon dispatch.</span>
                </li>
              </ul>

              <div className="pt-4 p-6 bg-gray-50 rounded-sm border-l-2 border-black italic text-sm">
                Note: Address modifications are not possible once the package has entered the courier network.
              </div>
            </div>
          </motion.div>

          {/* Return Policy */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="flex items-center gap-4 text-black">
              <RefreshCw size={28} strokeWidth={1.5} />
              <h2 className="text-2xl font-serif font-medium uppercase tracking-tight">Return philosophy</h2>
            </div>

            <div className="space-y-6 text-gray-600 leading-relaxed font-light">
              <p>
                If your selection is not perfectly suited to your needs, we offer a refined returns policy within
                <span className="text-black font-normal"> 14 days</span> of receipt.
              </p>

              <ul className="space-y-4">
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Items must remain in original pristine condition with all tags attached.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Complimentary exchanges for size or color variations based on availability.</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-black font-medium">—</span>
                  <span>Refunds processed back to the original payment method within 7 days.</span>
                </li>
              </ul>

              <div className="pt-4 flex items-center gap-3 text-sm font-medium text-black">
                <ShieldCheck size={18} />
                <span>Premium Quality Guaranteed</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="bg-black text-white py-24 px-6 text-center"
      >
        <div className="max-w-2xl mx-auto space-y-8">
          <Mail className="mx-auto mb-4 opacity-50" size={40} strokeWidth={1} />
          <h3 className="text-3xl md:text-4xl font-serif font-light italic">
            Further assistance required?
          </h3>
          <p className="text-gray-400 font-light leading-relaxed">
            Our concierge team is available to assist you with any inquiries regarding
            bespoke shipping arrangements or detailed return queries.
          </p>
          <div className="pt-6">
            <a
              href="mailto:concierge@yourstore.com"
              className="inline-block border border-white/30 px-12 py-4 rounded-full font-medium tracking-widest text-xs uppercase hover:bg-white hover:text-black transition-all duration-300"
            >
              Contact Concierge
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default ShippingReturns;

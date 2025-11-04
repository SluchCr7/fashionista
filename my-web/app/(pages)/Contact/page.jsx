'use client'
import React, { useState } from 'react'
import { MdLocationOn, MdOutlinePhone, MdOutlineEmail } from "react-icons/md"
import { TiSocialSkype } from "react-icons/ti"
import { motion } from 'framer-motion'
import { socialLinks } from '@/app/Data'

const Contact = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const inputsData = [
    { text: "Full Name", value: name, setter: setName },
    { text: "Phone Number", value: phone, setter: setPhone },
    { text: "Email Address", value: email, setter: setEmail }
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!name || !phone || !email || !message) {
      alert("Please fill in all fields")
      return
    }
    alert("Message Sent Successfully 🚀")
    setName(""); setPhone(""); setEmail(""); setMessage("")
  }

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">

      {/* Hero Section */}
      <section className="relative h-[350px] bg-gradient-to-r from-yellow-600 to-yellow-400 flex flex-col items-center justify-center text-center overflow-hidden">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-5xl md:text-6xl font-extrabold text-white tracking-tight drop-shadow-lg"
        >
          Get in Touch
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-white/90 mt-4 max-w-2xl"
        >
          We’d love to hear from you. Let’s start a conversation!
        </motion.p>
      </section>

      {/* Contact Section */}
      <div className="max-w-6xl w-full mx-auto px-5 md:px-10 -mt-20 mb-20">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row rounded-2xl shadow-2xl overflow-hidden bg-white"
        >
          {/* Left Info */}
          <div className="w-full md:w-1/2 bg-black text-white p-10 md:p-12 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-yellow-600/20 to-transparent pointer-events-none" />
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-5 text-yellow-400">Contact Information</h3>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Have questions or need assistance? We`&apos;`re here to help — contact us anytime.
              </p>
              <ul className="space-y-5">
                <li className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-3 rounded-full">
                    <MdLocationOn className="text-yellow-400 text-xl" />
                  </div>
                  <span>15th Street, New York</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-3 rounded-full">
                    <MdOutlinePhone className="text-yellow-400 text-xl" />
                  </div>
                  <span>+1 (123) 456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-3 rounded-full">
                    <MdOutlineEmail className="text-yellow-400 text-xl" />
                  </div>
                  <span>info@example.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-yellow-500/10 p-3 rounded-full">
                    <TiSocialSkype className="text-yellow-400 text-xl" />
                  </div>
                  <span>live:example</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-4 mt-10 relative z-10">
              {socialLinks.map((icon) => (
                <motion.span
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  key={icon.id}
                  className="w-10 h-10 rounded-full border border-yellow-500 flex items-center justify-center text-yellow-400 hover:bg-yellow-500 hover:text-black transition duration-300 cursor-pointer"
                >
                  {icon.icon}
                </motion.span>
              ))}
            </div>
          </div>

          {/* Right Form */}
          <div className="w-full md:w-1/2 p-10 md:p-12 bg-white">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
              {inputsData.map((input, i) => (
                <div key={i} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-2">{input.text}</label>
                  <input
                    type="text"
                    value={input.value}
                    onChange={(e) => input.setter(e.target.value)}
                    className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition shadow-sm"
                    placeholder={`Enter your ${input.text.toLowerCase()}`}
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-2">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition shadow-sm"
                  placeholder="Type your message here..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-3 px-6 rounded-lg transition duration-300 shadow-lg hover:shadow-yellow-200"
              >
                Send Message
              </motion.button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Map */}
      <div className="w-full h-[400px] relative overflow-hidden shadow-inner">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.871853551664!2d-74.00601528459286!3d40.71277607933056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1637580939473!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent pointer-events-none" />
      </div>
    </div>
  )
}

export default Contact

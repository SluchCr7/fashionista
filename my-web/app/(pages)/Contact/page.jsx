'use client'
import React, { useState } from 'react'
import { MdLocationOn, MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { TiSocialSkype } from "react-icons/ti";
import { socialLinks } from '@/app/Data';
import { motion } from 'framer-motion';

const Contact = () => {
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")

  const inputsData = [
    { text: "Name", value: name, setter: setName },
    { text: "Phone", value: phone, setter: setPhone },
    { text: "Email", value: email, setter: setEmail }
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
    <div className="w-full min-h-screen bg-[#f6f5f3] flex flex-col">

      {/* Hero Section */}
      <div className="relative w-full h-[300px] bg-gradient-to-r from-yellow-600 to-yellow-400 flex items-center justify-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white">Contact Us</h1>
      </div>

      {/* Contact Container */}
      <div className="w-full max-w-6xl mx-auto px-5 -mt-16 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row rounded-xl overflow-hidden shadow-xl bg-white"
        >
          {/* Left Side - Info */}
          <div className="w-full md:w-1/2 bg-black text-white p-10 flex flex-col justify-between">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-yellow-500">Get in Touch</h3>
              <p className="text-gray-300 mb-6">
                Have questions or need assistance? Reach out and we’ll be happy to help.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <MdLocationOn className="text-yellow-500 text-xl" />
                  <span>15th Street, New York</span>
                </li>
                <li className="flex items-center gap-3">
                  <MdOutlinePhone className="text-yellow-500 text-xl" />
                  <span>+1 (123) 456-7890</span>
                </li>
                <li className="flex items-center gap-3">
                  <MdOutlineEmail className="text-yellow-500 text-xl" />
                  <span>info@example.com</span>
                </li>
                <li className="flex items-center gap-3">
                  <TiSocialSkype className="text-yellow-500 text-xl" />
                  <span>live:example</span>
                </li>
              </ul>
            </div>
            <div className="flex gap-3 mt-8">
              {socialLinks.map((icon) => (
                <span
                  key={icon.id}
                  className="w-9 h-9 rounded-full border border-yellow-500 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300"
                >
                  {icon.icon}
                </span>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="w-full md:w-1/2 p-10 bg-white">
            <h3 className="text-xl font-semibold text-gray-800 mb-6">Send us a Message</h3>
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              {inputsData.map((input, i) => (
                <div key={i} className="flex flex-col">
                  <label className="text-sm font-medium text-gray-600 mb-1">{input.text}</label>
                  <input
                    type="text"
                    value={input.value}
                    onChange={(e) => input.setter(e.target.value)}
                    className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-500 transition"
                    placeholder={`Your ${input.text}`}
                  />
                </div>
              ))}
              <div className="flex flex-col">
                <label className="text-sm font-medium text-gray-600 mb-1">Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows="5"
                  className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-yellow-500 transition"
                  placeholder="Type your message here..."
                />
              </div>
              <button
                type="submit"
                className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-2 px-6 rounded transition duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </motion.div>
      </div>

      {/* Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3021.871853551664!2d-74.00601528459286!3d40.71277607933056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQyJzQ2LjAiTiA3NMKwMDAnMjAuMCJX!5e0!3m2!1sen!2sus!4v1637580939473!5m2!1sen!2sus"
          width="100%"
          height="100%"
          allowFullScreen=""
          loading="lazy"
          className="border-0"
        ></iframe>
      </div>
    </div>
  )
}

export default Contact

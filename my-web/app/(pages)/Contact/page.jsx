'use client'
import React, { useState } from 'react'
import { MdLocationOn, MdOutlinePhone, MdOutlineEmail } from "react-icons/md";
import { TiSocialSkype } from "react-icons/ti";
import { socialLinks } from '@/app/Data';
import Intro from '../../Components/Intro';

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

    return (
        <div className="w-full min-h-screen px-5 py-16 bg-[#f6f5f3] flex flex-col items-center">
            <Intro title="Get in Touch" para="We’d love to hear from you. Send us a message!" />
            
            <div className="w-full max-w-6xl mt-10 flex flex-col md:flex-row rounded-xl overflow-hidden shadow-lg bg-white">
                {/* Left Side - Info */}
                <div className="w-full md:w-1/2 bg-black text-white p-8 flex flex-col gap-6 justify-between">
                    <div>
                        <h3 className="text-2xl font-bold mb-3 text-yellow-500">Contact Details</h3>
                        <p className="text-gray-300 mb-5">Have a question about our products or need help with your order? Reach out anytime.</p>
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
                    <div className="flex gap-3 mt-6">
                        {
                            socialLinks.map((icon) => (
                                <span key={icon.id} className="w-9 h-9 rounded-full border border-yellow-500 flex items-center justify-center text-yellow-500 hover:bg-yellow-500 hover:text-black transition duration-300">
                                    {icon.icon}
                                </span>
                            ))
                        }
                    </div>
                </div>

                {/* Right Side - Form */}
                <div className="w-full md:w-1/2 p-8 bg-white">
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Send a Message</h3>
                    <form className="flex flex-col gap-5">
                        {
                            inputsData.map((input, i) => (
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
                            ))
                        }
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
            </div>
        </div>
    )
}

export default Contact

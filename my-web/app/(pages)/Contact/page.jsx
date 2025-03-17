'use client'
import React, { useState } from 'react'
import { MdLocationOn } from "react-icons/md";
import { MdOutlinePhone } from "react-icons/md";
import { MdOutlineEmail } from "react-icons/md";
import { TiSocialSkype } from "react-icons/ti";
import Intro from '../../Components/Intro';
import { socialLinks } from '@/app/Data';
const Contact = () => {
    const [name , setName] = useState("")
    const [phone , setPhone] = useState("")
    const [email , setEmail] = useState("")
    const inputsData = [
        {
            text: "Name",
            value: name,
            setter : setName
        },
        {
            text: "Phone",
            value: phone,
            setter : setPhone
        },
        {
            text: "Email",
            value: email,
            setter : setEmail
        }
    ] 

  return (
    <div className='w-full min-h-[100vh] px-10 py-20 flex items-start justify-center flex-col'>
        <Intro title={"Contact With Us"} para={"Contact With Us if you want have any suggestions"} /> 
      <div className='flex items-start flex-col md:flex-row justify-center mx-auto py-7 w-[100%] lg:w-[60%] h-fit lg:h-[600px]'>
            <div className='bg-white shadow-xl flex-2 p-5 flex items-start h-full flex-col gap-5 rounded-l-lg w-full lg:w-[50%]'>
                <span className='text-yellow-700 '>Let is Go In Touch</span>
                <p className='w-[70%] text-gray-700'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum veritatis impedit veniam vero ratione sit exercitationem.</p>
                <ul className='flex items-start gap-4 flex-col py-3'>
                    <li className='flex items-start md:items-center flex-col md:flex-row gap-2 text-white'>
                        <MdLocationOn className='text-2xl text-black' />
                        <span className='text-black'>15th Street, New York</span>
                    </li>
                    <li className='flex items-start md:items-center flex-col md:flex-row gap-2 text-white'>
                        <MdOutlinePhone className='text-2xl text-black' />
                        <span className='text-black'>+1 (123) 456-7890</span>
                    </li>
                    <li className='flex items-start md:items-center flex-col md:flex-row gap-2 text-white'>
                        <MdOutlineEmail className='text-2xl text-black' />
                        <span className='text-black'>info@example.com</span>
                    </li>
                    <li className='flex items-start md:items-center flex-col md:flex-row gap-2 text-white'>
                        <TiSocialSkype className='text-2xl text-black' />
                        <span className='text-black'>info@example.com</span>
                    </li>
                </ul>
                <div className='flex items-center gap-3'>                    
                    {
                        socialLinks.map((icon) => {
                            return(
                                <span key={icon.id} className='w-7 h-7 rounded-full border-[1px] border-yellow text-yellow flex items-center justify-center'>{icon.icon}</span>
                            )
                        })
                    }
                </div>
            </div>
            <div className='bg-black flex-2 p-5 flex items-start flex-col gap-5 rounded-r-lg w-full lg:w-[50%] h-full'>
                <span className='text-white'>Contuct Us</span>
                <div className='flex items-start flex-col gap-5 w-full'>
                    {
                        inputsData.map((input , index)=>{
                            return(
                                <div key={index} className='flex items-start flex-col gap-1 w-full'>
                                    <span className='text-yellow text-sm font-bold tracking-[3px]'>{input.text}</span>
                                    <input value={input.value} onChange={(e)=> input.setter(e.target.value)} type="text" className='w-[80%] p-2 rounded-sm bg-transparent border-[1px] text-yellow-700 border-yellow-700' />
                                </div>
                            )
                        })
                    }
                    <div className='flex items-start flex-col gap-1 w-full'>
                        <span className='text-yellow text-sm font-bold tracking-[3px]'>Message</span>
                        <textarea className='w-[80%] text-yellow-700 p-2 rounded-sm bg-transparent border-[1px] border-yellow-700' />
                    </div>
                    <button className='w-[50%] p-3 rounded-md bg-yellow-600'>Send</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Contact
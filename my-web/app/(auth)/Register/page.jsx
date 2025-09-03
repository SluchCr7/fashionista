'use client'
import Notify from '@/app/Components/Notify'
import { UserContext } from '@/app/Context/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const [email , setEmail] = useState("")
  const [name , setName] = useState("")
  const [password, setPass] = useState("")
  const [showPass, setShowPass] = useState(false)
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { Register } = useContext(UserContext)

  const handleRegister = async () => {
    if(!email || !name || !password){
      setMessage("Please fill in all fields")
      return setTimeout(() => setMessage(""), 3000)
    }

    // Basic validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailRegex.test(email)){
      setMessage("Enter a valid email address")
      return setTimeout(() => setMessage(""), 3000)
    }
    if(password.length < 6){
      setMessage("Password must be at least 6 characters")
      return setTimeout(() => setMessage(""), 3000)
    }

    try {
      setLoading(true)
      await Register(email, name, password)
    } catch (err) {
      setMessage("Registration failed. Try again.")
      setTimeout(() => setMessage(""), 3000)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Notify Notify={message}/>
      <div className='flex items-center flex-col md:flex-row gap-6 w-full min-h-screen'>
        
        {/* Image Section */}
        <div className='hidden md:block w-full'>
          <Image src={"/assets/register.webp"} width={500} height={500} className='w-full h-auto rounded-lg' alt='register_bg'/>
        </div>

        {/* Form Section */}
        <div className='flex items-center flex-col gap-4 px-10 py-5 w-full'>
          <div className='w-full md:w-[70%] border border-gray-300 shadow-lg p-10 rounded-lg bg-white flex items-center flex-col gap-6'>
            
            <span className='text-black font-bold text-3xl'>Sluchwsky</span>
            <p className='text-sm tracking-[1px] text-gray-600'>Create your account and start discovering your dreams</p>
            
            <div className='flex flex-col gap-4 w-full'>
              {/* Email */}
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="Email" className='text-sm font-medium'>Email</label>
                <input 
                  value={email} 
                  onChange={(e)=> setEmail(e.target.value)} 
                  id='Email' 
                  type="email" 
                  className='p-2 w-full rounded border border-gray-400 bg-transparent text-black focus:outline-none focus:border-black' 
                />
              </div>
              
              {/* Name */}
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="Name" className='text-sm font-medium'>Name</label>
                <input 
                  value={name} 
                  onChange={(e)=> setName(e.target.value)} 
                  id='Name' 
                  type="text" 
                  className='p-2 w-full rounded border border-gray-400 bg-transparent text-black focus:outline-none focus:border-black' 
                />
              </div>

              {/* Password */}
              <div className='flex flex-col gap-1 w-full relative'>
                <label htmlFor="Password" className='text-sm font-medium'>Password</label>
                <input 
                  value={password} 
                  onChange={(e)=> setPass(e.target.value)} 
                  id='Password' 
                  type={showPass ? "text" : "password"} 
                  className='p-2 w-full rounded border border-gray-400 bg-transparent text-black focus:outline-none focus:border-black' 
                />
                <span 
                  className='absolute right-3 top-9 cursor-pointer text-gray-600'
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>
              
              {/* Button */}
              <button 
                onClick={handleRegister} 
                disabled={loading}
                className={`p-3 w-full rounded-md text-white uppercase transition 
                ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
              >
                {loading ? "Registering..." : "Register"}
              </button>
              
              {/* Login Link */}
              <span className='text-sm text-gray-700'>
                Already have an Account?{" "}
                <Link href={"/Login"} className='font-bold text-black hover:underline'>Login</Link>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Register

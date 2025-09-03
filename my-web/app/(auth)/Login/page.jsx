'use client'
import Notify from '@/app/Components/Notify'
import { UserContext } from '@/app/Context/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Login = () => {
  const [email , setEmail] = useState("")
  const [password, setPass] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const { Login } = useContext(UserContext)

  const handleLogin = async () => {
    if(email === "" || password === ""){
      setMessage("Enter Your Email And Password")
      setTimeout(() => setMessage(""), 3000)
    } else {
      try {
        setLoading(true)
        await Login(email, password)
      } catch (err) {
        setMessage("Invalid Email or Password")
        setTimeout(() => setMessage(""), 3000)
      } finally {
        setLoading(false)
      }
    }
  }

  return (
    <>
      <Notify Notify={message}/>
      <div className='flex items-center flex-col md:flex-row gap-6 w-full min-h-screen'>
        
        {/* Form Section */}
        <div className='flex items-center flex-col gap-4 px-10 py-5 w-full'>
          <div className='w-full md:w-[70%] border border-gray-300 shadow-lg p-10 rounded-lg bg-white flex items-center flex-col gap-6'>
            
            <span className='text-black font-bold text-3xl'>Sluchwsky</span>
            <p className='text-sm tracking-[1px] text-gray-600'>Login now and start discovering your dreams</p>
            
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
              
              {/* Password */}
              <div className='flex flex-col gap-1 w-full'>
                <label htmlFor="Password" className='text-sm font-medium'>Password</label>
                <input 
                  value={password} 
                  onChange={(e)=> setPass(e.target.value)} 
                  id='Password' 
                  type="password" 
                  className='p-2 w-full rounded border border-gray-400 bg-transparent text-black focus:outline-none focus:border-black' 
                />
              </div>
              
              {/* Button */}
              <button 
                onClick={handleLogin} 
                disabled={loading}
                className={`p-3 w-full rounded-md text-white uppercase transition 
                ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-black hover:bg-gray-800'}`}
              >
                {loading ? "Logging in..." : "Login"}
              </button>
              
              {/* Signup Link */}
              <span className='text-sm text-gray-700'>
                Don&apos;t have an Account?{" "}
                <Link href={"/Register"} className='font-bold text-black hover:underline'>Sign Up</Link>
              </span>
            </div>
          </div>
        </div>

        {/* Image Section */}
        <div className='hidden md:block w-full'>
          <Image src={"/assets/login.webp"} width={500} height={500} className='w-full h-auto rounded-lg' alt='login_bg'/>
        </div>
      </div>
    </>
  )
}

export default Login

'use client'
import Notify from '@/app/Components/Notify'
import { UserContext } from '@/app/Context/UserContext'
import Image from 'next/image'
import Link from 'next/link'
import React, { useContext, useState } from 'react'

const Register = () => {
    const [email , setEmail] = useState("")
    const [name , setName] = useState("")
    const [password, setPass] = useState("")
    const [message, setMessage] = useState("")
    const {Register} = useContext(UserContext)
    const handleRegister = () => {
        if(email === "" || password === "" || name === ""){
            setMessage("Enter Your Email And Password And Name")
            setTimeout(() => setMessage(""), 3000)
        }
        else {
            Register(email , name , password)
        }
    }
return (
    <>
        <Notify Notify={message}/>
        <div className='flex items-center flex-col md:flex-row gap-6 w-full'>
            <div className='w-full'>
                <Image src={"/assets/register.webp"} width={500} height={500} className='w-[100%] h-auto' alt='login_bg'/>
            </div>
            <div className='flex items-center flex-col gap-4 px-10 py-5  w-[100%]'>
                <div className='w-[70%] border border-black p-10 flex items-center flex-col gap-4'>                
                    <span className='text-black font-bold text-2xl'>Sluchwsky</span>
                    <p className='text-sm tracking-[1px]'>Login Now and Start discover Your Dreams</p>
                    <div className='flex items-center flex-col gap-4 w-full'>
                        <div className='flex items-start flex-col gap-1 w-full'>
                            <label htmlFor="Email">Email</label>
                            <input value={email} onChange={(e)=> setEmail(e.target.value)} id='Email' type="email" className='p-2 w-[100%] rounded border border-black bg-transparent text-black' />
                        </div>
                        <div className='flex items-start flex-col gap-1 w-full'>
                            <label htmlFor="Name">Name</label>
                            <input value={name} onChange={(e)=> setName(e.target.value)} id='Name' type="text" className='p-2 w-[100%] rounded border border-black bg-transparent text-black' />
                        </div>
                        <div className='flex items-start flex-col gap-1 w-full'>
                            <label htmlFor="Password">Password</label>
                            <input value={password} onChange={(e)=> setPass(e.target.value)} id='Password' type="password" className='p-2 w-[100%] rounded border border-black bg-transparent text-black' />
                        </div>
                        <button onClick={handleRegister} className='bg-black p-4 w-full rounded-md text-white uppercase '>Register</button>
                        <span>Already Have An Account <Link href={"/Login"} className='font-bold'>Login</Link></span>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Register
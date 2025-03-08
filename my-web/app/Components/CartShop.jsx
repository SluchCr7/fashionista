'use client'
import React, { useContext, useState } from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger , SheetContent} from '@/components/ui/sheet'
import Image from 'next/image';
import { CiShoppingCart } from "react-icons/ci";
import { CartContext } from '../Context/Cart'
import { usePathname } from 'next/navigation';
const CartShop = () => {
    const {numInCart , cart , finalCart , SubmitCart , discount} = useContext(CartContext)
    const handleCart =()=>{
        SubmitCart(cart);
        // window.location.href = "/Checkout"
    }
  return (
    <div>
        <Sheet>
            <SheetTrigger>
                <div className='relative w-full'>
                    <span className='text-xl relative top-1'><CiShoppingCart /></span>
                    <span className='absolute -top-1 -left-2 text-white w-[15px] h-[15px] text-[10px] flex items-center justify-center text-center p-1 rounded-full bg-black'>{numInCart}</span>
                </div>
            </SheetTrigger>
            <SheetContent position="right" size="content">
                <div className='flex flex-col items-start gap-4 justify-center w-full py-20'>                    
                    <span className='text-yellow font-bold uppercase tracking-[3]'>Your Cart</span>
                    {cart.map((prod, index) => {
                        return (        
                            <div key={index} className='flex items-center gap-2 w-full border-b-[1px] border-black pb-2'>
                                <div className='flex items-center gap-4 w-full'>
                                    <Image src={prod.img} alt='product_img' width={200} height={200} className='w-[80px] h-[80px] rounded-md' />
                                    <div className='flex items-start flex-col w-full'>
                                        <span className='Name text-black text-base'>{prod.name}</span>
                                        <div className='flex items-center gap-2'>
                                            <span className='text-gray-500 text-sm'>Size : <span className='text-black font-bold'>{prod.size}</span></span>
                                            <span className='text-gray-500 text-sm'>Color : <span className='text-black font-bold'>{prod.color}</span></span>
                                        </div>
                                        <span>${prod.price} x {prod.quantity}</span>
                                    </div>
                                    {/* <span className='text-black font-bold'>{prod.discount}</span> */}
                                </div>
                                <div className='flex items-center flex-col gap-1'>
                                    <h1 className='text-black font-bold'>${prod.price * prod.quantity}</h1>
                                </div>
                            </div>
                        )
                    })}
                    <Link href={"/Checkout"} onClick={handleCart} className='w-full bg-black text-white p-3 rounded-md'>Checkout</Link>
                </div>
            </SheetContent>
        </Sheet>
    </div>
  )
}

export default CartShop
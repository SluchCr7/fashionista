'use client'
import React, { useContext, useEffect } from 'react'
import Link from 'next/link'
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet'
import Image from 'next/image'
import { CiShoppingCart } from "react-icons/ci"
import { CartContext } from '../Context/Cart'

const CartShop = () => {
  const { numInCart, cart, SubmitCart } = useContext(CartContext)

  const handleCart = () => {
    SubmitCart(cart)
  }
  useEffect(() => {
    console.log(cart)
  }, [cart])
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)

  return (
    <div>
      <Sheet>
        <SheetTrigger>
          <div className='relative cursor-pointer'>
            <CiShoppingCart className="text-2xl" />
            {numInCart > 0 && (
              <span className='absolute -top-1 -left-2 text-white w-[16px] h-[16px] text-[10px] flex items-center justify-center rounded-full bg-black'>
                {numInCart}
              </span>
            )}
          </div>
        </SheetTrigger>

        <SheetContent position="right" size="content" className="w-[350px] sm:w-[400px] flex flex-col">
          <div className='flex flex-col h-full'>
            
            {/* Header */}
            <h2 className='text-lg font-bold uppercase text-DarkRed mb-4'>Your Cart</h2>

            {/* Cart Items */}
            <div className='flex-1 overflow-y-auto space-y-4 pr-2'>
              {cart.length > 0 ? (
                cart.map((prod) => (
                  <div key={prod.id} className='flex items-center gap-3 border-b pb-3'>
                    <Image 
                      src={prod.Photo[0].url} 
                      alt={prod.name} 
                      width={80} 
                      height={80} 
                      className='w-[80px] h-[80px] rounded-md object-cover'
                    />
                    <div className='flex flex-col flex-1'>
                      <span className='font-medium text-gray-800'>{prod.name}</span>
                      <span className='text-sm text-gray-500'>Size: <b>{prod.size}</b></span>
                      <span className='text-sm text-gray-500'>Color: <b>{prod.color}</b></span>
                      <span className='text-sm text-gray-700'>${prod.price.toFixed(2)} x {prod.quantity}</span>
                    </div>
                    <span className='font-bold text-gray-900'>
                      ${(prod.price * prod.quantity).toFixed(2)}
                    </span>
                  </div>
                ))
              ) : (
                <div className='flex flex-col items-center justify-center text-gray-500 py-10'>
                  <CiShoppingCart className="text-5xl mb-3" />
                  <p>Your cart is empty</p>
                  <Link href="/shop" className="text-DarkRed mt-2 underline">Continue Shopping</Link>
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className='mt-4 border-t pt-4 space-y-3'>
                <div className='flex justify-between text-sm'>
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-bold text-gray-900">${subtotal.toFixed(2)}</span>
                </div>
                <Link 
                  href="/Checkout" 
                  onClick={handleCart} 
                  className='block w-full bg-black text-white py-3 rounded-md text-center font-semibold hover:bg-gray-800 transition'
                >
                  Checkout
                </Link>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  )
}

export default CartShop

'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import Intro from './Intro';
import { FaLongArrowAltRight } from "react-icons/fa";
import { FaLongArrowAltLeft } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
const LatestCollection = () => {
    const ScrollRef = useRef(null);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(false);
    const {products} = useContext(ProductContext)
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(false)
    const scroll = (dir) => {
        const scrollAmount = dir === "left" ? -300 : 300
        ScrollRef.current.scrollBy({left : scrollAmount , behaviour : "smooth"})
    }
    const handleScorllUpdate = () => {
        const container = ScrollRef.current;
        if (container) {
            const LeftScroll = container.scrollLeft;
            const rightScrollBar =
                container.scrollWidth > LeftScroll + container.clientWidth;
            setCanScrollLeft(LeftScroll > 0);
            setCanScrollRight(rightScrollBar);
        }
        console.log({
            scrollLeft: container.scrollLeft,
            clientWidth: container.clientWidth,
            containerScrollWidth : container.scrollWidth
        })
    }
    useEffect(() => {
        const container = ScrollRef.current;
        if (container) {
            container.addEventListener('scroll', handleScorllUpdate);
            handleScorllUpdate()
            return () => {
                container.removeEventListener('scroll', handleScorllUpdate);
            }
        }
    },[])
  return (
    <div className="flex relative items-center justify-center max-w-[1370px] w-full flex-col gap-3 px-10 py-5">
    <Intro title="Latest Collection" para="Explore our latest products below and go to the shop!" />
        <div ref={ScrollRef} className="scrollBar mx-auto w-full overflow-x-auto flex space-x-6 relative">
            {
                products.map((product , index) => {
                    return (
                        <>
                            <div className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'>
                                {/* <Link href={`/Product/${product?._id}`}> */}
                                    <Image src={product?.Photo[0]?.url} alt={'product_img'} width={200} height={200}
                                        className='w-full h-[500px] rounded-lg object-cover'
                                    />
                                {/* </Link> */}
                                <Link href={`/Product/${product?._id}`} className='flex items-center flex-col gap-1 py-4'>
                                    <span className='text-black font-bold'>{product?.name}</span>
                                    <span className='text-DarkRed'>${product?.price}</span>
                                </Link>
                            </div>
                        </>
                    )
                }).slice(0 , 8)
            }
        </div>
        {/* Navigation buttons */}
        {
            products.length > 0 &&
            <div className='flex items-center gap-3'>
                <button
                    onClick={()=> scroll("left")}
                    className={`absolute top-[40%] left-[5px] md:left-0 z-50 ${canScrollLeft ? "bg-yellow text-white" : "bg-gray-200 text-gray-400 pointer-events-none"} p-2 rounded-full shadow-lg`}
                >
                    <FaLongArrowAltLeft />
                </button>
                <button
                    onClick={()=> scroll("right")}
                    className={` absolute top-[40%] right-[5px] md:right-0 z-50 ${canScrollRight ? "bg-yellow text-white" : "bg-gray-200 text-gray-400 pointer-events-none"} p-2 rounded-full shadow-lg`}
                >
                    <FaLongArrowAltRight />
                </button>
            </div>
        }
      </div>        
  );
};

export default LatestCollection;

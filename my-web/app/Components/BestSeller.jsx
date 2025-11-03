'use client'
import React, { useRef, useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import Intro from './Intro'
import Link from 'next/link'
import { ProductContext } from '../Context/ProductContext'
import { ReviewContext } from '../Context/ReviewContext'
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa"
import { CiStar } from "react-icons/ci"

const BestSeller = () => {
  const { products } = useContext(ProductContext)
  const { Reviews } = useContext(ReviewContext)

  const scrollRef = useRef(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  // وظيفة وهمية لحساب متوسط التقييم - يجب أن تكون حقيقية في تطبيقك
  const calculateAverageRating = (productId) => {
      const productReviews = Reviews.filter(review => review?.product?._id === productId);
      if (productReviews.length === 0) return 0;
      // يفترض أن Review object يحتوي على 'rating'
      const totalRating = productReviews.reduce((sum, review) => sum + (review.rating || 5), 0); 
      // نستخدم تقييم افتراضي 4.5 إن لم يوجد تقييم في الكود المرفق
      return productReviews.length > 0 ? (totalRating / productReviews.length).toFixed(1) : '4.5';
  };
  
  // scroll function
  const scroll = (dir) => {
    const scrollAmount = dir === "left" ? -380 : 380 // توحيد قيمة التمرير
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" })
  }

  // check scroll state
  const handleScrollUpdate = () => {
    const container = scrollRef.current
    if (container) {
      const leftScroll = container.scrollLeft
      const rightScroll = container.scrollWidth > leftScroll + container.clientWidth + 10 // هامش 10px
      setCanScrollLeft(leftScroll > 0)
      setCanScrollRight(rightScroll)
    }
  }

  useEffect(() => {
    const container = scrollRef.current
    if (container) {
      container.addEventListener('scroll', handleScrollUpdate)
      handleScrollUpdate()
      return () => container.removeEventListener('scroll', handleScrollUpdate)
    }
  }, [])

  return (
    // إضافة خلفية فاتحة لتمييز القسم
    <div className="flex relative items-center justify-center max-w-[1370px] w-full flex-col gap-6 px-6 py-16 bg-gray-50">
      <Intro title="🔥 Best Sellers" para="اكتشف المنتجات الأكثر طلباً وتقييماً من عملائنا." />

      {/* Scroll Container */}
      <div className="relative w-full">
        {/* Navigation Buttons - توحيد التصميم والموقع مع LatestCollection */}
        {products.length > 0 && (
          <>
            <button
              onClick={() => scroll("left")}
              className={`absolute top-1/2 -translate-y-1/2 -left-3 z-20 p-4 rounded-full bg-black text-white shadow-xl hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollLeft && "opacity-40 cursor-default pointer-events-none"}`}
            >
              <FaLongArrowAltLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              className={`absolute top-1/2 -translate-y-1/2 -right-3 z-20 p-4 rounded-full bg-black text-white shadow-xl hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollRight && "opacity-40 cursor-default pointer-events-none"}`}
            >
              <FaLongArrowAltRight className="text-xl" />
            </button>
          </>
        )}

        <div
          ref={scrollRef}
          // زيادة المسافة وتعديل الهوامش
          className="scrollBar mx-auto w-full overflow-x-auto flex space-x-8 relative py-4"
        >
          {
            products.slice(10, 16).map((prod, index) => {
              const avgRating = calculateAverageRating(prod?._id);
              const reviewCount = Reviews.filter(review => review?.product?._id === prod?._id).length;
              
              return (
                <div
                  key={index}
                  // توحيد العرض وتصميم البطاقة
                  className="min-w-full sm:min-w-[48%] lg:min-w-[31%] bg-white rounded-xl shadow-lg hover:shadow-2xl transition duration-500 overflow-hidden border border-gray-100"
                >
                  <Link href={`/Product/${prod?._id}`}>
                    <Image
                      src={prod?.Photo[0]?.url}
                      alt={prod?.name}
                      width={400}
                      height={500}
                      className="w-full h-[350px] object-cover hover:scale-[1.03] transition duration-500" // تأثير بسيط على الصورة
                    />
                    <div className="flex flex-col items-center gap-2 py-4 px-3">
                      <span className="text-gray-900 font-extrabold text-xl text-center">
                        {prod?.name}
                      </span>
                      {/* إبراز السعر بخط عريض جداً ولون قوي */}
                      <span className="text-red-700 font-extrabold text-2xl">${prod?.price}</span>
                      
                      {/* عرض التقييم بشكل احترافي وواضح */}
                      <div className="flex items-center gap-2 text-base mt-1">
                        <div className="flex text-yellow-500">
                           {/* يمكنك استخدام مكتبة لتقديم النجوم بشكل ديناميكي */}
                           <CiStar className="text-xl fill-current" />
                           <CiStar className="text-xl fill-current" />
                           <CiStar className="text-xl fill-current" />
                           <CiStar className="text-xl fill-current" />
                        </div>
                        <span className="text-gray-900 font-bold">
                          {avgRating} / 5
                        </span>
                        <span className="text-gray-500 text-sm">
                          ({reviewCount} مراجعة)
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default BestSeller
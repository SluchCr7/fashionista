'use client'
import React, { useState, useEffect, useRef, useContext } from 'react';
import { FaLongArrowAltRight, FaLongArrowAltLeft } from "react-icons/fa";
import Image from 'next/image';
import Link from 'next/link';
import { ProductContext } from '../Context/ProductContext';
import Intro from './Intro'; // يفترض أن مكون Intro تم تحسينه أيضاً

const LatestCollection = () => {
  const scrollRef = useRef(null);
  const { products } = useContext(ProductContext);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Scroll buttons
  const scroll = (dir) => {
    // زيادة قيمة التمرير قليلاً لتكون الحركة أسرع وأكثر وضوحاً
    const scrollAmount = dir === "left" ? -380 : 380;
    scrollRef.current?.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update scroll states
  const handleScrollUpdate = () => {
    const container = scrollRef.current;
    if (container) {
      const left = container.scrollLeft;
      // إضافة هامش بسيط (10px) للتحقق من التمرير لليمين
      const right = container.scrollWidth > left + container.clientWidth + 10; 
      setCanScrollLeft(left > 0);
      setCanScrollRight(right);
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollUpdate);
      handleScrollUpdate();
      return () => container.removeEventListener("scroll", handleScrollUpdate);
    }
  }, []);

  return (
    <section className="relative max-w-[1370px] mx-auto w-full px-6 py-16">
      {/* Section Intro */}
      <Intro
        title="✨ Latest Collection"
        para="استكشف أحدث إبداعاتنا وتسوق أحدث صيحات الموضة الآن."
      />

      {/* Products carousel container - إضافة حاوية نسبية للأسهم */}
      <div className="relative">
         {/* Navigation arrows - أزرار التمرير على الجانبين (تظهر على الشاشات الكبيرة) */}
        {products.length > 4 && (
          <>
            <button
              onClick={() => scroll("left")}
              // تصميم أسهم احترافي داكن ومميز
              className={`absolute top-1/2 -translate-y-1/2 -left-3 z-20 p-4 rounded-full bg-black text-white shadow-xl hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollLeft && "opacity-40 cursor-default pointer-events-none"}`}
            >
              <FaLongArrowAltLeft className="text-xl" />
            </button>
            <button
              onClick={() => scroll("right")}
              // تصميم أسهم احترافي داكن ومميز
              className={`absolute top-1/2 -translate-y-1/2 -right-3 z-20 p-4 rounded-full bg-black text-white shadow-xl hover:bg-red-600 transition duration-300 hidden lg:block
                ${!canScrollRight && "opacity-40 cursor-default pointer-events-none"}`}
            >
              <FaLongArrowAltRight className="text-xl" />
            </button>
          </>
        )}

        {/* Products carousel */}
        <div
          ref={scrollRef}
          // زيادة المسافة بين العناصر
          className="flex gap-8 overflow-x-auto scroll-smooth scrollbar-hide py-8"
        >
          {products.slice(0, 8).map((product) => (
            <div
              key={product._id}
              // تحديد عرض أكثر احترافية للبطاقات على مختلف الشاشات
              className="min-w-full sm:min-w-[48%] md:min-w-[31%] lg:min-w-[23%] group relative bg-white shadow-xl transition-shadow duration-500 rounded-xl overflow-hidden"
            >
              <Link href={`/Product/${product._id}`}>
                {/* حاوية الصورة مع تأثير التكبير */}
                <div className="relative overflow-hidden h-[450px]">
                  <Image
                    src={product.Photo[0]?.url}
                    alt={product.name}
                    width={400} 
                    height={600}
                    // تأثير أبطأ وأكثر سلاسة (duration-700)
                    className="w-full h-full object-cover transform group-hover:scale-105 transition duration-700 ease-in-out" 
                  />
                  {/* Overlay احترافي مع زر واضح */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-3 rounded-full font-bold text-base shadow-xl hover:bg-gray-100 transition">
                      عرض المنتج
                    </span>
                  </div>
                </div>
              </Link>
              {/* تفاصيل المنتج تحت الصورة مباشرةً في مساحة نظيفة */}
              <div className="text-left py-4 px-3">
                <h3 className="font-bold text-lg text-gray-900 truncate">{product.name}</h3>
                {/* إبراز السعر بخط عريض ولون قوي */}
                <p className="text-red-600 font-extrabold text-xl mt-1">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA button - تصميم زر احترافي */}
      <div className="flex justify-center mt-12">
        <Link
          href="/Shop"
          // تصميم زر ذو خلفية صلبة و Bold
          className="bg-black text-white px-10 py-4 rounded-full font-bold text-lg tracking-wider hover:bg-red-700 transition transform hover:scale-105 shadow-2xl"
        >
          شاهد جميع المنتجات
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
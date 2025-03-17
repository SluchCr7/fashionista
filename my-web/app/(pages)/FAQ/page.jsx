'use client';
import React from 'react';
import Intro from '../../Components/Intro';
import { faqs } from '@/app/Data';
const Page = () => {
  return (
    <div className='flex flex-col items-center w-full py-20 px-6 bg-gray-50'>
      <Intro title="Frequently Asked Questions" para="Find answers to common questions about orders, shipping, returns, sizing, and more." />
      
      {/* FAQs Section */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl w-full mt-6'>
        {faqs.map((section, index) => (
          <div key={index} className='bg-white p-6 rounded-lg shadow-md w-full'>
            <h2 className='text-lg font-semibold text-gray-800 border-b pb-2 mb-4'>{section.category}</h2>
            {section.items.map((faq, i) => (
              <div key={i} className='mb-4'>
                <p className='font-medium text-gray-900'>{faq.question}</p>
                <p className='text-gray-600 text-sm'>{faq.answer}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      {/* Ask a Question Form */}
      <div className='mt-10 max-w-2xl w-full bg-white p-6 rounded-lg shadow-md'>
        <h2 className='text-lg font-semibold text-gray-800 mb-4'>Have a Question?</h2>
        <form className='flex flex-col gap-4'>
          <input type='text' placeholder='Full Name' className='border p-2 rounded-md w-full' />
          <input type='email' placeholder='Email' className='border p-2 rounded-md w-full' />
          <input type='tel' placeholder='Phone' className='border p-2 rounded-md w-full' />
          <textarea placeholder='Your Question' className='border p-2 rounded-md w-full h-24'></textarea>
          <button type='submit' className='bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-200'>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Page;

'use client';
import React from 'react';
import Intro from '../../Components/Intro';

const Page = () => {
  const faqs = [
    {
      category: "Orders & Shipping",
      items: [
        {
          question: "How do I place an order?",
          answer: "Browse our collections, add items to your cart, and proceed to checkout. You’ll receive a confirmation email once your order is placed."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept credit/debit cards (Visa, MasterCard, Amex), PayPal, Apple Pay, Google Pay, and Buy Now, Pay Later options (if available)."
        },
        {
          question: "How long does shipping take?",
          answer: "Standard shipping takes 5-7 business days, while express shipping takes 2-3 business days. Delivery times may vary depending on your location."
        },
        {
          question: "Do you offer international shipping?",
          answer: "Yes, we ship worldwide! Shipping costs and delivery times vary by country and will be calculated at checkout."
        },
        {
          question: "Can I track my order?",
          answer: "Yes! Once your order ships, you’ll receive a tracking number via email. You can also track your order in the Order Tracking section on our website."
        },
      ]
    },
    {
      category: "Returns & Exchanges",
      items: [
        {
          question: "What is your return policy?",
          answer: "We offer a 30-day return policy. Items must be unworn, unwashed, and in their original packaging with tags attached."
        },
        {
          question: "How do I start a return or exchange?",
          answer: "Visit our Returns & Exchanges page and follow the instructions to process your return. You may need to print a return label and drop off your package at a nearby shipping center."
        },
        {
          question: "Do I have to pay for return shipping?",
          answer: "We offer free returns on defective or incorrect items. For size or preference exchanges, customers may be responsible for return shipping costs."
        },
        {
          question: "How long does it take to process a refund?",
          answer: "Once we receive your return, refunds are processed within 5-7 business days. It may take additional time for your bank to reflect the transaction."
        }
      ]
    },
    {
      category: "Sizing & Product Information",
      items: [
        {
          question: "How do I know what size to order?",
          answer: "We provide detailed size charts for each product. You can find them on the product page. If unsure, contact our support team for guidance."
        },
        {
          question: "Are your clothes true to size?",
          answer: "Most of our items are true to size, but some may run small or large. Check product descriptions and reviews for size recommendations."
        },
        {
          question: "What materials are your clothes made of?",
          answer: "Each product page lists the fabric composition. We prioritize high-quality, sustainable, and comfortable materials."
        },
        {
          question: "How do I care for my clothes?",
          answer: "Care instructions are listed on product labels and product pages. Most items should be washed in cold water and air-dried to maintain their quality."
        }
      ]
    },
    {
      category: "Customer Service",
      items: [
        {
          question: "How can I contact customer support?",
          answer: "You can reach us via:\n📧 Email: support@yourstore.com\n📞 Phone: +1 (800) 123-4567\n💬 Live Chat: Available on our website during business hours"
        },
        {
          question: "What are your customer service hours?",
          answer: "Our team is available Monday – Friday, 9 AM – 6 PM (EST)."
        },
        {
          question: "Can I modify or cancel my order after placing it?",
          answer: "Orders can only be modified or canceled within 12 hours of placing them. Contact us ASAP if you need changes."
        }
      ]
    }
  ];

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

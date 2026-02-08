import { CiPlane, CiMoneyCheck1, CiTimer } from "react-icons/ci";
import { TiMessage } from "react-icons/ti";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

// Links Header 

export const navLinks = [
  { name: "Men", link: "/Men" },
  { name: "Women", link: "/Women" },
  { name: "Shop", link: "/Shop" },
  { name: "Kids", link: "/Kids" },
  { name: "Shoes", link: "/Shoes" },
  { name: "Accessories", link: "/Accessories" },
];


// Features

export const features = [
  {
    id: 1,
    text: "Free Shipping",
    icon: <CiPlane />,
    paragraph: "Get free shipping on orders over $100.",
  },
  {
    id: 2,
    text: "Secure Payment",
    icon: <CiMoneyCheck1 />,
    paragraph: "Your payment information is always safe with us.",
  },
  {
    id: 3,
    text: "Fast Delivery",
    icon: <CiTimer />,
    paragraph: "Receive your order within 8 hours.",
  },
  {
    id: 4,
    text: "24/7 Support",
    icon: <TiMessage />,
    paragraph: "Our team is available anytime for assistance.",
  },
];


// Sponsers and Companies


export const Companies = [
  "/sponsers/Spo1.png",
  "/sponsers/Spo2.png",
  "/sponsers/Spo3.png",
  "/sponsers/Spo4.png",
  "/sponsers/Spo5.png",
  "/sponsers/Spo6.png",
  "/sponsers/Spo7.png",
  "/sponsers/Logo1.svg",
  "/sponsers/Logo2.svg",
  "/sponsers/Logo3.svg",
  "/sponsers/Logo4.svg",
  "/sponsers/Logo5.svg",
]

export const brands = [
  { name: 'Adidas', image: '/brands/brand1.png' },
  { name: 'Nike', image: '/brands/brand2.png' },
  { name: 'Puma', image: '/brands/brand3.png' },
  { name: 'New Balance', image: '/brands/brand4.png' }
];


// testimonials

export const testimonials = [
  {
    name: "Arnold Adam",
    img: "/Openions/testimonial1-1.jpg",
    job: "AI Developer",
    opinion: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vitae, maiores? Adipisci soluta tempora explicabo excepturi ea corporis fugiat dicta facilis."
  },
  {
    name: "Androw Jadd",
    img: "/Openions/testimonial2-1.jpg",
    job: "Software Engineer",
    opinion: "Enim, quo magnam quidem reprehenderit quisquam facere! Soluta tempora explicabo excepturi ea corporis fugiat dicta facilis."
  },
  {
    name: "Sophia Carter",
    img: "/Openions/testimonial3-1.jpg",
    job: "Data Scientist",
    opinion: "Sequi repellat architecto enim, quo magnam quidem reprehenderit quisquam facere!"
  },
  {
    name: "Michael Ross",
    img: "/Openions/testimonial4-1.jpg",
    job: "Product Manager",
    opinion: "Adipisci soluta tempora explicabo excepturi ea corporis fugiat dicta facilis sequi repellat architecto enim."
  },
];

// Stats About Page

export const stats = [
  { num: 50, text: 'Years of Experience' },
  { num: 70, text: 'Projects Completed' },
  { num: 200, text: 'Awards Won' },
  { num: 100, text: 'Happy Clients' },
  { num: 40, text: 'Architect Engineers' },
];

// Social Links

export const socialLinks = [
  { icon: <FaFacebook />, link: "/", ariaLabel: "Facebook" },
  { icon: <FaInstagram />, link: "/", ariaLabel: "Instagram" },
  { icon: <FaTwitter />, link: "/", ariaLabel: "Twitter" }
];

// FAQs

export const faqs = [
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


export const pages = [
  {
    name: "About",
    link: "/About"
  },
  {
    name: "Contact",
    link: "/Contact"
  },
  {
    name: "FAQ",
    link: "/FAQ"
  },
  {
    name: "Privacy",
    link: "/Privacy"
  },
]
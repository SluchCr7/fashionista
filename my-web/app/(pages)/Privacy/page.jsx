'use client';

import React from 'react';
import Intro from '../../Components/Intro';

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto py-20 px-6 md:px-12">
        <Intro title={"Privacy Policy"} para={"Your privacy is important to us. This Privacy Policy outlines how we collect, use, and protect your personal information."} />
        <div className="space-y-6 w-full grid grid-cols-1 md:grid-cols-2 gap-3 justify-center py-5">
        <section className='w-full'>
          <h2 className="text-2xl font-semibold">1. Information We Collect</h2>
          <p className="text-gray-700 mt-2">We collect the following types of information when you use our website:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Personal Information (e.g., name, email, phone number, address).</li>
            <li>Payment Information (e.g., credit card details, billing address).</li>
            <li>Order Details (e.g., purchase history, shipping preferences).</li>
            <li>Device & Usage Information (e.g., IP address, browser type, cookies).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">2. How We Use Your Information</h2>
          <p className="text-gray-700 mt-2">We use your information for the following purposes:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>To process and fulfill your orders.</li>
            <li>To improve our website, services, and customer experience.</li>
            <li>To send order confirmations, updates, and promotional offers.</li>
            <li>To prevent fraudulent transactions and enhance security.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">3. How We Protect Your Information</h2>
          <p className="text-gray-700 mt-2">We implement security measures to protect your personal data, including:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>SSL encryption for secure transactions.</li>
            <li>Strict access controls to prevent unauthorized data access.</li>
            <li>Regular security audits and updates.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">4. Sharing Your Information</h2>
          <p className="text-gray-700 mt-2">We do not sell your personal data. However, we may share it with:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Trusted third-party service providers for payment processing and shipping.</li>
            <li>Legal authorities when required by law or fraud prevention measures.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">5. Cookies & Tracking Technologies</h2>
          <p className="text-gray-700 mt-2">We use cookies to enhance your browsing experience. You can manage your cookie preferences in your browser settings.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">6. Your Rights & Choices</h2>
          <p className="text-gray-700 mt-2">You have the right to:</p>
          <ul className="list-disc pl-6 mt-2 text-gray-700">
            <li>Access, modify, or delete your personal data.</li>
            <li>Opt-out of marketing communications at any time.</li>
            <li>Request details on how we process your data.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">7. Changes to This Policy</h2>
          <p className="text-gray-700 mt-2">We may update this policy from time to time. Changes will be reflected on this page with an updated date.</p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold">8. Contact Us</h2>
          <p className="text-gray-700 mt-2">If you have any questions about this Privacy Policy, contact us at:</p>
          <p className="text-gray-700 mt-2 font-bold">📧 Email: support@yourstore.com</p>
          <p className="text-gray-700">📞 Phone: +1 (800) 123-4567</p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

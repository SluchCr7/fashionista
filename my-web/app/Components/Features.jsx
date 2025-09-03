import React from "react";
import { features } from "../Data";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="w-full bg-gray-50 py-14">
      <div className="max-w-7xl mx-auto px-6 flex flex-col items-center gap-10">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Why Choose Us?
          </h2>
          <p className="mt-2 text-gray-600">
            Discover why thousands of customers trust us for their fashion needs.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          {features.map(({ icon, text, id, paragraph }) => (
            <motion.div
              key={id}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center text-center bg-white rounded-xl shadow-md p-8 hover:shadow-xl transition"
            >
              {/* Icon inside Circle */}
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 text-DarkRed text-3xl mb-4">
                {icon}
              </div>

              {/* Text */}
              <h3 className="text-lg font-bold text-gray-900">{text}</h3>
              <p className="text-sm text-gray-500 mt-2">{paragraph}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

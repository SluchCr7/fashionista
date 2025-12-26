'use client';
import React from "react";
import { features } from "../Data";
import { motion } from "framer-motion";

const Features = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 md:px-6">

        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Why Choose Fashionista?
          </h2>
          <p className="text-muted-foreground">
            We are committed to providing the best shopping experience for our customers.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon, text, id, paragraph }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: id * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="bg-background rounded-xl p-8 shadow-sm hover:shadow-lg transition-all text-center border border-border"
            >
              <div className="w-16 h-16 mx-auto flex items-center justify-center rounded-full bg-primary/10 text-primary text-3xl mb-6">
                {/* Assuming icon is a React Element */}
                {icon}
              </div>

              <h3 className="text-lg font-bold mb-3">{text}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{paragraph}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

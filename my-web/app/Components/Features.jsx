'use client';
import React, { useContext } from "react";
import { features as staticFeatures } from "../Data";
import { motion } from "framer-motion";
import { FeatureContext } from "../Context/FeatureContext";

// Icon Imports for Mapping
import { CiPlane, CiMoneyCheck1, CiTimer, CiDeliveryTruck, CiCreditCard1 } from "react-icons/ci";
import { TiMessage, TiSupport } from "react-icons/ti";
import { FaTruck, FaShieldAlt, FaHeadset, FaRegClock } from "react-icons/fa";
import { BiSupport } from "react-icons/bi";

// Icon Mapping Helper
const IconMap = {
  // Existing from Data.js
  "CiPlane": <CiPlane />,
  "CiMoneyCheck1": <CiMoneyCheck1 />,
  "CiTimer": <CiTimer />,
  "TiMessage": <TiMessage />,

  // Potential New Ones
  "FaTruck": <FaTruck />,
  "FaShieldAlt": <FaShieldAlt />,
  "FaHeadset": <FaHeadset />,
  "BiSupport": <BiSupport />,
  "CiDeliveryTruck": <CiDeliveryTruck />,
  "CiCreditCard1": <CiCreditCard1 />,
  "FaRegClock": <FaRegClock />,
  "TiSupport": <TiSupport />
};

const getIcon = (iconName) => {
  // If explicitly a React Element (from static data)
  if (React.isValidElement(iconName)) return iconName;
  // If string key
  return IconMap[iconName] || <CiPlane />; // Default fallback
};

const Features = () => {
  const { features: dynamicFeatures, loading } = useContext(FeatureContext);

  // Preference: Dynamic > Static
  // Only use dynamic if they exist, otherwise fallback to static for initial state
  const displayFeatures = (dynamicFeatures && dynamicFeatures.length > 0)
    ? dynamicFeatures
    : staticFeatures;

  // Use a skeleton or loading state? 
  // Since we have a fallback, we can just show that immediately. 
  // But if loading is true, maybe we wait? 
  // Better UX: Show static immediately if dynamic is empty/loading, then swap? 
  // To avoid layout shift, let's just use displayFeatures logic directly. 
  // If dynamic loads and is not empty, it will re-render.

  return (
    <section className="py-24 bg-secondary/20 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute top-[30%] right-[0%] w-[30%] h-[30%] bg-secondary rounded-full blur-3xl opacity-50" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-bold uppercase tracking-widest text-primary mb-3 block"
          >
            Why Shop With Us
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-5xl font-serif font-bold mb-6 text-foreground"
          >
            The Fashionista Promise
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground text-lg leading-relaxed"
          >
            We are committed to providing an exceptional shopping experience,
            combining luxury with reliability and world-class support.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayFeatures.map((feature, idx) => {
            // Handle ID: MongoDB has _id, Static has id.
            const key = feature._id || feature.id || idx;
            const icon = getIcon(feature.icon);

            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1, duration: 0.5 }}
                whileHover={{ y: -8 }}
                className="bg-background rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all text-center border border-border group"
              >
                <div className="w-20 h-20 mx-auto flex items-center justify-center rounded-2xl bg-secondary/50 text-foreground text-4xl mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-inner">
                  {icon}
                </div>

                <h3 className="text-xl font-bold mb-3 font-serif group-hover:text-primary transition-colors">{feature.text}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{feature.paragraph}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;

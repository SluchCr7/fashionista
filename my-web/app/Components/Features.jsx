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

import { Truck, ShieldCheck, HeartPulse, Clock } from "lucide-react";

const Features = () => {
  const { features: dynamicFeatures } = useContext(FeatureContext);
  const displayFeatures = (dynamicFeatures && dynamicFeatures.length > 0) ? dynamicFeatures : staticFeatures;

  const getLucideIcon = (idx) => {
    const icons = [<Truck key="1" />, <ShieldCheck key="2" />, <HeartPulse key="3" />, <Clock key="4" />];
    return icons[idx % icons.length];
  };

  return (
    <section className="py-44 bg-background relative overflow-hidden border-t border-border/5">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-32 gap-12 text-foreground">
          <div className="space-y-4">
            <p className="typography-display !text-accent">Our Foundations</p>
            <h2 className="text-4xl md:text-7xl font-serif font-black tracking-tighter italic">The Promise of Excellence.</h2>
          </div>
          <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-sm uppercase tracking-widest !text-[10px]">
            We are committed to delivering an unparalleled experience that transcends traditional luxury.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-1px lg:bg-border/10">
          {displayFeatures.map((feature, idx) => (
            <motion.div
              key={feature._id || feature.id || idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="bg-background p-12 space-y-8 group hover:bg-black hover:text-white transition-all duration-700 text-foreground hover:z-10"
            >
              <div className="text-accent group-hover:text-white transition-colors">
                {React.cloneElement(getLucideIcon(idx), { size: 48, strokeWidth: 0.5 })}
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-serif font-black italic tracking-tight">{feature.text}</h3>
                <p className="text-muted-foreground group-hover:text-white/60 text-xs font-medium leading-relaxed uppercase tracking-widest !text-[9px] transition-colors">
                  {feature.paragraph}
                </p>
              </div>

              <div className="pt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                <p className="typography-display !text-[8px] text-accent">LEARN MORE —</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;

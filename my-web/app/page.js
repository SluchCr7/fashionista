'use client';
import React, { useContext } from "react";
import { CartContext } from "./Context/CartContext";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import HeroPage from "./Components/HeroPage";
import Categories from "./Components/Categories";
import LatestCollection from "./Components/LatestCollection";
import HomePage from "./Components/HomePage";
import BestSeller from "./Components/BestSeller";
import Ads from "./Components/Ads";
import Features from "./Components/Features";
import Opinions from "./Components/Opinions";
import Sponsers from "./Components/Sponsers";

export default function Home() {
  const { discount } = useContext(CartContext);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroPage />

      <Categories />

      <LatestCollection />

      <HomePage />

      <BestSeller />

      {discount > 0 && (
        <section className="bg-primary text-primary-foreground py-16">
          <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-center md:text-left">
              Get <span className="text-background px-2 bg-foreground/10 rounded">{discount}% OFF</span> on all products!
            </h2>
            <Link
              href="/Shop"
              className="bg-background text-foreground px-8 py-3 rounded-full font-bold uppercase tracking-wider hover:bg-background/90 transition-colors flex items-center gap-2"
            >
              Shop Now <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </section>
      )}

      <Ads />

      <Features />

      <Opinions />

      <Sponsers />
    </div>
  );
}

'use client'
import Image from "next/image";
import Hero from "./Components/Hero";
import LatestCollection from "./Components/LatestCollection";
import BestSeller from "./Components/BestSeller";
import HomePage from "./Components/HomePage";
import Opinions from "./Components/Opinions";
import { useContext, useRef } from "react";
import Features from "./Components/Features";
import Categories from "./Components/Categories";
import Ads from "./Components/Ads";
import Sponsers from "./Components/Sponsers";
import HeroPage from "./Components/HeroPage";
import { IoIosArrowForward } from "react-icons/io";
import { CartContext } from "./Context/Cart";
import { UserContext } from "./Context/UserContext";

export default function Home() {
  const {isLogin , isAuthChecked} = useContext(UserContext)
  const { discount } = useContext(CartContext)
  if (!isAuthChecked) {
    return null;
  }
  return (
    <div className="flex items-center flex-col relative">
      <div className="relative w-full">
        <HeroPage/>
      </div>
      <div className="flex flex-col items-center w-full gap-3 py-4">
        <Categories/>
        <LatestCollection />
        <HomePage />
        {/* <Hero /> */}
        <BestSeller />
        {
          discount > 0 &&
          <div className="w-full bg-DarkRed p-4 py-24">
            <div className="max-w-4xl flex mx-auto items-center flex-col md:flex-row justify-between">
              <span className="text-white text-3xl uppercase font-bold">Grant {discount}% off on all products</span>
              <button className="bg-transparent border-y-2 border-r border-white text-white pr-9 pl-2 py-2 flex items-center gap-4">Shop Now <IoIosArrowForward /></button>
            </div>
          </div>
        }
        <Ads/>
        <Features/>
        <Opinions />
        <Sponsers/>
      </div>
    </div>
  );
}

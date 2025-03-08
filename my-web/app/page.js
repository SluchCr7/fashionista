'use client'
import Image from "next/image";
import Hero from "./Components/Hero";
import LatestCollection from "./Components/LatestCollection";
import BestSeller from "./Components/BestSeller";
import ShopNow from "./Components/ShopNow";
import HomePage from "./Components/HomePage";
import Sponsers from "./Components/Sponsers";
import Opinions from "./Components/Opinions";
import { useRef } from "react";
import Features from "./Components/Features";

export default function Home() {
  const lastPage = useRef();
  const MoveDown = () => {
    lastPage.current.scrollIntoView({
      behavior: "smooth",
    })
  }
  return (
    <div className="flex items-center flex-col relative">
      <div className="relative w-full">
        <HomePage />
        {/* <button onClick={MoveDown} className="hover:bg-DarkRed bg-white z-[1000] transition-all duration-700 hover:text-white w-[100px] absolute bottom-4 right-4 p-4 rounded-lg font-bold text-DarkRed border border-DarkRed">Down</button> */}
      </div>
      <div className="flex flex-col items-center w-full gap-3 py-4">
        <LatestCollection/>
        <Hero />
        <BestSeller />
        <Opinions />
        {/* <div ref={lastPage}>
          <Sponsers/>
        </div> */}
        <Features/>
      </div>
    </div>
  );
}

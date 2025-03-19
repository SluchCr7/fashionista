'use client'
import Image from "next/image";
import Hero from "./Components/Hero";
import LatestCollection from "./Components/LatestCollection";
import BestSeller from "./Components/BestSeller";
import HomePage from "./Components/HomePage";
import Opinions from "./Components/Opinions";
import { useRef } from "react";
import Features from "./Components/Features";
import Categories from "./Components/Categories";
import Ads from "./Components/Ads";

export default function Home() {
  // const lastPage = useRef();
  // const MoveDown = () => {
  //   lastPage.current.scrollIntoView({
  //     behavior: "smooth",
  //   })
  // }
  return (
    <div className="flex items-center flex-col relative">
      <div className="relative w-full">
        <HomePage />
      </div>
      <div className="flex flex-col items-center w-full gap-3 py-4">
        <Categories/>
        <LatestCollection />
        <Hero />
        <BestSeller />
        <Ads/>
        <Features/>
        <Opinions />
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "./ui/button";
import { BookOpen, Play} from "lucide-react";
import Image from "next/image";
import Star from "@/assets/star.png"
import UpArrow from "@/assets/shape-6.webp"
import Arrow from "@/assets/shape7.webp"
import Curverd from "@/assets/shape8.webp"
import Dots from "@/assets/shape4.webp"
import Straight from "@/assets/shape-2.webp"
import legthy from "@/assets/3.webp"
import round from "@/assets/shape5.webp"






const HeroSection = () => {
  return (
    <section className="w-full bg-secondary pt-4 mb-10">

      <div className="relative">
        <div className="flex flex-col absolute right-7 md:top-5 md:right-[220px] bg-white rounded-full h-16 w-16 md:h-32 md:w-32 items-center justify-center">
          <div className="flex items-center justify-center">
            <span className="text-[#309255] text-md md:text-3xl font-mono">4.8</span>
            <Image
              src={Star}
              alt="star"
              className="w-2 h-2 md:w-4 md:h-4 ml-2 mt-0 md:mt-1.5"
            />
          </div>
          <p className="text-[9px] md:text-sm text-gray-600/80 mt-0 md:mt-1">
            Rating (86k)
          </p>
        </div>

        <Image
          src={UpArrow}
          alt="arrow-1"
          className="hidden md:block absolute right-52 top-48 animate-bounce [animation-duration:3s] [animation-timing-function:ease-in-out]"
        />
      </div>

      <div className="relative flex items-center justify-center">
        <Image 
          src={Arrow} 
          alt="arrow" 
          className="hidden md:block relative top-36 left-62 animate-[rightToLeft_3s_ease-in-out_infinite]"
        />
        <div className="bg-[#309255] absolute right-24 top-67 md:right-[714px] md:top-40 w-16 h-16 md:w-36 md:h-36 rounded-full flex flex-col items-center justify-center">
          <BookOpen className="md:w-8 md:h-8 h-3 w-3 text-white" />
          <p className="text-md md:text-3xl font-bold text-white">1,235</p>
          <span className="text-[10px] md:text-lg text-white tracking-tighter md:tracking-wider">courses</span>
        </div>
        <Image 
          src={Curverd}
          alt="shape8" 
          className="flex items-center justify-center relative md:right-10 -right-20 md:top-74 top-84 w-16 md:w-40 h-auto" 
        />
      </div>


      <div className="lg:max-w-7xl max-w-6xl mx-auto min-h-[500px] grid grid-cols-1 md:grid-cols-3 relative px-4 md:px-8">
        {/* Left Content - spans 1 column */}
        <div className="text-left z-10 md:col-span-01 -mt-12">
          <div className="relative">
            <Image
              src={Dots}
              alt="shap4"
              className="absolute sm:block xl:-left-10 hidden w-28 h-28 animate-spin [animation-duration:6s]"
            />
          </div>

          <p className="mt-20 md:mt-36 mb-2 text-sm sm:text-2xl text-green-700/90 font-Josefin">
            Start your favourite course
          </p>

          <div className="relative">
            <h1 className="text-2xl sm:text-3xl md:text-[46px] font-normal">
              Now learning from anywhere, and build your{" "}
              <span className="text-green-700/90">bright career.</span>
            </h1>
            <Image
              src={Straight}
              alt="shap2"
              priority
              className="mx-auto mt-4 hidden md:block"
            />

            <p className="mt-7 mb-2 text-sm sm:text-base md:text-xl leading-relaxed tracking-normal text-gray-500 max-w-md">
              It has survived not only five centuries but also the leap into
              electronic typrsettings.
            </p>
          </div>

          <Button
            size="lg"
            className="cursor-pointer mt-6 px-6 py-6 sm:px-12 md:text-md sm:py-8
             bg-[#309255] text-white rounded-lg shadow-lg
             hover:bg-black/90 hover:scale-105 hover:shadow-xl
             transition-all duration-500 ease-in-out"
          >
            Start A Course
          </Button>

        
          <div className="absolute left-0 md:-left-38 bottom-0  md:-bottom-11.5 -z-10 w-[150px] md:w-[400px] h-[150px] md:h-[500px]">
           <Image
            src={legthy}
            alt="shapestart"
            fill
            className="object-contain object-left"
            sizes="(max-width: 768px) 150px, 400px"
           />
         </div>

          <Image 
            src={round}
            alt="shapefive" 
            className="sm:hidden absolute left-8 w-[70px] h-[70px] bottom-12"
          />

          <Play className="sm:hidden text-orange-400/50 absolute left-14 bottom-18"/>
        </div>

        {/* Right Image - spans 2 columns */}
        <div className="relative flex justify-center md:justify-end md:col-span-2">
          <Image
            src="/hero-banner.png"
            alt="Hero"
            width={768}
            height={768}
            className="w-full max-w-[250px] sm:max-w-[350px] 
              md:max-w-[44rem] lg:max-w-[48rem]
              h-auto object-contain md:relative
              absolute md:-right-7 md:top-0 -right-3 md:-bottom-18 bottom-0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
import under from "@/assets/shape9.webp";
import Image from "next/image";
import Search from "./Search";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import React from "react";

const Courses = () => {
  const Categories: string[] = [
    "UI/UX Design",
    "Development",
    "Data Science",
    "Bussiness",
    "Financial",
    "Trading",
    "Marketing",
    "Design",
  ];

  return (
    <div className="lg:max-w-7xl max-w-6xl mx-auto h-screen px-4 mt-12 md:mt-16">
      <div className="flex flex-col md:flex-row md:justify-between">
        <h1 className="text-xl md:text-4xl md:tracking-wide font-medium tracking-tighter text-gray-700">
          All{" "}
          <span className="relative inline-block px-1">
            <span className="text-primary">Courses</span>
            <Image
              src={under}
              alt="underline"
              className="hidden sm:block absolute top-12"
            />
          </span>{" "}
          of MrCode
        </h1>

        <React.Fragment>
          <Search
            placeholder="Search your course"
            inputClassName="w-full md:py-7.5 px-7 pr-20 h-14 text-sm md:text-lg border border-[#cfe3d6]
            focus:border-green-900 focus:border-[1px]
            focus-visible:ring-0 focus-visible:ring-offset-0
            transition-all placeholder:text-sm md:placeholder:text-lg placeholder:text-gray-400"
            buttonClassName="absolute right-2 top-1/2 -translate-y-1/2 
            h-11 w-11 md:w-12.5 md:h-12.5 bg-[#DEEDE4] text-green-700
            hover:bg-[#cfe3d6] rounded-md
            transition-all duration-300 ease-in-out"
            mainClassName="relative w-full max-w-lg mt-6 md:mt-3"
          />
        </React.Fragment>
      </div>

      <div className="w-full md:max-w-7xl mt-10 h-24 md:h-34 bg-secondary rounded-md p-4 md:p-9 flex items-center justify-center">
        <div className="w-[calc(100%-40px)]">
          <Carousel
            opts={{
              align: "center",
            }}
            className="w-full h-full"
          >
            <CarouselContent className="w-full ml-1 md:-ml-2">
              {Categories.map((item, index) => (
                <CarouselItem
                  key={index}
                  className="px-5 md:basis-1/3 lg:basis-1/5"
                >
                  <Card
                    className="w-full h-full p-5 border hover:border-primary group"
                    key={index}
                  >
                    <CardContent className="flex items-center justify-center h-full">
                      <span className="text-[16px] font-normal text-black group-hover:text-green-800">
                        {item}
                      </span>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="absolute -left-7 md:-left-9 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md" />
            <CarouselNext className="absolute -right-7 md:-right-8 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-md" />
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Courses;

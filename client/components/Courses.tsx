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
import CourseCard from "./CourseCard";
import { Button } from "./ui/button";

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
    <div className="container h-full px-4 mt-14 md:mt-16 mb-10">
      <div className="flex flex-col md:flex-row md:justify-between">
        <h1 className="text-xl md:text-4xl md:tracking-normal font-normal tracking-tighter text-gray-700">
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
              align: "start",
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
        

        <CourseCard />


      <div className="flex items-center justify-center mt-10 md:mt-16">      
      <Button size={'lg'} className="group relative mx-auto overflow-hidden px-9 py-7 rounded-md bg-secondary border-[.5px] md:border border-primary text-[#309255] hover:text-white">
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 
                       w-4 h-4 rounded-full bg-primary
                       scale-0 group-hover:scale-[15]
                       transition-transform duration-500 ease-out
                       pointer-events-none"></span>

      <span className="relative z-10 text-xl font-normal">Other Course</span>
    </Button>
    </div>

    </div>
  );
};

export default Courses;

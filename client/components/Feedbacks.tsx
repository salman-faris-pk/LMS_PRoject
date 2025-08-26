"use client"

import Image from "next/image"
import * as React from "react"
import shapeUnderline from "@/assets/shape-2.webp"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { CarouselApi } from "@/components/ui/carousel"

const feedbacks = [
  {
    id: 1,
    text: `"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, quam. Odio voluptatem officiis eos illo!"`,
    name: "Mia Brown",
    role: "Marketer",
    img: "https://images.unsplash.com/photo-1499470932971-a90681ce8530?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    text: `"Possimus minima dolores itaque! Esse! Lorem ipsum dolor sit amet consectetur adipisicing elit."`,
    name: "John Doe",
    role: "Designer",
    img: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?q=80&w=100",
  },
  {
    id: 3,
    text: `"Ea voluptates fugiat corrupti laudantium dolores reiciendis pariatur esse quod nihil quia."`,
    name: "Sarah Lee",
    role: "Developer",
    img: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100",
  },
]

export default function Feedbacks() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  return (
    <section className="container mt-16">
      <div className="py-10">
        <h1 className="text-3xl md:text-4xl font-normal text-gray-800 text-center relative">
          Feedback From{" "}
          <span className="text-primary relative inline-block">
            Clients
            <Image
              src={shapeUnderline}
              alt="underline"
              width={120}
              height={12}
              className="absolute -bottom-3 left-1/2 -translate-x-1/2"
            />
          </span>
        </h1>

        {/* Carousel */}
        <Carousel
          opts={{ align: "start" }}
          setApi={setApi}
          className="relative mt-16 max-w-6xl mx-auto px-3 md:px-0"
        >
          <CarouselContent>
            {feedbacks.map((fb) => (
              <CarouselItem
                key={fb.id}
                className="basis-full md:basis-1/2"
              >
                <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col items-center text-center h-full border-[.5] border-gray-300 hover:border-primary">
                  <p className="text-gray-600 italic">“{fb.text}”</p>
                  <div className="mt-6 flex flex-col items-center">
                    <img
                      src={fb.img}
                      alt={fb.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />
                    <h3 className="mt-3 font-semibold text-gray-800">
                      {fb.name}
                    </h3>
                    <span className="text-sm text-gray-500">{fb.role}</span>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* Dots Pagination */}
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: count }).map((_, i) => (
            <button
              key={i}
              onClick={() => api?.scrollTo(i)}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                i === current ? "bg-green-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

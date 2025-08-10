import under from "@/assets/shape9.webp"
import Image from "next/image"
import Search from "./Search"
import React from "react"

const Courses = () => {
  return (
    <div className="lg:max-w-7xl max-w-6xl mx-auto h-screen px-4 mt-16">
       <div className="flex flex-col md:flex-row md:justify-between">
      <h1 className="text-4xl tracking-wide font-medium text-black/80">
  All{" "}
  <span className="relative inline-block px-1">
    <span className="text-primary">Courses</span>
    <Image
      src={under}
      alt="underline"
      className="absolute top-12"
    />
  </span>{" "}
  of MrCode
</h1>
    
    <React.Fragment>
     <Search />
    </React.Fragment>
</div>

    </div>
  )
}

export default Courses
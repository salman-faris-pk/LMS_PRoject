import Image from "next/image";
import shapeUnderline from "@/assets/shape-2.webp";
import BlogCards from "./BlogCard";


const LatestBlogs = () => {
  return (
    <div className="container mt-5 md:mt-16 mb-10">
          <div className="text-center md:mb-5">
        <h2 className="text-3xl md:text-4xl font-medium tracking-wide text-gray-800">
            Latest<span className="text-primary relative"> {" "} Blogs
            <Image
              src={shapeUnderline}
              alt="underline"
              width={120}
              height={12}
              className="absolute -bottom-5 left-0 w-full"
            />
          </span>
        </h2>
      </div>

        <BlogCards />
    </div>
  )
}

export default LatestBlogs
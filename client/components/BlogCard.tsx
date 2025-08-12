import * as React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { CalendarDays, Heart } from "lucide-react"


interface BlogPost {
  id: number
  title: string
  category: string
  date: string
  likes: number
  image: string
  author: {
    name: string
    avatar: string
    initials: string
  }
}

const BlogCards = () => {
  const blogPosts: BlogPost[] = [
    {
      id: 1,
      title: "Getting Started with Next.js and Ts",
      category: "Web Development",
      date: "May 15, 2023",
      likes: 42,
      image: "https://images.unsplash.com/photo-1622547748225-3fc4abd2cca0?w=800&auto=format&fit=crop",
      author: {
        name: "Sarah Johnson",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=SarahJohnson",
        initials: "SJ"
      }
    },
    {
      id: 2,
      title: "The Complete Guide to CSS Grid",
      category: "CSS",
      date: "June 2, 2023",
      likes: 28,
      image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=800&auto=format&fit=crop",
      author: {
        name: "Michael Chen",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=MichaelChen",
        initials: "MC"
      }
    },
    {
      id: 3,
      title: "State Management in React Applications",
      category: "React",
      date: "June 10, 2023",
      likes: 35,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&auto=format&fit=crop",
      author: {
        name: "Alex Rodriguez",
        avatar: "https://api.dicebear.com/7.x/notionists/svg?seed=AlexRodriguez",
        initials: "AR"
      }
    }
  ];

  return (
    <div className="w-full mt-7 md:mt-16">
      {/* Desktop Grid View - hidden on mobile */}
      <div className="hidden md:grid md:grid-cols-3 gap-10 hover:border-primary">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      {/* Mobile Carousel View - shown only on mobile */}
      <div className="md:hidden px-4 py-6">
  <Carousel
    opts={{ align: "start" }}
    className="w-full"
  >
    <CarouselContent>
      {blogPosts.map((post) => (
        <CarouselItem key={post.id} className="basis-full sm:basis-1/2">
          <div className="p-1">
            <BlogCard post={post} />
          </div>
        </CarouselItem>
      ))}
    </CarouselContent>
      <div className="flex justify-end gap-4 px-1 mt-1">
    <CarouselPrevious className="relative left-0 translate-y-0 px-5 rounded-md bg-primary text-white" />
    <CarouselNext className="relative left-0 translate-y-0 px-5 rounded-md bg-primary text-white" />
  </div>
  </Carousel>


      </div>
    </div>
  )
}

export default BlogCards;


function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="group h-full flex flex-col rounded-lg border overflow-hidden hover:border-primary hover:scale-[1] transition-all duration-300">
      {/* Blog Image (full width) */}
      <div className="relative pt-[50%] overflow-hidden">
        <img
          src={post.image}
          alt={`Cover image for ${post.title}`}
          className="absolute top-0 left-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      {/* Content Container */}
      <div className="p-4 flex flex-col gap-3 flex-grow">
        {/* Author and Category Row */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={`Avatar of ${post.author.name}`} />
              <AvatarFallback>{post.author.initials}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{post.author.name}</span>
          </div>
          <span className="text-xs px-4 py-2 rounded-md hover:bg-primary hover:text-white transition-all duration-300 bg-secondary text-secondary-foreground">
            {post.category}
          </span>
        </div>

        {/* Blog Title */}
        <h3 className="text-lg font-semibold line-clamp-2 mt-2">{post.title}</h3>

        {/* Date and Likes Row */}
         <div className="flex justify-between items-center mt-auto">
  <div className="flex items-center gap-1 text-sm text-muted-foreground">
    <CalendarDays className="h-4 w-4 text-primary" />
    <span>{post.date}</span>
  </div>
  <div className="flex items-center gap-1 text-sm">
    <Heart className="h-4 w-4 text-primary" />
    <span>{post.likes}</span>
  </div>
</div>

        {/* Read More Button */}
        <Button 
          variant="secondary" 
          size="sm" 
          className="mt-4 p-5 text-primary text-sm md:text-md transition-all duration-300 hover:text-white hover:bg-primary border border-primary/50 w-fit"
        >
          Read more
        </Button>
      </div>
    </div>
  )
}
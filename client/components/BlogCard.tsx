
interface BlogPost {
  id: number
  title: string
  date: string
  image: string

}

const BlogCards = () => {
 
  const posts:BlogPost[] = [
  {
    id: 1,
    title: "How to use sticky note for problem solving",
    date: "20 October 2019",
    image:
      "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 2,
    title: "10 Tips to Improve Your Coding Productivity",
    date: "5 January 2020",
    image:
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 3,
    title: "Mastering Remote Work: Stay Focused Anywhere",
    date: "12 July 2021",
    image:
      "https://images.unsplash.com/photo-1508780709619-79562169bc64?auto=format&fit=crop&w=1470&q=80",
  },
  {
    id: 4,
    title: "Creative Thinking with Mind Maps",
    date: "30 March 2022",
    image:
      "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1470&q=80",
  },
]

  return (
    <div className="w-full px-4 mt-7 md:mt-16">
      {/* Desktop Grid View - hidden on mobile */}
      <div className="grid grid-cols-2 gap-8 mt-8 md:mt-16">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

    </div>
  )
}

export default BlogCards;



function BlogCard({ post }: { post: BlogPost }) {
  return (
    <div className="flex flex-col sm:flex-row">
      <img
        className="object-cover w-full h-40 rounded-lg sm:h-56 sm:w-48 lg:w-64"
        src={post.image}
        alt={post.title}
      />

      <div className="flex flex-col justify-between py-3 sm:py-6 sm:mx-4 lg:mx-6">
        <a
          href="#"
          className="text-sm sm:text-lg line-clamp-2 md:line-clamp-none lg:text-xl font-semibold text-gray-800 hover:underline hover:text-primary"
        >
          {post.title}
        </a>

        <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-300">
          On: {post.date}
        </span>
      </div>
    </div>
  )
}


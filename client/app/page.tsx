import Hero  from "@/components/Hero";


export const metadata = {
  title: "E-Learns programming platform | Learn Coding Online | Top Programming Courses",
  description: "Master web development with our best-selling MERN, Next.js, and Python courses. Join today!",
  keywords: [
    "Online Coding Courses",
    "Learn Programming",
    "MERN Stack",
    "Next.js Tutorials",
    "Best LMS Platform"
  ],
  // openGraph: {
  //   images: "/og-home.jpg", // set a image of our website thumbnail
  // },
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
   
  return (
   <div>
    <Hero />
   </div>
  );
}

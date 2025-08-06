import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import InfoNavbar from "./InfoNavbar";
import { StickyNavbarWrapper } from "./StickyNavbarWrapper";

interface NavLink {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
}

const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Courses",
    href: "/courses",
    subLinks: [
      { name: "All Courses", href: "/courses/all" },
      { name: "Free Courses", href: "/courses/free" },
    ],
  },
  {
    name: "Blog",
    href: "/blog",
    subLinks: [
      { name: "All Blogs", href: "/blog/all" },
      { name: "Latest Blogs", href: "/blog/latest" },
    ],
  },
  { name: "Contact", href: "/contact" },
  { name: "FAQS", href: "/faqs" },
];

 const MainNavbar = () => {
  return (
    <div className="hidden md:block">

      <StickyNavbarWrapper />
      <InfoNavbar />
      
      <div className="bg-primary/15 w-full h-36 flex items-center pt-5 pb-2">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="border border-primary/20 bg-primary/1 rounded-lg h-24 flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={40}
                className="h-14 w-auto"
                priority
              />
              <span className="text-4xl font-bold">
                <span className="text-black/80">Mr</span>
                <span className="text-green-800/80">Code</span>
              </span>
            </Link>

            <nav className="flex items-center gap-14">
              {navLinks.map((link) => (
                <div key={link.name} className="relative">
                  {link.subLinks ? (
                    <HoverCard openDelay={0} closeDelay={0}>
                      <HoverCardTrigger asChild>
                        <Link
                          href={link.href}
                          className={`text-gray-800 text-xl font-normal hover:text-primary transition-colors ${
                            link.name === "Home" ? "text-primary" : ""
                          }`}
                        >
                          {link.name}
                        </Link>
                      </HoverCardTrigger>
                      <HoverCardContent className="p-2 bg-white shadow-lg border-t-2 border-t-black rounded-none">
                        <div className="flex flex-col space-y-1">
                          {link.subLinks.map((subLink) => (
                            <Link
                              key={subLink.name}
                              href={subLink.href}
                              className="px-4 py-2 text-black hover:text-primary text-lg font-normal hover:translate-x-1 transition-all duration-200"
                            >
                              {subLink.name}
                            </Link>
                          ))}
                        </div>
                      </HoverCardContent>
                    </HoverCard>
                  ) : (
                    <Link
                      href={link.href}
                      className={`text-gray-800 text-xl font-normal hover:text-primary transition-colors ${
                        link.name === "Home" ? "text-primary" : ""
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}

                  {link.name === "Home" && (
                    <Image
                      src="/shape1.webp"
                      alt="underline"
                      width={100}
                      height={5}
                      className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-[5px]"
                      priority
                    />
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="px-4 py-2 text-gray-800 text-xl hover:text-primary font-normal transition-colors"
              >
                Sign In
              </Link>
              <Button
                variant="outline"
                size="lg"
                className="border border-primary px-10 cursor-pointer py-7 text-xl font-normal hover:text-white hover:bg-green-700 hover:border-green-700 transition-all duration-300 rounded-md"
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainNavbar;
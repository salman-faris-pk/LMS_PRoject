import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import InfoNavbar from "./InfoNavbar";
import { StickyNavbarWrapper } from "./StickyNavbarWrapper";
import { NavItem } from "./NavItem";
import { navLinks } from "@/config/navigation"


const MainNavbar = () => {
  return (
    <>
      <StickyNavbarWrapper />

    <div className="hidden md:block">
      <InfoNavbar />
      
      <div className="bg-primary/15 w-full h-36 flex items-center pt-5 pb-2">
        <div className="max-w-7xl mx-auto w-full px-4">
          <div className="border border-primary/20 bg-transparent rounded-lg h-24 flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={40}
                className="h-12 w-auto"
                priority
              />
              <span className="text-4xl font-bold">
                <span className="text-black/80">Mr</span>
                <span className="text-green-800/80">Code</span>
              </span>
            </Link>

            <nav className="flex items-center gap-14">
              {navLinks.map((link) => (
                <NavItem
                  key={link.name}
                  link={link}
                  linkClassName="text-gray-800 text-xl font-normal hover:text-primary transition-colors"
                  subLinkClassName="px-4 py-2 text-black hover:text-primary text-lg font-normal hover:translate-x-1 transition-all duration-200"
                />
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

    </>
  );
};

export default MainNavbar;
import Link from "next/link";
import Image from "next/image";
import InfoNavbar from "./InfoNavbar";
import { StickyNavbarWrapper } from "./StickyNavbarWrapper";
import { NavItem } from "./NavItem";
import { navLinks } from "@/config/navigation"
import logo from '@/assets/logo.png';


const MainNavbar = () => {
  return (
    <>
      <StickyNavbarWrapper />

    <div className="hidden md:block">
      <InfoNavbar />
      
      <div className="bg-secondary  w-full h-36 mx-auto pt-5 pb-2">
        <div className="container w-full px-8">
          <div className="border border-primary/20 bg-transparent rounded-lg h-24 flex items-center justify-between px-6 py-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src={logo}
                alt="company-logo"
                 className="h-12 w-auto"
                 priority
              />
              <span className="text-4xl font-bold">
                <span className="text-black/80">Mr</span>
                <span className="text-primary">Code</span>
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
                href="/auth-login"
                className="px-4 py-2 text-gray-800 text-xl hover:text-primary font-normal transition-colors"
              >
                Sign In
              </Link>
              <Link
              href='/auth-signup'
              className="border border-primary px-10 cursor-pointer py-4 text-xl font-normal hover:text-white hover:bg-green-700 hover:border-green-700 transition-all duration-300 rounded-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>

    </>
  );
};

export default MainNavbar;
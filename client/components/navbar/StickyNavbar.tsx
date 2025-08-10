"use client";

import { memo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { NavItem } from "./NavItem";
import { navLinks } from "@/config/navigation"
import { Menu } from "lucide-react";
import logo from '@/assets/logo.png';


interface StickyNavbarProps {
  opacity: number;
  visible: boolean;
  toggleSidebar?:() => void;
}

export const StickyNavbar = memo(({ opacity, visible,toggleSidebar }: StickyNavbarProps) => {
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (navRef.current) {
      navRef.current.style.transition = visible 
        ? 'opacity 300ms ease-out, transform 400ms ease-out'
        : 'opacity 200ms ease-in, transform 300ms ease-in';
    }
  }, [visible]);

  return (
    <div 
      ref={navRef}
      className={`fixed top-0 left-0 w-full h-16 md:h-24 bg-white shadow-md z-50 ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity,
        transform: `translateY(${visible ? '0' : '-16px'})`,
        willChange: 'transform, opacity',
        backdropFilter: 'blur(6px)',
        backgroundColor: `rgba(255, 255, 255, ${opacity * 0.95})`,
      }}
    >
      <div className="flex items-center justify-between lg:max-w-7xl max-w-6xl mx-auto w-full px-4 h-full">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Image
              src={logo}
              alt="Company Logo"
              className="h-8 md:h-14 w-auto transition-all duration-300"
              priority
            />
            <span className="text-2xl md:text-4xl font-bold">
              <span className="text-black/80">Mr</span>
              <span className="text-green-800/80">Code</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <NavItem
                key={link.name}
                link={link}
                className="transition-opacity duration-300"
                linkClassName="text-gray-800 text-lg font-normal hover:text-primary transition-colors duration-200"
                subLinkClassName="px-4 py-2 text-black hover:text-primary text-base font-normal hover:translate-x-1 transition-all duration-200"
              />
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 text-gray-800 text-lg hover:text-primary font-normal transition-colors duration-200"
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

          <button 
          onClick={toggleSidebar} 
          className="p-2 focus:outline-none opacity-80 md:hidden"
        >
          <Menu className="w-6 h-6" />
        </button>


      </div>
 
    </div>
  );
});

StickyNavbar.displayName = "StickyNavbar";   // for when we debugging using dev tools ,then esy for componet name to realize
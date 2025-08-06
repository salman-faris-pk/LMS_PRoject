"use client";

import { memo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "../ui/button";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface NavLink {
  name: string;
  href: string;
  subLinks?: { name: string; href: string }[];
}

interface StickyNavbarProps {
  opacity: number;
  visible: boolean;
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

export const StickyNavbar = memo(({ opacity, visible }: StickyNavbarProps) => {
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
      className={`fixed top-0 left-0 w-full h-24 bg-white shadow-md z-50 ${
        visible ? 'pointer-events-auto' : 'pointer-events-none'
      }`}
      style={{
        opacity,
        transform: `translateY(${visible ? '0' : '-24px'})`,
        willChange: 'transform, opacity',
        backdropFilter: 'blur(6px)',
        backgroundColor: `rgba(255, 255, 255, ${opacity * 0.95})`,
      }}
    >
      <div className="max-w-7xl mx-auto w-full px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <Link href="/" className="flex items-center gap-2 transition-transform hover:scale-[1.02]">
            <Image
              src="/logo.png"
              alt="Company Logo"
              width={160}
              height={40}
              className="h-14 w-auto transition-all duration-300"
              priority
            />
            <span className="text-4xl font-bold">
              <span className="text-black/80">Mr</span>
              <span className="text-green-800/80">Code</span>
            </span>
          </Link>

          <nav className="flex items-center gap-10">
            {navLinks.map((link) => (
              <NavItem key={link.name} link={link} visible={visible} />
            ))}
          </nav>

          <div className="flex items-center gap-4">
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
        </div>
      </div>
    </div>
  );
});

const NavItem = memo(({ link, visible }: { link: NavLink; visible: boolean }) => (
  <div className="relative">
    {link.subLinks ? (
      <HoverCard openDelay={0} closeDelay={0}>
        <HoverCardTrigger asChild>
          <Link
            href={link.href}
            className={`text-gray-800 text-lg font-normal hover:text-primary transition-colors duration-200 ${
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
                className="px-4 py-2 text-black hover:text-primary text-base font-normal hover:translate-x-1 transition-all duration-200"
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
        className={`text-gray-800 text-lg font-normal hover:text-primary transition-colors duration-200 ${
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
        className={`absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-[5px] transition-opacity duration-300 ${
          visible ? 'opacity-100' : 'opacity-0'
        }`}
        priority
      />
    )}
  </div>
));

StickyNavbar.displayName = "StickyNavbar";
NavItem.displayName = "NavItem";



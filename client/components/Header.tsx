"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { Moon, Sun, Menu, X, LogOut, EllipsisVertical } from "lucide-react";
import React, { useState, useEffect, useCallback, useMemo } from 'react';

const Header = () => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links = useMemo(() => [
    { href: "/", label: "Home", icon: "H" },
    { href: "/courses", label: "Courses", icon: "C" },
    { href: "/about", label: "About", icon: "A" },
    { href: "/policy", label: "Policy", icon: "P" },
    { href: "/faq", label: "FAQ", icon: "F" },
  ], []);

  const mobileLinks = useMemo(() => links.filter(link => link.href !== "/"), [links]);

  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 15);
  }, []);

  useEffect(() => {
    setMounted(true);
    
    if (typeof window !== 'undefined') {
      handleScroll();
      window.addEventListener('scroll', handleScroll, { passive: true });
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, [handleScroll]);

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  const ThemeToggle = useMemo(() => (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme}
      className="hover:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 outline-none cursor-pointer"
    >
      {mounted ? (
        theme === 'dark' ? (
          <Moon className="w-5 h-5 transition-transform duration-300" />
        ) : (
          <Sun className="w-5 h-5 transition-transform duration-300" />
        )
      ) : (
        <div className="w-5 h-5" /> 
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  ), [mounted, theme, toggleTheme]);

  return (
    <>
      <header className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled 
          ? "border-neutral-200/80 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 dark:border-neutral-800/50 shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="container flex h-16 items-center justify-between px-6">
          {/* Logo */}
          <Link href="/" className="flex items-center pl-2" prefetch={false}>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-emerald-500">
              NEX𝕃EARN 
            </span>
          </Link>

          {/* Desktop navigation */}
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex items-center gap-4 mr-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  prefetch={false}
                  className={`relative px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === link.href
                      ? "text-primary dark:text-emerald-400 bg-primary/10 dark:bg-emerald-500/10"
                      : "text-foreground/80 hover:text-foreground hover:bg-neutral-100 dark:hover:bg-neutral-800"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side elements */}
            <div className="flex items-center gap-2 md:gap-4">

              {/* Show theme toggle and sign out on mobile */}
              <div className="flex items-center gap-2 md:hidden">
                {ThemeToggle}
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-transparent text-foreground/70 hover:text-foreground"
                >
                  <EllipsisVertical className="w-8 h-8" />
                  <span className="sr-only">Sign out</span>
                </Button>
              </div>

              {/* Desktop right side elements */}
              <div className="hidden md:flex items-center gap-2 md:gap-4">
                {ThemeToggle}
                <div className="w-px h-6 bg-neutral-200 dark:bg-neutral-700 mx-1"></div>
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/fav.png" />
                  <AvatarFallback className="bg-gradient-to-r from-primary to-emerald-500 text-white">
                    CN
                  </AvatarFallback>
                </Avatar>
              </div>
              
            </div>
          </div>
        </div>
      </header>

      {/* Mobile bottom navigation */}
     
      <div className="fixed md:hidden bottom-0 left-0 right-0 bg-background/80 backdrop-blur-sm border-t border-neutral-200/50 dark:border-neutral-800/80 z-50">
  <div className="container px-0">
    <nav className="flex justify-around items-center">
      {mobileLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          prefetch={false}
          className={`flex flex-col items-center justify-center w-full py-3 text-xs font-medium transition-all ${
            pathname === link.href
              ? 'text-primary dark:text-emerald-400'
              : 'text-foreground/70 hover:text-foreground'
          }`}
        >
          <span className={`
            text-xl mb-1 transition-transform
            ${pathname === link.href ? 'scale-110' : 'scale-100'}
          `}>
            {link.icon}
          </span>
          <span className="text-[0.7rem] font-medium">{link.label}</span>
        </Link>
      ))}
      <button className="flex flex-col items-center justify-center w-full py-3 text-xs font-medium text-foreground/70 hover:text-foreground">
        <div className="relative mb-1">
          <Avatar className="h-6 w-6">
            <AvatarImage src="/fav.png" />
            <AvatarFallback className="bg-gradient-to-r from-primary to-emerald-500 text-white text-xs">
              CN
            </AvatarFallback>
          </Avatar>
          <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500 border-2 border-background"></span>
        </div>
        <span className="text-[0.7rem] font-medium">Profile</span>
      </button>
    </nav>
  </div>
</div>
    </>
  );
};

export default Header;


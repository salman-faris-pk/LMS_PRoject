"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useTheme } from 'next-themes';
import { Moon, Sun, Home, BookOpen, Info, ShieldAlert, HelpCircle, User, EllipsisVertical } from "lucide-react";
import React, { useState, useEffect, useCallback } from 'react';

const Header = () => {
  const pathname = usePathname();
  const { setTheme, theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  const links = [
    { href: "/", label: "Home", icon: <Home className="w-5 h-5" /> },
    { href: "/courses", label: "Courses", icon: <BookOpen className="w-5 h-5" /> },
    { href: "/about", label: "About", icon: <Info className="w-5 h-5" /> },
    { href: "/policy", label: "Policy", icon: <ShieldAlert className="w-5 h-5" /> },
    { href: "/faq", label: "FAQ", icon: <HelpCircle className="w-5 h-5" /> },
    { href: "/profile", label: "Profile", icon: <User className="w-5 h-5" />, mobileOnly: true },
  ];

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

  const ThemeToggle = (
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
  );

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
              {links.filter(link => !link.mobileOnly).map((link) => (
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

            <div className="flex items-center gap-2 md:gap-4">
              <div className="flex items-center gap-2 md:hidden">
                {ThemeToggle}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="hover:bg-transparent ring-0 focus:ring-0 focus-visible:ring-0 outline-none cursor-pointer"
                >
                  <EllipsisVertical className="w-5 h-5" />
                  <span className="sr-only">More options</span>
                </Button>
              </div>
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

      {/* Bottom Bar (Mobile) */}
      <div className="fixed md:hidden bottom-4 left-0 right-0 flex justify-center px-4 z-50">
        <div className="backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-full shadow-lg py-1 w-full max-w-md">
          <div className="flex items-center justify-around">
            {links.filter(link => link.mobileOnly || !link.mobileOnly).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className={`p-3 rounded-full transition-all ${
                  pathname === link.href 
                    ? "bg-primary/5 text-primary" 
                    : "dark:text-slate-100 text-black/70 hover:bg-gray-50 dark:hover:bg-primary/20"
                }`}
              >
                {link.icon}
                <span className="sr-only">{link.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
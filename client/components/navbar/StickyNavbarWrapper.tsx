"use client";

import { useState, useEffect } from "react";
import { StickyNavbar } from "./StickyNavbar";

interface WrapperProps{
  toggleSidebar?:()=> void;
};

export const StickyNavbarWrapper = ({toggleSidebar}: WrapperProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    let ticking = false;
    const threshold = 50;


    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const progress = Math.min(scrollY / threshold, 1);
          
          setScrollProgress(progress);
          setIsScrolled(scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial check
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return <StickyNavbar opacity={isScrolled ? scrollProgress : 0} visible={isScrolled} toggleSidebar={toggleSidebar}/>;
};
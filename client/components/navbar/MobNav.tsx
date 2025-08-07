"use client"
import { useState } from "react";
import { Menu, X, ChevronDown, ChevronUp, PhoneCall, Mail } from "lucide-react";
import { navLinks, socialMedia } from "@/config/navigation"
import Link from "next/link";
import Image from "next/image";
import { StickyNavbarWrapper } from "./StickyNavbarWrapper";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";

export interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

export default function MobileNav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [expandedLinks, setExpandedLinks] = useState<Record<string, boolean>>({});
  
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const toggleSubLinks = (linkName: string) => {
    setExpandedLinks(prev => ({
      ...prev,
      [linkName]: !prev[linkName]
    }));
  };

  const isLinkActive = (href: string | undefined, subLinks?: { name: string; href: string }[]) => {
    if (pathname === href) return true;
    if (subLinks) {
      return subLinks.some(subLink => pathname === subLink.href);
    }
    return false;
  };

  return (
    <>
      <StickyNavbarWrapper toggleSidebar={toggleSidebar}/>

      <div className="md:hidden">
        <div className="p-4 bg-primary/15 transition-opacity duration-300">
          <div className="border border-primary/20 bg-transparent rounded-lg h-14 flex items-center justify-between px-2 py-3">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Company Logo"
                width={160}
                height={40}
                className="h-8 w-auto"
                priority
              />
              <span className="text-2xl font-bold">
                <span className="text-black/80">Mr</span>
                <span className="text-green-800/80">Code</span>
              </span>
            </Link>

            <button onClick={toggleSidebar} className="p-2 focus:outline-none opacity-80">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Sidebar Overlay */}
        {isOpen && (
          <div 
            className="fixed inset-0 bg-black/30 bg-opacity-30 z-40"
            onClick={toggleSidebar}
          ></div>
        )}

        {/* Sidebar */}
        <div 
          className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
        
          <div className="flex justify-end items-center p-4">
            <button onClick={toggleSidebar} className="p-2 focus:outline-none">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-center gap-y-2 mb-2">
            <div className="text-sm font-medium mb-1 flex items-center gap-3 hover:text-primary transition-colors">
                <PhoneCall size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
                 <Link href="tel:+918943084655" className="text-sm whitespace-nowrap text-black/80">
                   (+91) 8943084655
              </Link>
            </div>
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <Link href="mailto:codemaster@gmail.com" className="text-sm whitespace-nowrap text-black/80">
                codemaster@gmail.com
              </Link>
            </div>
          </div>

          <div className="flex px-4 py-7 border-b border-gray-200 gap-2">
            <Button size='sm' variant='ghost' className="flex-1 border border-green-700 border-b-2 border-b-green-800 py-5 text-sm font-medium">
              Sign In
            </Button>
            <Button size='sm' variant='ghost' className="flex-1 border border-green-700 border-b-2 border-b-green-800 py-5 text-sm font-medium">
              Sign Up
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 overflow-y-auto h-[calc(100vh-220px)]">
            <ul className="space-y-2">
              {navLinks.map((link) => {
                const isActive = isLinkActive(link.href, link.subLinks);
                return (
                  <li key={link.name} className="border-b border-gray-100 pb-2">
                    <div className="flex justify-between items-center">
                      <a 
                        href={link.href} 
                        className={`block py-3 font-medium flex-1 ${
                          isActive ? "text-primary" : "hover:text-primary"
                        }`}
                        onClick={toggleSidebar}
                      >
                        {link.name}
                      </a>
                      
                      {link.subLinks && (
                        <button 
                          onClick={() => toggleSubLinks(link.name)}
                          className="p-2 focus:outline-none"
                        >
                          {expandedLinks[link.name] ? (
                            <ChevronUp className="w-5 h-5" />
                          ) : (
                            <ChevronDown className="w-5 h-5" />
                          )}
                        </button>
                      )}
                    </div>
                    
                    {/* Sublinks */}
                    {link.subLinks && (expandedLinks[link.name] || isActive) && (
                      <ul className="pl-4 mt-2 space-y-2">
                        {link.subLinks.map((subLink) => {
                          const isSubActive = pathname === subLink.href;
                          return (
                            <li key={subLink.name}>
                              <a 
                                href={subLink.href} 
                                className={`block py-2 text-sm pl-2 border-l-2 ${
                                  isSubActive 
                                    ? "text-primary border-primary" 
                                    : "hover:text-primary border-gray-200"
                                }`}
                                onClick={toggleSidebar}
                              >
                                {subLink.name}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>


         <div className="flex items-center justify-center gap-5 py-7">
          {socialMedia.map((social) => (
            <Link 
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="bg-gray-200/90 p-1 rounded-full hover:bg-primary/80 transition-colors"
            >
              <Image 
                src={social.icon} 
                alt={social.alt} 
                width={16} 
                height={16} 
                className="w-5 h-5"
              />
            </Link>
          ))}
        </div>

          </nav>
        </div>
      </div>
    </>
  );
}
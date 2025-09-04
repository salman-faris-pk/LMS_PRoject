import { StaticImageData } from "next/image";
import facebookIcon from '@/assets/facebook.svg';
import xIcon from '@/assets/x.svg';
import instagramIcon from '@/assets/instagram.svg';
import redditIcon from '@/assets/reddit.svg';

export interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

export const navLinks: NavLink[] = [
  { name: "Home", href: "/" },
  {
    name: "Courses",
    subLinks: [
      { name: "All Courses", href: "/allcourses" },
      { name: "Free Courses", href: "/freecourses" },
    ],
  },
  {
    name: "Blog",
    subLinks: [
      { name: "All Blogs", href: "/blog/all" },
      { name: "Latest Blogs", href: "/blog/latest" },
    ],
  },
  { name: "Contact", href: "/contact" },
  { name: "FAQS", href: "/faqs" },
];


export type SocialMedia = {
  name: string;
  icon: StaticImageData;
  alt: string;
  href: string;
};

export const socialMedia: SocialMedia[] = [
  { 
    name: 'Facebook', 
    icon: facebookIcon, 
    alt: 'Facebook', 
    href: 'https://facebook.com' 
  },
  { 
    name: 'Twitter', 
    icon: xIcon, 
    alt: 'Twitter', 
    href: 'https://twitter.com' 
  },
  { 
    name: 'Instagram', 
    icon: instagramIcon, 
    alt: 'Instagram', 
    href: 'https://instagram.com' 
  },
  { 
    name: 'Reddit', 
    icon: redditIcon, 
    alt: 'Reddit', 
    href: 'https://reddit.com' 
  },
];


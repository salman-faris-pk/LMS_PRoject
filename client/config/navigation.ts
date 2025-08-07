
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
      { name: "All Courses", href: "/courses/all" },
      { name: "Free Courses", href: "/courses/free" },
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
  icon: string;
  alt: string;
  href: string;
};

 export const socialMedia: SocialMedia[] = [
    { name: 'Facebook', icon: '/facebook.svg', alt: 'Facebook', href: 'https://facebook.com' },
    { name: 'Twitter', icon: '/x.svg', alt: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', icon: '/instagram.svg', alt: 'Instagram', href: 'https://instagram.com' },
    { name: 'Reddit', icon: '/reddit.svg', alt: 'Reddit', href: 'https://reddit.com' },
  ];
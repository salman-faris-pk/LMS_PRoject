// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
// import { memo } from "react";
// import { usePathname } from "next/navigation";

// export interface NavLink {
//   name: string;
//   href: string;
//   subLinks?: { name: string; href: string }[];
// }

// interface NavItemProps {
//   link: NavLink;
//   className?: string;
//   linkClassName?: string;
//   subLinkClassName?: string;
// }

// export const NavItem = memo(({
//   link,
//   className = "",
//   linkClassName = "text-gray-800 text-lg font-normal hover:text-primary transition-colors duration-200",
//   subLinkClassName = "px-4 py-2 text-black hover:text-primary text-base font-normal hover:translate-x-1 transition-all duration-200"
// }: NavItemProps) => {

//   const pathname = usePathname();
//   const isActive = pathname === link.href;
//   const isHome = link.name === "Home";
//   const showUnderline = isHome && isActive;

//   return (
//     <div className={`relative ${className}`}>
//       {link.subLinks ? (
//         <HoverCard openDelay={0} closeDelay={0}>
//           <HoverCardTrigger asChild>
//             <Link
//               href={link.href}
//               className={`${linkClassName} ${isActive ? "text-green-600" : ""}`}
//             >
//               {link.name}
//             </Link>
//           </HoverCardTrigger>
//           <HoverCardContent className="p-2 bg-white shadow-lg border-t-2 border-t-black rounded-none">
//             <div className="flex flex-col space-y-1">
//               {link.subLinks.map((subLink) => (
//                 <Link
//                   key={subLink.name}
//                   href={subLink.href}
//                   className={subLinkClassName}
//                 >
//                   {subLink.name}
//                 </Link>
//               ))}
//             </div>
//           </HoverCardContent>
//         </HoverCard>
//       ) : (
//         <Link
//           href={link.href}
//           className={`${linkClassName} ${isActive ? "text-green-600" : ""}`}
//         >
//           {link.name}
//         </Link>
//       )}

//       {showUnderline && (
//         <Image
//           src="/shape1.webp"
//           alt="underline"
//           width={100}
//           height={5}
//           className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-[5px]"
//           priority
//         />
//       )}
//     </div>
//   );
// });

// NavItem.displayName = "NavItem";


"use client";

import Link from "next/link";
import Image from "next/image";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { memo } from "react";
import { usePathname } from "next/navigation";

export interface NavLink {
  name: string;
  href?: string;
  subLinks?: { name: string; href: string }[];
}

interface NavItemProps {
  link: NavLink;
  className?: string;
  linkClassName?: string;
  subLinkClassName?: string;
}

export const NavItem = memo(({
  link,
  className = "",
  linkClassName = "text-gray-800 text-lg font-normal hover:text-primary transition-colors duration-200",
  subLinkClassName = "px-4 py-2 text-black hover:text-primary text-base font-normal hover:translate-x-1 transition-all duration-200"
}: NavItemProps) => {
  const pathname = usePathname();
  const isActive = pathname === link.href;
  const isHome = link.name === "Home";
  const showUnderline = isHome && isActive;

  return (
    <div className={`relative ${className}`}>
      {link.subLinks ? (
        <HoverCard openDelay={0} closeDelay={0}>
          <HoverCardTrigger asChild>
            <span className={`${linkClassName} cursor-pointer`}>
              {link.name}
            </span>
          </HoverCardTrigger>
          <HoverCardContent className="p-2 bg-white shadow-lg border-t-2 border-t-black rounded-none">
            <div className="flex flex-col space-y-1">
              {link.subLinks.map((subLink) => (
                <Link
                  key={subLink.name}
                  href={subLink.href}
                  className={subLinkClassName}
                >
                  {subLink.name}
                </Link>
              ))}
            </div>
          </HoverCardContent>
        </HoverCard>
      ) : (
        link.href && (
          <Link
            href={link.href}
            className={`${linkClassName} ${isActive ? "text-green-600" : ""}`}
          >
            {link.name}
          </Link>
        )
      )}

      {showUnderline && (
        <Image
          src="/shape1.webp"
          alt="underline"
          width={100}
          height={5}
          className="absolute bottom-[-12px] left-1/2 transform -translate-x-1/2 h-[5px]"
          priority
        />
      )}
    </div>
  );
});

NavItem.displayName = "NavItem";

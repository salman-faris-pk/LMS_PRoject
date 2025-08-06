import { Undo, Redo, PhoneCall, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

type SocialMedia = {
  name: string;
  icon: string;
  alt: string;
  href: string;
};

const InfoNavbar = () => {
  const socialMedia: SocialMedia[] = [
    { name: 'Facebook', icon: '/facebook.svg', alt: 'Facebook', href: 'https://facebook.com' },
    { name: 'Twitter', icon: '/x.svg', alt: 'Twitter', href: 'https://twitter.com' },
    { name: 'Instagram', icon: '/instagram.svg', alt: 'Instagram', href: 'https://instagram.com' },
    { name: 'Reddit', icon: '/reddit.svg', alt: 'Reddit', href: 'https://reddit.com' },
  ];

  return (
    <nav className="bg-gray-900 text-gray-200 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-md text-center md:text-left ml-10">
          All courses 28% off for <span className="text-green-600/80 font-medium">Indian students.</span>
        </div>

        <div className="flex items-center gap-4">
          <Redo 
            size={28} 
            strokeWidth={1.5} 
            className="text-gray-300  transition-colors cursor-pointer me-2" 
            aria-hidden="true"
          />
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <PhoneCall size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <Link href="tel:+918086080158" className="text-md whitespace-nowrap text-gray-200">
                (+91) 8086080158
              </Link>
            </div>
            
            <div className="flex items-center gap-3 hover:text-primary transition-colors">
              <Mail size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <Link href="mailto:codemaster@gmail.com" className="text-md whitespace-nowrap text-gray-200">
                codemaster@gmail.com
              </Link>
            </div>
          </div>

           <Undo 
            size={28} 
            strokeWidth={1.5} 
            className="text-gray-300  transition-colors cursor-pointer ml-2" 
            aria-hidden="true"
          />
        </div>

        <div className="flex items-center gap-3 me-10">
          {socialMedia.map((social) => (
            <Link 
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="bg-gray-200 p-1 rounded-full hover:bg-primary/80 transition-colors"
            >
              <Image 
                src={social.icon} 
                alt={social.alt} 
                width={16} 
                height={16} 
                className="w-4 h-4"
              />
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default InfoNavbar;
import { socialMedia } from "@/config/navigation";
import { Undo, Redo, PhoneCall, Mail } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';



const InfoNavbar = () => {

  return (
    <nav className="bg-gray-900 text-gray-200/90 py-3 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-md text-center md:text-left ml-10">
          All courses 28% off for <span className="text-green-600/80 font-medium">Indian students.</span>
        </div>

        <div className="flex items-center gap-4">
          <Redo 
            size={28} 
            strokeWidth={1.5} 
            className="text-gray-300/80  transition-colors cursor-pointer me-2" 
            aria-hidden="true"
          />
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3 ">
              <PhoneCall size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <Link href="tel:+918943084655" className="text-md hover:text-primary transition-colors whitespace-nowrap text-gray-200/90">
                (+91) 8943084655
              </Link>
            </div>
            
            <div className="flex items-center gap-3">
              <Mail size={20} strokeWidth={1.5} className="text-primary" aria-hidden="true" />
              <Link href="mailto:codemaster@gmail.com" className="text-md hover:text-primary transition-colors whitespace-nowrap text-gray-200/90">
                codemaster@gmail.com
              </Link>
            </div>
          </div>

           <Undo 
            size={28} 
            strokeWidth={1.5} 
            className="text-gray-300/80  transition-colors cursor-pointer ml-2" 
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
              className="bg-gray-200/90 p-1 rounded-full hover:bg-primary/80 transition-colors"
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
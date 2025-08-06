import type { Metadata } from "next";
import { Poppins,Josefin_Sans} from "next/font/google"
import "./globals.css";
import MainNavbar from "@/components/navbar/MainNavbar";

const poppins = Poppins({
  subsets: ["latin"],
  weight:["400","500","600","700"],
  variable: "--font-Poppins",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight:["400","500","600","700"],
  variable: "--font-Josefin",
});

export const metadata: Metadata = {
   title: {
    default: 'CodeMaster LMS - Learn Programming Online',
    template: '%s | CodeMaster LMS'
  },
  description: 'Master programming with interactive courses in Python, JavaScript, React, and more. Start coding today with our expert-led tutorials.',
  keywords: ['programming courses', 'learn to code', 'web development', 'Python tutorial', 'JavaScript course'],
  icons:{
    icon: '/favicon.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased`}
      >
        <MainNavbar />
        {children}
      </body>
    </html>
  );
}

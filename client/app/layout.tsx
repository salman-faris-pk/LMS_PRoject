import { Poppins,Josefin_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider" 
import Header from "@/components/Header";
import { ScrollProgress } from "@/components/magicui/scroll-progress";

const poppins = Poppins({
  variable: "--font-Poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const josefin = Josefin_Sans({
  variable: "--font-josefin",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});


export const metadata = {
  title: { 
    default: "E-Learns programming platform", 
    template: "%s | E-Learns programming platform" 
  },
  icons: { icon: "/fav.png" }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${poppins.variable} ${josefin.variable} antialiased`}
      >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={false}
            disableTransitionOnChange
          >
           <ScrollProgress className="h-[2px] top-16 bg-gradient-to-r from-[#9929EA] via-[#8F87F1] to-[#78C841]" />
            <Header/>
           {children}
          </ThemeProvider>
      </body>
    </html>
  );
}

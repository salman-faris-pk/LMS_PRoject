import shapeUnderline from "@/assets/shape-2.webp";
import Arrow from "@/assets/shape10.webp"
import { FileText, TextSearch, TvMinimalPlay } from "lucide-react";
import Image from "next/image";

const HowItWorks = () => {
  const steps = [
    {
      title: "Find Your Course",
      icon: <TextSearch className="w-8 h-8" />,
      description: "Browse our vast library and find courses matching your goals.",
    },
    {
      title: "Enroll In Course",
      icon: <FileText className="w-8 h-8" />,
      description: "Secure your spot with our simple enrollment process.",
    },
    {
      title: "Start Learning",
      icon: <TvMinimalPlay className="w-8 h-8" />,
      description: "Access lessons and resources at your own pace.",
    },
  ];

  return (
    <section className="container p-6">
      <div className="text-center md:mb-10">
        <h2 className="text-2xl md:text-3xl font-medium text-gray-800">
          How It <span className="text-primary relative">Works
            <Image
              src={shapeUnderline}
              alt="underline"
              width={120}
              height={12}
              className="absolute -bottom-3 left-0 w-full"
            />
          </span>
        </h2>
      </div>

  <div className="grid md:grid-cols-3 p-8 md:p-5 gap-y-6 gap-x-28 relative">
  {steps.map((step, index) => (
    <div 
      key={index}
      className="group p-8 rounded-xl bg-secondary"
    >
      <div className="w-16  h-14 rounded-lg bg-white  flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
        <span className="text-primary group-hover:text-white transition-colors duration-300">
          {step.icon}
        </span>
      </div>
      <h3 className="text-2xl font-Josefin mt-10 mb-3 text-[#212832]">{step.title}</h3>
      <p className="text-[#696969] text-md md:w-2/3">{step.description}</p>
    </div>
  ))}
  
  <div className="hidden md:block absolute left-1/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
    <Image src={Arrow} alt="arrow"/>
  </div>
  <div className="hidden md:block absolute left-2/3 -translate-x-1/2 top-1/2 -translate-y-1/2">
    <Image src={Arrow} alt="arrow"/>
  </div>
</div>
    </section>
  );
};

export default HowItWorks;
import React from "react";
import { Button } from "antd";
import Image from "next/image";
import heroImage from "@/assets/images/voiceHeroBg3.jpg"; // Replace with your image path

const VoiceHeroBg: React.FC = () => {
  return (
    <div className="relative w-full h-[500px]"> {/* Increased overall height */}
      <section
        className="relative w-full h-full bg-cover bg-center text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage.src})`, // Using image as background
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-slate-950 bg-opacity-30"></div> {/* Added opacity for dark overlay */}

        {/* Text Content */}
        <div className="relative z-10 flex flex-col justify-center items-start h-full p-8 pr-16 text-left">
          <h1 className="text-6xl font-bold mb-4 leading-tight max-w-[600px]">
            Discover Our Exclusive Voice Packages
          </h1>
          <p className="text-base mb-6 leading-relaxed max-w-[500px]">
            Choose from a range of affordable voice packages, designed to keep you connected. Whether it's short-term or long-term, we've got the right plan for everyone.
          </p>
          <div className="flex flex-row space-x-5">
            <Button type="primary" size="large" className="bg-white border-white text-black">
             Explore Packages
            </Button>
            <Button type="default" size="large" className="bg-slate-950 border-white text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VoiceHeroBg;

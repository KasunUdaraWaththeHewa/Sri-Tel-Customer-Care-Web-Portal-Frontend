import React from "react";
import { Button } from "antd";
// import Image from "next/image";
import heroImage from "@/assets/images/topUpBarImage.jpg"; // Replace with your image path

const TopUpHero: React.FC = () => {
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
            Flexible TopUp Packages for Every Need
          </h1>
          <p className="text-base mb-6 leading-relaxed max-w-[500px]">
            Stay in control of your mobile usage with our flexible and affordable TopUp packages. Whether you need a quick recharge or a larger balance, our plans are designed to keep you connected anytime, anywhere.
          </p>
          <div className="flex flex-row space-x-5">
            <Button type="primary" size="large" className="bg-gray-950 text-white">
                Recharge Now
            </Button>
            <Button type="default" size="large" className="bg-transparent text-white border border-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TopUpHero;

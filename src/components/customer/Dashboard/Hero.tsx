import React from "react";
import { Button } from "antd";
import Image from "next/image";
import heroImage from "@/assets/images/dashboardBg7.png"; // Replace with your image path
import DashboardCards from "./DashboardCards";

const HeroSection: React.FC = () => {
  return (
    <div className="relative w-full overflow-hidden h-[600px]"> {/* Increased overall height */}
      <section className="relative w-full h-[500px] bg-gray-900 text-white rounded-lg overflow-hidden">
        {/* Background Color */}
        <div className="absolute inset-0 bg-slate-950"></div>

        {/* Hero Image */}
        <div className="absolute inset-0 flex justify-start items-center ml-10">
          <Image
            src={heroImage}
            alt="Hero Image"
            layout="intrinsic"
            width={900}
            height={400}
            className="object-cover rounded-lg shadow-lg"
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center items-end h-full p-8 pr-16 text-right">
          <h1 className="text-6xl font-bold mb-4 leading-tight max-w-[600px]">
            Welcome to Sri-Tel Dashboard
          </h1>
          <p className="text-base mb-6 leading-relaxed max-w-[500px]">
            Manage your voice and data packages, explore value-added services, and stay on top of your account details with ease.
          </p>
          <div className="flex flex-row space-x-5">
            <Button type="primary" size="large" className="bg-white border-white text-black">
              Get Started
            </Button>
            <Button type="default" size="large" className="bg-slate-950 border-white text-white">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Lowered DashboardCards Section */}
      <div
        className="absolute bottom-[20px] left-1/2 transform -translate-x-1/2 w-2/3 bg-white shadow-lg h-90 flex justify-center items-center rounded-md"
      >
        <DashboardCards />
      </div>
    </div>
  );
};

export default HeroSection;

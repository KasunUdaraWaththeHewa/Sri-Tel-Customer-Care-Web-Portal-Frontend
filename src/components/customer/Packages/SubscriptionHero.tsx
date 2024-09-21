import React from "react";
import { Button } from "antd";
// import Image from "next/image";
import heroImage from "@/assets/images/subscriptionBarImage.jpg";

const SubscriptionHero: React.FC = () => {
  return (
    <div className="relative w-full h-[500px]">
      {" "}
      <section
        className="relative w-full h-full bg-cover bg-center text-white rounded-lg overflow-hidden"
        style={{
          backgroundImage: `url(${heroImage.src})`,
        }}
      >
        <div className="absolute inset-0 bg-slate-950 bg-opacity-30"></div>{" "}
        <div className="relative z-10 flex flex-col justify-center items-start h-full p-8 pr-16 text-left">
          <h1 className="text-6xl font-bold mb-4 leading-tight max-w-[600px]">
            Explore Our Subscription Packages
          </h1>
          <p className="text-base mb-6 leading-relaxed max-w-[500px]">
            From entertainment to productivity, our subscription services offer
            unmatched value. Choose the plan that suits your needs today!
          </p>
          <div className="flex flex-row space-x-5">
            <Button
              type="primary"
              size="large"
              className="bg-gray-950 text-white"
            >
              View Subscriptions
            </Button>
            <Button
              type="default"
              size="large"
              className="bg-transparent text-white border border-white"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SubscriptionHero;

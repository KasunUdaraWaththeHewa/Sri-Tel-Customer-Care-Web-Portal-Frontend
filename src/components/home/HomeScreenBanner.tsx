import React, { useState, useEffect } from "react";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { FaTv, FaWifi, FaMobileAlt, FaSimCard } from "react-icons/fa";

// Import images
import banner1 from "../../assets/images/banner1.jpg";
import banner2 from "../../assets/images/banner2.jpg";
import banner3 from "../../assets/images/banner3.jpg";
import banner4 from "../../assets/images/banner4.jpg";

interface Banner {
  title: string;
  description: string;
  image: StaticImageData;
  link: string;
}

const banners: Banner[] = [
  {
    title: "Super Fast 4G LTE Plans",
    description: "Get the best value for your money with our new 4G LTE plans.",
    image: banner1,
    link: "/plans/4g",
  },
  {
    title: "International Roaming Offers",
    description:
      "Stay connected wherever you go with affordable roaming packages.",
    image: banner2,
    link: "/services/roaming",
  },
  {
    title: "Exclusive Data Top-Up Deals",
    description:
      "Enjoy exclusive deals on data top-ups, valid for a limited time!",
    image: banner3,
    link: "/services/data-topup",
  },
  {
    title: "Unlimited Calls & Texts",
    description:
      "Get unlimited calls and texts to any network with our new plans.",
    image: banner4,
    link: "/plans/unlimited",
  },
];

const HomeScreenBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + banners.length) % banners.length
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 3000); // Change slide every 3 seconds
    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  return (
    <div className="relative w-full overflow-hidden h-[580px]">
      <div className="relative w-full h-[500px]">
        <div
          className="absolute inset-0 flex transition-transform duration-500"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {banners.map((banner, index) => (
            <a
              key={index}
              href={banner.link}
              className="relative w-full flex-shrink-0"
            >
              <div className="relative w-full h-full">
                <Image
                  src={banner.image}
                  alt={banner.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center p-4 bg-black bg-opacity-50 text-white">
                  <div className="text-center">
                    <h3 className="text-4xl font-bold mb-2">{banner.title}</h3>
                    <p className="text-lg">{banner.description}</p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
        <button
          className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black text-white p-2 rounded-full"
          onClick={nextSlide}
        >
          &#10095;
        </button>
      </div>

      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-3/4 bg-white shadow-lg h-40 flex items-center justify-center rounded-md border border-red">
        <div className="w-1/2 flex flex-col">
          <h3 className="text-2xl font-bold text-black-500 w-1/2">
            Welcome to Sri Tel
          </h3>
          <p className="text-1xl text-gray-500">
            Enjoy the best deals on TV, Fiber, 4G, and Sim Cards. We provide you
            with the best services at the best prices.
          </p>
        </div>
        <div className="flex items-center space-x-4 mb-4">
          <div className="flex flex-col items-center">
            <FaTv size={35} className="text-black-500" />
            <span className="text-sm mt-2">Sri Tel TV</span>
          </div>
          <div className="flex flex-col items-center">
            <FaWifi size={35} className="text-black-500" />
            <span className="text-sm mt-2">Sri Tel Fiber</span>
          </div>
          <div className="flex flex-col items-center">
            <FaMobileAlt size={35} className="text-black-500" />
            <span className="text-sm mt-2">Sri Tel 4G</span>
          </div>
          <div className="flex flex-col items-center">
            <FaSimCard size={35} className="text-black-500" />
            <span className="text-sm mt-2">Sri Tel Sim Cards</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreenBanner;

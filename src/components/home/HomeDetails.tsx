// components/DetailsSection.tsx
import React from 'react';
import { FaWifi, FaRegStar, FaRegHeart } from 'react-icons/fa';
import { GiNetworkBars } from 'react-icons/gi';

const features = [
  {
    title: 'High-Speed Internet',
    description: 'Enjoy blazing fast internet speeds with our fiber-optic technology.',
    icon: <FaWifi size={40} className="text-black-500" />,
  },
  {
    title: 'Reliable Service',
    description: 'Our service is reliable with minimal downtime and prompt support.',
    icon: <GiNetworkBars size={40} className="text-black-500" />,
  },
  {
    title: 'Customer Satisfaction',
    description: 'We prioritize customer satisfaction and offer excellent support.',
    icon: <FaRegStar size={40} className="text-black-500" />,
  },
  {
    title: 'Affordable Plans',
    description: 'Find a plan that fits your budget without compromising on quality.',
    icon: <FaRegHeart size={40} className="text-black-500" />,
  },
];

const DetailsSection: React.FC = () => {
  return (
    <section className="bg-gray-100 py-12 px-4">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Us?</h2>
        <div className="flex flex-wrap justify-center">
          {features.map((feature, index) => (
            <div key={index} className="w-full md:w-1/2 lg:w-1/4 p-4">
              <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DetailsSection;

import React from 'react';
import { Carousel } from 'antd';

type Advertisement = {
  image: string;
  title: string;
};

type AdvertisementCarouselProps = {
  advertisements: Advertisement[];
};

const AdvertisementCarousel: React.FC<AdvertisementCarouselProps> = ({ advertisements }) => {
  return (
    <div className="border border-gray-200 rounded-xl max-w-[370px]">
      <Carousel autoplay className="w-[500px] h-full">
        {advertisements.map((ad, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="w-full h-auto relative">
              <img 
                src={ad.image} 
                alt={ad.title} 
                className="w-[500px] h-[600px] object-cover rounded-md" 
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default AdvertisementCarousel;

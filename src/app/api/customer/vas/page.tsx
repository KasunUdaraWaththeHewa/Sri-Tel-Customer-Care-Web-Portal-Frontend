"use client";

import React from 'react';
import { Card, Button, Row, Col } from 'antd';
import Navbar from '@/components/customer/Navbar';
import Footer from '@/components/Footer';
import TopUpImage from '@/assets/images/topUpBarImage.jpg';
import RingToneImage from '@/assets/images/ringingToneBarImage.jpg';
import RoamingImage from '@/assets/images/roamingBarImage.jpg';
import SubscriptionImage from '@/assets/images/subscriptionBarImage.jpg';
import { ArrowRightOutlined } from '@ant-design/icons';

const valueAddedServices = [
  {
    title: 'TopUp Packages',
    description: 'Recharge your account with our affordable TopUp packages. Whether you need data, talk time, or text bundles, we have a wide range of options to keep you connected, no matter where you are. Stay in control of your balance and never run out of credit again.',
    bgImage: TopUpImage, 
    link: '/api/customer/vas/topUpPackages',
  },
  {
    title: 'Ringtone Activation',
    description: 'Personalize your phone with unique ringtones. Choose from the latest tunes, classical melodies, or fun sound effects, and give your phone a personal touch. Express yourself and make sure every call stands out with our easy-to-activate ringtones.',
    bgImage: RingToneImage, 
    link: '/api/customer/vas/ringingTones',
  },
  {
    title: 'Roaming',
    description: 'Traveling abroad? Stay connected with our affordable roaming packages. Whether for business or leisure, you can access seamless connectivity while traveling. Don’t worry about high roaming charges—our packages are designed to fit your needs, with coverage in multiple countries.',
    bgImage: RoamingImage, 
    link: '/api/customer/vas/roaming',
  },
  {
    title: 'Subscription Based Packages',
    description: 'Enjoy more flexibility with our subscription-based packages. Get access to exclusive benefits, additional services, and discounted rates. Whether you need more data, talk time, or entertainment services, our subscription packages offer you the convenience of renewing automatically each month.',
    bgImage: SubscriptionImage, 
    link: '/api/customer/vas/subscriptionPackages',
  },
];

const ValueAddedServicesPage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <h1 className="text-5xl font-bold mb-8 text-center mt-10">Value Added Services</h1>
        <p className="text-lg mb-10 text-center">Explore our range of additional services designed to enhance your experience.</p>

        <Row gutter={[24, 24]}>
          {valueAddedServices.map((service, index) => (
            <Col span={24} key={index}>
              <Card
                className="rounded-lg shadow-lg relative"
                style={{
                  position: 'relative',
                  backgroundImage: `url(${service.bgImage.src})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  minHeight: '300px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  overflow: 'hidden',
                }}
                bodyStyle={{
                  position: 'relative',
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  flex: 1,
                  zIndex: 2,  // Keep content on top of the overlay
                }}
              >
                {/* Overlay to reduce opacity */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay with opacity
                    zIndex: 1,
                  }}
                />
                
                {/* Left side: Title and description */}
                <div style={{ flex: 1, color: 'white', zIndex: 2 }}>
                  <h2 className="text-4xl font-bold mb-2">{service.title}</h2>
                  <p className="text-lg">{service.description}</p>
                </div>

                {/* Right side: CTA button */}
                <div style={{ display: 'flex', alignItems: 'center', zIndex: 2 }}>
                  <Button type="primary" className="bg-white text-gray-900">
                    <a href={service.link}>Learn More <ArrowRightOutlined /> </a>
                  </Button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default ValueAddedServicesPage;

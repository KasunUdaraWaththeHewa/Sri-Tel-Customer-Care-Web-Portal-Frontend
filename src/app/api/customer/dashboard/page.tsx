"use client"

import Navbar from '@/components/customer/Navbar';
import ActivatedPackages from '@/components/customer/Dashboard/ActivatedPackages';
import Footer from '@/components/Footer';
import HeroSection from '@/components/customer/Dashboard/Hero';
import AdvertisementCarousel from '@/components/customer/Dashboard/Advertisements';
import BestPlans from '@/components/customer/Dashboard/BestPlans';
import advertisement1 from '@/assets/images/advertisement1.png';
import advertisement2 from '@/assets/images/advertisement2.jpg';
import advertisement3 from '@/assets/images/advertisement3.png';
import {Col, Row} from 'antd';

const advertisements = [
  {
    image: advertisement1,
    title: 'Summer Sale',
  },
  {
    image: advertisement2,
    title: 'New Arrivals',
  },
  {
    image: advertisement3,
    title: 'Clearance Sale',
  },
];

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow p-8">
        <HeroSection/>

        {/* Activated packages */}
        <ActivatedPackages />

        {/* Another Advertisement */}
        
        <Row>
          <Col span={9}>
            <AdvertisementCarousel advertisements={advertisements.map(ad => ({ ...ad, image: ad.image.src }))} />
          </Col>
          <Col span={15}>
            <BestPlans/>
          </Col>
        </Row>
        
        {/* <AdvertisementSection /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;


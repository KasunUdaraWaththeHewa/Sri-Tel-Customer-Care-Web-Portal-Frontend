"use client"

import Navbar from '@/components/customer/Navbar';
import DashboardCards from '@/components/customer/Dashboard/DashboardCards';
import ActivatedPackages from '@/components/customer/Dashboard/ActivatedPackages';
import AdvertisementSection from '@/components/customer/Dashboard/Advertisements';
import Footer from '@/components/Footer';
import HeroSection from '@/components/customer/Dashboard/Hero';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow p-8">
        <HeroSection/>

        {/* Activated packages */}
        <ActivatedPackages />

        {/* Another Advertisement */}
        {/* <AdvertisementSection /> */}
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;


"use client";

import React, { useState } from 'react';
import { Card, Col, Row, Button, Select, Slider, Input } from 'antd';
import Navbar from '@/components/customer/Navbar';
import Footer from '@/components/Footer';
import TopUpHero from '@/components/customer/Packages/TopUpHero';

const { Option } = Select;
const { Search } = Input;

const TopUpPackages: React.FC = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');

  const topUpPackages = [
    {
      name: 'Basic TopUp',
      price: 50,
      creditAmount: 50,
      features: { freeSms: '5 Free SMS', callRate: 'Rs. 2.50 per minute' },
      description: 'Recharge with our basic TopUp and stay connected for calls and texts at affordable rates.',
    },
    {
      name: 'Standard TopUp',
      price: 100,
      creditAmount: 100,
      features: { freeSms: '15 Free SMS', callRate: 'Rs. 2.00 per minute' },
      description: 'Get extra talk time with our Standard TopUp package. Ideal for regular users.',
    },
    {
      name: 'Premium TopUp',
      price: 500,
      creditAmount: 550,
      features: { freeSms: 'Unlimited Free SMS', callRate: 'Rs. 1.50 per minute' },
      description: 'Premium TopUp package with bonus credit and unlimited SMS for maximum savings.',
    },
  ];

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleIncrease = () => {
    setPriceRange([priceRange[0], Math.min(priceRange[1] + 10, 1000)]);
  };

  const handleDecrease = () => {
    setPriceRange([priceRange[0], Math.max(priceRange[1] - 10, 0)]);
  };

  // Handle filter by duration, price range, and search term in description or features
  const filteredPackages = topUpPackages.filter((pkg) => {
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesSearchTerm =
      searchTerm === '' ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(pkg.features).some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesPrice && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        
        <TopUpHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">TopUp Packages</h1>
        <p className="text-lg mb-8 text-center">Select from our range of TopUp packages that offer great value for staying connected.</p>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          {/* Left side: Price Range Filter and Search bar */}
          <div className="flex items-center space-x-4">
            {/* Search by Features or Description */}
            <Search
              placeholder="Search by feature or description"
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
          </div>

          {/* Right side: Price Range Filter with + and - Buttons */}
          <div className="flex items-center justify-end w-full md:w-auto">
            <Button onClick={handleDecrease}>-</Button>
            <div className="mx-4 flex flex-col w-full md:w-auto">
              <span>Price Range (Rs): {priceRange[0]} - {priceRange[1]}</span>
              <Slider
                range
                value={priceRange}
                max={1000}
                step={10}
                onChange={handlePriceRangeChange}
              />
            </div>
            <Button onClick={handleIncrease}>+</Button>
          </div>
        </div>

        {/* TopUp Package Cards */}
        <Row gutter={[16, 16]}>
          {filteredPackages.length > 0 ? (
            filteredPackages.map((plan, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card key={index} className="shadow-lg p-6 pt-3 bg-white rounded-lg flex flex-col h-full">
                  <div className="justify-start">
                    <h3 className="text-xl font-bold mb-4 text-center">{plan.name}</h3>
                    <p className="text-gray-600 mb-2 text-center">{plan.description}</p>
                    <hr />
                    <p className="text-lg font-semibold mb-5 mt-2 text-center">Rs. {plan.price}</p>
                    <p className="text-gray-600 text-3xl text-center font-bold">
                      {plan.creditAmount}
                      <sub className="text-xs text-gray-400"> Rs</sub>
                    </p>
                    <p className="text-gray-400 mb-4 text-center text-xs">Credit Amount</p>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                      {Object.values(plan.features).map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="justify-self-end align-bottom">
                    <Button type="primary" className="w-full bg-gray-900">Recharge</Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center w-full">No packages found matching the criteria.</p>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default TopUpPackages;

"use client";

import React, { useState } from 'react';
import { Card, Col, Row, Button, Select, Slider, Input } from 'antd';
import Navbar from '@/components/customer/Navbar';
import Footer from '@/components/Footer';
import VoiceHeroBg from '@/components/customer/Dashboard/VoiceHero';

const { Option } = Select;
const { Search } = Input;

const VoicePackages: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');

  const voicePackages = [
    {
      name: '7 Days Voice Package',
      price: 126,
      talktime: '1000',
      features: ['Free S2S Calls', 'Free 10 S2S SMS', 'No Roaming'],
      duration: '7',
    },
    {
      name: '21 Days Voice Package',
      price: 564,
      talktime: '3000',
      features: ['Free S2S Calls', 'Free 100 SMS to Any Network', 'No Roaming'],
      duration: '21',
    },
    {
      name: '30 Days Voice Package',
      price: 923,
      talktime: '6000',
      features: ['Free S2S Calls', 'Free Unlimited SMS to Any Network', 'No Roaming'],
      duration: '30',
    },
  ];

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  // Increase or decrease the price range by 10
  const handleIncrease = () => {
    setPriceRange([priceRange[0], Math.min(priceRange[1] + 10, 1000)]);
  };

  const handleDecrease = () => {
    setPriceRange([priceRange[0], Math.max(priceRange[1] - 10, 0)]);
  };

  // Handle filter by duration, price range, and search term in features
  const filteredPackages = voicePackages.filter((pkg) => {
    const matchesDuration = filter === 'all' || pkg.duration === filter;
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesSearchTerm = searchTerm === '' || pkg.features.some((feature) =>
      feature.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return matchesDuration && matchesPrice && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        
        <VoiceHeroBg/>

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">Voice Packages</h1>
        <p className="text-lg mb-8 text-center">Choose from our range of voice packages that suit your needs.</p>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          {/* Left side: Duration Filter and Search bar */}
          <div className="flex items-center space-x-4">
            {/* Duration Filter */}
            <Select defaultValue="all" style={{ width: 200 }} onChange={(value) => setFilter(value)}>
              <Option value="all">All Durations</Option>
              <Option value="7">7 Days</Option>
              <Option value="21">21 Days</Option>
              <Option value="30">30 Days</Option>
            </Select>

            {/* Search by Features */}
            <Search
              placeholder="Search features"
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

        {/* Voice Package Cards */}
        <Row gutter={[16, 16]}>
          {filteredPackages.length > 0 ? (
            filteredPackages.map((plan, index) => (
              <Col xs={24} sm={12} lg={8} key={index}>
                <Card key={index} className="shadow-lg p-6 pt-3 bg-white rounded-lg flex flex-col h-full">
                  <div className="justify-start">
                    <h3 className="text-xl font-bold mb-4 text-center">{plan.name}</h3>
                    <hr />
                    <p className="text-lg font-semibold mb-5 mt-2 text-center">Rs. {plan.price}</p>
                    <p className="text-gray-600 text-3xl text-center font-bold">
                      {plan.talktime}
                      <sub className="text-xs text-gray-400"> minutes</sub>
                    </p>
                    <p className="text-gray-400 mb-4 text-center text-xs">Talk Time to Any Network</p>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                      {plan.features.map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="justify-self-end align-bottom">
                    <Button type="primary" className="w-full bg-gray-900">Activate</Button>
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

export default VoicePackages;

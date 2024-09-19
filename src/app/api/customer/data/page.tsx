"use client";

import React, { useState } from 'react';
import { Card, Col, Row, Button, Select, Slider, Input } from 'antd';
import Navbar from '@/components/customer/Navbar';
import Footer from '@/components/Footer';
import DataHero from '@/components/customer/Dashboard/DataHero';

const { Option } = Select;
const { Search } = Input;

const DataPackages: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');

  const dataPackages = [
    {
      name: '7 Days Data Package',
      price: 126,
      dataAmount: 1000, // Amount in MB/GB
      features: { freeSms: 'Free 10 SMS', roaming: 'No Roaming' },
      durationInDays: 7,
      description: 'Enjoy a week of seamless browsing with 1000MB data and additional benefits.'
    },
    {
      name: '21 Days Data Package',
      price: 564,
      dataAmount: 3000,
      features: { freeSms: 'Free 100 SMS', roaming: 'No Roaming' },
      durationInDays: 21,
      description: 'Surf the internet for 21 days with 3000MB data and stay connected with SMS benefits.'
    },
    {
      name: '30 Days Data Package',
      price: 923,
      dataAmount: 6000,
      features: { freeSms: 'Unlimited SMS', roaming: 'No Roaming' },
      durationInDays: 30,
      description: 'Get a full month of data with 6000MB, along with unlimited SMS and no roaming charges.'
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
  const filteredPackages = dataPackages.filter((pkg) => {
    const matchesDuration = filter === 'all' || pkg.durationInDays === Number(filter);
    const matchesPrice = pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesSearchTerm =
      searchTerm === '' ||
      pkg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(pkg.features).some((feature) =>
        feature.toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesDuration && matchesPrice && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        
        <DataHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">Data Packages</h1>
        <p className="text-lg mb-8 text-center">Choose from our range of data packages that suit your browsing needs.</p>

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

        {/* Data Package Cards */}
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
                      {plan.dataAmount}
                      <sub className="text-xs text-gray-400"> MB</sub>
                    </p>
                    <p className="text-gray-400 mb-4 text-center text-xs">Data Amount</p>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                      {Object.values(plan.features).map((feature, i) => (
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

export default DataPackages;

"use client";

import React, { useState } from "react";
import { Card, Col, Row, Button, Select, Input } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import RingingToneHero from "@/components/customer/Packages/RingingToneHero";

const { Option } = Select;
const { Search } = Input;

const RingingToneActivation: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const ringingTones = [
    {
      name: "Sanda Tharu Mal - Sinhala",
      description: "A popular Sinhala song to set as your ringtone.",
      language: "Sinhala",
      price: 100,
    },
    {
      name: "Shape of You - English",
      description: "Set Ed Sheeran's hit 'Shape of You' as your ringtone.",
      language: "English",
      price: 150,
    },
    {
      name: "Jai Ho - Hindi",
      description: "Enjoy the energetic vibe of 'Jai Ho' as your ringtone.",
      language: "Hindi",
      price: 120,
    },
    {
      name: "Pehli Nazar - Hindi",
      description: "Romantic Hindi song to make your ringtone.",
      language: "Hindi",
      price: 130,
    },
  ];

  const handleFilterChange = (value: string) => {
    setFilter(value);
  };

  const filteredTones = ringingTones.filter((tone) => {
    const matchesLanguage = filter === "all" || tone.language === filter;
    const matchesSearchTerm =
      searchTerm === "" || tone.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesLanguage && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <RingingToneHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">Ringing Tones</h1>
        <p className="text-lg mb-8 text-center">
          Select and activate a custom ringtone to express your unique style.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          {/* Language Filter */}
          <Select
            defaultValue="all"
            style={{ width: 200 }}
            onChange={handleFilterChange}
          >
            <Option value="all">All Languages</Option>
            <Option value="Sinhala">Sinhala</Option>
            <Option value="English">English</Option>
            <Option value="Hindi">Hindi</Option>
          </Select>

          {/* Search by Ringtone Name */}
          <Search
            placeholder="Search by name"
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
            enterButton
          />
        </div>

        {/* Ringing Tone Cards (Horizontal) */}
        <Row gutter={[16, 16]}>
          {filteredTones.length > 0 ? (
            filteredTones.map((tone, index) => (
            <Col xs={24} key={index} span={24}>
              <Card 
                key={index}
                className="shadow-lg p-6 pt-3 bg-white rounded-lg">
                {/* Wrapping the content in a Row to handle the layout */}
                <Row className="items-center justify-between">
                  {/* Left side: Ringtone details */}
                  <Col xs={18}>
                    <h3 className="text-xl font-bold mb-2">{tone.name}</h3>
                    <p className="text-gray-600 mb-2">{tone.description}</p>
                  </Col>

                  {/* Right side: Price and Activate button */}
                  <Col xs={6} className="text-right">
                    <p className="text-lg font-semibold mb-4">Rs. {tone.price} <sub className="text-xs text-gray-400">per month</sub></p>
                    <Button type="primary" className="bg-gray-900">Activate</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
            ))
          ) : (
            <p className="text-center w-full">No ringing tones found matching the criteria.</p>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default RingingToneActivation;
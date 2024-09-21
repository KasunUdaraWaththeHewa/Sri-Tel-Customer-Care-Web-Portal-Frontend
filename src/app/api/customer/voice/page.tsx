"use client";

import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Select, Slider, Input, message } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import VoiceHeroBg from "@/components/customer/Packages/VoiceHero";
import {
  getAllVoicePackages,
  activateVoicePackage,
} from "@/app/api/apiCalls/voicePackages";

const { Option } = Select;
const { Search } = Input;

// Define the interface for the voice package
interface VoicePackage {
  name: string;
  price: number;
  talkTime: string;
  features?: string[]; // Change to an array of strings
  durationInDays: string;
  description: string;
  _id: string;
}

const VoicePackages: React.FC = () => {
  const [voicePackages, setVoicePackages] = useState<VoicePackage[]>([]);
  const [filter, setFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVoicePackages = async () => {
      try {
        const packages = await getAllVoicePackages();
        setVoicePackages(packages);
        console.log(voicePackages);
      } catch (error) {
        console.error("Failed to fetch voice packages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVoicePackages();
  }, []);

  const handlePriceRangeChange = (value: number[]) => {
    setPriceRange(value);
  };

  const handleIncrease = () => {
    setPriceRange([priceRange[0], Math.min(priceRange[1] + 10, 1000)]);
  };

  const handleDecrease = () => {
    setPriceRange([priceRange[0], Math.max(priceRange[1] - 10, 0)]);
  };

  const filteredPackages = voicePackages.filter((pkg) => {
    const matchesDuration =
      filter === "all" || pkg.durationInDays.toString() === filter;
    const matchesPrice =
      pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesSearchTerm =
      searchTerm === "" ||
      (pkg.features &&
        Object.values(pkg.features).some((feature) =>
          feature.toLowerCase().includes(searchTerm.toLowerCase())
        ));
    return matchesDuration && matchesPrice && matchesSearchTerm;
  });

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleActivate = async (plan: VoicePackage) => {
    const activationData = {
      accountID: "66eda4f8f0d0ef39b09e07d6",
      talkTime: plan.talkTime, // Assuming you want to include talkTime as well
      price: plan.price,
      durationInDays: plan.durationInDays,
      packageID: plan._id,
    };

    try {
      const response = await activateVoicePackage(activationData);
      console.log("Activation Response:", response);
      if (response.statusCode === 201) {
        console.log("Package activated successfully:", response);
        message.success(`Package "${plan.name}" activated successfully!`);
      } else if (response.statusCode === 200) {
        message.error(`Package "${plan.name}" is already active!`);
      }
    } catch (error) {
      console.error("Error activating package:", error);
      message.error(
        `Failed to activate package "${plan.name}". Please try again.`
      );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <VoiceHeroBg />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">
          Voice Packages
        </h1>
        <p className="text-lg mb-8 text-center">
          Choose from our range of voice packages that suit your needs.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          <div className="flex items-center space-x-4">
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setFilter(value)}
            >
              <Option value="all">All Durations</Option>
              <Option value="7">7 Days</Option>
              <Option value="21">21 Days</Option>
              <Option value="30">30 Days</Option>
            </Select>

            <Search
              placeholder="Search features"
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
          </div>

          <div className="flex items-center justify-end w-full md:w-auto">
            <Button onClick={handleDecrease}>-</Button>
            <div className="mx-4 flex flex-col w-full md:w-auto">
              <span>
                Price Range (Rs): {priceRange[0]} - {priceRange[1]}
              </span>
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
                <Card className="shadow-lg p-6 pt-3 bg-white rounded-lg flex flex-col h-full">
                  <div className="justify-start">
                    <h3 className="text-xl font-bold mb-4 text-center">
                      {plan.name}
                    </h3>
                    <p className="text-gray-600 mb-2 text-center">
                      {plan.description}
                    </p>
                    <hr />
                    <p className="text-lg font-semibold mb-5 mt-2 text-center">
                      Rs. {plan.price}
                    </p>
                    <p className="text-gray-600 text-3xl text-center font-bold">
                      {plan.talkTime}
                      <sub className="text-xs text-gray-400"> minutes</sub>
                    </p>
                    <p className="text-gray-400 mb-4 text-center text-xs">
                      Talk Time to Any Network
                    </p>
                    {plan.features && (
                      <div className="m-4">
                        <p className="text-sm text-gray-700 font-semibold">
                          Features:
                        </p>
                        <ul className="list-disc list-inside text-sm text-gray-600 m-4">
                          {Object.entries(plan.features).map(([key, value]) => (
                            <li key={key}>
                              {key} : {value}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <div className="justify-self-end align-bottom">
                    <Button
                      type="primary"
                      className="w-full bg-gray-900"
                      onClick={() => handleActivate(plan)}
                    >
                      Activate
                    </Button>
                  </div>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center w-full">
              No packages found matching the criteria.
            </p>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default VoicePackages;

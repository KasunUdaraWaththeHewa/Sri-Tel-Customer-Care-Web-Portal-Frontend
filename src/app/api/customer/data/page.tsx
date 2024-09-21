"use client";

import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Select, Slider, Input, message } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import DataHero from "@/components/customer/Packages/DataHero";
import {
  getAllDataPackages,
  activateDataPackage,
} from "@/app/api/apiCalls/bestPlans";

const { Option } = Select;
const { Search } = Input;

type Plan = {
  name: string;
  price: string;
  features?: { [key: string]: string | number | boolean };
  description?: string;
  dataAmount?: number;
  durationInDays?: number;
  _id?: string;
};

const DataPackages: React.FC = () => {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filter, setFilter] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const fetchedPlans = await getAllDataPackages();
        console.log("Fetched Plans:", fetchedPlans);
        setPlans(fetchedPlans);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch plans:", error);
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleActivate = async (plan: Plan) => {
    const activationData = {
      accountID: "66eda4f8f0d0ef39b09e07d6",
      dataAmount: plan.dataAmount,
      price: plan.price,
      durationInDays: plan.durationInDays,
      packageID: plan._id,
    };

    try {
      const response = await activateDataPackage(activationData);
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
  const filteredPackages = plans.filter((pkg) => {
    const matchesDuration =
      filter === "all" || pkg.durationInDays === Number(filter);
    const matchesPrice =
      Number(pkg.price) >= priceRange[0] && Number(pkg.price) <= priceRange[1];
    const matchesSearchTerm =
      searchTerm === "" ||
      pkg.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      Object.values(pkg.features || {}).some((feature) =>
        String(feature).toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesDuration && matchesPrice && matchesSearchTerm;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <DataHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">
          Data Packages
        </h1>
        <p className="text-lg mb-8 text-center">
          Choose from our range of data packages that suit your browsing needs.
        </p>

        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          {/* Left side: Duration Filter and Search bar */}
          <div className="flex items-center space-x-4">
            {/* Duration Filter */}
            <Select
              defaultValue="all"
              style={{ width: 200 }}
              onChange={(value) => setFilter(value)}
            >
              <Option value="all">All Durations</Option>
              <Option value="7">7 Days</Option>
              <Option value="21">21 Days</Option>
              <Option value="30">30 Days</Option>
              <Option value="60">60 Days</Option>
              <Option value="90">90 Days</Option>
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

        {/* Data Package Cards */}
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
                    <div className="flex flex-row justify-center items-center">
                      <p className="text-lg font-semibold mb-5 mt-2 text-center w-1/2">
                        Rs. {plan.price}
                      </p>
                      <p className="text-lg mb-5 mt-2 text-center w-1/2">
                        Valid for{" "}
                        <span className="font-semibold">
                          {plan.durationInDays}{" "}
                        </span>{" "}
                        days
                      </p>
                    </div>
                    <p className="text-gray-600 text-3xl text-center font-bold">
                      {plan.dataAmount}
                      <sub className="text-xs text-gray-400"> MB</sub>
                    </p>
                    <p className="text-gray-400 mb-4 text-center text-xs">
                      Data Amount
                    </p>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                      {Object.values(plan.features || {}).map((feature, i) => (
                        <li key={i}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="justify-self-end align-bottom">
                    <Button
                      type="primary"
                      className="w-full bg-gray-900"
                      onClick={() => handleActivate(plan)} // Activate button functionality
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

export default DataPackages;

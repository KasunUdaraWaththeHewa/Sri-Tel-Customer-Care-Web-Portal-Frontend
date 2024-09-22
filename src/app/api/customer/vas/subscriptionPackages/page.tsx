"use client";

import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Slider, Input, message } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import SubscriptionHero from "@/components/customer/Packages/SubscriptionHero";

import {
  getAllSubscriptionPackages,
  activateSubscriptionPackage,
} from "@/app/api/apiCalls/subscriptionPackages";

const { Search } = Input;

type SubscriptionPackage = {
  name: string;
  price: number;
  features?: { [key: string]: string | number | boolean };
  description?: string;
  durationInDays?: number;
  _id?: string;
};

const SubscriptionPackages: React.FC = () => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [searchTerm, setSearchTerm] = useState("");
  const [subscriptionPackages, setSubscriptionPackages] = useState<
    SubscriptionPackage[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSubscriptionPackages = async () => {
      try {
        const packages: SubscriptionPackage[] =
          await getAllSubscriptionPackages();
        setSubscriptionPackages(packages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching subscription packages:", error);
        message.error(
          "Failed to fetch subscription packages. Please try again."
        );
        setLoading(false);
      }
    };

    fetchSubscriptionPackages();
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

  const filteredPackages = subscriptionPackages.filter((pkg) => {
    const matchesPrice =
      pkg.price >= priceRange[0] && pkg.price <= priceRange[1];
    const matchesSearchTerm =
      searchTerm === "" ||
      (pkg.description &&
        pkg.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      Object.values(pkg.features || {}).some((feature) =>
        String(feature).toLowerCase().includes(searchTerm.toLowerCase())
      );
    return matchesPrice && matchesSearchTerm;
  });

  if (loading) {
    return <p className="text-center">Loading...</p>;
  }

  const handleActivate = async (plan: SubscriptionPackage) => {
    const activationData = {
      accountID: "66eda4f8f0d0ef39b09e07d6",
      price: plan.price,
      durationInDays: plan.durationInDays,
      subscriptionId: plan._id,
    };

    try {
      const response = await activateSubscriptionPackage(activationData);
      console.log("Activation Response:", response);
      if (response.statusCode === 201) {
        message.success(`Subscription "${plan.name}" activated successfully!`);
      } else if (response.statusCode === 200) {
        message.error(`Subscription "${plan.name}" is already active!`);
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
        <SubscriptionHero /> {/* Replace with relevant hero component */}
        <h1 className="text-5xl font-bold mb-4 text-center mt-10">
          Subscription Packages
        </h1>
        <p className="text-lg mb-8 text-center">
          Select from our range of Subscription packages.
        </p>
        {/* Filter Controls */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-6 space-y-4 md:space-y-0 md:space-x-5">
          <div className="flex items-center space-x-4">
            <Search
              placeholder="Search by feature or description"
              onSearch={(value) => setSearchTerm(value)}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 200 }}
              enterButton
            />
          </div>

          {/* Price Range Filter with + and - Buttons */}
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
        {/* Subscription Package Cards */}
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
                      <p className="text-lg mb-5 mt-2 text-center w-1/2">
                        Rs. <span className="font-semibold">{plan.price}</span>{" "}
                        only
                      </p>
                      <p className="text-lg mb-5 mt-2 text-center w-1/2">
                        Valid for{" "}
                        <span className="font-semibold">
                          {plan.durationInDays}
                        </span>{" "}
                        day(s)
                      </p>
                    </div>
                    <ul className="list-disc ml-5 text-gray-600 mb-4 flex-grow">
                      {plan.features &&
                        Object.values(plan.features).map((feature, i) => (
                          <li key={i}>{feature}</li>
                        ))}
                    </ul>
                  </div>
                  <div className="justify-self-end align-bottom">
                    <Button
                      type="primary"
                      className="w-full bg-gray-900"
                      onClick={() => handleActivate(plan)}
                    >
                      Subscribe
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

export default SubscriptionPackages;

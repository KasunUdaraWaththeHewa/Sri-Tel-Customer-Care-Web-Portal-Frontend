"use client";

import React, { useState, useEffect } from "react";
import { Card, Col, Row, Button, Input, message } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import RingingToneHero from "@/components/customer/Packages/RingingToneHero";
import {
  getAllRingTonePackages,
  activateRingTonePackage,
} from "@/app/api/apiCalls/ringTonePackages"; // Import your activation function

const { Search } = Input;

type RingTone = {
  toneName: string;
  price: number;
  toneDescription?: string;
  _id?: string;
};

const RingingToneActivation: React.FC = () => {
  const [ringingTones, setRingingTones] = useState<RingTone[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchRingtoneData = async () => {
      const data = await getAllRingTonePackages();
      setRingingTones(data);
    };

    fetchRingtoneData();
  }, []);

  const filteredTones = ringingTones.filter((tone) =>
    tone.toneName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActivate = async (plan: RingTone) => {
    const toneData = {
      accountID: "66eda4f8f0d0ef39b09e07d6",
      durationInDays: 30,
      toneId: plan._id,
    };
    console.log(toneData);
    try {
      const response = await activateRingTonePackage(toneData);
      console.log(response);
      if (response.statusCode === 201) {
        message.success(`Activated ringtone: ${response.toneName}`);
      }
    } catch (error) {
      message.error("Failed to activate ringtone.");
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <RingingToneHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">
          Ringing Tones
        </h1>
        <p className="text-lg mb-8 text-center">
          Select and activate a custom ringtone to express your unique style.
        </p>

        {/* Search by Ringtone Name */}
        <div className="flex justify-center mb-6">
          <Search
            placeholder="Search by name"
            onSearch={(value) => setSearchTerm(value)}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: 200 }}
            enterButton
          />
        </div>

        <Row gutter={[16, 16]}>
          {filteredTones.length > 0 ? (
            filteredTones.map((tone, index) => (
              <Col xs={24} key={index} span={24}>
                <Card className="shadow-lg p-6 pt-3 bg-white rounded-lg">
                  <Row className="items-center justify-between">
                    <Col xs={18}>
                      <h3 className="text-xl font-bold mb-2">
                        {tone.toneName}
                      </h3>
                      <p className="text-gray-600 mb-2">
                        {tone.toneDescription}
                      </p>
                      <p className="text-gray-600 mb-2">
                        Rs. <span className="font-semibold">{tone.price}</span>{" "}
                        only
                      </p>
                    </Col>
                    <Col xs={6} className="text-right">
                      <p className="text-lg font-semibold mb-4">
                        Rs. {tone.price}{" "}
                        <sub className="text-xs text-gray-400">per month</sub>
                      </p>
                      <Button
                        type="primary"
                        className="bg-gray-900"
                        onClick={() => handleActivate(tone)}
                      >
                        Activate
                      </Button>
                    </Col>
                  </Row>
                </Card>
              </Col>
            ))
          ) : (
            <p className="text-center w-full">
              No ringing tones found matching the criteria.
            </p>
          )}
        </Row>
      </div>
      <Footer />
    </div>
  );
};

export default RingingToneActivation;

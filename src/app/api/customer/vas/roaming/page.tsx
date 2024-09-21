"use client";

import React, { useState } from "react";
import { Button, Card, Col, Modal, Row ,  message
 } from "antd";
import Navbar from "@/components/customer/Navbar";
import Footer from "@/components/Footer";
import RoamingHero from "@/components/customer/Packages/RoamingHero";
import {
  activateInternationalRoaming,
  deactivateInternationalRoaming,
} from "@/app/api/apiCalls/internationalRoaming"; 

const RoamingActivation: React.FC = () => {
  const [isRoamingActivated, setIsRoamingActivated] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState<"activate" | "deactivate">("activate");

  const handleButtonClick = (actionType: "activate" | "deactivate") => {
    setAction(actionType);
    setIsModalVisible(true);
  };

  const handleConfirm = async () => {
    try {
      if (action === "activate") {
        const data = {
          accountID: "66eda4f8f0d0ef39b09e07d6"
        };
        const response = await activateInternationalRoaming(data);
        if(response.statusCode === 201) {
          setIsRoamingActivated(true);
          message.success("Roaming activated successfully!");
        }
      } else {
        const data = {
          accountID: "66eda4f8f0d0ef39b09e07d6"
        };
        const response = await deactivateInternationalRoaming(data);
        if(response.statusCode === 201) {
          setIsRoamingActivated(false);
          message.success("Roaming deactivated successfully!");
        }
      }
      setIsModalVisible(false); 
    } catch (error) {
      console.error("Error while updating roaming status:", error);
      setIsModalVisible(false);
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="p-6">
        <RoamingHero />

        <h1 className="text-5xl font-bold mb-4 text-center mt-10">Roaming Activation</h1>
        <p className="text-lg mb-8 text-center">
          Stay connected while traveling abroad. Activate roaming services to make and receive calls, send texts, and use data internationally. 
        </p>

        <Row className="flex justify-between align-middle px-5">
          <Col span={16} className="my-auto">
            <div className="text-left mb-8">
              <h2 className="text-3xl font-semibold mb-4">Instructions for Using Roaming</h2>
              <p className="text-md mb-2">
                1. Ensure that international roaming is supported by your phone and plan.
              </p>
              <p className="text-md mb-2">
                2. Once roaming is activated, you will be able to make and receive calls and use data while abroad.
              </p>
              <p className="text-md mb-2">
                3. Roaming charges will apply based on the country you`re in and your usage.
              </p>
              <p className="text-md mb-2">
                4. To deactivate roaming, simply click the button below to avoid any additional charges while traveling.
              </p>
            </div>

            <div className="text-left">
              {isRoamingActivated ? (
                <div className="flex flex-row text-center">
                  <Button 
                    type="primary" 
                    danger 
                    onClick={() => handleButtonClick("deactivate")}
                    size="large"
                  >
                    Deactivate Roaming
                  </Button>
                  <p className="ml-8 p-2 text-red-500 font-semibold">
                    You have already activated Roaming. Click here if you want to deactivate it.
                  </p>
                </div>
              ) : (
                <Button 
                  type="primary" 
                  onClick={() => handleButtonClick("activate")}
                  size="large"
                  className="bg-gray-950 text-white"
                >
                  Activate Roaming
                </Button>
              )}
            </div>
          </Col>
          <Col span={7}>  
            <Card
              bordered={false}
              className="shadow-lg p-6 bg-blue-100 rounded-lg"
            >
              <p className="text-2xl text-gray-950 text-center font-bold mb-4">
                International Roaming
              </p>
              <hr className="text-gray-950 bg-gray-900 h-0.5" />
              {/* Small description */}
              <p className="text-gray-600 text-md my-4 text-center">
                Stay connected wherever you are in the world with our roaming services.
              </p>

              {/* Price */}
              <div className="text-center my-4">
                <p className="text-3xl font-bold text-gray-900">Rs. 500</p>
                <p className="text-sm text-gray-500">(One-time activation fee)</p>
              </div>

              {/* Features */}
              <ul className="list-disc list-inside text-gray-700 mt-6">
                <li>Make and receive calls worldwide</li>
                <li>Use mobile data while traveling</li>
                <li>Send and receive text messages</li>
                <li>Seamless coverage in over 100 countries</li>
              </ul>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Confirmation Modal */}
      <Modal
        title={action === "activate" ? "Activate Roaming" : "Deactivate Roaming"}
        open={isModalVisible}
        onOk={handleConfirm}
        onCancel={handleCancel}
        okText={action === "activate" ? "Activate" : "Deactivate"}
        cancelText="Cancel"
        centered
      >
        <p>
          Are you sure you want to {action === "activate" ? "activate" : "deactivate"} roaming services? 
          {action === "activate" ? " This will allow you to use your phone internationally." : " This will turn off international usage."}
        </p>
      </Modal>

      <Footer />
    </div>
  );
};

export default RoamingActivation;

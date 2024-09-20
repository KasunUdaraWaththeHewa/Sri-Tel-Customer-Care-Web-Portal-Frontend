
"use client";

import React, { useState, useEffect } from "react";
import { Card, Button, Input, Row, Col, Form, message } from "antd";
import api from "@/api/api"; // Import Axios instance

const CustomerDetails: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    dateOfBirth: "",
    phoneNumber: "",
    address: "",
    nic: "",
    role: "",
    status: "",
  });

  // Fetch profile details on component mount
  useEffect(() => {
    const fetchProfileDetails = async () => {
      try {
        const response = await api.post("/user/getProfileDetails", {}); // Add empty body
        if (response.data.success) {
          // Update user data with fetched profile details
          setUser({
            email: response.data.data.email,
            fullName: response.data.data.fullName,
            dateOfBirth: new Date(response.data.data.dateOfBirth).toLocaleDateString(), // Format date
            phoneNumber: response.data.data.phoneNumber,
            address: response.data.data.address,
            nic: response.data.data.nic,
            role: response.data.data.role,
            status: response.data.data.status,
          });
          setLoading(false);
        } else {
          message.error("Failed to load profile details");
        }
      } catch (error) {
        message.error("Error occurred while fetching profile details");
        console.error("Error fetching profile details: ", error);
      }
    };

    fetchProfileDetails(); // Call the function to fetch profile details
  }, []); // Empty dependency array ensures it runs only once when the component mounts

  // Function to handle saving the edited profile details
  const handleSaveClick = async () => {
    try {
      // Make an API request to save the updated profile details
      const response = await api.put("/user/editProfileDetails", {
        email: user.email,
        fullName: user.fullName,
        dateOfBirth: user.dateOfBirth,
        phoneNumber: user.phoneNumber,
        address: user.address,
        nic: user.nic,
      });

      if (response.data.success) {
        message.success("Profile updated successfully");
        setIsEditing(false); // Disable editing after saving
      } else {
        message.error("Failed to update profile");
      }
    } catch (error) {
      message.error("Error occurred while updating profile");
      console.error("Error updating profile: ", error);
    }
  };

  const handleEditClick = () => {
    setIsEditing(!isEditing); // Enable form editing
  };

  if (loading) {
    return <p>Loading...</p>; // Show loading state while profile is being fetched
  }

  return (
    <div className="flex flex-col max-h-screen bg-gray-50 p-6 pt-2">
      <h1 className="text-3xl font-bold my-5">Your Profile Details</h1>
      {/* Personal Details */}
      <Card className="mb-8 shadow-lg p-6">
        <Form layout="vertical">
          <Row gutter={16}>
            {/* Full Name */}
            <Col span={12}>
              <Form.Item label="Full Name">
                <Input
                  value={user.fullName}
                  onChange={(e) => setUser({ ...user, fullName: e.target.value })}
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>
            </Col>

            {/* Date of Birth */}
            <Col span={12}>
              <Form.Item label="Date of Birth">
                <Input
                  value={user.dateOfBirth}
                  onChange={(e) => setUser({ ...user, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Email */}
            <Col span={12}>
              <Form.Item label="Email">
                <Input value={user.email} disabled size="large" />
              </Form.Item>
            </Col>

            {/* Phone Number */}
            <Col span={12}>
              <Form.Item label="Phone Number">
                <Input value={user.phoneNumber} disabled size="large" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            {/* Address */}
            <Col span={12}>
              <Form.Item label="Address">
                <Input
                  value={user.address}
                  onChange={(e) => setUser({ ...user, address: e.target.value })}
                  disabled={!isEditing}
                  size="large"
                />
              </Form.Item>
            </Col>

            {/* NIC */}
            <Col span={12}>
              <Form.Item label="NIC">
                <Input
                  value={user.nic}
                  disabled
                  size="large"
                />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end mt-4">
            {isEditing ? (
              <Button type="primary" onClick={handleSaveClick} size="large" className="bg-gray-900 text-white">
                Save Details
              </Button>
            ) : (
              <Button type="default" onClick={handleEditClick} size="large" className="bg-gray-900 text-white">
                Edit Details
              </Button>
            )}
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CustomerDetails;






"use client"

import React, { useState } from 'react';
import { Card, Button, List } from 'antd';
import {  Input, Row, Col, Form } from 'antd';
import Navbar from '@/components/customer/Navbar';

const ProfilePage: React.FC = () => {

  const [isEditing, setIsEditing] = useState(false);
  // Dummy user data
  const [user, setUser] = useState({
    email: "user@example.com",
    fullName: "John Doe",
    dateOfBirth: "1990-05-15",
    phoneNumber: "+123456789",
    address: "123 Street, City, Country",
    nic: "123456789V",
    role: "Customer",
    status: "Active",
    billingDetails: {
        pastBills: [
          { month: "August", amount: "$50" },
          { month: "July", amount: "$45" },
          { month: "June", amount: "$40" },
        ],
        remainingBalance: "$20"
      }
  });

  const handleEditClick = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveClick = () => {
    // Logic to save the changes can be added here.
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col max-h-screen bg-gray-50 p-6 pt-2">
      <h1 className='text-3xl font-bold my-5'>Your Profile Details</h1>
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
                    size='large'
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
                    size='large'
                    />
                </Form.Item>
                </Col>
            </Row>

            <Row gutter={16}>
                {/* Email */}
                <Col span={12}>
                <Form.Item label="Email">
                    <Input value={user.email} disabled size='large' />
                </Form.Item>
                </Col>

                {/* Phone Number */}
                <Col span={12}>
                <Form.Item label="Phone Number">
                    <Input value={user.phoneNumber} disabled size='large'/>
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
                    size='large'
                    />
                </Form.Item>
                </Col>

                {/* NIC */}
                <Col span={12}>
                <Form.Item label="NIC">
                    <Input
                    value={user.nic}
                    onChange={(e) => setUser({ ...user, nic: e.target.value })}
                    disabled={!isEditing}
                    size='large'
                    />
                </Form.Item>
                </Col>
            </Row>

            <div className="flex justify-end mt-4">
                {isEditing ? (
                <Button type="primary" onClick={handleSaveClick} size='large' className='bg-gray-900 text-white'>
                    Save Details
                </Button>
                ) : (
                <Button type="default" onClick={handleEditClick} size='large' className='bg-gray-900 text-white'>
                    Edit Details
                </Button>
                )}
            </div>
            </Form>
      </Card>
    </div>
  );
};

export default ProfilePage;

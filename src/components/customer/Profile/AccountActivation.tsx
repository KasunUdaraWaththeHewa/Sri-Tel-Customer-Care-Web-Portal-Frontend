"use client";

import React, { useState } from 'react';
import { Button, Modal, Row, Col, Typography , message} from 'antd';
import {jwtDecode} from "jwt-decode"; 
import api from "@/api/api"; // Import Axios instance


const { Text } = Typography;

const ActivationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to show the deactivation modal
  const showDeactivateModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle deactivation confirmation
  const handleOk = async () => {
    try {
      // Get the token from local storage
      const token = localStorage.getItem('token');
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }

      // Decode the token to get the user ID
      const decodedToken: any = jwtDecode(token);
      const userId = decodedToken._id;

      // Make API request to deactivate the account
      const response = await api.put(`/user/deactivateAccount/${userId}`, {
        user_id: userId, // Include user_id in the body
      });
      
      if (response.data.success) {
        message.success("Account deactivated successfully");
        // Optionally: Update UI or redirect the user
      } else {
        message.error("Failed to deactivate account");
      }
    } catch (error) {
      message.error("Error occurred while deactivating account");
      console.error("Error:", error);
    }

    setIsModalVisible(false);
  };

  // Function to cancel the deactivation
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h1 className='text-3xl font-bold my-5'>Account Deactivation</h1>
      <Row justify="space-between" align="middle" className='bg-white shadow-lg p-6 rounded-lg'>
        <Col>
          <div className="text-gray-600 mt-2">
            <ul className="list-disc ml-5">
              <li>Deactivating your account will disable all account activity.</li>
              <li>Once deactivated, you won’t be able to log in or use any services.</li>
              <li>You can reactivate your account by contacting customer support.</li>
            </ul>
          </div>
        </Col>
        <Col>
          <Button type="primary" danger onClick={showDeactivateModal} size='large'>
            Deactivate Account
          </Button>
        </Col>
      </Row>

      <Modal
        title={
            <div className='text-xl font-bold'>Confirm Deactivation</div>
        }
        open={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Yes, Deactivate"
        cancelText="Cancel"
        centered
        footer={[
            <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="submit" type="primary" danger onClick={handleOk}>
              Yes, Deactivate
            </Button>,
          ]}
      >
        <p className='font-medium text-md'>Are you sure you want to deactivate your account? This action cannot be undone.</p>
      </Modal>
    </div>
  );
};

export default ActivationBar;

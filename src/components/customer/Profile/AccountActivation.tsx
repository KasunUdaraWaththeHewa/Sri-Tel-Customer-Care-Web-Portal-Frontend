"use client";

import React, { useState } from 'react';
import { Button, Modal, Row, Col, Typography } from 'antd';

const { Text } = Typography;

const ActivationBar: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showDeactivateModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Add logic to deactivate the account here
    setIsModalVisible(false);
  };

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

"use client";

import React, { useState } from 'react';
import { Card, Button, Input, Select, Row, Col, Typography, Form } from 'antd';

const { Text } = Typography;
const { Option } = Select;

interface Account {
  phoneNumber: string;
  email: string;
  accountType: string;
  status: string;
}

const ManageConnections: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([
    { phoneNumber: "0761234567", email: "john.doe@example.com", accountType: "Prepaid", status: "Active" },
    { phoneNumber: "0772345678", email: "jane.doe@example.com", accountType: "Postpaid", status: "Inactive" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ phoneNumber: '', email: '', accountType: 'Prepaid', status:'Active' });

  const handleAddNewClick = () => {
    setShowForm(!showForm);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewAccount(prev => ({ ...prev, [name]: value }));
  };

  const handleAccountTypeChange = (value: string) => {
    setNewAccount(prev => ({ ...prev, accountType: value }));
  };

  const handleFormSubmit = () => {
    // Add logic to submit form and create a new account
    setAccounts([...accounts, newAccount]);
    setNewAccount({ phoneNumber: '', email: '', accountType: 'Prepaid', status: 'Active' });
    setShowForm(false);
  };

    

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Your Connections</h1>
      
      {accounts.map((account, index) => (
        <Card className="mb-4" key={index}>
          <Row justify="space-between" align="middle">
            <Col span={20}>
              <Text className="text-lg font-bold">Phone Number: {account.phoneNumber}</Text>
              <div className="text-gray-600">Email Address: {account.email}</div>
              <div className="text-gray-600">Account Type: {account.accountType}</div>
            </Col>
            <Col span={3} className='flex flex-row'>
                <div className={`w-3 h-3 rounded-full ${account.status == 'Active' ? 'bg-green-600' : 'bg-red-600'} mr-2 my-auto`} />
                <div className= {`${account.status == 'Active' ? 'text-green-600' : 'text-red-600'} font-semibold`}>{account.status}</div>
            </Col>
          </Row>
        </Card>
      ))}

      {/* Add New Account Button */}
      <Card className="mb-4">
        <Button type="primary" onClick={handleAddNewClick} size='large' className='bg-gray-900 text-white font-bold'>
          {showForm ? "Cancel" : "Add New Connection"}
        </Button>
      </Card>

      {/* New Account Form */}
      {showForm && (
        <Card className="p-4 mt-4">
          <Form layout="vertical" onFinish={handleFormSubmit}>
            <Form.Item label="Email Address" required>
              <Input
                name="email"
                value={newAccount.email}
                onChange={handleInputChange}
                placeholder="Enter email address"
                size='large'
              />
            </Form.Item>
            <Form.Item label="New Phone Number" required>
              <Input
                name="phoneNumber"
                value={newAccount.phoneNumber}
                onChange={handleInputChange}
                placeholder="Enter new phone number"
                size='large'
              />
            </Form.Item>
            <Form.Item label="Account Type" required>
              <Select
                value={newAccount.accountType}
                onChange={handleAccountTypeChange}
                size='large'
              >
                <Option value="Prepaid" size='large'>Prepaid</Option>
                <Option value="Postpaid" size='large'>Postpaid</Option>
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit" size='large' className='bg-green-900'>
              Submit
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
};

export default ManageConnections;

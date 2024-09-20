"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Input, Select, Row, Col, Typography, Form, message } from 'antd';
import api from '@/api/api'; // Axios instance for API calls
import jwtDecode from 'jwt-decode'; // To decode JWT token

const { Text } = Typography;
const { Option } = Select;

interface Account {
  number: string;
  email: string;
  accountType: string;
  status: string;
  _id: string;
}

const ManageConnections: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [newAccount, setNewAccount] = useState({ number: '', email: '', accountType: '', status: 'Active' });

  // Fetch all accounts when the component mounts
  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          message.error("Token not found. Please log in again.");
          return;
        }

        // Send a GET request to fetch all accounts for the user
        const response = await api.get(`/customer/`, {
          headers: {
            Authorization: token,
          },
        });

        if (response.data.success) {
          setAccounts(response.data.data);
        } else {
          message.error(response.data.message || 'Failed to fetch accounts');
        }
      } catch (error) {
        console.error('Error fetching accounts:', error);
        message.error('An error occurred while fetching accounts');
      }
    };

    fetchAccounts();
  }, []);

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

  const handleFormSubmit = async () => {
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

      // Prepare account data with the userId
      const accountData = {
        ...newAccount,
        userID: userId,
      };

      // Send a POST request to add the new account
      const response = await api.post('/customer/', accountData, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        message.success('Account added successfully!');
        setAccounts([...accounts, response.data.data]);
        setNewAccount({ number: '', email: '', accountType: '', status: 'Active' });
        setShowForm(false);
      } else {
        message.error(response.data.message || 'Failed to add account');
      }
    } catch (error) {
      console.error('Error adding account:', error);
      message.error('An error occurred while adding the account');
    }
  };

  // Function to handle account activation
  const handleActivate = async (accountID: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }

      const response = await api.post('/customer/activate', { accountID }, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        message.success('Account activated successfully!');
        // Update the account status locally after activation
        setAccounts(accounts.map(account => account._id === accountID ? { ...account, status: 'Active' } : account));
      } else {
        message.error(response.data.message || 'Failed to activate account');
      }
    } catch (error) {
      console.error('Error activating account:', error);
      message.error('An error occurred while activating the account');
    }
  };

  // Function to handle account deactivation
  const handleDeactivate = async (accountID: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        message.error("Token not found. Please log in again.");
        return;
      }

      const response = await api.post('/customer/deactivate', { accountID }, {
        headers: {
          Authorization: token,
        },
      });

      if (response.data.success) {
        message.success('Account deactivated successfully!');
        // Update the account status locally after deactivation
        setAccounts(accounts.map(account => account._id === accountID ? { ...account, status: 'Inactive' } : account));
      } else {
        message.error(response.data.message || 'Failed to deactivate account');
      }
    } catch (error) {
      console.error('Error deactivating account:', error);
      message.error('An error occurred while deactivating the account');
    }
  };

  return (
    <div className="bg-gray-50 p-6 rounded-lg">
      <h1 className="text-3xl font-bold mb-4">Your Connections</h1>

      {/* Display All Accounts */}
      {accounts.map((account, index) => (
        <Card className="mb-4" key={index}>
          <Row justify="space-between" align="middle">
            <Col span={20}>
              <Text className="text-lg font-bold">Phone Number: {account.number}</Text>
              <div className="text-gray-600">Email Address: {account.email}</div>
              <div className="text-gray-600">Account Type: {account.accountType}</div>
            </Col>
            <Col span={3} className='flex flex-col'>
              <div className='flex flex-row'>
                <div className={`w-3 h-3 rounded-full ${account.status == 'Active' ? 'bg-green-600' : 'bg-red-600'} mr-2 my-auto`} />
                <div className= {`${account.status == 'Active' ? 'text-green-600' : 'text-red-600'} font-semibold`}>{account.status}</div>
              </div>
              <div>
                <Button
                  type="primary"
                  className={`${account.status === 'Active' ? 'bg-red-500' : 'bg-green-500'} text-white mt-2`}
                  size='small'
                  onClick={() => account.status === 'Active' ? handleDeactivate(account._id) : handleActivate(account._id)}
                >
                  {account.status === 'Active' ? 'Deactivate' : 'Activate'}
                </Button>
              </div>
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
                name="number"
                value={newAccount.number}
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
                <Option value="Prepaid">Prepaid</Option>
                <Option value="Postpaid">Postpaid</Option>
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

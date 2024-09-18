"use client";

import React, { useState } from 'react';
import { Col, Row, Dropdown, Menu } from 'antd';
import { PhoneFilled, DownOutlined, PlusOutlined } from '@ant-design/icons';

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState({
    email: "user@example.com",
    fullName: "John Doe",
    dateOfBirth: "1990-05-15",
    phoneNumber: "+123456789",
    address: "123 Street, City, Country",
    nic: "123456789V",
    role: "Customer",
    status: "Active",
    otherAccounts: {
      accountNumbers: [
        { number: "0760987890" },
        { number: "0760987890" },
        { number: "0760987890" },
      ],
    },
    billingDetails: {
      pastBills: [
        { month: "August", amount: "$50" },
        { month: "July", amount: "$45" },
        { month: "June", amount: "$40" },
      ],
      remainingBalance: "$20"
    }
  });

  const dotColor = user.status === 'Active' ? 'bg-green-500' : 'bg-red-500';

  const menu = (
    <Menu>
      {user.otherAccounts.accountNumbers.map((account, index) => (
        <Menu.Item key={index}>
          {account.number}
        </Menu.Item>
      ))}
      <Menu.Item key="add" icon={<PlusOutlined />}>
        Add New Connection
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="flex flex-col bg-gray-50 p-6 m-6 border shadow-lg rounded-xl">
      <Row>
        <Col span={2}>
          <div className='rounded-full bg-gray-900 w-16 h-16 flex justify-center items-center'>
            <PhoneFilled className='text-white text-2xl' />
          </div>
        </Col>
        <Col span={4} className='my-2'>
          <Row className='text-gray-900 text-xl font-bold'>
            {user.phoneNumber}
          </Row>
          <Row className='text-gray-900 text-xl font-bold flex items-center'>
            <div className={`w-3 h-3 rounded-full ${dotColor} mr-2`} />
            <div>{user.status}</div>
          </Row>
        </Col>
        <Col span={10} className='flex items-center justify-center'>
          <div className='text-gray-600 text-sm font-medium my-auto'>Connected</div>
        </Col>
        <Col span={8} className='flex items-center justify-end'>
          <Dropdown overlay={menu} trigger={['click']}>
            <div className='text-gray-900 text-lg cursor-pointer flex items-center font-bold'>
              <span className='mr-2'>Manage Connections</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;

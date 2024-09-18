"use client";

import React, { useState } from 'react';
import { Card, Button, List } from 'antd';
import { Row, Col } from 'antd';
import {VerticalAlignBottomOutlined, ArrowRightOutlined } from '@ant-design/icons';

const BillingDetails: React.FC = () => {
  const [showAllBills, setShowAllBills] = useState(false);

  // Get the current month in "MMMM" format (e.g., "September")
  const currentMonth = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date());

  const user = {
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
        { month: "September", amount: "Rs.5487.21", pdfLink: "#september", calculatedDate: "2024-09-15" },
        { month: "August", amount: "Rs.5487.21", pdfLink: "#august", calculatedDate: "2024-08-15" },
        { month: "July", amount: "Rs.4857.23", pdfLink: "#july", calculatedDate: "2024-07-15" },
        { month: "June", amount: "Rs.4965.15", pdfLink: "#june", calculatedDate: "2024-06-15" },
        { month: "May", amount: "Rs.5584.69", pdfLink: "#may", calculatedDate: "2024-05-15" },
        { month: "April", amount: "Rs.4568.01", pdfLink: "#april", calculatedDate: "2024-04-15" },
      ],
      remainingBalance: "Rs.2000.00"
    }
  };

  const handleSeeMoreClick = () => {
    setShowAllBills(!showAllBills);
  };

  // Find the current month bill
  const currentMonthBill = user.billingDetails.pastBills.find(bill => bill.month === currentMonth);

  return (
    <div className="flex flex-col max-h-screen bg-gray-50 p-6 pt-2">
      <h1 className='text-3xl font-bold my-5'>Your Billing Details</h1>
      
      <Card className="shadow-lg p-6 mt-4">
        <div className="flex justify-between items-center mb-10">
          <h2 className="text-3xl font-bold">Bill History</h2>
          <div className="flex items-center">
            <p className="text-lg font-semibold mr-4">Remaining Balance: {user.billingDetails.remainingBalance}</p>
            <Button type="primary" size='large' className='bg-red-500 text-white font-bold'>Pay Now <ArrowRightOutlined /> </Button>
          </div>
        </div>

        {/* Current Month Bill */}
        {currentMonthBill && (
          <div className="bg-yellow-100 p-4 mb-10 rounded-lg flex flex-row">
            <Col span={20}>
              <h3 className="text-lg font-bold">Current Month Bill ({currentMonthBill.month})</h3>
              <p className="text-3xl font-extrabold">{currentMonthBill.amount}</p>
              <p className="text-gray-500">Bill Calculated Date: {currentMonthBill.calculatedDate}</p>
            </Col>
            <Col span={3} className='flex my-auto'>
              <Button
                type="link"
                href={currentMonthBill.pdfLink}
                target="_blank"
                download
                className='font-bold'
              >
                Download PDF <VerticalAlignBottomOutlined />
              </Button>
            </Col>


          </div>
        )}

        {!currentMonthBill && (
          <div className="bg-yellow-50 p-4 mb-6 rounded-lg text-lg font-bold text-red-500">
            This month bill will be updated soon. 
          </div>
        )}

        {/* Past Bills */}
        <div className="mb-4">
          <h3 className="text-xl font-bold">Past Bill Amounts</h3>
          <List
            dataSource={showAllBills ? user.billingDetails.pastBills.slice(1) : user.billingDetails.pastBills.slice(1, 4)}
            renderItem={(bill) => (
              <List.Item
                actions={[
                  <Button
                    type="link"
                    href={bill.pdfLink}
                    target="_blank"
                    download
                  >
                    Download PDF <VerticalAlignBottomOutlined />
                  </Button>
                ]}
              >
                <div>
                  <span className='font-semibold'>{bill.month}: {bill.amount}</span>
                  <p className="text-gray-400">Bill Calculated Date: {bill.calculatedDate}</p>
                </div>
              </List.Item>
            )}
          />
          <Button
            type="link"
            onClick={handleSeeMoreClick}
            className="mt-2"
          >
            {showAllBills ? "See Less" : "See More"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BillingDetails;

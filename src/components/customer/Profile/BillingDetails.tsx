"use client";

import React, { useState } from 'react';
import { Card, Button, List } from 'antd';
import { Row, Col } from 'antd';

const BillingDetails: React.FC = () => {
  const [showAllBills, setShowAllBills] = useState(false);

  // Get the current month in "MMMM" format (e.g., "August")
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
        { month: "September", amount: "Rs.5487.21", pdfLink: "#september" },
        { month: "August", amount: "Rs.5487.21", pdfLink: "#august" },
        { month: "July", amount: "Rs.4857.23", pdfLink: "#july" },
        { month: "June", amount: "Rs.4965.15", pdfLink: "#june" },
        { month: "May", amount: "Rs.5584.69", pdfLink: "#may" },
        { month: "April", amount: "Rs.4568.01", pdfLink: "#april" },
      ],
      remainingBalance: "$20"
    }
  };

  const handleSeeMoreClick = () => {
    setShowAllBills(!showAllBills);
  };

  return (
    <div className="flex flex-col max-h-screen bg-gray-50 p-6 pt-2">
      <h1 className='text-3xl font-bold my-5'>Your Billing Details</h1>
      
      <Card className="shadow-lg p-6 mt-4">
        <h2 className="text-2xl font-bold mb-4">Billing Details</h2>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Past Bill Amounts</h3>
          <List
            dataSource={showAllBills ? user.billingDetails.pastBills : user.billingDetails.pastBills.slice(0, 3)}
            renderItem={(bill) => (
              <List.Item
                className={bill.month === currentMonth ? "bg-yellow-100" : ""}
                actions={[
                  <Button
                    type="link"
                    href={bill.pdfLink}
                    target="_blank"
                    download
                  >
                    Download PDF
                  </Button>
                ]}
              >
                {bill.month}: {bill.amount}
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
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg font-semibold">Remaining Balance: {user.billingDetails.remainingBalance}</p>
          <Button type="primary" size='large' className='bg-gray-900 text-white'>Pay Now</Button>
        </div>
      </Card>
    </div>
  );
};

export default BillingDetails;

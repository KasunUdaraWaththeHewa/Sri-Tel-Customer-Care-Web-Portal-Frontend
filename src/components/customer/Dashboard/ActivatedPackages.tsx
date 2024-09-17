"use client";

import { Card, Progress } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const ActivatedPackages = () => {
  const packages = [
    { name: 'Voice Package', balance: '100 mins', percentage: 75, expiry: '2024-09-30', price: 'RS.10' },
    { name: 'Data Package', balance: '5 GB', percentage: 60, expiry: '2024-09-25', price: 'Rs.15' },
    { name: 'AddOn - Roaming', balance: 'Enabled', percentage: 100, expiry: '2024-12-15', price: 'Rs.5' },
  ];

  return (
    <div className="mt-7">
      {/* Title and description */}
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-2">Your Activated Packages</h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Here you can find details of your active packages, including the remaining balance and expiry dates.
      </p>

      {/* Grid for cards */}
      <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 gap-y-5 gap-x-10">
      {packages.map((pkg, index) => (
          <Card
            key={index}
            className="bg-white shadow-lg rounded-lg p-2"
            style={{ height: 'auto'}}
          >
            {/* Package title */}
            <h3 className="text-xl text-center font-bold text-black mb-5">{pkg.name}</h3>

            {/* Circular Progress Bar */}
            <div className="flex justify-center mb-5">
              <Progress
                type="circle"
                percent={pkg.percentage}
                format={percent => `${percent}%`}
                width={70}
              />
            </div>

            <div className='flex flex-row'>

            </div>
            {/* Price and Balance */}
            <div className="text-center flex flex-row justify-between mb-5">
              <p className="text-sm font-semibold text-gray-700 justify-start text-left">Balance: {pkg.balance}</p>
              <p className="text-sm text-gray-500 justify-end text-right">Price: {pkg.price}</p>
            </div>

            {/* Expiry and View Details */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-2">Expiry: {pkg.expiry}</p>
              <a href={`/packages/${index}`} className="text-blue-500 underline text-sm font-medium">
                View Details
              </a>
            </div>
          </Card>
        ))}
        <Card
          className="bg-blue-50 shadow-lg rounded-lg p-4 flex justify-center items-center cursor-pointer border-2 border-gray-900 hover:bg-blue-100"
          style={{ height: 'auto' }}
          onClick={() => window.location.href = '/add-package'}
        >
          <div className="flex flex-col justify-center items-center">
            <PlusOutlined className="text-3xl text-gray-900 mb-2" />
            <span className="text-lg font-semibold text-gray-900">Add More</span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivatedPackages;

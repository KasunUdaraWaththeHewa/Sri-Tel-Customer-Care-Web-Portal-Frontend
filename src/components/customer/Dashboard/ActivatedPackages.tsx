"use client";

import { useEffect, useState } from "react";
import { Card, Progress } from "antd";
import { PlusOutlined, RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getAllActiveDataPackages,
  getAllActiveVoicePackages,
  getAllActiveDataTopUps,
  isActiveRoaming,
  getAllActiveTones,
  getAllActiveSubscriptions,
} from "@/app/api/apiCalls/activatedPackages";

interface Package {
  name: string;
  balance: string;
  percentage: number;
  expiry: string;
  price: string;
}

const ActivatedPackages = () => {
  const [packages, setPackages] = useState<Package[]>([]);
  // const [accountID, setAccountID] = useState<string>("");
  const accountID = "66eda4f8f0d0ef39b09e07d6";

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const activeDataPackages = await getAllActiveDataPackages(accountID);
        const activeVoicePackages = await getAllActiveVoicePackages(accountID);
        const activeDataTopUps = await getAllActiveDataTopUps(accountID);
        const activeRoaming = await isActiveRoaming(accountID);
        const activeTones = await getAllActiveTones(accountID);
        const activeSubscriptions = await getAllActiveSubscriptions(accountID);

        const allPackages = [
          ...activeDataPackages,
          ...activeVoicePackages,
          ...activeDataTopUps,
          ...(activeRoaming
            ? [
                {
                  name: "Roaming",
                  balance: "Enabled",
                  percentage: 100,
                  expiry: "2024-12-15",
                  price: "Rs.5",
                },
              ]
            : []),
          ...activeTones,
          ...activeSubscriptions,
        ];

        setPackages(allPackages);
      } catch (error) {
        console.error("Failed to fetch packages:", error);
      }
    };

    fetchPackages();
  }, []);

  const calculateRemainingDays = (expiryDate: string) => {
    const expiry = dayjs(expiryDate);
    const today = dayjs();
    return expiry.diff(today, "day");
  };

  return (
    <div className="my-10">
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-2">
        Your Activated Packages
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Here you can find details of your active packages, including the
        remaining balance and expiry dates.
      </p>

      <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 gap-y-5 gap-x-10">
        {packages.map((pkg, index) => {
          const remainingDays = calculateRemainingDays(pkg.expiry);
          return (
            <Card
              key={index}
              className="bg-white shadow-lg rounded-lg p-2"
              style={{ height: "auto" }}
            >
              {/* Package title */}
              <h3 className="text-xl text-center font-bold text-black mb-5">
                {pkg.name}
              </h3>

              {/* Circular Progress Bar */}
              <div className="flex justify-center mb-5">
                <Progress
                  type="circle"
                  percent={pkg.percentage}
                  format={(percent) => `${percent}%`}
                  width={70}
                />
              </div>

              <div className="flex flex-row"></div>
              {/* Price and Balance */}
              <div className="text-center flex flex-row justify-between mb-5">
                <p className="text-sm font-semibold text-gray-700 justify-start text-left">
                  Balance: {pkg.balance}
                </p>
                <p className="text-sm text-gray-500 justify-end text-right">
                  Price: {pkg.price}
                </p>
              </div>

              {/* Expiry and View Details */}
              <div className="text-center flex flex-row justify-between">
                <p className="text-sm text-gray-500 mb-5 font-medium justify-start">
                  Expiry: {pkg.expiry}
                </p>
                <p className="text-sm text-red-400 mb-5 font-medium justify-end">
                  {remainingDays} days remaining
                </p>
              </div>

              <div className="flex flex-row justify-end mt-5">
                <a
                  href={`/packages/${index}`}
                  className="text-blue-500 text-xs font-medium align-middle justify-end hover:underline"
                >
                  View Details <RightOutlined />
                </a>
              </div>
            </Card>
          );
        })}
        <Card
          className="bg-blue-50 shadow-lg rounded-lg p-4 flex justify-center items-center cursor-pointer border-2 border-gray-900 hover:bg-blue-100"
          style={{ height: "auto" }}
          onClick={() => (window.location.href = "/add-package")}
        >
          <div className="flex flex-col justify-center items-center">
            <PlusOutlined className="text-3xl text-gray-900 mb-2" />
            <span className="text-lg font-semibold text-gray-900">
              Add More
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default ActivatedPackages;

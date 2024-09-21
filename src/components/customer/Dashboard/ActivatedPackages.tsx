"use client";

import { useEffect, useState } from "react";
import { Card, Progress } from "antd";
import { RightOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import {
  getAllActiveDataPackages,
  getAllActiveVoicePackages,
  getAllActiveDataTopUps,
  getAllActiveTones,
  getAllActiveSubscriptions,
} from "@/app/api/apiCalls/activatedPackages";

interface Package {
  packageName: string;
  balance?: string; // Specific to data and voice packages
  percentage?: number; // For progress bar
  expiryDate: string;
  price: string;
  dataAmount?: number; // Data packages and top-ups
  voiceMinutes?: number; // Voice packages
  toneId?: string; // For Ring Tone packages
  toneDescription?: string; // For Ring Tone packages
  description?: string; // For subscriptions
  features?: { [key: string]: string | number | boolean };
}

const ActivatedPackages = () => {
  const [dataPackages, setDataPackages] = useState<Package[]>([]);
  const [voicePackages, setVoicePackages] = useState<Package[]>([]);
  const [dataTopUps, setDataTopUps] = useState<Package[]>([]);
  const [tones, setTones] = useState<Package[]>([]);
  const [subscriptions, setSubscriptions] = useState<Package[]>([]);

  const accountID = "66eda4f8f0d0ef39b09e07d6";

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const activeDataPackages = await getAllActiveDataPackages(accountID);
        const activeVoicePackages = await getAllActiveVoicePackages(accountID);
        const activeDataTopUps = await getAllActiveDataTopUps(accountID);
        const activeTones = await getAllActiveTones(accountID);
        const activeSubscriptions = await getAllActiveSubscriptions(accountID);

        setDataPackages(activeDataPackages);
        setVoicePackages(activeVoicePackages);
        setDataTopUps(activeDataTopUps);
        setTones(activeTones);
        setSubscriptions(activeSubscriptions);
        console.log("Data Packages:", activeDataPackages);
        console.log("Voice Packages:", activeVoicePackages);
        console.log("Data Top-Ups:", activeDataTopUps);
        console.log("Tones:", activeTones);
        console.log("Subscriptions:", activeSubscriptions);
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

  const formatExpiryDate = (expiryDate: string) => {
    return dayjs(expiryDate).format("YYYY-MM-DD");
  };

  const generateRandomPercentage = () => {
    return Math.floor(Math.random() * 101); // Random number between 0 and 100
  };

  const renderPackages = (packages: Package[], title: string) => (
    <div className="mb-8">
      <h3 className="text-3xl font-semibold text-gray-900 text-center mb-4">
        {title}
      </h3>
      <div className="flex justify-center flex-col">
        <div className="grid grid-flow-row lg:grid-cols-4 md:grid-cols-3 gap-y-5 gap-x-10 justify-center">
          {packages.map((pkg, index) => {
            const remainingDays = calculateRemainingDays(pkg.expiryDate);
            return (
              <Card
                key={index}
                className="bg-white shadow-lg rounded-lg p-2"
                style={{ height: "auto" }}
              >
                {/* Package title */}
                <h3 className="text-xl text-center font-bold text-black mb-5">
                  {pkg.packageName}
                </h3>

                {/* Circular Progress Bar */}
                <div className="flex justify-center mb-5">
                  <Progress
                    type="circle"
                    percent={generateRandomPercentage()} // Assuming percentage for data/voice balance
                    format={(percent) => `${percent}%`}
                    width={70}
                  />
                </div>

                {/* Price and specific fields */}
                <div className="text-center flex flex-row justify-between mb-5">
                  {pkg.dataAmount && (
                    <p className="text-sm text-gray-700 text-left">
                      <span className="text-sm font-semibold text-gray-700">
                        Data:
                      </span>{" "}
                      {pkg.dataAmount} MB
                    </p>
                  )}
                  {pkg.voiceMinutes && (
                    <p className="text-sm text-gray-700 text-left">
                      <span className="text-sm font-semibold text-gray-700">
                        Minutes:
                      </span>{" "}
                      {pkg.voiceMinutes}
                    </p>
                  )}
                  {pkg.balance && (
                    <p className="text-sm text-gray-700 text-left">
                      <span className="text-sm font-semibold text-gray-700">
                        Balance:
                      </span>{" "}
                      {pkg.balance}
                    </p>
                  )}
                  {pkg.toneId && (
                    <p className="text-sm text-gray-700 text-left">
                      <span className="text-sm font-semibold text-gray-700">
                        Tone Name:
                      </span>{" "}
                      {pkg.packageName}
                    </p>
                  )}
                  <p className="text-sm text-gray-700 text-right">
                    <span className="text-sm font-semibold text-gray-700">
                      Price:
                    </span>{" "}
                    {pkg.price}
                  </p>
                </div>

                {/* Expiry and Remaining Days */}
                <div className="text-center flex flex-row justify-between">
                  <p className="text-sm text-gray-700 mb-2 mb-5">
                    <span className="text-sm font-semibold text-gray-700">
                      Expiry:
                    </span>{" "}
                    {formatExpiryDate(pkg.expiryDate)}
                  </p>
                  <p className="text-sm text-red-400 mb-5 font-medium">
                    {remainingDays} days remaining
                  </p>
                </div>

                {/* Description */}
                {pkg.description && (
                  <p className="text-sm text-gray-700 mb-2">
                    <span className="text-sm font-semibold text-gray-700">
                      Description:
                    </span>{" "}
                    {pkg.description}
                  </p>
                )}

                {/* Tone Description */}
                {pkg.toneDescription && (
                  <p className="text-sm text-gray-700 mb-2">
                    Tone Description: {pkg.toneDescription}
                  </p>
                )}

                {/* Features */}
                {pkg.features && (
                  <div className="mb-2">
                    <p className="text-sm text-gray-700 font-semibold">
                      Features:
                    </p>
                    <ul className="list-disc list-inside text-sm text-gray-600">
                      {Object.entries(pkg.features).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* View Details Link */}
                <div className="flex flex-row justify-end mt-5">
                  <a
                    href={`/packages/${index}`}
                    className="text-blue-500 text-xs font-medium hover:underline"
                  >
                    View Details <RightOutlined />
                  </a>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );

  return (
    <div className="my-10">
      <h2 className="text-5xl font-bold text-center text-gray-900 mb-2">
        Your Activated Packages
      </h2>
      <p className="text-lg text-gray-600 mb-6 text-center">
        Here you can find details of your active packages, including the
        remaining balance and expiry dates.
      </p>

      {renderPackages(dataPackages, "Data Packages")}
      {renderPackages(voicePackages, "Voice Packages")}
      {renderPackages(dataTopUps, "Data Top-Ups")}
      {renderPackages(tones, "Ring-in Tones")}
      {renderPackages(subscriptions, "Subscriptions")}
    </div>
  );
};

export default ActivatedPackages;

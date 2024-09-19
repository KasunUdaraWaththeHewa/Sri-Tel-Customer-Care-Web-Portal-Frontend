"use client";

import React, { useState } from "react";
import Navbar from "@/components/customer/Navbar";
import CustomerDetails from "@/components/customer/Profile/CustomerDetails";
import Sidebar from "@/components/customer/Profile/SideBar";
import BillingDetails from "@/components/customer/Profile/BillingDetails";
import ActiveAccountBar from "@/components/customer/Profile/ActiveAccountBar";
import ActivationBar from "@/components/customer/Profile/AccountActivation";
import ManageConnections from "@/components/customer/Profile/ManageConnections";
import FAQ from "@/components/customer/Profile/FaqSection";
import FloatingChatButton from "@/components/FloatingChatButton";

const ProfilePage: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState("profile-details");

  const [user, setUser] = useState({
    email: "user@example.com",
    fullName: "John Doe",
    dateOfBirth: "1990-05-15",
    phoneNumber: "0760578952",
    address: "123 Street, City, Country",
    nic: "123456789V",
    role: "Customer",
    status: "Active",
    billingDetails: {
      pastBills: [
        { month: "August", amount: "$50" },
        { month: "July", amount: "$45" },
        { month: "June", amount: "$40" },
      ],
      remainingBalance: "$20",
    },
  });

  const handleMenuClick = (key: string) => {
    setActiveMenu(key);
    // Implement your navigation logic here
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      <div className="flex flex-1">
        <Sidebar activeMenu={activeMenu} onMenuClick={handleMenuClick} />
        <div className="flex-1 p-6">
          {/* Adjust the top margin (mt-16) to account for the Navbar height */}
          <ActiveAccountBar />
          {activeMenu === "profile-details" && (
            <div>
              <CustomerDetails /> <ActivationBar />
            </div>
          )}
          {activeMenu === "billing-details" && <BillingDetails />}
          {activeMenu === "manage-connections" && <ManageConnections />}
          {activeMenu === "faq" && <FAQ />}
        </div>
      </div>
      <FloatingChatButton />
    </div>
  );
};

export default ProfilePage;

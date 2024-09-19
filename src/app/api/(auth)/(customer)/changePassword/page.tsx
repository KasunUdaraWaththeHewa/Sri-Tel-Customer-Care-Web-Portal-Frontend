"use client";

import { Form, Input, Button } from 'antd';
import Image from 'next/image';
import logoImage from '@/assets/images/logoBlack.png';
import changePasswordImage from '@/assets/images/changePasswordImage.jpg'; // Replace with your desired image
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

interface ChangePasswordFormValues {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

const ChangePassword = () => {
  const onFinish = (values: ChangePasswordFormValues) => {
    console.log('Received values of form: ', values);
    // Perform change password logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center my-10">
        <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full flex">
          {/* Left side with background image */}
          <div
            className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center rounded-l-xl"
            style={{
              backgroundImage: `url(${changePasswordImage.src})`, // Set the image as background
            }}
          >
            {/* You can add overlay text or other content here if needed */}
          </div>

          {/* Right side form */}
          <div className="w-full md:w-1/2 p-10 text-center">
            <div className="mb-5">
              <Image src={logoImage} alt="Logo" width={80} height={80} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Change Password</h2>
            <p className="text-gray-600 mb-5">Update your password securely</p>

            <Form
              name="changePassword"
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  className="col-span-2"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>

                {/* Current Password */}
                <Form.Item
                  label="Current Password"
                  name="currentPassword"
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter your current password!' }]}
                >
                  <Input.Password placeholder="Current Password" size="large" />
                </Form.Item>

                {/* New Password */}
                <Form.Item
                  label="New Password"
                  name="newPassword"
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter your new password!' }]}
                >
                  <Input.Password placeholder="New Password" size="large" />
                </Form.Item>

                {/* Confirm New Password */}
                <Form.Item
                  label="Confirm New Password"
                  name="confirmNewPassword"
                  className="col-span-2"
                  rules={[
                    { required: true, message: 'Please confirm your new password!' },
                    // Add validation to check if new password and confirm password match
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue('newPassword') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('The two passwords do not match!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="Confirm New Password" size="large" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button className="w-full bg-gray-900 border-none text-white" size="large" htmlType="submit">
                  Change Password
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ChangePassword;

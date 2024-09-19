"use client";

import { Form, Input, Button, DatePicker } from 'antd';
import Image from 'next/image';
import logoImage from '@/assets/images/logoBlack.png';
import registerImage from '@/assets/images/registerImage2.png'; // Replace with your desired image
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/Footer';
import React from 'react';

interface RegistrationFormValues {
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string; // If using a DatePicker, you might want to use moment.js or another date library
  nic: string;
  address: string;
  password: string;
}


const Registration = () => {
  const onFinish = (values: RegistrationFormValues) => {
    console.log('Received values of form: ', values);
    // Perform registration logic here
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center my-10">
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex">
          {/* Left side image */}
          <div
            className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center rounded-l-xl"
            style={{
              backgroundImage: `url(${registerImage.src})`, 
            }}
          >
            
          </div>
          {/* <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-gray-100 rounded-l-xl">
            <Image src={registerImage} alt="Register Image" width={1000} height={1000} />
          </div> */}

          {/* Right side form */}
          <div className="w-full md:w-1/2 p-10 text-center">
            <div className="mb-5">
              <Image src={logoImage} alt="Logo" width={80} height={80} className="mx-auto" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Create an Account</h2>
            <p className="text-gray-600 mb-5">Join us and explore!</p>

            <Form
              name="registration"
              onFinish={onFinish}
              layout="vertical"
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Full Name */}
                <Form.Item
                  label="Full Name"
                  name="fullName"
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter your full name!' }]}
                >
                  <Input placeholder="Full Name" size="large" />
                </Form.Item>

                {/* Email */}
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: 'Please enter your email!' },
                    { type: 'email', message: 'Please enter a valid email!' },
                  ]}
                >
                  <Input placeholder="Email" size="large" />
                </Form.Item>

                {/* Phone Number */}
                <Form.Item
                  label="Phone Number"
                  name="phoneNumber"
                  rules={[{ required: true, message: 'Please enter your phone number!' }]}
                >
                  <Input placeholder="Phone Number" size="large" />
                </Form.Item>

                {/* Date of Birth */}
                <Form.Item
                  label="Date of Birth"
                  name="dateOfBirth"
                  rules={[{ required: true, message: 'Please select your date of birth!' }]}
                >
                  <DatePicker placeholder="Select Date" size="large" className="w-full" />
                </Form.Item>

                {/* NIC */}
                <Form.Item
                  label="NIC"
                  name="nic"
                  rules={[{ required: true, message: 'Please enter your NIC!' }]}
                >
                  <Input placeholder="NIC" size="large" />
                </Form.Item>

                {/* Address */}
                <Form.Item
                  label="Address"
                  name="address"
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter your address!' }]}
                >
                  <Input.TextArea rows={2} placeholder="Address" size="large" />
                </Form.Item>

                {/* Password */}
                <Form.Item
                  label="Password"
                  name="password"
                  className="col-span-2"
                  rules={[{ required: true, message: 'Please enter your password!' }]}
                >
                  <Input.Password placeholder="Password" size="large" />
                </Form.Item>
              </div>

              <Form.Item>
                <Button className="w-full bg-gray-900 border-none text-white" size="large" htmlType="submit">
                  Register
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-5">
              Already have an account? <a href= "/api/login" className="text-gray-900 font-bold"> Login </a>
            </div>        

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Registration;

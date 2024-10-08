"use client";

import { Form, Input, Button, Checkbox, message, Modal } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import Image from "next/image";
import logoImage from "@/assets/images/logoBlack.png";
import loginImage from "@/assets/images/loginImage.jpg"; // Replace with your desired image
import Navbar from "@/components/home/Navbar";
import Footer from "@/components/Footer";
import api from '@/api/api';  // Axios instance imported from api.ts
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);  // State for showing/hiding modal
  const [emailForReset, setEmailForReset] = useState("");  // State to hold email for password reset
  const router = useRouter();


  const onFinish = async (values: LoginFormValues) => {
    console.log('Received values of form: ', values);
    
    try {
      // Send login request to the BFF login endpoint
      const response = await api.post('/user/login', values);

      // Handle success response
      console.log(response);
      if (response.data.success) {
        message.success('Login successful!');
        
        // Store the token in localStorage (if needed for authenticated routes)
        localStorage.setItem('token', response.data.data.token);

        // Redirect to dashboard or another page
        setTimeout(() => {
          window.location.href = '/api/customer/dashboard';
        }, 2000);
      } else {
        // Handle login failure
        message.error(response.data.message || 'Login failed!');
      }
    } catch (error) {
      // Handle any errors during the request
      message.error('Error occurred during login. Please try again!');
      console.error('Error during login: ', error);
    }
  };

  // Show Forgot Password Modal
  const showForgotPasswordModal = () => {
    setIsModalVisible(true);
  };

  // Handle Forgot Password Modal submission
  const handleForgotPasswordOk = async () => {
    try {
      // Send forgot password request to generate token and log it
      const response = await api.post('/user/forgotpassword', { email: emailForReset });

      if (response.data.success) {
        message.success('Token generated! Redirecting to reset password...');
        
        router.push('/api/resetPassword');
        
        setIsModalVisible(false);  // Close the modal
      } else {
        message.error(response.data.message || 'Failed to generate token!');
      }
    } catch (error) {
      console.error('Error during password reset: ', error);
      message.error('Error occurred while generating token. Please try again!');
    }
  };


  // Handle modal cancellation
  const handleForgotPasswordCancel = () => {
    setIsModalVisible(false);
  };


  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow flex justify-center items-center my-10">
        <div className="bg-white rounded-2xl shadow-lg max-w-4xl w-full flex">
          {/* Left side image */}
          {/* <div className="hidden md:flex flex-col justify-center items-center w-1/2 bg-white rounded-l-xl">
            <Image src={loginImage} alt="Login Image" width={800} height={800} />
          </div> */}

          <div
            className="hidden md:flex flex-col justify-center items-center w-1/2 bg-cover bg-center rounded-l-xl"
            style={{
              backgroundImage: `url(${loginImage.src})`,
            }}
          ></div>

          {/* Right side form */}
          <div className="w-full md:w-1/2 p-10 text-center">
            <div className="mb-5">
              <Image
                src={logoImage}
                alt="Logo"
                width={80}
                height={80}
                className="mx-auto"
              />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Welcome Back!</h2>
            <p className="text-gray-600 mb-5">Let`s get you back on track,</p>

            <Form
              name="login"
              onFinish={onFinish}
              layout="vertical" // Add vertical layout for label alignment
            >
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Please enter your email!" },
                  { type: "email", message: "Please enter a valid email!" },
                ]}
              >
                <Input
                  prefix={<MailOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  size="large"
                />
              </Form.Item>

              <Form.Item
                label="Password"
                name="password"
                rules={[
                  { required: true, message: "Please enter your password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  placeholder="Password"
                  size="large"
                />
              </Form.Item>

              <div className="flex justify-between items-center mb-4">
                <Checkbox>Remember me</Checkbox>
                <a onClick={showForgotPasswordModal} className="text-sm text-gray-600 cursor-pointer">
                  Forgot Password?
                </a>
              </div>

              <Form.Item>
                <Button
                  className="w-full bg-gray-900 border-none text-white"
                  size="large"
                  htmlType="submit"
                >
                  Login
                </Button>
              </Form.Item>
            </Form>

            <div className="mt-5">
              Don`t have an account?{" "}
              <a href="/api/register" className="text-gray-900 font-bold">
                {" "}
                Register{" "}
              </a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
   {/* Forgot Password Modal */}
   <Modal
        title="Forgot Password"
        visible={isModalVisible}
        onOk={handleForgotPasswordOk}
        onCancel={handleForgotPasswordCancel}
        okText="Generate OTP"
        cancelText="Cancel"
      >
        <p>Enter your email to generate a reset OTP:</p>
        <Input 
          placeholder="Email" 
          value={emailForReset} 
          onChange={(e) => setEmailForReset(e.target.value)} 
        />
      </Modal>
    </div>
  );
};

export default Login;
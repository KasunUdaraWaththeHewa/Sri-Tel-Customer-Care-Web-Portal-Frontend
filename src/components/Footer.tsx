// components/Footer.tsx
import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import { AiOutlinePhone, AiOutlineMail } from "react-icons/ai";
import { IoLocationOutline } from "react-icons/io5";

const ContactInfo: React.FC = () => (
  <div className="flex flex-col mb-6 md:w-1/3 md:mb-0">
    <h3 className="text-xl font-bold mb-3">Contact Us</h3>
    <div className="flex items-center mb-2">
      <AiOutlinePhone size={20} className="mr-2" />
      <span>+1 234 567 890</span>
    </div>
    <div className="flex items-center mb-2">
      <AiOutlineMail size={20} className="mr-2" />
      <span>info@sritel.com</span>
    </div>
    <div className="flex items-center">
      <IoLocationOutline size={20} className="mr-2" />
      <span>1234 Street Name, City, Country</span>
    </div>
  </div>
);

const QuickLinks: React.FC = () => (
  <div className="flex flex-col mb-6 md:w-1/3 md:mb-0">
    <h3 className="text-xl font-bold mb-3">Quick Links</h3>
    <a href="/plans" className="mb-2 hover:underline">
      Plans
    </a>
    <a href="/services" className="mb-2 hover:underline">
      Services
    </a>
    <a href="/about" className="mb-2 hover:underline">
      About Us
    </a>
    <a href="/contact" className="mb-2 hover:underline">
      Contact
    </a>
  </div>
);

const SocialLinks: React.FC = () => (
  <div className="flex flex-col mb-6 md:w-1/3 md:mb-0">
    <h3 className="text-xl font-bold mb-3">Follow Us</h3>
    <div className="flex space-x-4">
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white-600 hover:text-gray-800"
      >
        <FaFacebookF size={24} />
      </a>
      <a
        href="https://twitter.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white-400 hover:text-gray-600"
      >
        <FaTwitter size={24} />
      </a>
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white-600 hover:text-gray-800"
      >
        <FaInstagram size={24} />
      </a>
      <a
        href="https://linkedin.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white-700 hover:text-gray-900"
      >
        <FaLinkedin size={24} />
      </a>
    </div>
  </div>
);

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between">
        <ContactInfo />
        <QuickLinks />
        <SocialLinks />
      </div>
      <div className="text-center mt-6 border-t border-gray-700 pt-4">
        <p>
          &copy; {new Date().getFullYear()} Sri Tel Ltd. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;

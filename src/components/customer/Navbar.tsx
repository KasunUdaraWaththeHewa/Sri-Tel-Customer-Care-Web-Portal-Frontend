"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logoIcon from "@/assets/images/logoIconWhite.png";
import { BellOutlined, UserOutlined, DownOutlined } from '@ant-design/icons';
import { Dropdown, Button, Menu } from 'antd';

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Voice Packages", href: "/voice-packages" },
  { label: "Data Packages", href: "/data-packages" },
  { label: "Value Added Services", href: "/value-added-services" }
];

const accountMenuItems = [
  { label: "0771234567", key: "1" },
  { label: "0719876543", key: "2" },
  { label: "Add new account", key: "3" }
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMenuClick = (e: any) => {
    // Handle account menu item click
    console.log('Menu item clicked:', e.key);
  };

  const accountMenu = (
    <Menu
      items={accountMenuItems}
      onClick={handleMenuClick}
    />
  );

  return (
    <nav className="bg-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white font-bold text-xl flex items-center">
          <Image src={logoIcon} alt="Logo" className="w-9 h-7 mr-2" />
          <Link href="/">Sri-Tel Dashboard</Link>
        </div>

        {/* Desktop Menu */}
        {/* <div className="hidden lg:flex space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-gray-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </div> */}

        <div className="flex items-center space-x-4">
          <Button icon={<BellOutlined />} type="text" className="text-white hover:text-gray-300" />
          <Button icon={<UserOutlined />} type="text" className="text-white hover:text-gray-300" />
          <Dropdown overlay={accountMenu}>
            <Button type="text" className="text-white hover:text-gray-300">
              0771234567 <DownOutlined />
            </Button>
          </Dropdown>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="block lg:hidden text-white focus:outline-none"
          onClick={toggleMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            ></path>
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden">
          <div className="space-y-2 p-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block text-gray-300 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

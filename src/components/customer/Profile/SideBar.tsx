import React from 'react';
import { Menu, Avatar } from 'antd';
import { UserOutlined, CreditCardOutlined, LinkOutlined, QuestionCircleOutlined } from '@ant-design/icons';

type SidebarProps = {
  activeMenu: string;
  onMenuClick: (key: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ activeMenu, onMenuClick }) => {
  return (
    <div className="w-80 bg-gray-100 p-6 h-screen flex flex-col">
      <div className="flex items-center mb-8">
        <Avatar size={64} icon={<UserOutlined />} className="mr-4" />
        <div>
          <h2 className="text-xl font-semibold">John Doe</h2>
          <p className="text-gray-500">johndoe@example.com</p>
        </div>
      </div>
      <Menu
        mode="vertical"
        selectedKeys={[activeMenu]}
        className="flex-1"
      >
        <Menu.Item
          key="profile-details"
          icon={<UserOutlined />}
          className={activeMenu === 'profile-details' ? 'bg-blue-500 text-white' : ''}
          onClick={() => onMenuClick('profile-details')}
        >
          Profile Details
        </Menu.Item>
        <Menu.Item
          key="billing-details"
          icon={<CreditCardOutlined />}
          className={activeMenu === 'billing-details' ? 'bg-blue-500 text-white' : ''}
          onClick={() => onMenuClick('billing-details')}
        >
          Billing Details
        </Menu.Item>
        <Menu.Item
          key="manage-connections"
          icon={<LinkOutlined />}
          className={activeMenu === 'manage-connections' ? 'bg-blue-500 text-white' : ''}
          onClick={() => onMenuClick('manage-connections')}
        >
          Manage Connections
        </Menu.Item>
        <Menu.Item
          key="faq"
          icon={<QuestionCircleOutlined />}
          className={activeMenu === 'faq' ? 'bg-blue-500 text-white' : ''}
          onClick={() => onMenuClick('faq')}
        >
          FAQ
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Sidebar;

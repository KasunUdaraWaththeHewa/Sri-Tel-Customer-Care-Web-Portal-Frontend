"use client"

import { Card, Dropdown, Menu } from 'antd';
import {
  PhoneOutlined,
  WifiOutlined ,
  AppstoreOutlined,
  DownOutlined,
  PlusCircleOutlined,
  GlobalOutlined,
  TagsOutlined,
  SoundOutlined,
} from '@ant-design/icons';

const DashboardCards = () => {
  const cardData = [
    {
      title: 'Voice Packages',
      icon: <PhoneOutlined />,
      href: '/voice-packages',
    },
    {
      title: 'Data Packages',
      icon: <WifiOutlined  />,
      href: '/data-packages',
    },
  ];

  const vasMenu = (
    <Menu>
      <Menu.Item key="1" icon={<PlusCircleOutlined />}>
        <a href="/vas/add-ons" className='text-base font-semibold'>AddOns</a>
      </Menu.Item>
      <Menu.Item key="2" icon={<GlobalOutlined />}>
        <a href="/vas/roaming" className='text-base font-semibold'>Roaming</a>
      </Menu.Item>
      <Menu.Item key="3" icon={<TagsOutlined />}>
        <a href="/vas/subscriptions" className='text-base font-semibold'>Subscriptions</a>
      </Menu.Item>
      <Menu.Item key="4" icon={<SoundOutlined />}>
        <a href="/vas/ringing-tones" className='text-base font-semibold'>Ringing Tones</a>
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardData.map((card, index) => (
        <Card
          key={index}
          className="bg-white p-6 text-center cursor-pointer border-none"
          onClick={() => window.location.href = card.href}
        >
          <div className="flex flex-row items-center justify-center space-x-4">
            <div className="text-3xl text-black">{card.icon}</div>
            <div className="text-xl font-semibold text-black">
              {card.title}
            </div>
          </div>
        </Card>
      ))}

      {/* Value Added Services (VAS) with dropdown */}
      <Dropdown overlay={vasMenu} trigger={['click']}>
        <Card
          className="bg-white p-6 text-center cursor-pointer border-none"
        >
          <div className="flex flex-row items-center justify-center space-x-4">
            <div className="text-3xl text-black">
              <AppstoreOutlined />
            </div>
            <div className="text-xl font-semibold text-black flex items-center">
              Value Added Services
              <DownOutlined className="ml-2 text-black" />
            </div>
          </div>
        </Card>
      </Dropdown>
    </div>
  );
};

export default DashboardCards;

// components/FloatingChatButton.tsx
import React from 'react';
import { Button } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const FloatingChatButton: React.FC = () => {
  const openChat = () => {
    console.log("Opening chat...");
    // Chat opening logic (e.g., toggle modal or navigate to chat)
  };

  return (
    <Button
      type="primary"
      shape="circle"
      icon={<MessageOutlined style={{ fontSize: '24px' }} />} // Larger icon
      size="large"
      className="floating-chat-btn bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center"
      onClick={openChat}
    >
      Chat
    </Button>
  );
};

export default FloatingChatButton;

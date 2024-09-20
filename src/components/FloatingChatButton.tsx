import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

import ChatWidget from './Chatbox';

const FloatingChatButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Button
        type="primary"
        shape="circle"
        icon={<MessageOutlined style={{ fontSize: '24px' }} />}
        size="large"
        className="floating-chat-btn bg-blue-600 hover:bg-blue-700 text-white flex justify-center items-center"
        onClick={showModal}
      >
Chat      </Button>

      <div style={{ position: 'fixed', bottom: 0, right: 0, width: '250px', maxHeight: '600px', overflow: 'auto' }}>
        <Modal
          title="Sri Tel Assistant"
          open={isModalOpen}
          onOk={handleClose}
          onCancel={handleClose}
          footer={null}
          bodyStyle={{ padding: 0 }}
          // width="100%"  // Ensures the modal fills the width of the container
          style={{ maxHeight: '100%', overflow: 'auto', width: '180px' ,  }}
        >
          <ChatWidget />
        </Modal>
      </div>
    </>
  );
};

export default FloatingChatButton;

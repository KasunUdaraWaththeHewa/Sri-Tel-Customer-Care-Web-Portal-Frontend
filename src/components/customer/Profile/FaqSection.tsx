import React, { useState } from 'react';
import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';

const { Panel } = Collapse;

const FAQ: React.FC = () => {
  const [activeKey, setActiveKey] = useState<string | string[]>();

  const handlePanelChange = (key: string | string[]) => {
    setActiveKey(key);
  };

  return (
    <div className="bg-gray-50 p-6">
      <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
      <Collapse
        bordered={false}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        activeKey={activeKey}
        onChange={handlePanelChange}
        className="site-collapse-custom-collapse rounded-lg shadow-lg bg-white"
      >
        <Panel header="How can I activate a postpaid package?" key="1" className="site-collapse-custom-panel text-md font-bold">
          <p className='text-sm font-normal'>To activate a postpaid package, you can log into your account, navigate to the 'Packages' section, and choose the postpaid plan that suits your needs. You can also contact customer support for assistance.</p>
        </Panel>
        <Panel header="What happens if I exceed my data limit?" key="2" className="site-collapse-custom-panel text-md font-bold">
          <p className='text-sm font-normal'>If you exceed your data limit, you will either be charged an additional fee or the data speed may be reduced, depending on your package terms. You can always top-up your data by purchasing an add-on.</p>
        </Panel>
        <Panel header="How can I switch from prepaid to postpaid?" key="3" className="site-collapse-custom-panel text-md font-bold">
          <p className='text-sm font-normal'>To switch from prepaid to postpaid, visit the 'Account' section and select 'Switch to Postpaid'. You will be guided through the steps to choose a postpaid plan and complete the switch.</p>
        </Panel>
        <Panel header="How do I view my billing details?" key="4" className="site-collapse-custom-panel text-md font-bold">
          <p className='text-sm font-normal'>You can view your billing details by logging into your account, navigating to the 'Billing' section, and viewing past bills, payment history, and outstanding balances.</p>
        </Panel>
        <Panel header="Can I carry over unused data to the next billing cycle?" key="5" className="site-collapse-custom-panel text-md font-bold">
          <p className='text-sm font-normal'>Whether you can carry over unused data depends on the specific postpaid plan. Please check the terms of your package or contact customer support for more information.</p>
        </Panel>
      </Collapse>
    </div>
  );
};

export default FAQ;

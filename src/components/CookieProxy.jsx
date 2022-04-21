import React, { useEffect, useState } from 'react';
import { Form, Input, Select } from 'antd';

const { Option } = Select;

// cookie代理
export default function CookieProxy() {
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    getCurrentTab();
  }, []);

  const getCurrentTab = async () => {
    let queryOptions = { active: false, currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    console.log(tabs, '---tab---', JSON.stringify(tabs));
    setTabs(tabs || []);
  };

  return (
    <div>
      <h2>CookieProxy</h2>
      <div>
        <Form>
          <Form.Item label="匹配路由">
            <Input placeholder="proxy的路径,支持正则匹配" />
          </Form.Item>
          <Form.Item label="手动增加cookie">
            <Input placeholder="cookie的key" />
            <Input placeholder="cookie的value" />
          </Form.Item>
          <Form.Item label="选择线上站点">
            <Select placeholder="选择线上站点" style={{ width: '100%' }}>
              {tabs.map((tab) => (
                <Option key={tab.id} value={tab.id}>
                  {`${tab.title} - ${tab.url}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

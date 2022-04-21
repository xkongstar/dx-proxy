import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select } from "antd";
import "./ConfigProxy.css";

const { Option } = Select;

// cookie代理
export default function CookieProxy() {
  const [tabs, setTabs] = useState([]);
  const [form] = Form.useForm();

  useEffect(() => {
    getCurrentTab();
  }, []);

  const getCurrentTab = async () => {
    let queryOptions = { currentWindow: true };
    let tabs = await chrome.tabs.query(queryOptions);
    console.log(tabs, "---tab---", JSON.stringify(tabs));
    setTabs(tabs || []);
  };

  // select change
  const onSelect = (value) => {
    console.log(value);
    chrome.scripting.executeScript(
      {
        target: { tabId: value },
        func: () => {
          var cookie = document.cookie;
          return cookie;
        },
      },
      (result) => {
        console.log(result);
        form.setFieldsValue({ cookie: result[0].result });
      }
    );
  };

  // submit
  const onSubmit = () => {
    form.validateFields().then((values) => {
      console.log(values);
      chrome.cookies.set({
        url: values.url,
        name: values.name,
        value: values.cookie,
      });
    });
  };

  return (
    <div className="root">
      <h2>CookieProxy</h2>
      <div>
        <Form layout="vertical" form={form}>
          <Form.Item label="匹配路由" name="url">
            <Input placeholder="proxy的路径,支持正则匹配" />
          </Form.Item>
          <Form.Item label="手动增加cookie">
            <Input placeholder="cookie的key" />
            <Input placeholder="cookie的value" />
          </Form.Item>
          <Form.Item label="选择线上站点" name="tabId">
            <Select placeholder="选择线上站点" onSelect={onSelect}>
              {tabs.map((tab) => (
                <Option key={tab.id} value={tab.id}>
                  {`${tab.title} - ${tab.url}`}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="当前cookie" name="cookie">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="操作">
            <Button type="primary" block onClick={onSubmit}>
              保存
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

import { Form, Modal, Input, Checkbox } from 'antd';
import { useState } from 'react';
import { saveConfig } from '../utils';

// 配置弹窗
export default function ConfigModal({ visible, onCancel }) {
  const [form] = Form.useForm();
  const [checkeds, setCheckeds] = useState([]);
  const onOk = () => {
    console.log('onOK');
    form.validateFields().then((values) => {
      console.log(values);
      saveConfig([values]);
      onCancel();
    });
  };

  const onCheckboxChange = (e) => {
    setCheckeds(e);
  };
  return (
    <Modal visible={visible} title="配置" onCancel={onCancel} onOk={onOk}>
      <Form form={form}>
        <Form.Item label="模式选择" name="type">
          <Checkbox.Group
            onChange={(checkedValues) => onCheckboxChange(checkedValues)}
            options={[
              { label: '修改cookie', value: 'editCookie' },
              { label: '线下代理线上文件', value: 'fileProxy' },
              { label: '接口转发', value: 'apiProxy' },
              { label: 'mock数据', value: 'mock', disabled: true },
            ]}
            value={checkeds}
          ></Checkbox.Group>
        </Form.Item>
        <Form.Item label="名称" name="name">
          <Input placeholder="请输入该配置项名称" />
        </Form.Item>
        <Form.Item label="描述" name="describe">
          <Input.TextArea placeholder="对配置项的具体描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

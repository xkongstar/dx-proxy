import { Form, Modal, Input, Checkbox, Switch } from 'antd';
import { useState } from 'react';
import { saveConfig, getConfig } from '../utils';
import { v4 as uuidv4 } from 'uuid';

// 配置弹窗
export default function ConfigModal({ visible, onCancel, editData, onFresh }) {
  const [form] = Form.useForm();
  const [checkeds, setCheckeds] = useState([]);
  const isEdit = !!editData;

  // 提交表单
  const onOk = () => {
    form.validateFields().then(async (values) => {
      const id = uuidv4();
      const configs = await getConfig();
      if (isEdit) {
        const newConfigs = configs.map((item) => {
          if (item.id === editData.id) {
            return { ...item, ...values };
          }
          return item;
        });
        saveConfig(newConfigs);
      } else {
        const newConfigs = [...configs, { ...values, id }];
        saveConfig(newConfigs);
      }
      onCancel();
      onFresh();
    });
  };

  // 多选框
  const onCheckboxChange = (e) => {
    setCheckeds(e);
  };


  console.log(editData, '---editData---');

  return (
    <Modal
      visible={visible}
      title={isEdit ? '编辑配置' : '新增配置'}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose
    >
      <Form
        form={form}
        initialValues={!!editData ? editData : { status: false }}
        preserve={false}
      >
        <Form.Item
          label="开启状态"
          name="status"
          hidden
          valuePropName="checked"
        >
          <Switch />
        </Form.Item>
        <Form.Item label="模式选择" name="type" required>
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
        <Form.Item label="名称" name="name" required>
          <Input placeholder="请输入该配置项名称" />
        </Form.Item>
        <Form.Item label="描述" name="describe" required>
          <Input.TextArea placeholder="对配置项的具体描述" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

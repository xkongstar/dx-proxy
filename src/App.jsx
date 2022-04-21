import './App.css';
import { useEffect, useState } from 'react';
import { Button, Space, Switch } from 'antd';
import { EditTwoTone, DeleteTwoTone } from '@ant-design/icons';
import ConfigModal from './components/ConfigModal';
import FileProxy from './components/FileProxy';
import { getConfig, saveConfig } from './utils';

function App() {
  const [configMenus, setConfigMenus] = useState([]); // 配置菜单
  const [visible, setVisible] = useState(false); // 是否显示弹窗
  const [editData, setEditData] = useState({}); // 编辑数据
  const [selectedRow, setSelectedRow] = useState(null); // 选中的行

  useEffect(() => {
    init();
  }, []);

  // 初始化
  const init = async () => {
    const data = await getConfig(); // 获取配置
    console.log(data, '---init-data---', JSON.stringify(data));
    setSelectedRow(data?.length ? data[0] : null);
    setConfigMenus(data || []);
  };

  // 选中行
  const onSelectRow = (record) => {
    setSelectedRow(record);
  };

  // 开启状态
  const onSwitchChange = async (item, checked) => {
    const newConfigs = configMenus.map((config) => {
      if (config.id === item.id) {
        return { ...config, status: checked };
      }
      return config;
    });
    setConfigMenus(newConfigs);
    saveConfig(newConfigs);
  };

  // 编辑配置
  const onEdit = (item) => {
    setEditData(item);
    setVisible(true);
  };

  // 新增配置
  const onAdd = () => {
    setEditData(undefined);
    setVisible(true);
  };

  // 删除配置
  const onDelete = (item) => {
    const newConfigs = configMenus.filter((config) => config.id !== item.id);
    setConfigMenus(newConfigs);
    saveConfig(newConfigs);
  };

  // 刷新配置
  const onFresh = () => {
    init();
  };

  console.log(selectedRow, '---selectedRow---');

  return (
    <div className="App">
      {/* mock数据/cookie修改/代理 */}
      <header>前端代理</header>
      <div className="content">
        {/* 左侧历史 */}
        <div className="left">
          <div className="left-top">
            {configMenus.map((item, index) => {
              return (
                <div
                  key={index}
                  className="left-list"
                  onClick={() => onSelectRow(item)}
                >
                  <span>{item.name}</span>
                  <Space>
                    <Switch
                      checkedChildren="开启"
                      unCheckedChildren="关闭"
                      defaultChecked={item.status}
                      onChange={(checked) => onSwitchChange(item, checked)}
                    />
                    <EditTwoTone onClick={() => onEdit(item)} />
                    <DeleteTwoTone onClick={() => onDelete(item)} />
                  </Space>
                </div>
              );
            })}
          </div>
          <div className="left-foot">
            <Button type="primary" block onClick={onAdd}>
              新增
            </Button>
          </div>
        </div>
        {/* 右侧内容区域 */}
        <div className="right">
          {selectedRow?.type.includes('fileProxy') && <FileProxy />}
        </div>
      </div>

      {/* 弹窗 */}
      {visible && (
        <ConfigModal
          visible={visible}
          onCancel={() => setVisible(false)}
          editData={editData}
          onFresh={onFresh}
        />
      )}
    </div>
  );
}

export default App;

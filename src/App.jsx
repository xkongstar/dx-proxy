import './App.css';
import { useEffect, useState } from 'react';
import { Button, Space, Switch } from 'antd';
import ConfigModal from './components/ConfigModal';
import { getConfig } from './utils';

function App() {
  const [configMenus, setConfigMenus] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    getConfigs();
  }, []);

  const getConfigs = async () => {
    const data = await getConfig();
    console.log(data, 'data', JSON.stringify(data));
    setConfigMenus(data || []);
  };

  // 编辑配置
  const onEdit = (item, index) => {
    setVisible(true);
  };

  return (
    <div className="App">
      {/* mock数据/cookie修改/代理 */}
      <header>前端代理</header>
      {/* 左侧历史 */}
      <div className="left">
        <div className="left-top">
          {configMenus.map((item, index) => {
            return (
              <div key={index} className="left-list">
                <span>{item.name}</span>
                <Space>
                  <Switch checkedChildren="开启" unCheckedChildren="关闭" />
                  <Button onClick={() => onEdit(item, index)}>编辑</Button>
                </Space>
              </div>
            );
          })}
        </div>
      </div>
      {/* 右侧内容区域 */}
      <div className="right"></div>

      {/* 弹窗 */}
      <ConfigModal visible={visible} onCancel={() => setVisible(false)} />
    </div>
  );
}

export default App;

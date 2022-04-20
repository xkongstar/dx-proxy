// 保存Chrome配置
export const saveConfig = async (data) => {
  const configs = await getConfig();
  const newConfigs = [...configs, ...data];
  console.log(data, "---saveConfig---", newConfigs);
  chrome.storage.sync.set({ "dx-proxy-configs": newConfigs }, function (res) {
    console.log("Value is set to " + res);
  });
};

export const getConfig = () => {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get("dx-proxy-configs", function (result) {
      console.log(
        "Value currently is " + JSON.stringify(result["dx-proxy-configs"])
      );
      resolve(result["dx-proxy-configs"] || []);
    });
  });
};

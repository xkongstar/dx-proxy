// 保存Chrome配置
export const saveConfig = async (data) => {
   console.log(data, "---save-Config---");   
  chrome.storage.sync.set({ "dx-proxy-configs": data }, function (res) {
    console.log("Value is set to " + res);
  });
};

export const getConfig = () => {
  return new Promise((resolve) => {
    chrome.storage.sync.get("dx-proxy-configs", function (result) {
      console.log(
        "---get-Config---" + JSON.stringify(result["dx-proxy-configs"])
      );
      resolve(result["dx-proxy-configs"] || []);
    });
  });
};

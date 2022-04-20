// 保存Chrome配置
export const saveConfig = (data) => {
    console.log(data, '---saveConfig---');
    chrome.storage.sync.set({ 'dx-proxy-configs': [...getConfig(), ...data] }, function () {
        console.log('Value is set to ' + 'color');
    });
}

export const getConfig = () => {
    return new Promise((resolve, reject) => {
        chrome.storage.sync.get('dx-proxy-configs', function (result) {
            console.log('Value currently is ' + JSON.stringify(result['dx-proxy-configs']));
            resolve(result['dx-proxy-configs'] || []);
        });
    });
}
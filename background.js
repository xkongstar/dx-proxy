console.log('background.js');

// 识别的所有js
let origins = {
    common: 'nodeModules_eeb5887.js',
};

// 重定向的js
let redirects = {
    common: 'https://s1.hdslb.com/bfs/static/blive/live-region/libs/area-tags/vue_2.6.14.js',
};

chrome.runtime.onInstalled.addListener(() => {
    // 请求时回调
    chrome.webRequest.onBeforeRequest.addListener(
        function (details) {
            console.log('onBeforeRequest', details);
            // 如果请求的js，以origins.common结尾
            if(details.url.endsWith(origins.common)){
                // 直接将这个js替换为redirects.common
                return { redirectUrl: redirects.common };
            }
        },
        { 
            types:["script"],
            urls: ["*://*/*.js"] // 进一步过滤js，这里没做进一步筛选
        },
        ["blocking"]
    );
});
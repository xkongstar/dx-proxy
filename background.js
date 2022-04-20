console.log('background.js');

chrome.storage.sync.set({'dx-proxy-configs': [{name:'config-A'}]}, function() {
  console.log('Value is set to ' + 'color');
});